import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-wealth.jpg";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Wealth Management"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/20 mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Gestion patrimoniale nouvelle génération</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up">
            Votre patrimoine mérite une expertise <span className="text-accent">d'exception</span>
          </h1>

          <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-10 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Accédez à une gestion patrimoniale sur mesure, 100% digitale, combinant expertise financière et accompagnement personnalisé.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Button 
              size="lg" 
              variant="premium" 
              onClick={scrollToContact}
              className="text-lg px-8 py-6 group"
            >
              Découvrir nos services
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="hero"
              onClick={scrollToContact}
              className="text-lg px-8 py-6"
            >
              Prendre rendez-vous
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-6 mt-16 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="text-primary-foreground">
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm text-primary-foreground/80">À distance</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-3xl font-bold mb-1 flex items-center">
                <TrendingUp className="w-8 h-8 mr-2 text-accent" />
                24/7
              </div>
              <div className="text-sm text-primary-foreground/80">Accessible</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-3xl font-bold mb-1">Expert</div>
              <div className="text-sm text-primary-foreground/80">Dédié</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
