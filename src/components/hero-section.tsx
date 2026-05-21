"use client";

import Image from "next/image";
import { ArrowRight, Code, Terminal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { heroSocials } from "@/constants/hero";
import { LaravelIcon, NextjsIcon } from "./brand-icons";
import CurvedLoop from "./curved-loop";

export default function HeroSection() {
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
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-24 px-4 md:px-8 bg-cream dark:bg-zinc-950 overflow-hidden"
    >

      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-lime-green/20 dark:bg-lime-green/10 blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-electric/15 dark:bg-electric/10 blur-3xl animate-blob [animation-delay:4s]" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-accent/15 dark:bg-pink-accent/5 blur-3xl animate-blob [animation-delay:8s]" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
          animate={{ opacity: 1, scale: 1 }}
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
              className="absolute -top-6 -left-6 px-4 py-2 bg-lime-green text-black font-display font-extrabold text-sm neo-border neo-shadow-sm rounded-xl flex items-center gap-2"
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
              className="absolute -bottom-6 -right-6 px-4 py-2 bg-white dark:bg-zinc-900 text-black dark:text-white font-display font-extrabold text-sm neo-border neo-shadow-sm rounded-xl flex items-center gap-2"
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

      <div className="mt-6 -mx-4 md:-mx-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)]">
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
