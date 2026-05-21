"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { milestones } from "@/constants/timeline";

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  }),
};

export default function TimelineSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (nextIdx: number) => {
      if (nextIdx === current) return;
      setDirection(nextIdx > current ? 1 : -1);
      setCurrent(nextIdx);
    },
    [current]
  );

  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(milestones.length - 1, current + 1));

  const milestone = milestones[current];

  return (
    <section
      id="experience"
      className="py-24 px-4 md:px-8 bg-cream dark:bg-zinc-950 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col items-end mb-16 text-right">
          <div className="px-3 py-1 bg-neon-purple text-white font-mono text-xs font-bold neo-border-sm neo-shadow-sm rounded-md mb-4">
            MY JOURNEY
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight text-black dark:text-white uppercase leading-none">
            PROFESSIONAL{" "}
            <br />
            <span className="inline-block px-3 py-1 bg-lime-green text-black neo-border neo-shadow my-2 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              TIMELINE
            </span>
          </h2>
        </div>

        <div className="relative flex items-center justify-between mb-8">

          <div
            className="absolute top-6 -translate-y-1/2 h-0.5 bg-zinc-200 dark:bg-zinc-800 pointer-events-none transition-colors duration-300"
            style={{
              left: `${100 / (2 * milestones.length)}%`,
              right: `${100 / (2 * milestones.length)}%`,
            }}
          />

          <motion.div
            className="absolute top-6 -translate-y-1/2 h-1 rounded-full bg-linear-to-r from-neon-purple via-pink-accent to-lime-green pointer-events-none shadow-[0_0_8px_rgba(168,85,247,0.5)] dark:shadow-[0_0_12px_rgba(168,85,247,0.7)]"
            style={{
              left: `${100 / (2 * milestones.length)}%`,
            }}
            animate={{
              width: `${(current / (milestones.length - 1)) * (100 - 100 / milestones.length)}%`,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
          />

          {milestones.map((m, idx) => {
            const isActive = idx === current;
            const isPast = idx < current;
            return (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`
                  relative z-10 flex-1 flex flex-col items-center group
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple rounded-xl
                `}
                aria-label={`Go to milestone ${idx + 1}: ${m.role}`}
              >

                <div className="flex items-center justify-center h-12 w-full">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      boxShadow: isActive
                        ? "4px 4px 0px #000"
                        : "2px 2px 0px rgba(0,0,0,0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`
                      p-2.5 rounded-xl neo-border-sm transition-colors duration-200 cursor-pointer
                      ${isActive ? m.color : isPast ? "bg-zinc-300 dark:bg-zinc-600 text-zinc-500 dark:text-zinc-400" : "bg-white dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"}
                    `}
                  >
                    {m.icon}
                  </motion.div>
                </div>

                <span
                  className={`
                    mt-2 font-mono text-[10px] font-bold uppercase transition-colors duration-200 text-center leading-tight
                    ${isActive ? "text-black dark:text-white" : "text-zinc-400 dark:text-zinc-500"}
                  `}
                >
                  {m.period}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative flex items-center gap-3 md:gap-4">

          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous milestone"
            className={`
              shrink-0 p-3 rounded-2xl neo-border-sm neo-shadow-sm font-bold transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple
              ${current === 0
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed opacity-50"
                : "bg-white dark:bg-dark-card text-black dark:text-white hover:bg-neon-purple hover:text-white neo-interactive cursor-pointer"
              }
            `}
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={SLIDE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white dark:bg-dark-card p-6 md:p-8 rounded-2xl neo-border neo-shadow w-full"
              >

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b-2 border-dashed border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-start gap-4">

                    <div
                      className={`shrink-0 p-3 rounded-xl neo-border-sm neo-shadow-sm ${milestone.color}`}
                    >
                      {milestone.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-zinc-400 uppercase">
                          {current + 1} / {milestones.length}
                        </span>
                      </div>
                      <h3 className="font-display font-black text-xl md:text-2xl text-black dark:text-white uppercase leading-tight tracking-tight">
                        {milestone.role}
                      </h3>
                      <span className="font-display font-bold text-sm text-zinc-500 uppercase mt-1 inline-block">
                        @{milestone.company}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cream dark:bg-zinc-800 text-black dark:text-white font-mono text-xs font-bold neo-border-sm rounded-lg shrink-0 w-fit">
                    <Calendar size={14} />
                    <span>{milestone.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 font-sans text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium">
                  {milestone.description.map((bullet, bIdx) => (
                    <motion.li
                      key={bIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + bIdx * 0.07 }}
                      className="flex items-start gap-2"
                    >
                      <ChevronRight
                        size={18}
                        className="text-electric dark:text-pink-accent shrink-0 mt-0.5"
                      />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            disabled={current === milestones.length - 1}
            aria-label="Next milestone"
            className={`
              shrink-0 p-3 rounded-2xl neo-border-sm neo-shadow-sm font-bold transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple
              ${current === milestones.length - 1
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed opacity-50"
                : "bg-white dark:bg-dark-card text-black dark:text-white hover:bg-neon-purple hover:text-white neo-interactive cursor-pointer"
              }
            `}
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex justify-center gap-2.5 mt-8">
          {milestones.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Jump to milestone ${idx + 1}`}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple rounded-full"
            >
              <motion.span
                animate={{
                  width: idx === current ? 28 : 10,
                  backgroundColor:
                    idx === current
                      ? "#a855f7" 
                      : idx < current
                      ? "#84cc16" 
                      : "rgba(161,161,170,0.5)", 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="block h-2.5 rounded-full cursor-pointer"
                style={{ display: "block" }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
