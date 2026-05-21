"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/constants/skills";

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  const getStrokeColorClass = (score: number) => {
    if (score >= 10) return "stroke-lime-green"; // Full/Perfect Mastery
    if (score === 9) return "stroke-electric"; // Expert execution
    if (score === 8) return "stroke-pink-accent"; // Advanced competency
    return "stroke-orange-accent"; // Strong proficiency
  };

  return (
    <section
      id="skills"
      className="py-24 px-4 md:px-8 bg-cream dark:bg-zinc-950 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-end mb-16 text-right">
          <div className="px-3 py-1 bg-orange-accent text-white font-mono text-xs font-bold neo-border-sm neo-shadow-sm rounded-md mb-4">
            MY POWERHOUSE
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight text-black dark:text-white uppercase leading-none">
            TECHNICAL & Visual <br />
            <span className="inline-block px-3 py-1 bg-lime-green text-black neo-border neo-shadow my-2 transform -rotate-1">
              ABILITIES
            </span>
          </h2>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="p-6 md:p-8 bg-white dark:bg-dark-card neo-border neo-shadow rounded-2xl flex flex-col justify-between"
            >
              {/* Category Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Icon frame */}
                    <div
                      className={`p-3 rounded-xl neo-border-sm neo-shadow-sm ${category.colorClass}`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-black text-2xl text-black dark:text-white uppercase leading-none tracking-tight">
                        {category.title}
                      </h3>
                      <span className="text-xs text-zinc-400 font-mono">
                        0{idx + 1} // SECTION
                      </span>
                    </div>
                  </div>
                </div>

                <p className="font-sans font-medium text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                  {category.description}
                </p>
              </div>

              {/* Skills Tag Cloud */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="pl-3 pr-2 py-2 bg-cream dark:bg-zinc-900/60 rounded-xl neo-border-sm neo-interactive cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="shrink-0">{skill.icon}</div>
                      <span className="font-display font-bold text-sm text-black dark:text-white">
                        {skill.name}
                      </span>
                    </div>

                    {/* Neo-Brutalist Circular Progress Indicator */}
                    <div className="relative flex items-center justify-center w-10 h-10 select-none">
                      <svg
                        width="40"
                        height="40"
                        className="transform -rotate-90"
                      >
                        {/* Background Track Circle */}
                        <circle
                          cx="20"
                          cy="20"
                          r="14"
                          className="stroke-zinc-200 dark:stroke-zinc-800"
                          strokeWidth="3.5"
                          fill="transparent"
                        />
                        {/* Active Progress Circle */}
                        <circle
                          cx="20"
                          cy="20"
                          r="14"
                          className={`${getStrokeColorClass(skill.score)} transition-all duration-1000 ease-out`}
                          strokeWidth="3.5"
                          fill="transparent"
                          strokeDasharray={88}
                          strokeDashoffset={88 - (skill.score / 10) * 88}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Centered Score Label */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-[9px] font-black text-black dark:text-white transform translate-y-[0.5px]">
                          {skill.score}/10
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
