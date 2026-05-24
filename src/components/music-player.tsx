"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PLAYLIST = [
  {
    title: "Multo (Indo Version)",
    artist: "Nadhif AW",
    src: "/multo-indo-version.mp3"
  }
];

export default function MusicPlayer() {
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Next Track
  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  // Prev Track
  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  // Auto-play when track changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex, isPlaying]);

  // Update progress
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackEnded = () => {
    handleNext();
  };

  // Seek
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width);
      audioRef.current.currentTime = newProgress * audioRef.current.duration;
      setProgress(newProgress * 100);
    }
  };

  // Volume
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const currentTime = audioRef.current ? audioRef.current.currentTime : 0;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio 
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnded}
      />

      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.button
            key="minimized"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMinimized(false)}
            className="w-14 h-14 rounded-full bg-yellow-400 text-black border-[3px] border-black flex items-center justify-center neo-shadow hover:-translate-y-1 hover:-translate-x-1 transition-transform relative"
          >
            <Music size={24} className={isPlaying ? "animate-bounce" : ""} />
            {isPlaying && (
              <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-accent border border-black"></span>
              </span>
            )}
          </motion.button>
        ) : (
          <motion.div
            key="maximized"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            className="w-72 bg-(--background) border-4 border-black p-4 neo-shadow-lg flex flex-col gap-3"
            style={{ 
              backgroundColor: "var(--background)",
              borderColor: "var(--border-color)",
              color: "var(--foreground)"
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest bg-lime-400 text-black px-2 py-0.5 border border-black">
                NOW PLAYING
              </span>
              <button 
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black"
              >
                <X size={16} />
              </button>
            </div>

            {/* Track Info */}
            <div className="flex flex-col gap-0.5 overflow-hidden">
              <div className="relative whitespace-nowrap overflow-hidden group">
                <h4 className="font-display font-black text-lg truncate group-hover:animate-marquee">
                  {currentTrack.title}
                </h4>
              </div>
              <p className="text-xs font-mono opacity-60">
                {currentTrack.artist}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-1">
              <div 
                ref={progressBarRef}
                onClick={handleProgressClick}
                className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 border-2 border-black cursor-pointer relative overflow-hidden group"
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-pink-accent border-r-2 border-black transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono font-bold opacity-70">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrev}
                  className="w-8 h-8 flex items-center justify-center bg-white dark:bg-zinc-800 border-2 border-black active:translate-y-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  <SkipBack size={14} fill="currentColor" />
                </button>
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 flex items-center justify-center bg-lime-green text-black border-2 border-black active:translate-y-0.5 hover:bg-lime-500 neo-shadow-sm"
                >
                  {isPlaying ? (
                    <Pause size={18} fill="currentColor" />
                  ) : (
                    <Play size={18} fill="currentColor" className="ml-1" />
                  )}
                </button>
                <button 
                  onClick={handleNext}
                  className="w-8 h-8 flex items-center justify-center bg-white dark:bg-zinc-800 border-2 border-black active:translate-y-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  <SkipForward size={14} fill="currentColor" />
                </button>
              </div>

              {/* Volume Toggle */}
              <button 
                onClick={toggleMute}
                className="w-8 h-8 flex items-center justify-center bg-electric text-white border-2 border-black active:translate-y-0.5 hover:bg-blue-700"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
