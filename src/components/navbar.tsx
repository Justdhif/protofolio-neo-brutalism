"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/constants/navbar";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrollingFromClickRef = useRef(false);

  // Monitor scroll for styling navbar and tracking active sections
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // If we are currently scrolling from a click, ignore scroll active section updates
      if (isScrollingFromClickRef.current) return;

      // Check if we are at the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Find which section is active based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const link of navLinks) {
        const id = link.href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      isScrollingFromClickRef.current = true;
      setActiveSection(id);
      element.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        isScrollingFromClickRef.current = false;
      }, 1200);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-6 bg-transparent`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Brand Name */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#home");
          }}
          className="flex items-center gap-2 px-3 py-1.5 bg-lime-green text-white font-display font-extrabold text-xl md:text-2xl neo-border neo-shadow neo-interactive cursor-pointer rounded-lg"
        >
          <Terminal size={22} strokeWidth={2.5} />
          <span>JUSTDHIF.DEV</span>
        </a>

        {/* Desktop Navigation Pill */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 bg-cream/80 dark:bg-dark-card/85 glass-effect neo-border neo-shadow rounded-full backdrop-blur-md">
          {navLinks
            .filter((link) => link.href !== "#contact")
            .map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`relative px-4 py-2 font-display text-sm font-bold rounded-full transition-all duration-200 focus:outline-none ${
                    isActive
                      ? "text-white"
                      : "text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-electric rounded-full"
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </a>
              );
            })}
        </nav>

        {/* Action Controls (Theme and Mobile Toggle) */}
        <div className="flex items-center gap-3">
          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Light/Dark Theme"
            className="p-2.5 bg-white dark:bg-zinc-900 text-black dark:text-white neo-border neo-shadow-sm neo-interactive rounded-xl cursor-pointer"
          >
            {theme === "light" ? (
              <Moon size={20} strokeWidth={2.5} />
            ) : (
              <Sun size={20} strokeWidth={2.5} />
            )}
          </button>

          {/* Contact Button (Desktop / Tablet) */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#contact");
            }}
            className={`hidden md:flex items-center justify-center px-4 py-2 font-display text-sm font-extrabold neo-border neo-shadow-sm neo-interactive rounded-xl cursor-pointer transition-colors duration-200 ${
              activeSection === "contact"
                ? "bg-electric text-white border-black"
                : "bg-white dark:bg-zinc-900 text-black dark:text-white border-black"
            }`}
          >
            CONTACT
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="md:hidden p-2.5 bg-electric text-white neo-border neo-shadow-sm neo-interactive rounded-xl cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X size={20} strokeWidth={2.5} />
            ) : (
              <Menu size={20} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-24 left-4 right-4 p-6 bg-cream dark:bg-zinc-950 neo-border neo-shadow-lg rounded-2xl z-40"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, idx) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl neo-border-sm font-display font-extrabold text-lg transition-all ${
                      isActive
                        ? "bg-lime-green text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-0.5 translate-y-0.5"
                        : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs bg-black text-white px-2 py-0.5 rounded-md font-mono">
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}

              <div className="mt-4 p-4 bg-orange-accent text-white rounded-xl neo-border flex items-center justify-between">
                <span className="font-display font-extrabold text-sm">
                  HIRE ME NOW
                </span>
                <span className="text-xs bg-black text-lime-green py-1 px-2.5 rounded font-mono font-bold animate-pulse">
                  ACTIVE
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
