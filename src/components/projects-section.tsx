"use client";

import { motion } from "framer-motion";
import { ExternalLink, RefreshCw, Sparkles, Eye } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { projects } from "@/constants/projects";
import LibraryMockup from "@/components/project-previews/library-mockup";
import LendingMockup from "@/components/project-previews/lending-mockup";
import AiMockup from "@/components/project-previews/ai-mockup";
import FinanceMockup from "@/components/project-previews/finance-mockup";
import ShooterMockup from "@/components/project-previews/shooter-mockup";

export default function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 70, damping: 15 },
    },
  };

  return (
    <section
      id="projects"
      className="py-28 px-4 md:px-8 bg-white dark:bg-zinc-900 transition-colors duration-300 overflow-hidden relative"
    >

      <div className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.025] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex flex-col items-start mb-20">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-electric text-white font-mono text-xs font-bold neo-border-sm neo-shadow-sm rounded-md mb-5">
            <Sparkles size={13} className="animate-pulse text-lime-green" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight text-black dark:text-white uppercase leading-none">
            Selected Premium <br />
            <span className="inline-block px-4 py-2 bg-pink-accent text-white neo-border neo-shadow my-2 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              PRODUCTIONS
            </span>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-24"
        >
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >

                <div className={`lg:col-span-6 relative group ${isEven ? "lg:order-1" : "lg:order-2"}`}>

                  <div
                    className={`absolute -inset-2 rounded-3xl blur-2xl opacity-15 dark:opacity-20 pointer-events-none ${
                      project.id === 1
                        ? "bg-lime-green"
                        : project.id === 2
                          ? "bg-pink-accent"
                          : project.id === 3
                            ? "bg-electric"
                            : project.id === 4
                              ? "bg-orange-accent"
                              : "bg-pink-accent"
                    }`}
                  />

                  <motion.div
                    className="relative h-90 md:h-105 w-full neo-border neo-shadow-lg rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden flex flex-col"
                  >

                    <div className="h-10 bg-zinc-150 dark:bg-zinc-900 border-b-2 border-black flex items-center justify-between px-4 shrink-0 transition-colors">

                      <div className="flex items-center gap-2 group/lights">
                        <span className="w-3 h-3 rounded-full bg-pink-accent border border-black/10 flex items-center justify-center text-[7px] text-transparent hover:text-black/60 font-black cursor-default select-none transition-colors">×</span>
                        <span className="w-3 h-3 rounded-full bg-lime-green border border-black/10 flex items-center justify-center text-[7px] text-transparent hover:text-black/60 font-black cursor-default select-none transition-colors">−</span>
                        <span className="w-3 h-3 rounded-full bg-electric border border-black/10 flex items-center justify-center text-[7px] text-transparent hover:text-black/60 font-black cursor-default select-none transition-colors">+</span>
                      </div>

                      <div className="px-4 py-1 bg-zinc-50 dark:bg-zinc-950 text-[10px] text-zinc-550 dark:text-zinc-400 font-mono rounded border border-zinc-250 dark:border-zinc-800 w-3/5 text-center truncate select-none shadow-inner flex items-center justify-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-lime-green animate-pulse" />
                        <span>https://{project.title.toLowerCase().replace(/\s+/g, "")}.nadhif.dev</span>
                      </div>

                      <div className="w-10 flex justify-end text-zinc-400 dark:text-zinc-500">
                        <RefreshCw size={11} className="hover:text-black dark:hover:text-white cursor-pointer hover:rotate-180 transition-transform duration-500" />
                      </div>
                    </div>

                    <div className="p-6 flex-1 bg-white dark:bg-zinc-900 flex flex-col justify-center text-zinc-900 dark:text-white relative overflow-hidden transition-colors duration-350">

                      <div
                        className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.065]"
                        style={{
                          backgroundImage: "radial-gradient(circle, var(--border-color) 1.5px, transparent 1.5px)",
                          backgroundSize: "16px 16px",
                        }}
                      />

                      {project.mockupType === "library" && <LibraryMockup />}
                      {project.mockupType === "lending" && <LendingMockup />}
                      {project.mockupType === "ai" && <AiMockup />}
                      {project.mockupType === "finance" && <FinanceMockup />}
                      {project.mockupType === "shooter" && <ShooterMockup />}
                    </div>
                  </motion.div>
                </div>

                <div
                  className={`lg:col-span-6 flex flex-col items-start gap-4 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-zinc-450 dark:text-zinc-500">
                      0{index + 1} {"//"}
                    </span>
                    <span className="font-mono text-xs font-black uppercase text-pink-accent tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl md:text-4xl text-black dark:text-white uppercase leading-none tracking-tight transition-all duration-300 hover:text-electric dark:hover:text-lime-green">
                    {project.title}
                  </h3>

                  <div className="w-16 h-1 bg-black dark:bg-white rounded" />

                  <p className="font-sans font-medium text-zinc-650 dark:text-zinc-400 text-base md:text-lg leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 font-mono text-xs font-extrabold rounded-md neo-border-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_var(--border-color)] hover:-translate-y-0.5 hover:shadow-[3.5px_3.5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3.5px_3.5px_0px_0px_var(--border-color)] transition-all duration-200 select-none group/badge cursor-default"
                      >

                        <span
                          className={`w-2 h-2 rounded-full ${
                            project.id === 1
                              ? "bg-lime-green"
                              : project.id === 2
                                ? "bg-pink-accent"
                                : project.id === 3
                                  ? "bg-electric"
                                  : project.id === 4
                                    ? "bg-orange-accent"
                                    : "bg-pink-accent"
                          } group-hover/badge:scale-125 transition-transform duration-200`}
                        />
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-5 w-full sm:w-auto">
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 bg-lime-green text-black font-display font-extrabold text-sm neo-border neo-shadow-sm neo-interactive rounded-xl cursor-pointer w-full sm:w-auto"
                    >
                      <span>Preview</span>
                      <ExternalLink size={16} strokeWidth={2.5} />
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white dark:bg-zinc-900 text-black dark:text-white font-display font-extrabold text-sm neo-border neo-shadow-sm neo-interactive rounded-xl cursor-pointer w-full sm:w-auto"
                    >
                      <GithubIcon size={16} />
                      <span>Codebase</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
