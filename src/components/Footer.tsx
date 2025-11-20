import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">E-Private</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Gestion patrimoniale nouvelle génération. 100% digitale, expertise d'exception.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Banque privée
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Gestion conseillée
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Optimisation fiscale
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Expertise niche
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Informations</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Conditions générales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10">
          <p className="text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} E-Private. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
