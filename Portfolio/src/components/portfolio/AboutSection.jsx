import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-primary text-sm">01.</span>
            <h2 className="font-mono text-2xl font-bold text-foreground">about()</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="bg-card/50 border border-border rounded-lg p-6 sm:p-8 glow-border">
            {/* Terminal bar */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <span className="w-3 h-3 rounded-full bg-destructive/60" />
              <span className="w-3 h-3 rounded-full bg-chart-4/60" />
              <span className="w-3 h-3 rounded-full bg-primary/60" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">~/bouali/about.md</span>
            </div>

            <div className="space-y-4 font-sans text-secondary-foreground leading-relaxed">
              <p>
                Actuellement en <span className="text-primary font-medium">1ère année de cycle ingénieur à CY Tech</span> (parcours GMAA/GMIA), 
                je me spécialise en Mathématiques Appliquées avec une forte orientation vers la modélisation, 
                la <span className="text-primary font-medium">finance quantitative</span> et l'<span className="text-primary font-medium">intelligence artificielle</span>.
              </p>
              <p>
                Issu d'un parcours <span className="text-primary font-medium">CPGE MP</span> — <span className="text-accent font-medium">Major de promotion en Informatique</span> (19.17/20) — 
                je recherche une entreprise pour m'investir durant mes 3 ans de formation en alternance (36 mois).
              </p>
              <p>
                Ma passion pour la programmation et les mathématiques m'a conduit à explorer des domaines comme 
                la cybersécurité (étude de l'algorithme de Shor face au chiffrement RSA), 
                le machine learning (OCR avec K-NN), et le développement d'agents IA autonomes.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Langues", values: ["Arabe (natif)", "Français (C1)", "Anglais (B2)"] },
                { label: "Formation", values: ["CY Tech", "CPGE MP"] },
                { label: "Intérêts", values: ["Taekwondo", "Cybersécurité", "IA"] },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-xs text-primary mb-1">{`// ${item.label}`}</p>
                  {item.values.map((v) => (
                    <p key={v} className="font-mono text-xs text-muted-foreground">{v}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}