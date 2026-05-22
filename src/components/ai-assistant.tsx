"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FloatingAIButton() {
  const scrollToAISection = () => {
    document.getElementById("ai-assistant")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToAISection}
        className="relative flex items-center justify-center p-4 rounded-full neo-border shadow-[6px_6px_0_0_#000] z-50 transition-colors bg-lime-green text-black"
      >
        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-50" />
        <Sparkles size={28} className="animate-pulse" />
        
        <span className="absolute -top-10 right-0 whitespace-nowrap bg-black text-white text-xs px-3 py-1.5 neo-border-sm shadow-[2px_2px_0_0_#a3e635]">
          Ask AI Assistant
        </span>
      </motion.button>
    </div>
  );
}
