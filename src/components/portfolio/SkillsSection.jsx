import React from "react";
import { motion } from "framer-motion";
import { Brain, Code, Database, Monitor, Globe, Cpu } from "lucide-react";

const skillCategories = [
  {
    icon: Brain,
    title: "Modélisation",
    color: "text-primary",
    skills: ["Optimisation", "Probabilités", "Statistiques", "Calcul Scientifique", "Recherche Opérationnelle"],
  },
  {
    icon: Code,
    title: "Programmation",
    color: "text-chart-3",
    skills: ["Python", "SQL", "OCaml", "Java", "HTML/CSS", "JavaScript", "LUA", "C++"],
  },
  {
    icon: Database,
    title: "Data Science",
    color: "text-chart-4",
    skills: ["NumPy", "Matplotlib", "Pandas", "MATLAB", "TensorFlow", "Anaconda"],
  },
  {
    icon: Cpu,
    title: "Intelligence Artificielle",
    color: "text-accent",
    skills: ["LLMs", "OpenAI/Gemini APIs", "Prompt Engineering", "Agent IA Autonome"],
  },
  {
    icon: Monitor,
    title: "Outils Dev",
    color: "text-chart-5",
    skills: ["Git", "GitHub", "GitLab", "VS Code", "Linux", "VirtualBox"],
  },
  {
    icon: Globe,
    title: "Visualisation",
    color: "text-chart-2",
    skills: ["PowerBI", "MS Excel", "Tkinter", "Unreal Engine", "PyGame"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-primary text-sm">02.</span>
            <h2 className="font-mono text-2xl font-bold text-foreground">skills()</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card/50 border border-border rounded-lg p-5 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <cat.icon className={`w-5 h-5 ${cat.color}`} />
                <h3 className="font-mono text-sm font-semibold text-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block font-mono text-xs px-2.5 py-1 rounded bg-secondary text-secondary-foreground border border-border group-hover:border-primary/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}