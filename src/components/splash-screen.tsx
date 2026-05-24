"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    // Animate progress to 100% over 2.2 seconds
    let startTime = performance.now();
    let frameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressValue = Math.min((elapsed / 2200) * 100, 100);
      setProgress(progressValue);
      if (progressValue < 100) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };
    frameId = requestAnimationFrame(updateProgress);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            borderBottom: "8px solid var(--border-color)",
          }}
        >
          {/* Animated Background Elements */}
          <div
            className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, var(--border-color) 0%, transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center">
            {/* Neo-Brutalism Decorative Blocks */}
            <motion.div
              initial={{ scale: 0, x: -100, rotate: -45 }}
              animate={{ scale: 1, x: 0, rotate: -12 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                type: "spring",
                bounce: 0.5,
              }}
              className="absolute -top-12 -left-16 w-24 h-24 bg-pink-accent border-4 border-dark-bg z-0 shadow-[4px_4px_0px_0px_#09090b]"
            />
            <motion.div
              initial={{ scale: 0, x: 100, rotate: 45 }}
              animate={{ scale: 1, x: 0, rotate: 12 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                type: "spring",
                bounce: 0.5,
              }}
              className="absolute -bottom-12 -right-16 w-32 h-32 bg-electric border-4 border-dark-bg z-0 shadow-[4px_4px_0px_0px_#09090b]"
            />

            {/* Main Content Box */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              className="relative z-10 p-8 neo-shadow-lg"
              style={{
                backgroundColor: "var(--background)",
                border: "4px solid var(--border-color)",
              }}
            >
              <h1
                className="text-5xl md:text-8xl font-black tracking-tighter uppercase font-display"
                style={{ color: "var(--foreground)" }}
              >
                Nadhif<span style={{ color: "#a3e635" }}>.</span>AW
              </h1>
              <div className="absolute -top-4 -right-4 bg-[#facc15] text-dark-bg border-2 border-dark-bg font-bold px-2 py-1 transform rotate-12 text-sm shadow-[2px_2px_0px_0px_#09090b]">
                PORTFOLIO
              </div>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full max-w-xs mt-12 z-10 h-6 relative overflow-hidden"
              style={{
                backgroundColor: "var(--background)",
                border: "4px solid var(--border-color)",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
                className="absolute top-0 left-0 h-full bg-lime-green"
                style={{ borderRight: "4px solid var(--border-color)" }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 font-bold text-sm md:text-lg uppercase tracking-widest opacity-70 z-10"
              style={{ color: "var(--foreground)" }}
            >
              Initializing Experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
