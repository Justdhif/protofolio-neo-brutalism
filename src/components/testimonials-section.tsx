"use client";

import { Quote, Star, Terminal } from "lucide-react";
import { testimonials, achievements } from "@/constants/testimonials";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 bg-white dark:bg-zinc-900 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-16">
          <div className="px-3 py-1 bg-pink-accent text-white font-mono text-xs font-bold neo-border-sm neo-shadow-sm rounded-md mb-4">
            TESTIMONIALS & REVIEWS
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight text-black dark:text-white uppercase leading-none">
            Kind Words From <br />
            <span className="inline-block px-3 py-1 bg-lime-green text-black neo-border neo-shadow my-2 transform rotate-1">
              PARTNERS
            </span>
          </h2>
        </div>
      </div>

      {/* Infinite Scrolling Marquee Row 1 (Scrolling Left) */}
      <div className="w-full flex overflow-hidden relative py-4">
        {/* Left and Right blur shadows for professional finish */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-marquee shrink-0">
          {/* Double map to ensure seamless loop in marquee */}
          {[...testimonials, ...testimonials].map((item, idx) => (
            <div
              key={idx}
              className="w-[350px] md:w-[450px] p-6 md:p-8 bg-cream/70 dark:bg-dark-card/75 glass-effect neo-border neo-shadow rounded-2xl shrink-0 flex flex-col justify-between"
            >
              <div>
                {/* Stars and Quote Marks */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5 text-orange-accent">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <Quote
                    size={24}
                    className="text-zinc-300 dark:text-zinc-700"
                  />
                </div>

                {/* Main Quote Text */}
                <p className="font-sans font-medium text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed mb-6 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* User Bio Footer */}
              <div className="flex items-center gap-3 pt-4 border-t-2 border-dashed border-zinc-200/50 dark:border-zinc-800/60">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 neo-border-sm flex items-center justify-center text-2xl select-none">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="font-display font-black text-black dark:text-white uppercase leading-none text-sm md:text-base">
                    {item.name}
                  </h4>
                  <span className="font-mono text-[10px] md:text-xs text-zinc-500 font-bold">
                    {item.role} @{" "}
                    <span className="text-electric">{item.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Row: Achievements Grid (Centred and Brutalist styled) */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-20">
        {/* Achievements header */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <Terminal size={22} className="text-pink-accent" />
          <h3 className="font-display font-black text-2xl md:text-3xl text-black dark:text-white uppercase tracking-tight text-center">
            KEY MILESTONES & STANDARDS
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, i) => (
            <div
              key={i}
              className={`p-6 ${achievement.color} neo-border neo-shadow neo-interactive cursor-pointer rounded-xl flex flex-col justify-between`}
            >
              <div className="p-3 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl w-fit neo-border-sm neo-shadow-sm mb-4">
                {achievement.icon}
              </div>
              <div>
                <h4 className="font-display font-black text-lg md:text-xl text-black dark:text-white uppercase mb-2">
                  {achievement.title}
                </h4>
                <p className="font-sans font-medium text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {achievement.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
