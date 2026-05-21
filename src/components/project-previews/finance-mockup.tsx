"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, RefreshCw, BarChart2 } from "lucide-react";

export default function FinanceMockup() {
  const [balance, setBalance] = useState(12840.5);
  const [chartPoints, setChartPoints] = useState([20, 38, 18, 48, 28, 58, 42, 60]);
  const [updating, setUpdating] = useState(false);

  const width = 180;
  const height = 65;

  useEffect(() => {
    const interval = setInterval(() => {

      const scale = (Math.random() - 0.48) * 35;
      setBalance((prev) => +(prev + scale).toFixed(2));

      setChartPoints((prev) => {
        const next = [...prev.slice(1)];
        next.push(Math.floor(Math.random() * 45) + 15);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerUpdate = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      setChartPoints([
        Math.floor(Math.random() * 30) + 10,
        Math.floor(Math.random() * 30) + 15,
        Math.floor(Math.random() * 40) + 20,
        Math.floor(Math.random() * 40) + 25,
        Math.floor(Math.random() * 50) + 20,
        Math.floor(Math.random() * 50) + 30,
        Math.floor(Math.random() * 60) + 35,
        Math.floor(Math.random() * 50) + 40,
      ]);
    }, 1000);
  };

  const generatePath = (points: number[]) => {
    const step = width / (points.length - 1);
    return points.reduce((acc, point, index) => {
      const x = index * step;
      const y = height - point;
      return index === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, "");
  };

  const generateAreaPath = (points: number[]) => {
    const linePath = generatePath(points);
    return `${linePath} L ${width} ${height} L 0 ${height} Z`;
  };

  const svgPath = generatePath(chartPoints);
  const svgAreaPath = generateAreaPath(chartPoints);

  const categories = [
    { name: "Rent", value: 45, color: "bg-electric" },
    { name: "Tech", value: 30, color: "bg-orange-accent" },
    { name: "Food", value: 15, color: "bg-lime-green" },
  ];

  return (
    <div className="space-y-3.5 h-full flex flex-col justify-between select-none">
      <div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Wallet size={16} className="text-orange-accent animate-pulse" />
            <span className="text-[10px] font-display font-black uppercase tracking-wider text-zinc-850 dark:text-zinc-100">
              Apex Wealth Dashboard
            </span>
          </div>
          <button
            onClick={triggerUpdate}
            className="flex items-center gap-1 px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-850 dark:hover:bg-zinc-750 border border-zinc-250 dark:border-zinc-750 rounded transition-all cursor-pointer"
          >
            <RefreshCw size={9} className={`text-zinc-500 ${updating ? "animate-spin text-orange-accent" : ""}`} />
            <span className="text-[8px] text-zinc-550 dark:text-zinc-400 font-mono font-bold">
              {updating ? "RECALCULATING..." : "REFRESH"}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-3 mb-3">

          <div className="col-span-7 bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between hover:scale-[1.01] transition-transform">
            <div>
              <span className="text-[7px] text-zinc-400 font-mono block tracking-wider font-extrabold uppercase">
                PORTFOLIO VALUATION
              </span>
              <motion.span
                key={balance}
                initial={{ opacity: 0.7, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-base font-display font-black text-zinc-855 dark:text-white block mt-0.5 tracking-tight leading-none"
              >
                ${balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </motion.span>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="inline-flex items-center gap-0.5 text-[7px] font-mono font-black text-lime-green px-1 bg-lime-green/15 border border-lime-green/20 rounded">
                ▲ +14.8% YoY
              </span>
              <span className="text-[7px] text-zinc-400 font-mono font-bold">STABLE ASSETS</span>
            </div>
          </div>

          <div className="col-span-5 flex flex-col gap-2">
            <div className="p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:border-lime-green transition-colors cursor-pointer group">
              <div>
                <span className="text-[7px] text-zinc-400 font-mono font-bold block">SAVINGS RATIO</span>
                <span className="text-[10px] font-display font-black text-lime-green block leading-none mt-0.5">85%</span>
              </div>
              <TrendingUp size={12} className="text-lime-green group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between hover:border-pink-accent transition-colors cursor-pointer group">
              <div>
                <span className="text-[7px] text-zinc-400 font-mono font-bold block">RISK FACTOR</span>
                <span className="text-[10px] font-display font-black text-pink-accent block leading-none mt-0.5">LOW</span>
              </div>
              <BarChart2 size={12} className="text-pink-accent group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">

          <div className="col-span-7 relative bg-zinc-950/5 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-2 overflow-hidden h-24.5 flex flex-col justify-between">
            <div className="text-[7px] font-mono text-zinc-450 dark:text-zinc-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-accent animate-ping" />
              <span>REAL-TIME STREAMING ANALYTICS</span>
            </div>
            <svg
              className="w-full h-14 overflow-visible mt-2"
              viewBox={`0 0 ${width} ${height}`}
            >

              <line x1="0" y1="15" x2={width} y2="15" stroke="rgba(0,0,0,0.04)" strokeDasharray="3,3" />
              <line x1="0" y1="35" x2={width} y2="35" stroke="rgba(0,0,0,0.04)" strokeDasharray="3,3" />
              <line x1="0" y1="55" x2={width} y2="55" stroke="rgba(0,0,0,0.04)" strokeDasharray="3,3" />

              <motion.path
                d={svgAreaPath}
                fill="url(#apex-orange-gradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.18 }}
                transition={{ duration: 0.5 }}
              />

              <motion.path
                d={svgPath}
                fill="none"
                stroke="#f97316"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="apex-orange-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="col-span-5 bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-24.5">
            <div>
              <span className="text-[7px] text-zinc-400 dark:text-zinc-400 font-mono font-bold block uppercase tracking-wider">
                Asset Allocation
              </span>
              <div className="space-y-1.5 mt-2">
                {categories.map((cat, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex justify-between text-[6px] font-mono font-bold text-zinc-500">
                      <span>{cat.name.toUpperCase()}</span>
                      <span>{cat.value}%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.value}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`h-full ${cat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[8px] font-mono text-zinc-450 dark:text-zinc-550 pt-2.5 border-t border-zinc-150 dark:border-zinc-800">
        <span>SECURITY: 256-BIT SSL</span>
        <span>ANALYTICS: ONLINE</span>
      </div>
    </div>
  );
}
