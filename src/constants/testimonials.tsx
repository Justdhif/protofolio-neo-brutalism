import React from "react";
import { Sparkles, Award, Terminal } from "lucide-react";
import { Testimonial, Achievement } from "@/types/testimonials";

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "Product Lead",
    company: "CloudSync",
    quote:
      "Working with Nadhif was a absolute game-changer. He didn't just write clean React code; he completely reinvented our web animation standards.",
    avatar: "👩‍💻",
    rating: 5,
  },
  {
    name: "Kaito Tanaka",
    role: "Creative Director",
    company: "PixelFlow Studio",
    quote:
      "His eye for pixel-perfect detail, fluid layouts, and top-tier micro-interactions is outstanding. Nadhif is a rare hybrid of engineering and art.",
    avatar: "👨‍🎨",
    rating: 5,
  },
  {
    name: "Michael Chang",
    role: "Founder & CEO",
    company: "AlphaVentures",
    quote:
      "Fast, responsive, and incredibly proactive. Nadhif brought our complex SaaS portal to life in half the projected time. Highly recommended!",
    avatar: "🚀",
    rating: 5,
  },
  {
    name: "Alisa Smirnova",
    role: "Senior UI Designer",
    company: "Zenith Design",
    quote:
      "Every single component he builds feels premium, robust, and expensive. His mastery of Framer Motion physics is absolutely next level.",
    avatar: "✨",
    rating: 5,
  },
];

export const achievements: Achievement[] = [
  {
    title: "Pixel Perfect",
    desc: "100% adherence to designer tokens, keeping layout gaps, font scales, and colors uniform.",
    icon: (
      <Sparkles className="text-lime-green" size={24} strokeWidth={2.5} />
    ),
    color: "bg-white dark:bg-zinc-800",
  },
  {
    title: "Fluid Framer",
    desc: "Deep knowledge of spring layouts, layouts shifting, transitions orchestration, and performance.",
    icon: (
      <Award className="text-pink-accent" size={24} strokeWidth={2.5} />
    ),
    color: "bg-white dark:bg-zinc-800",
  },
  {
    title: "SEO Elite",
    desc: "Proper structural headers, metadata, schema codes, and semantic models maximizing index indexes.",
    icon: (
      <Terminal className="text-electric" size={24} strokeWidth={2.5} />
    ),
    color: "bg-white dark:bg-zinc-800",
  },
];
