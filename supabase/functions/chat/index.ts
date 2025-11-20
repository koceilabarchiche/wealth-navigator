import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP address
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(clientIp)) {
      console.warn('Rate limit exceeded for IP:', clientIp);
      return new Response(JSON.stringify({ 
        error: 'Too many requests. Please try again later.' 
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { conversationId, message } = await req.json();
    
    // Validate conversationId (must be a valid UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!conversationId || !uuidRegex.test(conversationId)) {
      console.warn('Invalid conversation ID provided:', conversationId);
      return new Response(JSON.stringify({ 
        error: 'Invalid conversation ID' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate message (must be string, 1-5000 characters)
    if (!message || typeof message !== 'string') {
      console.warn('Invalid message type:', typeof message);
      return new Response(JSON.stringify({ 
        error: 'Invalid message format' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'Message cannot be empty' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (message.length > 5000) {
      console.warn('Message too long:', message.length);
      return new Response(JSON.stringify({ 
        error: 'Message must be less than 5000 characters' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    console.log('Chat request:', { conversationId, message });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get conversation history
    const { data: messages } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    console.log('Found messages:', messages?.length || 0);

    // Save user message
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      role: 'user',
      content: message
    });

    // Prepare messages for AI
    const aiMessages = [
      {
        role: 'system',
        content: `Tu es un conseiller en gestion de patrimoine chez BNP Paribas. Tu aides les clients à comprendre leurs besoins financiers et patrimoniaux. Pose des questions pertinentes sur leur situation, leurs objectifs, et leur profil de risque. Sois professionnel, empathique et clair dans tes réponses. À la fin de la conversation, propose de prendre leurs coordonnées pour un rendez-vous personnalisé.`
      },
      ...(messages || []).map(m => ({
        role: m.role,
        content: m.content
      })),
      { role: 'user', content: message }
    ];

    console.log('Calling Lovable AI...');

    // Call Lovable AI
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: aiMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'Payment required. Please add credits to your workspace.' 
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      throw new Error('AI gateway error');
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    console.log('AI response received');

    // Save assistant message
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      role: 'assistant',
      content: assistantMessage
    });

    return new Response(JSON.stringify({ 
      message: assistantMessage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Log detailed error server-side for debugging
    console.error('Error in chat function:', error);
    
    // Return generic error to client to avoid information disclosure
    return new Response(JSON.stringify({ 
      error: 'Unable to process your message. Please try again.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
