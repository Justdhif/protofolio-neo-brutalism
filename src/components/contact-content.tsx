"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Terminal, Mail, Download } from "lucide-react";
import { socialLinks } from "@/constants/contact";
import { addGuestbookMessage } from "@/app/actions/guestbook";

export default function ContactContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadComplete(true);
      
      setTimeout(() => {
        setDownloadComplete(false);
      }, 3000);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    if (email) formData.append("email", email);
    formData.append("message", message);
    
    await addGuestbookMessage(formData);

    setIsSubmitting(false);
    setIsSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  const maxLength = 300;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-electric text-white font-display text-xs font-bold neo-border-sm rounded-lg w-fit">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-green"></span>
                </span>
                <span>AVAILABLE FOR PROJECTS</span>
              </div>

              <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight text-black dark:text-white uppercase leading-none">
                LET&apos;S WORK <br />
                <span className="inline-block px-3 py-1 bg-lime-green text-black neo-border neo-shadow my-2 transform -rotate-1">
                  TOGETHER
                </span>
              </h2>
            </div>

            <p className="font-sans font-medium text-zinc-700 dark:text-zinc-300 text-base md:text-lg leading-relaxed">
              Have an elite project idea, a permanent engineering opening, or just want to chat? Leave a note in the guestbook!
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-dark-card rounded-xl neo-border neo-shadow-sm flex items-center gap-3">
                <div className="p-2.5 bg-pink-accent text-white rounded-lg neo-border-sm">
                  <Mail size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-mono block">
                    DIRECT EMAIL
                  </span>
                  <a
                    href="mailto:nadhif@example.com"
                    className="font-display font-bold text-sm md:text-base text-black dark:text-white hover:underline"
                  >
                    nadhif@example.com
                  </a>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-dark-card rounded-xl neo-border neo-shadow-sm flex items-center gap-4">
                <div className="p-2.5 bg-electric text-white rounded-lg neo-border-sm">
                  <Terminal size={18} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-zinc-400 font-mono block">
                    STAY TUNED
                  </span>
                  <div className="flex items-center gap-3.5 mt-1">
                    {socialLinks.map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href="/cv-nadhif.pdf"
                download
                onClick={handleDownload}
                className={`p-4 bg-white dark:bg-dark-card rounded-xl neo-border neo-shadow flex items-center gap-3 cursor-pointer group transition-all duration-300 ${
                  isDownloading || downloadComplete ? "scale-[0.98]" : "neo-interactive"
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg neo-border-sm transition-all duration-300 flex items-center justify-center ${
                    downloadComplete
                      ? "bg-electric text-white"
                      : "bg-lime-green text-black group-hover:scale-105"
                  }`}
                >
                  {isDownloading ? (
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      <Download size={18} strokeWidth={2.5} />
                    </motion.div>
                  ) : downloadComplete ? (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <CheckCircle2 size={18} strokeWidth={2.5} />
                    </motion.div>
                  ) : (
                    <Download size={18} strokeWidth={2.5} />
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-zinc-400 font-mono block">
                    CURRICULUM VITAE
                  </span>
                  <span className="font-display font-bold text-sm md:text-base text-black dark:text-white group-hover:text-electric dark:group-hover:text-lime-green transition-colors">
                    {isDownloading
                      ? "Downloading..."
                      : downloadComplete
                        ? "Download Complete!"
                        : "Download Resume / CV"}
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 bg-white dark:bg-dark-card rounded-2xl neo-border neo-shadow-lg relative overflow-hidden h-full flex flex-col">

              <div className="flex items-center justify-between pb-4 border-b-2 border-black dark:border-zinc-800 mb-6">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-accent" />
                  <span className="w-2.5 h-2.5 rounded-full bg-lime-green" />
                  <span className="w-2.5 h-2.5 rounded-full bg-electric" />
                </div>
                <span className="font-mono text-xs text-zinc-400 font-bold">
                  guestbook_form.tsx
                </span>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="guestbook-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="name-input"
                        className="font-display font-black text-sm uppercase text-black dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Johnson"
                        className="w-full p-3.5 bg-cream dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 rounded-xl font-sans font-medium text-black dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-white focus:ring-0 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email-input"
                        className="font-display font-black text-sm uppercase text-black dark:text-white flex items-center justify-between"
                      >
                        <span>Your Email</span>
                        <span className="text-zinc-400 text-xs">(Optional, kept private)</span>
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. alex@example.com"
                        className="w-full p-3.5 bg-cream dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 rounded-xl font-sans font-medium text-black dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-white focus:ring-0 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="message-input"
                        className="font-display font-black text-sm uppercase text-black dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message-input"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => {
                          if (e.target.value.length <= maxLength) {
                            setMessage(e.target.value);
                          }
                        }}
                        placeholder="Leave a public note in the guestbook!"
                        className="w-full p-3.5 bg-cream dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 rounded-xl font-sans font-medium text-black dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-white focus:ring-0 transition-colors resize-none"
                      />
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">Max {maxLength} chars</span>
                        <span className={`text-xs font-bold ${message.length === maxLength ? 'text-pink-accent' : 'text-zinc-400 dark:text-zinc-500'}`}>
                          {message.length} / {maxLength}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-lime-green text-black font-display font-extrabold text-lg neo-border neo-shadow neo-interactive rounded-xl cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Signing Book...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign Guestbook</span>
                          <Send size={18} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    className="flex flex-col items-center justify-center text-center flex-grow"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  >
                    <div className="p-4 bg-lime-green text-black rounded-2xl neo-border neo-shadow-sm mb-6">
                      <CheckCircle2 size={48} strokeWidth={2} />
                    </div>

                    <h3 className="font-display font-black text-3xl text-black dark:text-white uppercase mb-2">
                      SIGNED SUCCESSFULLY
                    </h3>

                    <p className="font-sans font-medium text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-sm mb-8 leading-relaxed">
                      Thank you! Your message has been pinned to the board below.
                    </p>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2.5 bg-white dark:bg-zinc-900 text-black dark:text-white font-display font-extrabold text-xs md:text-sm neo-border neo-shadow-sm neo-interactive rounded-xl cursor-pointer"
                    >
                      Write Another Note
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
  );
}
