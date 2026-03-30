import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Linkedin, Mail, MapPin } from "lucide-react";

const roles = [
  "Data Science",
  "Mathématiques Appliquées",
  "Intelligence Artificielle",
  "Finance Quantitative",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setText(isDeleting
          ? currentRole.substring(0, text.length - 1)
          : currentRole.substring(0, text.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(142 70% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(142 70% 45%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Gradient orb */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border bg-card/50 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-xs text-muted-foreground">disponible pour alternance · 36 mois</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
        >
          <span className="text-foreground">Bouali</span>{" "}
          <span className="text-primary glow-green">Abdallah</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-mono text-lg sm:text-xl text-muted-foreground mb-2"
        >
          <span className="text-primary/60">{'>'} </span>
          Étudiant Ingénieur
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="font-mono text-base sm:text-lg h-8 mb-10"
        >
          <span className="text-primary/60">{'>'} </span>
          <span className="text-primary">{text}</span>
          <span className="text-primary animate-blink">▌</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="mailto:contact@bouali.tech"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>
          <a
            href="https://www.linkedin.com/in/abdallah-bouali-24a37a183/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-mono text-sm rounded-md hover:border-primary/50 hover:text-primary transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground font-mono text-sm">
            <MapPin className="w-4 h-4" />
            Lille, France
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}