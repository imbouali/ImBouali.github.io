import React from "react";
import { Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs text-muted-foreground">
            bouali.dev © {new Date().getFullYear()}
          </span>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          Conçu avec <span className="text-primary">{'<code />'}</span> et passion
        </span>
      </div>
    </footer>
  );
}