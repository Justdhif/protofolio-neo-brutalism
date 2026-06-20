"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import { milestones } from "@/constants/timeline";

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section
      id="experience"
      className="py-24 px-4 md:px-8 bg-cream dark:bg-zinc-950 transition-colors duration-300 overflow-hidden relative"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-start mb-16">
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

        <div ref={ref} className="relative pb-20">
          {milestones.map((item, index) => (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-32 md:gap-10"
            >
              <div className="sticky z-10 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
                <div className="absolute flex items-center justify-center w-12 h-12 rounded-full left-8 -translate-x-1/2 bg-white dark:bg-zinc-900 neo-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color} border-2 border-black`}>
                    {item.icon}
                  </div>
                </div>
                
                <div className="flex-col hidden gap-3 md:flex md:pl-24">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-800 text-black dark:text-white font-mono text-xs font-bold neo-border-sm rounded-lg w-fit shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                    <Calendar size={14} />
                    <span>{item.period}</span>
                  </div>
                  <h3 className="font-display font-black text-3xl md:text-4xl text-black dark:text-white uppercase leading-none tracking-tight">
                    {item.role}
                  </h3>
                  <h3 className="font-display font-bold text-lg text-zinc-500 uppercase">
                    @{item.company}
                  </h3>
                </div>
              </div>

              <div className="relative w-full pl-20 md:pl-4">
                <div className="block mb-6 md:hidden">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-800 text-black dark:text-white font-mono text-xs font-bold neo-border-sm rounded-lg w-fit shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] mb-3">
                    <Calendar size={14} />
                    <span>{item.period}</span>
                  </div>
                  <h3 className="font-display font-black text-2xl text-black dark:text-white uppercase leading-none tracking-tight mb-1">
                    {item.role}
                  </h3>
                  <h3 className="font-display font-bold text-base text-zinc-500 uppercase">
                    @{item.company}
                  </h3>
                </div>

                <div className="bg-white dark:bg-dark-card p-6 md:p-8 rounded-2xl neo-border neo-shadow-sm transition-transform hover:-translate-y-1 duration-300">
                  <ul className="space-y-4 font-sans text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium">
                    {item.description.map((content, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ChevronRight
                          size={20}
                          className="text-electric dark:text-lime-green shrink-0 mt-0.5"
                          strokeWidth={3}
                        />
                        <span className="leading-relaxed">{content}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          <div
            style={{
              height: height + "px",
            }}
            className="absolute left-8 top-0 overflow-hidden w-2 -translate-x-1/2 bg-zinc-200 dark:bg-zinc-800 border-x border-black dark:border-white rounded-full"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-full bg-electric dark:bg-lime-green border-b-2 border-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
