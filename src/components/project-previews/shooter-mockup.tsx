"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, RotateCcw, Play, Award, Swords } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
}

interface Alien {
  x: number;
  y: number;
  width: number;
  height: number;
  hp: number;
  color: string;
  points: number;
  vx: number;
}

interface Laser {
  x: number;
  y: number;
  vy: number;
  width: number;
  height: number;
  color: string;
}

export default function ShooterMockup() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1280);
  const [wave, setWave] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showFocusHint, setShowFocusHint] = useState(false);

  const gameStateRef = useRef({
    playerX: 200,
    playerY: 215,
    playerWidth: 26,
    playerHeight: 20,
    keys: {
      ArrowLeft: false,
      ArrowRight: false,
      KeyA: false,
      KeyD: false,
      Space: false,
    },
    lasers: [] as Laser[],
    aliens: [] as Alien[],
    particles: [] as Particle[],
    stars: [] as { x: number; y: number; speed: number; size: number }[],
    lastShotTime: 0,
    score: 0,
    wave: 1,
    isPlaying: false,
    gameOver: false,
    autoMoveDirection: 1,
    autoTargetAlienIdx: -1,
  });

  const playLaserSound = () => {
    if (isMuted) return;
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        80,
        audioCtx.currentTime + 0.12,
      );

      gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + 0.12,
      );

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      console.warn("Web Audio API error:", e);
    }
  };

  const playExplosionSound = () => {
    if (isMuted) return;
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(30, audioCtx.currentTime + 0.25);

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + 0.25,
      );

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
      console.warn("Web Audio API error:", e);
    }
  };

  const playLevelUpSound = () => {
    if (isMuted) return;
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      osc.frequency.setValueAtTime(450, audioCtx.currentTime + 0.1);
      osc.frequency.setValueAtTime(600, audioCtx.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + 0.35,
      );

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      console.warn("Web Audio API error:", e);
    }
  };

  useEffect(() => {
    gameStateRef.current.isPlaying = isPlaying;
    gameStateRef.current.gameOver = gameOver;
  }, [isPlaying, gameOver]);

  const initGame = () => {
    const state = gameStateRef.current;

    state.stars = [];
    for (let i = 0; i < 40; i++) {
      state.stars.push({
        x: Math.random() * 400,
        y: Math.random() * 260,
        speed: 0.3 + Math.random() * 0.8,
        size: 0.5 + Math.random() * 1.5,
      });
    }

    spawnAliens();
    state.lasers = [];
    state.particles = [];
  };

  const spawnAliens = () => {
    const state = gameStateRef.current;
    const waveNum = state.wave;
    state.aliens = [];

    const rows = Math.min(3, 1 + Math.floor(waveNum / 2));
    const cols = 5;
    const colors = ["#ff5e7e", "#3b82f6", "#10b981"];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const color = colors[r % colors.length];
        state.aliens.push({
          x: 50 + c * 60,
          y: 35 + r * 30,
          width: 22,
          height: 16,
          hp: 1 + Math.floor(waveNum / 3),
          color,
          points: (rows - r) * 10 * waveNum,
          vx: (0.4 + waveNum * 0.12) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    }
  };

  useEffect(() => {
    initGame();
    let animationId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const update = () => {
      const state = gameStateRef.current;

      state.stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > 260) {
          star.y = 0;
          star.x = Math.random() * 400;
        }
      });

      if (state.isPlaying && !state.gameOver) {
        const speed = 3;
        if (state.keys.ArrowLeft || state.keys.KeyA) {
          state.playerX = Math.max(15, state.playerX - speed);
        }
        if (state.keys.ArrowRight || state.keys.KeyD) {
          state.playerX = Math.min(385, state.playerX + speed);
        }

        if (state.keys.Space) {
          const now = Date.now();
          if (now - state.lastShotTime > 320) {
            state.lasers.push({
              x: state.playerX,
              y: state.playerY - 8,
              vy: -4.5,
              width: 2.5,
              height: 10,
              color: "#00f3ff",
            });
            state.lastShotTime = now;
            playLaserSound();
          }
        }
      } else if (!state.gameOver) {
        if (state.aliens.length > 0) {
          let closestAlienIdx = 0;
          let minDist = 99999;

          state.aliens.forEach((alien, idx) => {
            const dist = Math.abs(alien.x - state.playerX);
            if (
              alien.y > state.aliens[closestAlienIdx].y ||
              (alien.y === state.aliens[closestAlienIdx].y && dist < minDist)
            ) {
              closestAlienIdx = idx;
              minDist = dist;
            }
          });

          const targetAlien = state.aliens[closestAlienIdx];

          const targetX = targetAlien.x;
          const diff = targetX - state.playerX;

          if (Math.abs(diff) > 4) {
            state.playerX += Math.sign(diff) * 1.5;
          }

          if (Math.abs(diff) < 25) {
            const now = Date.now();
            if (now - state.lastShotTime > 450) {
              state.lasers.push({
                x: state.playerX,
                y: state.playerY - 8,
                vy: -4,
                width: 2.5,
                height: 10,
                color: "#10b981",
              });
              state.lastShotTime = now;
            }
          }
        } else {
          state.playerX += state.autoMoveDirection * 0.8;
          if (state.playerX > 300) state.autoMoveDirection = -1;
          if (state.playerX < 100) state.autoMoveDirection = 1;
        }
      }

      state.lasers.forEach((laser, lIdx) => {
        laser.y += laser.vy;
      });

      state.lasers = state.lasers.filter(
        (laser) => laser.y > 0 && laser.y < 260,
      );

      let alienReachedBottom = false;
      state.aliens.forEach((alien) => {
        alien.x += alien.vx;

        if (alien.x < 15 || alien.x > 385) {
          alien.vx = -alien.vx;
          alien.y += 8;
        }

        if (alien.y > state.playerY - 12) {
          alienReachedBottom = true;
        }
      });

      if (alienReachedBottom && !state.gameOver) {
        state.gameOver = true;
        setGameOver(true);
        if (state.isPlaying) {
          playExplosionSound();
        }
      }

      state.lasers.forEach((laser, lIdx) => {
        state.aliens.forEach((alien, aIdx) => {
          if (
            laser.x > alien.x - alien.width / 2 &&
            laser.x < alien.x + alien.width / 2 &&
            laser.y > alien.y - alien.height / 2 &&
            laser.y < alien.y + alien.height / 2
          ) {
            state.lasers.splice(lIdx, 1);
            alien.hp -= 1;

            createExplosionParticles(alien.x, alien.y, alien.color);

            if (alien.hp <= 0) {
              state.aliens.splice(aIdx, 1);
              state.score += alien.points;
              setScore(state.score);

              if (state.score > highScore) {
                setHighScore(state.score);
              }

              if (state.isPlaying) {
                playExplosionSound();
              }
            } else {
              if (state.isPlaying && !isMuted) {
                playLaserSound();
              }
            }
          }
        });
      });

      if (state.aliens.length === 0 && !state.gameOver) {
        state.wave += 1;
        setWave(state.wave);
        spawnAliens();
        if (state.isPlaying) {
          playLevelUpSound();
        }
      }

      state.particles.forEach((p, pIdx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          state.particles.splice(pIdx, 1);
        }
      });
    };

    const createExplosionParticles = (x: number, y: number, color: string) => {
      const state = gameStateRef.current;
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2.2;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          size: 1 + Math.random() * 2,
          alpha: 1,
          decay: 0.02 + Math.random() * 0.03,
        });
      }
    };

    const render = () => {
      const state = gameStateRef.current;

      ctx.fillStyle = "rgba(8, 8, 14, 0.25)";
      ctx.fillRect(0, 0, 400, 260);

      ctx.fillStyle = "#ffffff";
      state.stars.forEach((star) => {
        ctx.globalAlpha = star.speed * 0.6;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });
      ctx.globalAlpha = 1.0;

      ctx.strokeStyle = "rgba(45, 92, 246, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 400; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 260);
        ctx.stroke();
      }
      for (let i = 0; i < 260; i += 25) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(400, i);
        ctx.stroke();
      }

      state.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      state.lasers.forEach((laser) => {
        ctx.save();
        ctx.fillStyle = laser.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = laser.color;
        ctx.fillRect(
          laser.x - laser.width / 2,
          laser.y,
          laser.width,
          laser.height,
        );
        ctx.restore();
      });

      ctx.save();
      ctx.translate(state.playerX, state.playerY);

      if (Math.random() > 0.3) {
        ctx.fillStyle = Math.random() > 0.5 ? "#ff8c00" : "#ff3e7e";
        ctx.beginPath();
        ctx.moveTo(-4, 10);
        ctx.lineTo(0, 16 + Math.random() * 5);
        ctx.lineTo(4, 10);
        ctx.fill();
      }

      ctx.fillStyle = state.isPlaying ? "#00f3ff" : "#10b981";
      ctx.shadowBlur = 8;
      ctx.shadowColor = state.isPlaying ? "#00f3ff" : "#10b981";
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(-state.playerWidth / 2, state.playerHeight / 2);
      ctx.lineTo(0, state.playerHeight / 5);
      ctx.lineTo(state.playerWidth / 2, state.playerHeight / 2);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-state.playerWidth / 2 - 1, 2, 2, 5);
      ctx.fillRect(state.playerWidth / 2 - 1, 2, 2, 5);

      ctx.restore();

      state.aliens.forEach((alien) => {
        ctx.save();
        ctx.fillStyle = alien.color;
        ctx.shadowBlur = 7;
        ctx.shadowColor = alien.color;

        ctx.beginPath();
        ctx.moveTo(alien.x, alien.y - alien.height / 2);
        ctx.lineTo(alien.x + alien.width / 2, alien.y);
        ctx.lineTo(alien.x + alien.width / 4, alien.y + alien.height / 2);
        ctx.lineTo(alien.x - alien.width / 4, alien.y + alien.height / 2);
        ctx.lineTo(alien.x - alien.width / 2, alien.y);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(alien.x - 4, alien.y - 2, 2, 2);
        ctx.fillRect(alien.x + 2, alien.y - 2, 2, 2);

        if (alien.hp > 1) {
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(alien.x, alien.y, 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      });
    };

    const loop = () => {
      update();
      render();
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isMuted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      if (!state.isPlaying) return;

      if (
        ["ArrowLeft", "ArrowRight", "KeyA", "KeyD", "Space"].includes(e.code)
      ) {
        e.preventDefault();
        if (e.code === "Space") state.keys.Space = true;
        if (e.code === "ArrowLeft" || e.code === "KeyA")
          state.keys.ArrowLeft = true;
        if (e.code === "ArrowRight" || e.code === "KeyD")
          state.keys.ArrowRight = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      if (
        ["ArrowLeft", "ArrowRight", "KeyA", "KeyD", "Space"].includes(e.code)
      ) {
        if (e.code === "Space") state.keys.Space = false;
        if (e.code === "ArrowLeft" || e.code === "KeyA")
          state.keys.ArrowLeft = false;
        if (e.code === "ArrowRight" || e.code === "KeyD")
          state.keys.ArrowRight = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const startPlaying = () => {
    const state = gameStateRef.current;
    state.score = 0;
    state.wave = 1;
    state.playerX = 200;
    state.gameOver = false;

    setScore(0);
    setWave(1);
    setGameOver(false);
    setIsPlaying(true);

    setIsMuted(false);

    initGame();
    playLevelUpSound();

    containerRef.current?.focus();
    setShowFocusHint(true);
    setTimeout(() => setShowFocusHint(false), 3000);
  };

  const restartGame = () => {
    startPlaying();
  };

  const quitGame = () => {
    setIsPlaying(false);
    setGameOver(false);
    const state = gameStateRef.current;
    state.score = 0;
    state.wave = 1;
    state.isPlaying = false;
    state.gameOver = false;
    setScore(0);
    setWave(1);
    setIsMuted(true);
    initGame();
  };

  const setVirtualKey = (
    key: "ArrowLeft" | "ArrowRight" | "Space",
    pressed: boolean,
  ) => {
    const state = gameStateRef.current;
    if (key === "Space") {
      state.keys.Space = pressed;
    } else {
      state.keys[key] = pressed;
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="flex flex-col h-full justify-between select-none outline-none focus:ring-1 focus:ring-pink-500/30 rounded-lg relative overflow-hidden"
    >
      <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 shrink-0 relative z-10">
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-pink-accent animate-pulse shadow-[0_0_8px_rgba(255,94,126,0.6)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"}`}
          />
          <span className="text-[10px] font-display font-black uppercase tracking-widest text-zinc-900 dark:text-white">
            {isPlaying ? "Retro Strike (LIVE)" : "Retro Strike // AUTOPLAY"}
          </span>
        </div>

        <div className="flex items-center gap-3.5 font-mono text-[9px] font-bold text-zinc-500">
          <div>
            SCORE:{" "}
            <span className="text-zinc-800 dark:text-zinc-200 font-extrabold">
              {score}
            </span>
          </div>
          <div className="hidden sm:block">
            HI:{" "}
            <span className="text-zinc-400 dark:text-zinc-600">
              {highScore}
            </span>
          </div>
          <div>
            WAVE:{" "}
            <span className="text-pink-accent font-extrabold">{wave}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-10 bottom-12 pointer-events-none z-10 bg-scanlines opacity-[0.03] dark:opacity-[0.07]" />

      <div className="relative flex-1 flex items-center justify-center bg-[#08080e] min-h-42.5 border border-black/10 dark:border-white/5 my-2.5 rounded-xl overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          width={400}
          height={260}
          className="w-full h-full max-h-65 object-contain aspect-400/260"
        />

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center z-10 animate-fadeIn">
            <div className="px-3.5 py-1 bg-pink-accent text-white font-mono text-[8px] font-bold neo-border-sm neo-shadow-sm rounded mb-3 flex items-center gap-1">
              <Swords size={10} className="animate-spin" />
              <span>ARCADE CABINET V.1.0</span>
            </div>

            <h4 className="font-display font-black text-xl text-white tracking-wider uppercase leading-none mb-1">
              RETRO SPACE STRIKE
            </h4>

            <p className="text-[8px] font-mono text-zinc-400 max-w-[80%] mb-4 leading-normal uppercase">
              HTML + CSS + Pure Canvas JS Engine
            </p>

            <button
              onClick={startPlaying}
              className="flex items-center gap-2 px-4 py-2.5 bg-lime-green text-black font-display font-black text-[10px] uppercase rounded-xl neo-border neo-shadow-sm neo-interactive cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
            >
              <Play size={10} fill="black" />
              <span>PLAY MINI GAME</span>
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center z-20 animate-fadeIn">
            <Award className="text-pink-accent w-8 h-8 mb-2 animate-bounce" />
            <h4 className="font-display font-black text-2xl text-pink-accent uppercase tracking-wider leading-none mb-1">
              GAME OVER
            </h4>
            <p className="text-[10px] font-mono text-zinc-300 mb-3.5">
              FINAL SCORE:{" "}
              <span className="text-lime-green font-black">{score}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={restartGame}
                className="flex items-center gap-1.5 px-3 py-2 bg-lime-green text-black font-display font-black text-[9px] uppercase rounded-lg neo-border neo-shadow-sm neo-interactive cursor-pointer"
              >
                <RotateCcw size={10} />
                <span>TRY AGAIN</span>
              </button>
              <button
                onClick={quitGame}
                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 text-white font-display font-black text-[9px] uppercase rounded-lg border border-zinc-650 hover:bg-zinc-700 cursor-pointer"
              >
                <span>DEMO</span>
              </button>
            </div>
          </div>
        )}

        {showFocusHint && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-electric text-white text-[8px] font-mono font-bold rounded neo-border-sm animate-pulse pointer-events-none z-20">
            USE ← → ARROWS OR A/D & SPACE TO FIRE!
          </div>
        )}
      </div>

      <div className="flex items-center justify-between shrink-0 pt-1.5 border-t border-zinc-200 dark:border-zinc-800 relative z-10">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer transition-colors"
          title={isMuted ? "Unmute Retro SFX" : "Mute Sound"}
        >
          {isMuted ? (
            <VolumeX size={11} />
          ) : (
            <Volume2 size={11} className="text-pink-accent animate-pulse" />
          )}
        </button>

        {isPlaying ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <button
                onMouseDown={() => setVirtualKey("ArrowLeft", true)}
                onMouseUp={() => setVirtualKey("ArrowLeft", false)}
                onMouseLeave={() => setVirtualKey("ArrowLeft", false)}
                onTouchStart={() => setVirtualKey("ArrowLeft", true)}
                onTouchEnd={() => setVirtualKey("ArrowLeft", false)}
                className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 active:bg-pink-500 active:text-white rounded text-[8px] font-mono font-black neo-interactive cursor-default"
              >
                ◀ LEFT
              </button>
              <button
                onMouseDown={() => setVirtualKey("Space", true)}
                onMouseUp={() => setVirtualKey("Space", false)}
                onMouseLeave={() => setVirtualKey("Space", false)}
                onTouchStart={() => setVirtualKey("Space", true)}
                onTouchEnd={() => setVirtualKey("Space", false)}
                className="px-3 py-1 bg-pink-accent text-white border border-black active:bg-pink-700 rounded text-[8px] font-mono font-black neo-interactive cursor-default"
              >
                🔥 FIRE
              </button>
              <button
                onMouseDown={() => setVirtualKey("ArrowRight", true)}
                onMouseUp={() => setVirtualKey("ArrowRight", false)}
                onMouseLeave={() => setVirtualKey("ArrowRight", false)}
                onTouchStart={() => setVirtualKey("ArrowRight", true)}
                onTouchEnd={() => setVirtualKey("ArrowRight", false)}
                className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 active:bg-pink-500 active:text-white rounded text-[8px] font-mono font-black neo-interactive cursor-default"
              >
                RIGHT ▶
              </button>
            </div>
            <button
              onClick={quitGame}
              className="text-[7px] font-mono font-bold text-zinc-400 hover:text-pink-accent cursor-pointer ml-1"
            >
              QUIT
            </button>
          </div>
        ) : (
          <span className="text-[7px] font-mono text-zinc-400 dark:text-zinc-550 flex items-center gap-1">
            <span>● DEMO MODE RUNNING</span>
          </span>
        )}

        <span className="text-[7.5px] font-mono text-zinc-400 dark:text-zinc-550 select-none uppercase font-bold tracking-tight">
          JS ENGINE
        </span>
      </div>
    </div>
  );
}
