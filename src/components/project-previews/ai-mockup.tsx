"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AiMockup() {
  const [chatPhase, setChatPhase] = useState(0); 
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const userPrompt = "How to write a standard dynamic bounce?";
  const aiResponse = "Import framer-motion and set:\n• stiffness: 120\n• damping: 14\nThis produces high elastic energy!";

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (chatPhase === 0) {
      let charIndex = 0;
      const type = () => {
        if (charIndex < userPrompt.length) {
          setUserText(userPrompt.substring(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(type, 65);
        } else {
          timeout = setTimeout(() => setChatPhase(1), 800);
        }
      };

      const resetTimeout = setTimeout(() => {
        setUserText("");
        setAiText("");
      }, 0);

      timeout = setTimeout(type, 1000);

      return () => {
        clearTimeout(resetTimeout);
        clearTimeout(timeout);
      };
    } else if (chatPhase === 1) {

      timeout = setTimeout(() => {
        setChatPhase(2);
      }, 1800);
    } else if (chatPhase === 2) {
      let charIndex = 0;
      const type = () => {
        if (charIndex < aiResponse.length) {
          setAiText(aiResponse.substring(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(type, 35);
        } else {
          timeout = setTimeout(() => setChatPhase(3), 5000);
        }
      };
      type();
    } else if (chatPhase === 3) {

      timeout = setTimeout(() => {
        setChatPhase(0);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [chatPhase]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [userText, aiText, chatPhase]);

  return (
    <div className="flex flex-col h-full justify-between select-none">

      <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-electric animate-pulse shadow-[0_0_8px_rgba(45,92,246,0.6)]" />
          <span className="text-xs font-display font-black uppercase text-zinc-850 dark:text-zinc-100">
            CognitiveAI Playground
          </span>
        </div>
        <span className="text-[8px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-bold">
          Groq LLaMA 3 
        </span>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 py-3.5 space-y-3.5 overflow-y-auto no-scrollbar flex flex-col justify-end min-h-[160px]"
      >

        {userText && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 justify-end"
          >
            <div className="max-w-[85%] bg-electric text-white p-3 rounded-2xl rounded-tr-none text-[10px] font-medium font-sans shadow-md border border-black/5 leading-relaxed">
              {userText}
              {chatPhase === 0 && (
                <span className="inline-block w-1.5 h-3 bg-white ml-1 animate-pulse" />
              )}
            </div>
            <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] border border-zinc-300 dark:border-zinc-700 shrink-0 font-bold">
              👤
            </div>
          </motion.div>
        )}

        {chatPhase === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-pink-accent text-white flex items-center justify-center text-[9px] font-black border border-black/10 shrink-0 font-mono">
              AI
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-2xl rounded-tl-none border border-zinc-200 dark:border-zinc-800 flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-300 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-300 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-300 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </motion.div>
        )}

        {aiText && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-pink-accent text-white flex items-center justify-center text-[9px] font-black border border-black/10 shrink-0 font-mono">
              AI
            </div>
            <div className="max-w-[85%] bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 p-3 rounded-2xl rounded-tl-none text-[10px] font-mono text-zinc-800 dark:text-zinc-200 shadow-sm leading-relaxed whitespace-pre-line relative overflow-hidden">
              {aiText}
              {chatPhase === 2 && (
                <span className="inline-block w-1.5 h-3 bg-zinc-900 dark:bg-white ml-1 animate-pulse" />
              )}
            </div>
          </motion.div>
        )}
      </div>

      <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
        <div className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2 text-[9px] text-zinc-400 font-sans flex items-center justify-between">
          <span>{chatPhase === 0 ? "Prompting..." : "Send a dynamic query..."}</span>
          <span className="text-[8px] font-mono bg-zinc-200 dark:bg-zinc-800 px-1 rounded text-zinc-500 font-bold">
            ⌘↵
          </span>
        </div>
        <div className="px-3.5 py-2 bg-electric text-white rounded-xl text-[9px] font-black flex items-center justify-center neo-border-sm cursor-default">
          Send
        </div>
      </div>
    </div>
  );
}
