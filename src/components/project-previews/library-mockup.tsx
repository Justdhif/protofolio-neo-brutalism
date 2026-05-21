"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function LibraryMockup() {
  const [syncTime, setSyncTime] = useState<string>("");
  const [syncing, setSyncing] = useState(false);
  const [selectedBookIdx, setSelectedBookIdx] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSyncTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1200);
  };

  const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      status: "Active - 4 Days Left",
      badgeColor: "bg-lime-green text-black border-lime-green",
      coverColor: "bg-orange-accent text-white",
      coverGraphic: (
        <div className="relative w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-green animate-ping absolute" />
          <span className="w-1.5 h-1.5 rounded-full bg-lime-green" />
        </div>
      ),
      progress: 75,
      pages: "240/320 pp",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      status: "Active - 9 Days Left",
      badgeColor: "bg-electric text-white border-electric",
      coverColor: "bg-electric text-white",
      coverGraphic: (
        <div className="font-mono text-[10px] bg-black/20 px-1.5 py-0.5 rounded border border-white/15 font-bold">
          {"{ ... }"}
        </div>
      ),
      progress: 40,
      pages: "185/462 pp",
    },
    {
      title: "Zero to One",
      author: "Peter Thiel",
      status: "Returned Clean",
      badgeColor:
        "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700",
      coverColor: "bg-pink-accent text-white",
      coverGraphic: (
        <div className="font-display font-black text-sm tracking-tighter bg-black/15 px-2 py-0.5 rounded">
          0→1
        </div>
      ),
      progress: 100,
      pages: "210/210 pp",
    },
  ];

  return (
    <div className="space-y-3.5 h-full flex flex-col justify-between select-none">
      <div>
        {/* Header bar */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-lime-green" />
            <span className="text-[10px] font-display font-black uppercase tracking-wider text-zinc-850 dark:text-zinc-100">
              Bookera Shelf Monitor
            </span>
          </div>
          <button
            onClick={triggerSync}
            className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-250 dark:border-zinc-700 rounded transition-colors cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-green opacity-75 ${syncing ? "bg-pink-accent" : ""}`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 bg-lime-green ${syncing ? "bg-pink-accent" : ""}`}
              ></span>
            </span>
            <span className="text-[8px] text-zinc-550 dark:text-zinc-400 font-mono font-bold">
              {syncing ? "SYNCING..." : "LIVE SYNC"}
            </span>
          </button>
        </div>

        {/* Dynamic 3D Book Cards Shelf Row */}
        <div className="relative py-4 px-2 bg-zinc-950/5 dark:bg-zinc-950/20 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 flex justify-center gap-4 h-[120px] items-end mb-3.5">
          {books.map((book, idx) => {
            const isSelected = selectedBookIdx === idx;
            return (
              <motion.div
                key={idx}
                onClick={() => setSelectedBookIdx(idx)}
                whileHover={{
                  y: -6,
                  rotate: idx === 0 ? -1 : idx === 2 ? 1 : 0,
                }}
                animate={{
                  y: isSelected ? -4 : 0,
                  scale: isSelected ? 1.05 : 0.95,
                  boxShadow: isSelected
                    ? "4px 4px 0px 0px rgba(0,0,0,1)"
                    : "1.5px 1.5px 0px 0px rgba(0,0,0,0.6)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className={`relative w-[65px] h-[90px] rounded-lg border-2 border-black ${book.coverColor} flex flex-col justify-between p-2 cursor-pointer transition-shadow`}
              >
                {/* 3D Spine highlight line on book edge */}
                <div className="absolute top-0 left-0.5 w-[2.5px] h-full bg-white/20 rounded-l" />

                {/* Cover graphic */}
                <div className="flex justify-end">{book.coverGraphic}</div>

                {/* Minimalist Title */}
                <div className="flex flex-col">
                  <span className="text-[7px] font-display font-black tracking-tight leading-none truncate uppercase">
                    {book.title}
                  </span>
                  <span className="text-[5px] font-mono opacity-80 truncate uppercase mt-0.5">
                    {book.author}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Realistic Brutalist Shelf Line */}
          <div className="absolute bottom-2 left-4 right-4 h-1.5 bg-black dark:bg-zinc-800 rounded-full" />
        </div>

        {/* Dynamic Book Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBookIdx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-800/80"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div>
                <h4 className="text-xs font-display font-black text-zinc-900 dark:text-white uppercase leading-none">
                  {books[selectedBookIdx].title}
                </h4>
                <p className="text-[8px] text-zinc-400 font-mono mt-0.5">
                  BY {books[selectedBookIdx].author.toUpperCase()}
                </p>
              </div>
              <span
                className={`text-[8px] font-mono font-black px-2 py-0.5 rounded border border-black/10 leading-none ${books[selectedBookIdx].badgeColor}`}
              >
                {books[selectedBookIdx].status}
              </span>
            </div>

            {/* Reading progress tracker bar */}
            <div>
              <div className="flex justify-between text-[7px] font-mono text-zinc-450 dark:text-zinc-400 mb-1 font-bold">
                <span>READING PROGRESS</span>
                <span>
                  {books[selectedBookIdx].progress}% (
                  {books[selectedBookIdx].pages})
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden border border-black/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${books[selectedBookIdx].progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`h-full ${
                    selectedBookIdx === 0
                      ? "bg-orange-accent"
                      : selectedBookIdx === 1
                        ? "bg-electric"
                        : "bg-lime-green"
                  }`}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[8px] font-mono text-zinc-450 dark:text-zinc-550 pt-2.5 border-t border-zinc-150 dark:border-zinc-800">
        <span>SHELF MONITOR GATEWAY</span>
        <span className={`${syncing ? "animate-pulse text-pink-accent" : ""}`}>
          SYNC: {syncTime}
        </span>
      </div>
    </div>
  );
}
