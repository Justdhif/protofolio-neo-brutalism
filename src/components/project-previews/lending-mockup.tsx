"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronRight,
  User,
  ChevronDown,
  Users,
  Package,
  Clock,
  ClipboardCheck,
  CheckCircle2,
  Clock3,
  Box,
  Laptop,
  Bell,
} from "lucide-react";

const INITIAL_PEMINJAMAN = [
  {
    id: "p1",
    item: "Epson EB-X51 Projector",
    status: "Pending",
    user: "Budi Santoso (Grade 12)",
  },
  {
    id: "p2",
    item: "Wireless Microphone",
    status: "Borrowed",
    user: "Student Council",
  },
];

const INITIAL_LOG = [
  {
    id: "l1",
    initial: "A",
    bg: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    user: "Admin Sarpras",
    time: "5 sec ago",
    desc: "User login: Admin Sarpras",
  },
  {
    id: "l2",
    initial: "A",
    bg: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    user: "Admin Sarpras",
    time: "2 mins ago",
    desc: "Added new items",
  },
];

const DUMMY_NEW_DATA = [
  {
    peminjaman: {
      item: "Canon DSLR Camera",
      status: "Pending",
      user: "Student (Grade 11)",
      time: "Just now",
    },
    log: "Requested a Camera",
    userInitial: "U",
    userBg: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    peminjaman: {
      item: "Active Polytron Speaker",
      status: "Pending",
      user: "Art Teacher",
      time: "Just now",
    },
    log: "Requested a Speaker",
    userInitial: "T",
    userBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    peminjaman: {
      item: "10m Extension Cord",
      status: "Pending",
      user: "Student (Grade 12)",
      time: "Just now",
    },
    log: "Requested an Extension Cord",
    userInitial: "U",
    userBg: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
];

export default function LendingMockup() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [peminjamanList, setPeminjamanList] = useState(INITIAL_PEMINJAMAN);
  const [logList, setLogList] = useState(INITIAL_LOG);
  const [stats, setStats] = useState({
    peminjaman: 18,
  });

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    let masterInterval: NodeJS.Timeout;

    const runMasterCycle = () => {
      const scheduleCycle = (cycleIndex: number) => {
        const baseTime = cycleIndex * 10000;

        // 1. Scroll Down
        timeouts.push(setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
          }
        }, baseTime + 2000));

        // 2. Scroll Up
        timeouts.push(setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, baseTime + 5000));

        // 3. Inject Data
        timeouts.push(setTimeout(() => {
          const newData = DUMMY_NEW_DATA[cycleIndex];
          
          setPeminjamanList((prev) => [
            {
              id: `new-p-${cycleIndex}-${Date.now()}`,
              item: newData.peminjaman.item,
              status: newData.peminjaman.status,
              user: newData.peminjaman.user,
            },
            ...prev,
          ]);

          setLogList((prev) => [
            {
              id: `new-l-${cycleIndex}-${Date.now()}`,
              initial: newData.userInitial,
              bg: newData.userBg,
              user: newData.peminjaman.user,
              time: "Just now",
              desc: newData.log,
            },
            ...prev,
          ]);

          setStats((prev) => ({
            ...prev,
            peminjaman: prev.peminjaman + 1,
          }));

          setToast(`New Borrowing: ${newData.peminjaman.item}`);
          
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, baseTime + 10000));
      };

      // Schedule 3 cycles
      scheduleCycle(0); // Data 1 at 10s
      scheduleCycle(1); // Data 2 at 20s
      scheduleCycle(2); // Data 3 at 30s

      // 4. Smooth Reset back to initial state at 38s
      timeouts.push(setTimeout(() => {
        setPeminjamanList(INITIAL_PEMINJAMAN);
        setLogList(INITIAL_LOG);
        setStats({ peminjaman: 18 });
      }, 38000));
    };

    // Run immediately, then repeat every 40s
    runMasterCycle();
    masterInterval = setInterval(() => {
      runMasterCycle();
    }, 40000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(masterInterval);
    };
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="space-y-3 h-full flex flex-col text-zinc-800 dark:text-zinc-100 select-none overflow-hidden relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2 max-w-[90%] w-max"
          >
            <div className="w-4 h-4 rounded-full bg-lime-green/20 text-lime-green flex items-center justify-center">
              <Bell size={8} className="animate-bounce" />
            </div>
            <span className="text-[9px] font-bold tracking-wide truncate">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2 flex-shrink-0">
        <div className="flex items-center gap-1 text-[9px] text-zinc-500 font-medium">
          <Home size={10} className="text-zinc-600 dark:text-zinc-400" />
          <span>Dashboard</span>
          <ChevronRight size={10} />
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-bold">
          <div className="w-5 h-5 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full flex items-center justify-center">
            <User size={10} />
          </div>
          <span>Admin Sarpras</span>
          <ChevronDown size={10} className="text-zinc-400" />
        </div>
      </div>

      {/* Header */}
      <div className="flex-shrink-0">
        <h3 className="text-base font-display font-black tracking-tight">Dashboard Admin</h3>
        <p className="text-[9px] text-zinc-500">Overview of system statistics and recent activities</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3 flex-1 overflow-hidden"
      >
        {/* 4 Stat Cards */}
        <div className="grid grid-cols-4 gap-2 flex-shrink-0">
          <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700/60 p-2.5 flex flex-col gap-1.5 neo-shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[8px] text-zinc-500 font-semibold">Total Users</span>
              <Users size={12} className="text-blue-500" />
            </div>
            <span className="text-xl font-black leading-none">120</span>
            <span className="text-[6.5px] text-zinc-400">10% vs previous period</span>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700/60 p-2.5 flex flex-col gap-1.5 neo-shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[8px] text-zinc-500 font-semibold">Total Items</span>
              <Package size={12} className="text-lime-green" />
            </div>
            <span className="text-xl font-black leading-none">145</span>
            <span className="text-[6.5px] text-zinc-400">5% vs previous period</span>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700/60 p-2.5 flex flex-col gap-1.5 neo-shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <span className="text-[8px] text-zinc-500 font-semibold">Borrowings</span>
              <Clock size={12} className="text-orange-500" />
            </div>
            <motion.span 
              key={stats.peminjaman}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-xl font-black leading-none relative z-10"
            >
              {stats.peminjaman}
            </motion.span>
            <span className="text-[6.5px] text-zinc-400 relative z-10">2% vs previous period</span>
            
            {/* Highlight pulse when updated */}
            <motion.div 
              key={`highlight-${stats.peminjaman}`}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-orange-500/20 rounded-lg z-0 pointer-events-none"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700/60 p-2.5 flex flex-col gap-1.5 neo-shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[8px] text-zinc-500 font-semibold">Returns</span>
              <ClipboardCheck size={12} className="text-pink-accent" />
            </div>
            <span className="text-xl font-black leading-none">43</span>
            <span className="text-[6.5px] text-zinc-400">1% vs previous period</span>
          </motion.div>
        </div>

        {/* Automated Scrollable Main Content Grid */}
        {/* We use overflow-hidden to hide the scrollbar and prevent manual scroll, but it can be scrolled programmatically via scrollRef */}
        <div ref={scrollRef} className="flex-1 overflow-hidden pointer-events-none">
          <div className="grid grid-cols-2 gap-2 items-start pb-4">
            {/* Left Col */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              {/* Log Aktivitas */}
              <div className="bg-white dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700/60 flex flex-col neo-shadow-sm">
                <div className="p-2 border-b border-zinc-200 dark:border-zinc-700/60 flex justify-between items-center">
                  <span className="text-[9px] font-bold">Recent Activity Logs</span>
                  <span className="text-[7.5px] text-blue-500 dark:text-blue-400 font-semibold">View All</span>
                </div>
                <div className="p-2 flex flex-col gap-2.5 relative overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {logList.slice(0, 3).map((log) => (
                      <motion.div 
                        key={log.id}
                        initial={{ opacity: 0, x: -10, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, x: 10, height: 0, overflow: "hidden" }}
                        className="flex gap-2.5 items-start"
                      >
                        <div className={`w-5 h-5 rounded-full flex flex-shrink-0 items-center justify-center text-[8px] font-bold ${log.bg}`}>
                          {log.initial}
                        </div>
                        <div className="flex flex-col gap-0.5 w-full">
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[9px] font-bold">{log.user}</span>
                            <span className="text-[7px] text-zinc-400">{log.time}</span>
                          </div>
                          <span className="text-[8px] text-zinc-500">{log.desc}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Unit Barang Terbaru */}
              <div className="bg-white dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700/60 flex flex-col neo-shadow-sm">
                <div className="p-2 border-b border-zinc-200 dark:border-zinc-700/60 flex justify-between items-center">
                  <span className="text-[9px] font-bold">New Item Units</span>
                  <span className="text-[7.5px] text-blue-500 dark:text-blue-400 font-semibold">View All</span>
                </div>
                <div className="p-2 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-zinc-100 dark:bg-zinc-700/50 rounded flex items-center justify-center border border-zinc-200 dark:border-zinc-600">
                      <Box size={10} className="text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold">LCD-EPS-001</span>
                      <span className="text-[7px] text-zinc-500">Epson EB-X51</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-zinc-100 dark:bg-zinc-700/50 rounded flex items-center justify-center border border-zinc-200 dark:border-zinc-600">
                      <Laptop size={10} className="text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold">LPT-ASU-005</span>
                      <span className="text-[7px] text-zinc-500">Asus Vivobook 14</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Col */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              {/* Peminjaman Terbaru */}
              <div className="bg-white dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700/60 flex flex-col neo-shadow-sm">
                <div className="p-2 border-b border-zinc-200 dark:border-zinc-700/60 flex justify-between items-center">
                  <span className="text-[9px] font-bold">Recent Borrowings</span>
                  <span className="text-[7.5px] text-blue-500 dark:text-blue-400 font-semibold">View All</span>
                </div>
                <div className="p-2 flex flex-col gap-2 overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {peminjamanList.slice(0, 3).map((item) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: 10, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, x: -10, height: 0, overflow: "hidden" }}
                        className="flex flex-col gap-1 pb-2 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] font-bold">{item.item}</span>
                          <span className={`text-[6.5px] px-1 py-0.5 rounded font-semibold flex items-center gap-0.5 ${
                            item.status === 'Pending' 
                              ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' 
                              : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}>
                            {item.status === 'Pending' && <Clock3 size={6} />} 
                            {item.status}
                          </span>
                        </div>
                        <span className="text-[7px] text-zinc-500">Borrower: {item.user}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Pengembalian Terbaru */}
              <div className="bg-white dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700/60 flex flex-col neo-shadow-sm">
                <div className="p-2 border-b border-zinc-200 dark:border-zinc-700/60 flex justify-between items-center">
                  <span className="text-[9px] font-bold">Recent Returns</span>
                  <span className="text-[7.5px] text-blue-500 dark:text-blue-400 font-semibold">View All</span>
                </div>
                <div className="p-2 flex flex-col gap-2">
                  <div className="flex flex-col gap-1 pb-2 border-b border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-bold">Sony A6000 Camera</span>
                      <span className="text-[6.5px] px-1 py-0.5 rounded bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400 font-semibold flex items-center gap-0.5">
                        <CheckCircle2 size={6} /> Completed
                      </span>
                    </div>
                    <span className="text-[7px] text-zinc-500">By: Siti Aminah</span>
                  </div>
                  <div className="flex flex-col gap-1 pb-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-bold">JBL Portable Speaker</span>
                      <span className="text-[6.5px] px-1 py-0.5 rounded bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 font-semibold">
                        Overdue
                      </span>
                    </div>
                    <span className="text-[7px] text-zinc-500">By: Andi Setiawan</span>
                  </div>
                </div>
              </div>

              {/* Daftar Barang Terbaru */}
              <div className="bg-white dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700/60 flex flex-col neo-shadow-sm">
                <div className="p-2 border-b border-zinc-200 dark:border-zinc-700/60 flex justify-between items-center">
                  <span className="text-[9px] font-bold">Recent Item List</span>
                  <span className="text-[7.5px] text-blue-500 dark:text-blue-400 font-semibold">View All</span>
                </div>
                <div className="p-2 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold">Spalding Basketball</span>
                    <span className="text-[7px] text-zinc-500">Sports</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold">5M HDMI Cable</span>
                    <span className="text-[7px] text-zinc-500">Electronics</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
