"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Sparkles, Loader2, CodeXml, TerminalSquare } from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "What is your best project?",
  "Tell me about your tech stack.",
  "What backend technologies do you use?",
];

type Message = { id: string; role: "user" | "assistant"; content: string };

export default function AiSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "assistant",
      content: "SYSTEM ONLINE. Welcome to Nadhif's AI Nexus. How can I assist you today? ✨",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const appendMessage = async (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
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
      let assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "" };
      
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false); // streaming started

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          assistantMsg.content += chunk;
          setMessages((prev) => [
            ...prev.slice(0, -1),
            { ...assistantMsg }
          ]);
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
      document.getElementById("ai-assistant")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        appendMessage(e.detail.question);
      }, 500);
    };

    window.addEventListener("open-ai-assistant", handleOpenAI as EventListener);
    return () => {
      window.removeEventListener("open-ai-assistant", handleOpenAI as EventListener);
    };
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const value = input;
    setInput("");
    appendMessage(value);
  };

  return (
    <section
      id="ai-assistant"
      className="py-28 px-4 md:px-8 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Tech Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[32px_32px]" />
      
      {/* Glowing Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header - Neo Brutalism Style */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 text-lime-600 dark:text-lime-400 font-mono text-xs font-bold neo-border-sm shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#a3e635] rounded-md mb-6 transition-colors">
            <TerminalSquare size={14} className="animate-pulse" />
            <span>AI NEXUS SYSTEM</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight text-black dark:text-white uppercase leading-none transition-colors">
            Interactive <br />
            <span className="inline-block px-4 py-2 bg-electric text-white neo-border shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#a3e635] my-2 transform -rotate-2 hover:rotate-0 transition-all duration-300">
              INTELLIGENCE
            </span>
          </h2>
          <p className="font-sans font-medium text-zinc-600 dark:text-zinc-400 mt-6 max-w-2xl text-lg transition-colors">
            Experience my dedicated AI assistant. Ask about my architecture choices, tech stack, or creative process. The system is live and ready.
          </p>
        </div>

        {/* AI Chat Interface - Luxury Tech Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
          className="w-full h-[650px] bg-white/70 dark:bg-zinc-900/60 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden rounded-[2rem] relative transition-colors duration-300"
        >
          {/* Chat Header */}
          <div className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md border-b border-black/5 dark:border-white/5 p-5 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Bot size={24} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-black dark:text-white font-bold tracking-wide text-lg transition-colors">Nadhif AI</span>
                <span className="text-blue-600 dark:text-blue-400 text-xs font-medium flex items-center gap-1.5 transition-colors">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  System Online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
              <CodeXml size={22} />
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 scroll-smooth custom-scrollbar">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] md:max-w-[75%] p-4 md:p-5 text-sm md:text-base whitespace-pre-wrap font-medium shadow-sm transition-colors ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm"
                      : "bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 rounded-2xl rounded-tl-sm border border-black/5 dark:border-white/5"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-5 py-4 bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/5 text-black dark:text-zinc-300 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3 font-medium transition-colors">
                  <Loader2 size={18} className="animate-spin text-blue-500" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    Processing intelligence...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 2 && (
            <div className="p-4 md:px-8 bg-black/5 dark:bg-white/5 backdrop-blur-md border-t border-black/5 dark:border-white/5 flex overflow-x-auto gap-3 no-scrollbar shrink-0 transition-colors">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => appendMessage(q)}
                  className="whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm hover:shadow-md"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-t border-black/10 dark:border-white/10 shrink-0 transition-colors">
            <form onSubmit={handleSubmit} className="flex gap-3 relative max-w-4xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-6 py-4 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-inner"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transition-all"
              >
                <Send size={20} className="ml-1" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
