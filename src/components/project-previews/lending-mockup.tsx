"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";

export default function LendingMockup() {
  const [lendingItems, setLendingItems] = useState([
    {
      name: "Sony A7S III",
      type: "CAMERA",
      status: "Reserved",
      statusColor: "bg-pink-accent text-white border-pink-accent",
      glowing: "shadow-[0_0_8px_rgba(244,63,94,0.2)]",
      illustration: (
        <div className="relative w-8 h-6 bg-zinc-800 dark:bg-zinc-700 rounded-md flex items-center justify-center border border-black/10 shrink-0 shadow-inner">

          <div className="w-4 h-4 rounded-full bg-zinc-950 border border-zinc-650 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
          </div>

          <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-pink-accent animate-ping" />
          <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-pink-accent" />
        </div>
      ),
    },
    {
      name: "DJI Mavic 3 Pro",
      type: "DRONE",
      status: "Available",
      statusColor: "bg-lime-green text-black border-lime-green",
      glowing: "shadow-[0_0_8px_rgba(163,230,53,0.2)]",
      illustration: (
        <div className="relative w-8 h-6 flex items-center justify-center shrink-0">

          <div className="absolute w-7 h-0.5 bg-zinc-800 dark:bg-zinc-650 rounded-full rotate-25" />
          <div className="absolute w-7 h-0.5 bg-zinc-800 dark:bg-zinc-650 rounded-full -rotate-25" />

          <div className="w-3 h-3.5 rounded-full bg-zinc-900 border border-zinc-600 z-10 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-lime-green" />
          </div>
        </div>
      ),
    },
    {
      name: "Keychron Q1 Pro",
      type: "KEYBOARD",
      status: "Available",
      statusColor: "bg-lime-green text-black border-lime-green",
      glowing: "shadow-[0_0_8px_rgba(163,230,53,0.2)]",
      illustration: (
        <div className="w-8 h-6 bg-zinc-800 dark:bg-zinc-700 rounded p-0.5 border border-black/10 flex flex-col justify-between shrink-0 shadow-inner">
          <div className="flex gap-0.5 justify-between">
            <div className="w-1.5 h-1 bg-pink-accent rounded-sm shrink-0" />
            <div className="w-1.5 h-1 bg-zinc-600 rounded-sm shrink-0" />
            <div className="w-1.5 h-1 bg-zinc-600 rounded-sm shrink-0" />
            <div className="w-1.5 h-1 bg-lime-green rounded-sm shrink-0" />
          </div>
          <div className="flex gap-0.5 justify-between">
            <div className="w-3 h-1 bg-zinc-600 rounded-sm shrink-0" />
            <div className="w-3 h-1 bg-zinc-600 rounded-sm shrink-0" />
          </div>
          <div className="w-full h-1 bg-zinc-900 rounded-sm shrink-0" />
        </div>
      ),
    },
    {
      name: "Rode Wireless GO",
      type: "AUDIO",
      status: "Reserved",
      statusColor: "bg-pink-accent text-white border-pink-accent",
      glowing: "shadow-[0_0_8px_rgba(244,63,94,0.2)]",
      illustration: (
        <div className="w-8 h-6 bg-zinc-900 rounded p-1 border border-zinc-700 flex flex-col justify-between items-center shrink-0">
          <div className="flex gap-0.5 w-full justify-center">
            <div className="w-0.5 h-0.5 bg-zinc-400 rounded-full" />
            <div className="w-0.5 h-0.5 bg-zinc-400 rounded-full" />
            <div className="w-0.5 h-0.5 bg-zinc-400 rounded-full" />
          </div>

          <div className="flex gap-0.5 items-end justify-center w-full">
            <span className="w-0.5 h-1 bg-pink-accent rounded-full animate-bounce [animation-delay:100ms]" />
            <span className="w-0.5 h-2 bg-pink-accent rounded-full animate-bounce [animation-delay:300ms]" />
            <span className="w-0.5 h-1.5 bg-pink-accent rounded-full animate-bounce [animation-delay:200ms]" />
          </div>
        </div>
      ),
    },
  ]);

  const [lastActivity, setLastActivity] = useState<string>("Workspace scanning complete.");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * lendingItems.length);
      setLendingItems((prev) =>
        prev.map((item, idx) => {
          if (idx === randomIndex) {
            const willBeAvailable = item.status === "Reserved";
            const newStatus = willBeAvailable ? "Available" : "Reserved";

            const isAvailable = newStatus === "Available";
            const updatedIllustration = isAvailable ? (
              idx === 0 ? (
                <div className="relative w-8 h-6 bg-zinc-800 dark:bg-zinc-700 rounded-md flex items-center justify-center border border-black/10 shrink-0 shadow-inner">
                  <div className="w-4 h-4 rounded-full bg-zinc-950 border border-zinc-650 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-green animate-pulse" />
                  </div>
                </div>
              ) : idx === 1 ? (
                <div className="relative w-8 h-6 flex items-center justify-center shrink-0">
                  <div className="absolute w-7 h-0.5 bg-zinc-800 dark:bg-zinc-650 rounded-full rotate-25" />
                  <div className="absolute w-7 h-0.5 bg-zinc-800 dark:bg-zinc-650 rounded-full -rotate-25" />
                  <div className="w-3 h-3.5 rounded-full bg-zinc-900 border border-zinc-600 z-10 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-lime-green animate-ping absolute" />
                    <div className="w-1 h-1 rounded-full bg-lime-green" />
                  </div>
                </div>
              ) : idx === 2 ? (
                <div className="w-8 h-6 bg-zinc-800 dark:bg-zinc-700 rounded p-0.5 border border-black/10 flex flex-col justify-between shrink-0 shadow-inner">
                  <div className="flex gap-0.5 justify-between">
                    <div className="w-1.5 h-1 bg-lime-green rounded-sm shrink-0" />
                    <div className="w-1.5 h-1 bg-zinc-600 rounded-sm shrink-0" />
                    <div className="w-1.5 h-1 bg-zinc-600 rounded-sm shrink-0" />
                    <div className="w-1.5 h-1 bg-lime-green rounded-sm shrink-0" />
                  </div>
                  <div className="flex gap-0.5 justify-between">
                    <div className="w-3 h-1 bg-zinc-600 rounded-sm shrink-0" />
                    <div className="w-3 h-1 bg-zinc-600 rounded-sm shrink-0" />
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-sm shrink-0" />
                </div>
              ) : (
                <div className="w-8 h-6 bg-zinc-900 rounded p-1 border border-zinc-700 flex flex-col justify-between items-center shrink-0">
                  <div className="flex gap-0.5 w-full justify-center">
                    <div className="w-0.5 h-0.5 bg-zinc-400 rounded-full" />
                    <div className="w-0.5 h-0.5 bg-zinc-400 rounded-full" />
                    <div className="w-0.5 h-0.5 bg-zinc-400 rounded-full" />
                  </div>
                  <div className="flex gap-0.5 items-end justify-center w-full">
                    <span className="w-0.5 h-1 bg-lime-green rounded-full animate-bounce [animation-delay:100ms]" />
                    <span className="w-0.5 h-2 bg-lime-green rounded-full animate-bounce [animation-delay:300ms]" />
                    <span className="w-0.5 h-1.5 bg-lime-green rounded-full animate-bounce [animation-delay:200ms]" />
                  </div>
                </div>
              )
            ) : (
              idx === 0 ? (
                <div className="relative w-8 h-6 bg-zinc-800 dark:bg-zinc-700 rounded-md flex items-center justify-center border border-black/10 shrink-0 shadow-inner">
                  <div className="w-4 h-4 rounded-full bg-zinc-950 border border-zinc-650 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-accent animate-pulse" />
                  </div>
                  <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-pink-accent animate-ping" />
                  <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-pink-accent" />
                </div>
              ) : idx === 1 ? (
                <div className="relative w-8 h-6 flex items-center justify-center shrink-0">
                  <div className="absolute w-7 h-0.5 bg-zinc-800 dark:bg-zinc-650 rounded-full rotate-25" />
                  <div className="absolute w-7 h-0.5 bg-zinc-800 dark:bg-zinc-650 rounded-full -rotate-25" />
                  <div className="w-3 h-3.5 rounded-full bg-zinc-900 border border-zinc-600 z-10 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-pink-accent" />
                  </div>
                </div>
              ) : idx === 2 ? (
                <div className="w-8 h-6 bg-zinc-800 dark:bg-zinc-700 rounded p-0.5 border border-black/10 flex flex-col justify-between shrink-0 shadow-inner">
                  <div className="flex gap-0.5 justify-between">
                    <div className="w-1.5 h-1 bg-pink-accent rounded-sm shrink-0" />
                    <div className="w-1.5 h-1 bg-zinc-600 rounded-sm shrink-0" />
                    <div className="w-1.5 h-1 bg-zinc-600 rounded-sm shrink-0" />
                    <div className="w-1.5 h-1 bg-pink-accent rounded-sm shrink-0" />
                  </div>
                  <div className="flex gap-0.5 justify-between">
                    <div className="w-3 h-1 bg-zinc-600 rounded-sm shrink-0" />
                    <div className="w-3 h-1 bg-zinc-600 rounded-sm shrink-0" />
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-sm shrink-0" />
                </div>
              ) : (
                <div className="w-8 h-6 bg-zinc-900 rounded p-1 border border-zinc-700 flex flex-col justify-between items-center shrink-0">
                  <div className="flex gap-0.5 w-full justify-center">
                    <div className="w-0.5 h-0.5 bg-zinc-400 rounded-full" />
                    <div className="w-0.5 h-0.5 bg-zinc-400 rounded-full" />
                    <div className="w-0.5 h-0.5 bg-zinc-400 rounded-full" />
                  </div>
                  <div className="flex gap-0.5 items-end justify-center w-full">
                    <span className="w-0.5 h-1 bg-pink-accent rounded-full animate-bounce [animation-delay:100ms]" />
                    <span className="w-0.5 h-2 bg-pink-accent rounded-full animate-bounce [animation-delay:300ms]" />
                    <span className="w-0.5 h-1.5 bg-pink-accent rounded-full animate-bounce [animation-delay:200ms]" />
                  </div>
                </div>
              )
            );

            const newColor = isAvailable
              ? "bg-lime-green text-black border-lime-green"
              : "bg-pink-accent text-white border-pink-accent";
            const newGlow = isAvailable
              ? "shadow-[0_0_8px_rgba(163,230,53,0.25)]"
              : "shadow-[0_0_8px_rgba(244,63,94,0.25)]";

            setLastActivity(`"${item.name}" updated to [${newStatus.toUpperCase()}]`);

            return {
              ...item,
              status: newStatus,
              statusColor: newColor,
              glowing: newGlow,
              illustration: updatedIllustration,
            };
          }
          return item;
        })
      );
    }, 4500);
    return () => clearInterval(interval);
  }, [lendingItems]);

  return (
    <div className="space-y-4 h-full flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-pink-accent animate-pulse" />
            <span className="text-xs font-display font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-100">
              EquipShare Asset Matrix
            </span>
          </div>
          <span className="text-[8px] bg-pink-accent/15 text-pink-accent border border-pink-accent/25 px-2.5 py-0.5 rounded-full font-mono font-black">
            24 ITEMS ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {lendingItems.map((item) => (
            <motion.div
              key={item.name}
              layout
              whileHover={{ y: -4, scale: 1.025 }}
              className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-700/60 flex items-center gap-3.5 h-20 cursor-pointer hover:border-black dark:hover:border-zinc-400 transition-all duration-200"
            >

              <div className="w-11 h-11 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-inner">
                {item.illustration}
              </div>

              <div className="flex-1 flex flex-col justify-between h-full py-0.5 overflow-hidden">
                <div>
                  <span className="text-[7px] text-zinc-400 font-mono font-extrabold block tracking-wider">
                    {item.type}
                  </span>
                  <span className="text-[10px] font-black text-zinc-850 dark:text-zinc-100 tracking-tight leading-none truncate block mt-0.5">
                    {item.name}
                  </span>
                </div>
                <div>
                  <motion.span
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    className={`inline-block text-[7px] font-mono font-black px-1.5 py-0.5 rounded border leading-none ${item.statusColor} ${item.glowing}`}
                  >
                    {item.status.toUpperCase()}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-150 dark:border-zinc-800 flex items-center gap-2 font-mono text-[8px]">
        <div className="w-1.5 h-1.5 rounded-full bg-pink-accent animate-ping" />
        <span className="text-zinc-400 uppercase tracking-widest font-black shrink-0">LOG:</span>
        <span className="text-zinc-550 dark:text-zinc-450 truncate w-full">
          {lastActivity}
        </span>
      </div>
    </div>
  );
}
