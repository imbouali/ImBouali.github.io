import React from "react";
import { motion } from "framer-motion";
import { Bot, Eye, FolderOpen, Wrench, Globe, Gamepad2, Crosshair, Server } from "lucide-react";

const projects = [
  {
    icon: Bot,
    title: "Agent IA Autonome de Veille Stratégique",
    description:
      "Développement d'un agent intelligent automatisant la recherche et l'analyse d'offres d'alternance ciblées.",
    tools: ["Python", "Make.com", "OpenAI/Gemini APIs", "JSON"],
  },
  {
    icon: Eye,
    title: "Reconnaissance d'Écriture Manuscrite (OCR)",
    description:
      "Modèle de classification de chiffres manuscrits via K-NN. Prétraitement d'images, calcul de distances euclidiennes et optimisation du paramètre K.",
    tools: ["Python", "NumPy", "Matplotlib"],
  },
  {
    icon: FolderOpen,
    title: "Application de Gestion de Fichiers (IHM)",
    description:
      "Interface graphique sous Python/Tkinter permettant l'organisation automatisée de documents et de cours.",
    tools: ["Python", "Tkinter", "OS"],
  },
  {
    icon: Globe,
    title: "Développement d'un site web personnel",
    description:
      "Création d'un site web vitrine où je me présente et partage mes projets personnels.",
    tools: ["HTML", "CSS", "JavaScript"],
  },
  {
    icon: Gamepad2,
    title: "Création de jeu d'échecs",
    description:
      "Jeu d'échecs avec interface graphique et un bot qui joue contre le joueur. Programmation orientée objet complète.",
    tools: ["Python", "Pygame", "POO"],
  },
  {
    icon: Crosshair,
    title: "Système de Shooter (Unreal Engine 5)",
    description:
      "Prototype de jeu de tir à la première personne avec logique de jeu de base sous Unreal Engine 5.",
    tools: ["Unreal Engine 5", "C++"],
  },
  {
    icon: Server,
    title: "Serveur Minecraft en réseau local",
    description:
      "Installation, configuration et administration d'un serveur Minecraft accessible en réseau local, incluant la gestion des accès utilisateurs et des ressources système.",
    tools: ["Linux (Ubuntu Server)", "Java", "Virtualisation", "VirtualBox"],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-primary text-sm">04.</span>
            <h2 className="font-mono text-2xl font-bold text-foreground">projects()</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col bg-card/50 border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              {/* Card top bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-secondary/30">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-chart-4/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
              </div>

              <div className="flex-1 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <project.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-mono text-sm font-semibold text-foreground leading-snug">{project.title}</h3>
                </div>
                <p className="font-sans text-sm text-secondary-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div className="px-5 pb-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <Wrench className="w-3 h-3 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}