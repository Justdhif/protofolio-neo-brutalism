"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  { type: "cmd",  text: "SYSTEM INITIALIZED | TASK MANAGER READY" },
  { type: "info", text: "Connection established. All systems operational." },
  { type: "hint", text: "▶ Type 'help' for a command list or start typing..." },
] as const;

const ASCII_LOGO = `     ██╗██╗   ██╗███████╗████████╗██╗     ██╗███████╗████████╗   
     ██║██║   ██║██╔════╝╚══██╔══╝██║     ██║██╔════╝╚══██╔══╝   
     ██║██║   ██║███████╗   ██║   ██║     ██║███████╗   ██║      
██   ██║██║   ██║╚════██║   ██║   ██║     ██║╚════██║   ██║      
╚█████╔╝╚██████╔╝███████║   ██║   ███████╗██║███████║   ██║      
  ╚════╝  ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝`;

export default function JustlistMockup() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [clock, setClock] = useState("00:00:00");

  useEffect(() => {
    // Boot animation — staggered lines
    BOOT_LINES.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), 400 + i * 600);
    });

    // Cursor blink
    const cursorTimer = setInterval(() => setShowCursor((p) => !p), 530);

    // Live clock
    const updateClock = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateClock();
    const clockTimer = setInterval(updateClock, 1000);

    return () => {
      clearInterval(cursorTimer);
      clearInterval(clockTimer);
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between select-none relative">

      {/* ── Top HUD — matches shooter/other mockups ── */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)] animate-pulse" />
          <span className="text-[10px] font-display font-black uppercase tracking-widest text-zinc-900 dark:text-white">
            JustList
          </span>
        </div>
        <div className="flex items-center gap-3.5 font-mono text-[9px] font-bold text-zinc-500">
          <div>
            TASKS: <span className="text-zinc-800 dark:text-zinc-200 font-extrabold">0/0</span>
          </div>
          <div className="hidden sm:block">
            TIME: <span className="text-zinc-400 dark:text-zinc-600 tabular-nums">{clock}</span>
          </div>
          <div>
            STS: <span className="text-teal-400 font-extrabold">ONLINE</span>
          </div>
        </div>
      </div>

      {/* ── Terminal canvas area — same as shooter canvas ── */}
      <div className="relative flex-1 bg-[#08080e] min-h-42.5 border border-black/10 dark:border-white/5 my-2.5 rounded-xl overflow-hidden shadow-inner flex flex-col">

        {/* Gradient-shift keyframes */}
        <style>{`
          @keyframes jl-gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-4 flex flex-col overflow-hidden">

            {/* ASCII Art JUSTLIST heading */}
            <div className="shrink-0 mb-1 overflow-hidden">
              <pre
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "5px",
                  lineHeight: 1.25,
                  fontFamily: "'Courier New', Courier, monospace",
                  fontWeight: "bold",
                  whiteSpace: "pre",
                  background:
                    "linear-gradient(135deg, #00ff88 0%, #00d4aa 25%, #00b088 50%, #00ff88 75%, #00ffa5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% 200%",
                  animation: "jl-gradient-shift 3s ease infinite",
                }}
              >
                {ASCII_LOGO}
              </pre>
            </div>

            {/* Subtitle */}
            <div className="flex items-center gap-1.5 mb-3 shrink-0">
              <span className="text-[8px]">📋</span>
              <span
                className="font-mono text-[7.5px] font-bold"
                style={{ color: "#00d4aa" }}
              >
                JustList — Terminal Todo Manager v2.0
              </span>
            </div>

            {/* Boot sequence */}
            <div className="space-y-1 shrink-0">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="font-mono text-[7.5px] leading-relaxed">
                  {line.type === "cmd" && (
                    <p className="font-bold" style={{ color: "#00d4aa" }}>
                      <span style={{ color: "#00ff88" }}>$ </span>
                      {line.text}
                    </p>
                  )}
                  {line.type === "info" && (
                    <p className="pl-3" style={{ color: "#3d5055" }}>
                      {line.text}
                    </p>
                  )}
                  {line.type === "hint" && (
                    <p className="pl-4 flex items-center gap-1" style={{ color: "#2d3d3c" }}>
                      <span style={{ color: "#ffbd2e" }}>›</span>
                      {line.text}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Command prompt */}
            <div className="flex items-center gap-1.5 font-mono text-[7.5px] shrink-0">
              <span
                className="px-1 py-0.5 rounded-sm font-black text-[7px]"
                style={{ backgroundColor: "#00d4aa", color: "#08080e" }}
              >
                ▶
              </span>
              <span
                className="px-2 py-0.5 rounded-sm font-bold text-[7px] shrink-0"
                style={{ backgroundColor: "#00d4aa", color: "#08080e" }}
              >
                user@cmd-terminal
              </span>
              <span style={{ color: "#1e2e2c" }}>:</span>
              <span className="font-bold shrink-0 flex items-center gap-0.5" style={{ color: "#00d4aa" }}>
                <span>📁</span>
                <span>~/todo-list $</span>
              </span>
              {/* Blinking cursor */}
              <span
                className="inline-block ml-0.5"
                style={{
                  width: "5px",
                  height: "11px",
                  backgroundColor: "#00d4aa",
                  opacity: showCursor ? 1 : 0,
                  transition: "opacity 0.07s",
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer — matches shooter footer pattern ── */}
      <div className="flex items-center justify-between shrink-0 pt-1.5 border-t border-zinc-200 dark:border-zinc-800">
        <span className="text-[7.5px] font-mono text-zinc-450 dark:text-zinc-550 flex items-center gap-1.5 uppercase font-bold tracking-tight">
          <span>CMD ACTIVE</span>
        </span>
        <span className="text-[7.5px] font-mono text-zinc-450 dark:text-zinc-550 select-none uppercase font-bold tracking-tight">
          Version 2.0.3
        </span>
      </div>
    </div>
  );
}
