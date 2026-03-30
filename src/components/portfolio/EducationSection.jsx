import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";

const educationData = [
  {
    title: "Diplôme d'Ingénieur en Mathématiques Appliquées",
    school: "CY Tech (ex-EISTI)",
    period: "09/2026 – 08/2029",
    location: "Cergy / Pau",
    highlights: [
      "Spécialisation : Génie Mathématique et Aide à la Décision",
      "Optimisation, Probabilités approfondies, Statistiques inférentielles",
      "Finance & Data : Modélisation stochastique, programmation financière (Python/C++)",
      "Alternance 36 mois · 2 semaines école / 2 semaines entreprise",
    ],
    badge: "En cours",
  },
  {
    title: "CPGE MP (3/2 option SI – 5/2 option Informatique)",
    school: "Lycée Saint Rémi Roubaix",
    period: "2024 – 2026",
    location: "Roubaix, France",
    highlights: [
      "Algèbre linéaire, Analyse, Probabilités, Statistiques, Algorithmique complexe",
      "Développement : Python, SQL, OCaml",
      "TIPE Cybersécurité : Algorithme de Shor · Vulnérabilité RSA / calcul quantique",
      "TIPE sur les codes correcteurs d'erreur",
    ],
    badge: "Major en Info · 19.17/20",
    badgeType: "highlight",
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-primary text-sm">03.</span>
            <h2 className="font-mono text-2xl font-bold text-foreground">education()</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-8">
            {educationData.map((edu, i) => (
              <motion.div
                key={edu.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative sm:pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-6 w-3 h-3 rounded-full bg-primary border-2 border-background hidden sm:block" />

                <div className="bg-card/50 border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-300 glow-border">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-mono text-base font-semibold text-foreground">{edu.title}</h3>
                      <p className="font-sans text-sm text-primary mt-1 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4" />
                        {edu.school}
                      </p>
                    </div>
                    {edu.badge && (
                      <span className={`font-mono text-xs px-3 py-1 rounded-full border ${
                        edu.badgeType === "highlight"
                          ? "border-accent/50 text-accent bg-accent/10"
                          : "border-primary/50 text-primary bg-primary/10"
                      }`}>
                        <Award className="w-3 h-3 inline mr-1" />
                        {edu.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {edu.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {edu.location}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {edu.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 font-sans text-sm text-secondary-foreground">
                        <span className="text-primary mt-1 shrink-0">▹</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}