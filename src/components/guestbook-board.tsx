"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GuestbookBoard({ messages }: { messages: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  const totalPages = Math.ceil((messages?.length || 0) / itemsPerPage);
  const currentMessages = messages?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const noteColors = [
    'bg-[var(--color-lime-green)] text-black',
    'bg-[var(--color-pink-accent)] text-white',
    'bg-[var(--color-electric)] text-white',
    'bg-[var(--color-orange-accent)] text-black',
    'bg-white text-black',
    'bg-zinc-900 text-white',
  ];

  return (
    <div className="p-8 md:p-12 neo-border neo-shadow-lg bg-[#e5e5f7] dark:bg-[#1a1a1f] relative overflow-hidden min-h-[1050px] flex flex-col" 
         style={{ backgroundImage: "radial-gradient(var(--border-color) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
      
      {!messages || messages.length === 0 ? (
        // Empty State: Centered exactly in the middle of the large board
        <div className="flex-grow flex items-center justify-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            className="bg-white dark:bg-zinc-900 p-8 neo-border neo-shadow transform -rotate-2 max-w-lg text-center"
          >
            <h4 className="font-display font-black text-2xl md:text-3xl uppercase mb-4 text-black dark:text-white">
              It's completely empty! 🏜️
            </h4>
            <p className="font-sans font-bold text-zinc-600 dark:text-zinc-400 text-lg">
              Be the first person to leave a mark on this board. Sign the guestbook above!
            </p>
          </motion.div>
        </div>
      ) : (
        // Active State
        <div className="flex-grow flex flex-col justify-between relative z-10">
          {/* 3x3 Grid Layout with Animation */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`page-${currentPage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {currentMessages.map((msg, i) => {
                 const colorClass = noteColors[i % noteColors.length];
                 const rotations = ['rotate-2', '-rotate-2', 'rotate-1', '-rotate-1', 'rotate-3', '-rotate-3'];
                 const rotateClass = rotations[i % rotations.length];
                 
                 return (
                  <div 
                    key={`${msg.id}-${i}`} 
                    className={`p-6 neo-border neo-shadow-sm ${colorClass} ${rotateClass} hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-300 cursor-default flex flex-col h-[280px]`}
                  >
                    <div className="flex justify-between items-start mb-4 border-b-[3px] border-current pb-2 opacity-90 gap-2">
                      <span className="font-black text-xl truncate">{msg.name}</span>
                      <span className="text-xs font-mono font-bold px-2 py-1 neo-border-sm border-current whitespace-nowrap flex-shrink-0">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="font-bold text-base leading-relaxed line-clamp-6 flex-grow">{msg.message}</p>
                  </div>
                 )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-12">
              <button 
                onClick={handlePrev} 
                disabled={currentPage === 1}
                className="px-6 py-3 bg-[var(--color-cream)] dark:bg-zinc-900 text-black dark:text-white font-black uppercase text-sm md:text-base neo-border neo-shadow-sm neo-interactive disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Prev Page
              </button>
              
              <span className="font-black text-lg px-4 py-2 bg-black text-white dark:bg-white dark:text-black neo-border-sm transform rotate-2">
                {currentPage} / {totalPages}
              </span>
              
              <button 
                onClick={handleNext} 
                disabled={currentPage === totalPages}
                className="px-6 py-3 bg-[var(--color-cream)] dark:bg-zinc-900 text-black dark:text-white font-black uppercase text-sm md:text-base neo-border neo-shadow-sm neo-interactive disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next Page
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
