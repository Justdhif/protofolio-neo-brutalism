"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Send,
  Loader2,
  CodeXml,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = { id: string; role: "user" | "assistant"; content: string };

export default function AiSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "assistant",
      content:
        "SYSTEM ONLINE. Welcome to Nadhif's AI Nexus. How can I assist you today? ✨",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const appendMessage = async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false); // streaming started

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          assistantMsg.content += chunk;
          setMessages((prev) => [...prev.slice(0, -1), { ...assistantMsg }]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch chat", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleOpenAI = (e: CustomEvent<{ question: string }>) => {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        appendMessage(e.detail.question);
      }, 500);
    };

    window.addEventListener("open-ai-assistant", handleOpenAI as EventListener);
    return () => {
      window.removeEventListener(
        "open-ai-assistant",
        handleOpenAI as EventListener,
      );
    };
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const value = input;
    setInput("");
    appendMessage(value);
  };

  const handleQuickPrompt = (prompt: string) => {
    if (isLoading) return;
    appendMessage(prompt);
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 px-4 md:px-8 bg-cream dark:bg-zinc-950 overflow-hidden"
    >
      {/* Tech Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Neo Brutalism Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-lime-green/20 dark:bg-lime-green/10 blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-electric/15 dark:bg-electric/10 blur-3xl animate-blob [animation-delay:4s]" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-accent/15 dark:bg-pink-accent/5 blur-3xl animate-blob [animation-delay:8s]" />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center relative z-10 gap-12">
        {/* Top: Centered Hero Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-6 w-full"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 text-black dark:text-white neo-border-sm neo-shadow-sm rounded-lg font-mono text-sm font-bold"
          >
            <TerminalSquare size={16} className="text-electric animate-pulse" />
            <span>AI NEXUS SYSTEM</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-5xl md:text-7xl lg:text-[5rem] leading-[1.05] tracking-tight text-black dark:text-white uppercase"
          >
            WELCOME TO MY <br />
            <span className="inline-block px-4 py-1 bg-electric text-white neo-border neo-shadow my-2 transform -rotate-2">
              INTERACTIVE
            </span>{" "}
            PORTFOLIO
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg md:text-xl font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans"
          >
            Explore my digital presence powered by cutting-edge AI technology.
            My dedicated assistant is fully trained on my{" "}
            <span className="font-extrabold text-black dark:text-white underline decoration-lime-green decoration-3 mx-1">
              tech stack, architecture choices,
            </span>{" "}
            and creative processes. Engage directly to uncover more.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-4 w-full"
          >
            <button
              onClick={() => handleScrollTo("skills")}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-zinc-900 text-black dark:text-white font-display font-extrabold text-sm md:text-base neo-border neo-shadow-sm neo-interactive rounded-xl cursor-pointer"
            >
              <Sparkles
                size={20}
                className="text-orange-accent"
                strokeWidth={2.5}
              />
              <span>Explore My Skills</span>
            </button>

            <button
              onClick={() => handleScrollTo("projects")}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-zinc-900 text-black dark:text-white font-display font-extrabold text-sm md:text-base neo-border neo-shadow-sm neo-interactive rounded-xl cursor-pointer"
            >
              <CodeXml
                size={20}
                className="text-pink-accent"
                strokeWidth={2.5}
              />
              <span>View My Projects</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom: Centered Chat Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 20,
            delay: 0.4,
          }}
          className="w-full h-137.5 bg-white dark:bg-zinc-900 neo-border neo-shadow-lg flex flex-col overflow-hidden rounded-2xl relative"
        >
          {/* Chat Header */}
          <div className="bg-cream dark:bg-zinc-950 border-b-2 border-black dark:border-white p-4 md:p-5 flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-electric flex items-center justify-center neo-border-sm relative">
                <Bot size={24} className="text-white relative z-10" />
                <div className="absolute inset-0 bg-white/20 blur-sm rounded-xl animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-black dark:text-white font-bold tracking-wide text-lg font-display uppercase leading-tight">
                  Nadhif AI
                </span>
                <span className="text-lime-green dark:text-lime-400 text-xs font-mono font-bold flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-lime-green rounded-full animate-ping absolute" />
                  <span className="w-2 h-2 bg-lime-green rounded-full relative" />
                  SYSTEM ONLINE
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-black dark:text-white">
              <span className="text-xs font-mono font-bold bg-pink-accent text-white px-3 py-1.5 rounded-md neo-border-sm">
                V1.0
              </span>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-5 scroll-smooth custom-scrollbar bg-white dark:bg-zinc-900 relative">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-4 text-sm md:text-base font-medium neo-shadow-sm overflow-hidden ${
                    m.role === "user"
                      ? "bg-electric text-white neo-border rounded-xl rounded-tr-sm"
                      : "bg-cream dark:bg-zinc-800 text-black dark:text-zinc-100 neo-border rounded-xl rounded-tl-sm"
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p
                          className="mb-2 last:mb-0 leading-relaxed"
                          {...props}
                        />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-extrabold" {...props} />
                      ),
                      em: ({ node, ...props }) => (
                        <em className="italic" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc ml-5 mb-2 space-y-1"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal ml-5 mb-2 space-y-1"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="pl-1" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          className="underline decoration-2 underline-offset-2"
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        />
                      ),
                      code: ({ node, className, children, ...props }) => {
                        const isInline =
                          !className || !className.includes("language-");
                        return isInline ? (
                          <code
                            className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-sm"
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <div className="overflow-x-auto bg-zinc-900 text-zinc-100 p-3 rounded-lg my-2 neo-border-sm text-sm font-mono whitespace-pre">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </div>
                        );
                      },
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="px-5 py-4 bg-cream dark:bg-zinc-800 neo-border text-black dark:text-zinc-300 rounded-xl rounded-tl-sm neo-shadow-sm flex items-center gap-3 font-medium">
                  <Loader2 size={18} className="animate-spin text-electric" />
                  <span className="font-mono text-sm font-bold">
                    PROCESSING...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-cream dark:bg-zinc-950 border-t-2 border-black dark:border-white shrink-0 z-10">
            <form
              onSubmit={handleSubmit}
              className="flex gap-3 relative w-full"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your query..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-zinc-900 text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none neo-shadow-sm font-medium"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl flex items-center justify-center bg-lime-green text-black neo-border neo-shadow-sm neo-interactive disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send size={20} strokeWidth={2.5} className="ml-1" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
