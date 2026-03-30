import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, MapPin, ExternalLink } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex-1 h-px bg-border max-w-24" />
            <span className="font-mono text-primary text-sm">05.</span>
            <h2 className="font-mono text-2xl font-bold text-foreground">contact()</h2>
            <div className="flex-1 h-px bg-border max-w-24" />
          </div>

          <p className="font-sans text-secondary-foreground mb-10 max-w-lg mx-auto">
            Je suis actuellement � la recherche d'une alternance de 36 mois.
            N'h�sitez pas � me contacter pour toute opportunit�.
          </p>

          <div className="bg-card/50 border border-border rounded-lg p-6 sm:p-8 glow-border max-w-md mx-auto">
            <div className="space-y-4">
              <a
                href="mailto:contact@bouali.tech"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary transition-colors group"
              >
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="font-mono text-sm text-secondary-foreground group-hover:text-foreground transition-colors truncate">
                  contact@bouali.tech
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto shrink-0" />
              </a>

              <a
                href="tel:+33748450839"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary transition-colors group"
              >
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="font-mono text-sm text-secondary-foreground group-hover:text-foreground transition-colors">
                  +33 7 48 45 08 39
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto shrink-0" />
              </a>

              <a
                href="https://www.linkedin.com/in/abdallah-bouali-24a37a183/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-primary shrink-0" />
                <span className="font-mono text-sm text-secondary-foreground group-hover:text-foreground transition-colors">
                  LinkedIn Profile
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto shrink-0" />
              </a>

              <div className="flex items-center gap-3 p-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="font-mono text-sm text-muted-foreground">
                  Lille, France
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
