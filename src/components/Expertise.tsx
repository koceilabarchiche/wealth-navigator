import { Card } from "@/components/ui/card";
import { Building2, PiggyBank, TrendingUp, Palette } from "lucide-react";

const expertiseAreas = [
  {
    icon: Building2,
    title: "Banquier Privé",
    description: "Votre interlocuteur privilégié pour une relation de confiance et un suivi personnalisé de vos objectifs patrimoniaux.",
  },
  {
    icon: TrendingUp,
    title: "Gestion Conseillée",
    description: "Un conseiller financier dédié qui s'adapte à votre profil et vous accompagne dans vos décisions d'investissement.",
  },
  {
    icon: PiggyBank,
    title: "Optimisation Fiscale",
    description: "Expertise patrimoniale avancée : optimisation fiscale, préparation de transmission, solutions de crédit sur mesure.",
  },
  {
    icon: Palette,
    title: "Expertise Niche",
    description: "Accès à des expertises spécialisées : art, immobilier de prestige, investissements alternatifs et marchés émergents.",
  },
];

const Expertise = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Une expertise <span className="text-accent">multi-facettes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nos conseillers s'adaptent à vos besoins et évoluent avec vous
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseAreas.map((area, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-accent to-gold-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <area.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {area.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {area.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
