"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { User, Terminal, Cpu, GraduationCap, ArrowRight, Code, Sparkles } from "lucide-react";
import { stats } from "@/constants/about";
import { heroSocials } from "@/constants/hero";
import { LaravelIcon, NextjsIcon } from "./brand-icons";
import CurvedLoop from "./curved-loop";

export default function AboutSection() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="about"
      className="relative flex flex-col justify-center pt-28 pb-24 px-4 md:px-8 bg-cream dark:bg-zinc-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Background Blobs from Hero Section */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-lime-green/20 dark:bg-lime-green/10 blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-electric/15 dark:bg-electric/10 blur-3xl animate-blob [animation-delay:4s]" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-accent/15 dark:bg-pink-accent/5 blur-3xl animate-blob [animation-delay:8s]" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-24">
        
        {/* --- PART 1: FORMER HERO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900 text-black dark:text-white neo-border-sm neo-shadow-sm rounded-lg font-mono text-sm font-bold"
            >
              <Sparkles
                size={16}
                className="text-orange-accent animate-spin-slow"
              />
              <span>CREATIVE DEVELOPER PORTFOLIO</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display font-black text-5xl md:text-7xl leading-[1.05] tracking-tight text-black dark:text-white"
            >
              SHAPING <br />
              <span className="inline-block px-3 py-1 bg-lime-green text-black neo-border neo-shadow my-1 transform -rotate-1">
                DIGITAL
              </span>{" "}
              CRAFT
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-xl text-lg md:text-xl font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans"
            >
              Hi, I&apos;m{" "}
              <span className="font-extrabold text-black dark:text-white underline decoration-electric decoration-3">
                Nadhif A.W
              </span>
              , a Junior Frontend Developer focused on crafting modern, highly interactive, and visually stunning web interfaces. I dedicate myself to turning design concepts into pixel-perfect, responsive digital experiences with smooth animations and clean code.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3"
            >
              {heroSocials.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 bg-white dark:bg-zinc-900 text-black dark:text-white neo-border neo-shadow-sm neo-interactive rounded-xl cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              <button
                onClick={() => handleScrollTo("projects")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-electric text-white font-display font-extrabold text-lg neo-border neo-shadow neo-interactive rounded-xl cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight size={20} strokeWidth={2.5} />
              </button>

              <button
                onClick={() => handleScrollTo("contact")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-zinc-900 text-black dark:text-white font-display font-extrabold text-lg neo-border neo-shadow neo-interactive rounded-xl cursor-pointer"
              >
                <span>Let&apos;s Collab</span>
                <Terminal
                  size={20}
                  strokeWidth={2.5}
                  className="text-lime-green"
                />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: 0.4,
            }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-pink-accent rounded-3xl neo-border transform translate-x-4 translate-y-4" />
              <div className="absolute inset-0 bg-orange-accent rounded-3xl neo-border transform -rotate-3 translate-x-1 translate-y-2" />
              <div className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-3xl neo-border neo-shadow-lg overflow-hidden flex items-center justify-center group cursor-pointer">
                <Image
                  src="/home-perfil.jpg"
                  alt="Nadhif A.W Profile Avatar"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-pink-accent text-white font-display text-xs font-bold neo-border-sm neo-shadow-sm rounded-xl flex items-center gap-1.5 pointer-events-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-green"></span>
                  </span>
                  <span>AVAILABLE FOR HIRE</span>
                </div>
              </div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -left-6 px-4 py-2 bg-lime-green text-black font-display font-extrabold text-sm neo-border neo-shadow-sm rounded-xl flex items-center gap-2 z-10"
              >
                <NextjsIcon size={16} strokeWidth={2.5} />
                <span>Frontend Developer</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [3, -3, 3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -right-6 px-4 py-2 bg-white dark:bg-zinc-900 text-black dark:text-white font-display font-extrabold text-sm neo-border neo-shadow-sm rounded-xl flex items-center gap-2 z-10"
              >
                <Sparkles
                  size={16}
                  strokeWidth={2.5}
                  className="text-neon-purple"
                />
                <span>Junior Developer</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* --- PART 2: ORIGINAL ABOUT SECTION CONTENT --- */}

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

      <div className="mt-16 md:mt-6 -mx-4 md:-mx-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)]">
        <CurvedLoop
          marqueeText="JUNIOR DEVELOPER ✦ UI DESIGNER ✦ OPEN TO WORK ✦"
          speed={2}
          curveAmount={250}
          direction="left"
          interactive={true}
          className="curved-loop-fill"
        />
      </div>
    </section>
  );
}
