"use client";

import { motion } from "framer-motion";
import { User, Terminal, Cpu, GraduationCap } from "lucide-react";
import { stats } from "@/constants/about";

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="about"
      className="py-24 px-4 md:px-8 bg-white dark:bg-zinc-900 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col items-start mb-16">
          <div className="px-3 py-1 bg-neon-purple text-white font-mono text-xs font-bold neo-border-sm neo-shadow-sm rounded-md mb-4">
            WHO IS NADHIF?
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight text-black dark:text-white uppercase leading-none">
            ENGINEERING meets <br />
            <span className="inline-block px-3 py-1 bg-pink-accent text-white neo-border neo-shadow my-2 transform rotate-1">
              CREATIVE
            </span>{" "}
            CRAFT
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >

          <motion.div
            variants={itemVariants}
            className="md:col-span-8 p-8 bg-cream dark:bg-dark-card neo-border neo-shadow rounded-2xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-lime-green text-black rounded-lg neo-border-sm">
                  <User size={20} strokeWidth={2.5} />
                </div>
                <h3 className="font-display font-black text-2xl text-black dark:text-white uppercase">
                  My Mission & Philosophy
                </h3>
              </div>
              <div className="space-y-4 font-sans text-base md:text-lg text-zinc-700 dark:text-zinc-300 font-medium">
                <p>
                  I am a passionate software engineer based in Indonesia,
                  focused on engineering top-tier digital products that
                  don&apos;t just work, but leave a lasting impression. I bridge
                  the gap between technical complexity and premium visual
                  aesthetics.
                </p>
                <p>
                  My engineering philosophy is rooted in high fidelity:
                  butter-smooth page transitions, accessible and semantically
                  correct interfaces, bulletproof responsive layouts, and highly
                  maintainable modern clean code. I treat every project as a
                  work of interactive digital art.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {[
                "User Experience",
                "Product Engineering",
                "Clean Architecture",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-bold neo-border-sm rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-4 p-6 bg-white dark:bg-zinc-950 text-black dark:text-white neo-border neo-shadow rounded-2xl flex flex-col justify-between"
          >
            <div>

              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-pink-accent" />
                  <span className="w-3 h-3 rounded-full bg-lime-green" />
                  <span className="w-3 h-3 rounded-full bg-electric" />
                </div>
                <span className="font-mono text-xs text-zinc-500 font-bold">
                  bash - nadhif.sh
                </span>
              </div>

              <div className="font-mono text-sm space-y-3.5 text-zinc-650 dark:text-zinc-300">
                <div className="flex gap-2">
                  <span className="text-lime-green font-bold">$</span>
                  <span>location = &quot;Indonesia&quot;</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-lime-green font-bold">$</span>
                  <span>role = &quot;Junior Web Developer&quot;</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-lime-green font-bold">$</span>
                  <span>specialty = &quot;React / Animation / DX&quot;</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-lime-green font-bold">$</span>
                  <span>coffee = &quot;Double Shot Espresso&quot;</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-lime-green font-bold">$</span>
                  <span>focus = &quot;Pixel Perfection&quot;</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-500 flex items-center justify-between">
              <span>STATUS: HANGING OUT IN THE FUTURE</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-green"></span>
              </span>
            </div>
          </motion.div>

          <div className="md:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 bg-cream dark:bg-dark-card neo-border neo-shadow neo-interactive rounded-xl flex flex-col items-center justify-center text-center cursor-pointer group"
              >

                <span
                  className={`px-4 py-1.5 font-display font-black text-4xl md:text-5xl neo-border neo-shadow-sm rounded-xl mb-4 ${stat.color} transform group-hover:-rotate-3 transition-transform duration-300`}
                >
                  {stat.value}
                </span>

                <span className="font-display font-black text-lg md:text-xl text-black dark:text-white uppercase leading-none tracking-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-6 p-6 bg-lime-green text-black neo-border neo-shadow rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white text-black rounded-lg neo-border-sm">
                <Cpu size={20} strokeWidth={2.5} />
              </div>
              <h3 className="font-display font-black text-xl uppercase">
                UX-Driven Core Principles
              </h3>
            </div>
            <p className="font-sans font-medium text-sm md:text-base leading-relaxed text-zinc-900">
              Technology should elevate usability. I build applications with
              high emphasis on page speeds, seamless gestures, screen-reader
              compatibility (a11y), and smart layouts that guide user actions
              naturally.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-6 p-6 bg-pink-accent text-white neo-border neo-shadow rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-black text-white rounded-lg neo-border-sm">
                <GraduationCap size={20} strokeWidth={2.5} />
              </div>
              <h3 className="font-display font-black text-xl uppercase">
                Academic & Self-taught Fusion
              </h3>
            </div>
            <p className="font-sans font-medium text-sm md:text-base leading-relaxed text-pink-50">
              Holding a solid computer science backing, paired with an obsessive
              self-taught design drive, allows me to integrate core algorithmic
              thinking directly into visual front-end layouts. I craft beautiful
              UI/UX that scales correctly.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
