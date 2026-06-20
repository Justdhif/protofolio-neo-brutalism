"use client";

import { ArrowUp, Terminal, Code, Sparkles, MapPin, ExternalLink } from "lucide-react";
import { navLinks } from "@/constants/navbar";
import { heroSocials } from "@/constants/hero";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollTo = (href: string) => {
    const cleanId = href.replace("#", "");
    const element = document.getElementById(cleanId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-zinc-900 pt-16 pb-8 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        <div className="bg-lime-green dark:bg-lime-green/95 text-black p-8 md:p-12 neo-border neo-shadow rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl md:text-4xl uppercase tracking-tight leading-none">
              Have a premium idea? <br />
              Let&apos;s build it together.
            </h3>
            <p className="font-sans font-medium text-sm md:text-base opacity-90 max-w-lg">
              Let&apos;s create something insanely interactive, highly optimized, and visually magnificent.
            </p>
          </div>
          <button
            onClick={() => handleScrollTo("#contact")}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-black text-white font-display font-extrabold text-base neo-border-sm neo-shadow-sm neo-interactive rounded-xl cursor-pointer hover:bg-zinc-800 transition-colors"
          >
            <span>Start a Project</span>
            <ExternalLink size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12">

          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-lime-green text-black rounded-lg neo-border-sm">
                <Terminal size={18} strokeWidth={2.5} />
              </div>
              <span className="font-display font-black text-xl text-black dark:text-white uppercase leading-none tracking-tight">
                NADHIF A.W
              </span>
            </div>

            <p className="font-sans font-medium text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              Junior Frontend Developer and Creative UI Designer focused on crafting beautifully interactive, premium, and functional web applications.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cream dark:bg-zinc-800 neo-border-sm neo-shadow-sm rounded-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-green"></span>
              </span>
              <span className="font-mono text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">
                Available for contract & remote roles
              </span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-black uppercase text-pink-accent tracking-widest">
              Sitemap 
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScrollTo(link.href)}
                    className="font-display font-extrabold text-sm text-zinc-650 dark:text-zinc-350 hover:text-pink-accent dark:hover:text-pink-accent text-left transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs font-black uppercase text-electric tracking-widest">
              Connect 
            </h4>

            <div className="flex flex-wrap items-center gap-3">
              {heroSocials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 bg-white dark:bg-zinc-800 text-black dark:text-white neo-border neo-shadow-sm neo-interactive rounded-xl cursor-pointer flex items-center justify-center"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs">
              <MapPin size={14} className="text-orange-accent shrink-0" />
              <span>Jl. Radio Raya No.23, RT.01/RW.02, Cisalak, Kec. Sukmajaya, Kota Depok, Jawa Barat 16416</span>
            </div>
          </div>

        </div>

        <div className="border-t-2 border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-550 font-bold text-center md:text-left">
            CREATIVE PORTFOLIO &copy; {currentYear} NADHIF A.W. ALL RIGHTS RESERVED.
          </span>

          <button
            onClick={handleScrollToTop}
            aria-label="Scroll back to top"
            className="p-3.5 bg-pink-accent text-white rounded-xl neo-border neo-shadow-sm neo-interactive cursor-pointer flex items-center justify-center hover:bg-pink-600 transition-colors"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>

        </div>

      </div>
    </footer>
  );
}
