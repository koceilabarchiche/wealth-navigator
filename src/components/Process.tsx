import { CheckCircle2 } from "lucide-react";
import advisorImage from "@/assets/advisor.jpg";

const steps = [
  {
    number: "01",
    title: "Prise de contact",
    description: "Échangez avec un conseiller pour définir vos objectifs et votre profil patrimonial.",
  },
  {
    number: "02",
    title: "Analyse personnalisée",
    description: "Nous analysons votre situation et élaborons une stratégie sur mesure adaptée à vos besoins.",
  },
  {
    number: "03",
    title: "Mise en place",
    description: "Déploiement de votre stratégie patrimoniale avec accès 24/7 à votre espace personnel.",
  },
  {
    number: "04",
    title: "Suivi continu",
    description: "Accompagnement régulier et ajustements en fonction de l'évolution de vos objectifs.",
  },
];

const Process = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={advisorImage}
                alt="Conseiller patrimonial"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border border-border max-w-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-foreground mb-1">
                    100% Digital
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Gérez votre patrimoine où que vous soyez
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Un parcours <span className="text-accent">simple et transparent</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              De votre première consultation à la gestion quotidienne, nous vous accompagnons à chaque étape.
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-6 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-gold-light flex items-center justify-center text-primary font-bold text-sm group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
