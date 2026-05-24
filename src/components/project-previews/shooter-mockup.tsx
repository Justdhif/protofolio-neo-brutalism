"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
  text?: string;
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

// Game phase: "menu" | "launching" | "playing"
type GamePhase = "menu" | "launching" | "playing";

export default function ShooterMockup() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game UI state
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1580);
  const [wave, setWave] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [gameOver, setGameOver] = useState(false);
  const [gamePhase, setGamePhase] = useState<GamePhase>("menu");

  // Stable refs so rAF callbacks always read latest values
  const gamePhaseRef = useRef<GamePhase>("menu");
  useEffect(() => {
    gamePhaseRef.current = gamePhase;
  }, [gamePhase]);

  const timeRemainingRef = useRef(45);
  useEffect(() => {
    timeRemainingRef.current = timeRemaining;
  }, [timeRemaining]);

  // Core game state (lives inside rAF loop)
  const gameStateRef = useRef({
    playerX: 200,
    playerY: 215,
    playerVx: 0,
    playerWidth: 26,
    playerHeight: 20,
    lasers: [] as Laser[],
    aliens: [] as Alien[],
    particles: [] as Particle[],
    stars: [] as { x: number; y: number; speed: number; size: number }[],
    lastShotTime: 0,
    score: 0,
    wave: 1,
    autoTargetIdx: 0,
    changeDirTimer: 0,
    // Launch animation state
    launchShipY: 75,
    launchCountdown: 3,
    launchCountdownTimer: 0,
    launchGoTimer: 0,
    launchDone: false,
  });

  // Called by rAF when launch countdown finishes
  const onLaunchCompleteRef = useRef<() => void>(() => {});

  // ---- Helpers ----
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

  const initStars = () => {
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
  };

  // ---- Game timer (only ticks when fully playing) ----
  useEffect(() => {
    if (gameOver || gamePhase !== "playing") return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver, gamePhase]);

  // ---- Action handlers ----
  const resetLaunchState = () => {
    const state = gameStateRef.current;
    state.launchShipY = 75;
    state.launchCountdown = 3;
    state.launchCountdownTimer = 0;
    state.launchGoTimer = 0;
    state.launchDone = false;
  };

  const handleRestart = () => {
    const state = gameStateRef.current;
    state.score = 0;
    state.wave = 1;
    state.playerX = 200;
    state.playerVx = 0;
    state.lasers = [];
    state.aliens = [];
    state.particles = [];
    resetLaunchState();
    setScore(0);
    setWave(1);
    setTimeRemaining(45);
    setGameOver(false);
    setGamePhase("launching");
  };

  const handleGoToMainMenu = () => {
    const state = gameStateRef.current;
    state.score = 0;
    state.wave = 1;
    state.playerX = 200;
    state.playerVx = 0;
    state.lasers = [];
    state.aliens = [];
    state.particles = [];
    resetLaunchState();
    setScore(0);
    setWave(1);
    setTimeRemaining(45);
    setGameOver(false);
    setGamePhase("menu");
  };

  // ---- MAIN GAME LOOP ----
  useEffect(() => {
    initStars();

    onLaunchCompleteRef.current = () => {
      spawnAliens();
      createExplosionParticles(200, 215, "#10b981");
      setGamePhase("playing");
    };

    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---- Helper: draw ship ----
    const drawShip = (cx: number, cy: number, pw: number, ph: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      // Thruster flame
      if (Math.random() > 0.3) {
        ctx.fillStyle = Math.random() > 0.5 ? "#ff8c00" : "#ff3e7e";
        ctx.beginPath();
        ctx.moveTo(-4, 10);
        ctx.lineTo(0, 16 + Math.random() * 5);
        ctx.lineTo(4, 10);
        ctx.fill();
      }
      // Body
      ctx.fillStyle = "#10b981";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#10b981";
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(-pw / 2, ph / 2);
      ctx.lineTo(0, ph / 5);
      ctx.lineTo(pw / 2, ph / 2);
      ctx.closePath();
      ctx.fill();
      // Wing tip cannons
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-pw / 2 - 1, 2, 2, 5);
      ctx.fillRect(pw / 2 - 1, 2, 2, 5);
      ctx.restore();
    };

    // ---- Update ----
    const update = () => {
      if (gameOver) return;
      const state = gameStateRef.current;
      const phase = gamePhaseRef.current;
      const now = Date.now();

      // Stars always move
      state.stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > 260) {
          star.y = 0;
          star.x = Math.random() * 400;
        }
      });

      // ---- LAUNCH SEQUENCE ----
      if (phase === "launching") {
        const TARGET_Y = 215;
        const FRAMES_PER_COUNT = 55;

        // Move ship down smoothly
        if (state.launchShipY < TARGET_Y) {
          const diff = TARGET_Y - state.launchShipY;
          state.launchShipY += Math.max(1.5, diff * 0.07);
          if (state.launchShipY > TARGET_Y) state.launchShipY = TARGET_Y;
        }

        // Start countdown once ship is near bottom
        if (state.launchShipY >= TARGET_Y - 20) {
          state.launchCountdownTimer += 1;

          if (state.launchGoTimer > 0) {
            state.launchGoTimer -= 1;
            if (state.launchGoTimer === 0 && !state.launchDone) {
              state.launchDone = true;
              onLaunchCompleteRef.current();
            }
          } else if (state.launchCountdown > 0) {
            if (state.launchCountdownTimer >= FRAMES_PER_COUNT) {
              state.launchCountdownTimer = 0;
              state.launchCountdown -= 1;
              if (state.launchCountdown === 0) {
                state.launchGoTimer = 40;
              }
            }
          }
        }
        return;
      }

      if (phase !== "playing") return;

      // ---- AUTOPILOT ENGINE ----
      let predictedTargetX = state.playerX;
      if (state.aliens.length > 0) {
        let currentTarget = state.aliens[state.autoTargetIdx];

        state.changeDirTimer += 1;
        if (
          !currentTarget ||
          state.changeDirTimer > 85 ||
          Math.random() < 0.008
        ) {
          state.changeDirTimer = 0;
          const urgentIdx = state.aliens.findIndex((a) => a.y > 130);
          if (urgentIdx !== -1) {
            state.autoTargetIdx = urgentIdx;
          } else {
            if (Math.random() < 0.75) {
              let lowestIdx = 0;
              state.aliens.forEach((alien, idx) => {
                if (alien.y > state.aliens[lowestIdx].y) lowestIdx = idx;
              });
              state.autoTargetIdx = lowestIdx;
            } else {
              state.autoTargetIdx = Math.floor(
                Math.random() * state.aliens.length,
              );
            }
          }
          currentTarget = state.aliens[state.autoTargetIdx];
        }

        if (currentTarget) {
          // Bounce-aware predictive aiming
          const laserSpeed = 4.5;
          const distY = state.playerY - 8 - currentTarget.y;
          const framesToReach = distY / laserSpeed;
          let tempX = currentTarget.x;
          let tempVx = currentTarget.vx;
          for (let f = 0; f < framesToReach; f++) {
            tempX += tempVx;
            if (tempX < 15 || tempX > 385) tempVx = -tempVx;
          }
          predictedTargetX = tempX;

          // PD controller gliding physics
          const diffX = predictedTargetX - state.playerX;
          const Kp = 0.08;
          const Kd = 0.25;
          state.playerVx += diffX * Kp - state.playerVx * Kd;
          const maxSpeed = 4.0;
          state.playerVx = Math.max(
            -maxSpeed,
            Math.min(maxSpeed, state.playerVx),
          );
          state.playerX += state.playerVx;
          if (state.playerX < 15) {
            state.playerX = 15;
            state.playerVx = 0;
          }
          if (state.playerX > 385) {
            state.playerX = 385;
            state.playerVx = 0;
          }
        }
      } else {
        state.playerVx *= 0.88;
        state.playerX += state.playerVx;
      }

      // Auto-shooting with adaptive threshold
      if (state.aliens.length > 0) {
        const currentTarget = state.aliens[state.autoTargetIdx];
        if (currentTarget) {
          const alignThreshold = state.aliens.length === 1 ? 5 : 10;
          const isAligned =
            Math.abs(predictedTargetX - state.playerX) < alignThreshold;
          if (isAligned && now - state.lastShotTime > 380) {
            state.lasers.push({
              x: state.playerX,
              y: state.playerY - 8,
              vy: -4.5,
              width: 2.5,
              height: 10,
              color: "#10b981",
            });
            state.lastShotTime = now;
          }
        }
      }

      // Move lasers
      state.lasers.forEach((laser) => {
        laser.y += laser.vy;
      });
      state.lasers = state.lasers.filter(
        (laser) => laser.y > 0 && laser.y < 260,
      );

      // Move aliens
      let alienReachedBottom = false;
      state.aliens.forEach((alien) => {
        alien.x += alien.vx;
        if (alien.x < 15 || alien.x > 385) {
          alien.vx = -alien.vx;
          alien.y += 8;
        }
        if (alien.y > state.playerY - 12) alienReachedBottom = true;
      });

      if (alienReachedBottom) {
        createExplosionParticles(state.playerX, state.playerY, "#ff3e7e");
        state.score = 0;
        state.wave = 1;
        setScore(0);
        setWave(1);
        spawnAliens();
        state.lasers = [];
        state.playerX = 200;
        state.playerVx = 0;
        return;
      }

      // Collision detection
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
              if (state.score > highScore) setHighScore(state.score);
            }
          }
        });
      });

      // Wave clear → +12s bonus
      if (state.aliens.length === 0) {
        state.wave += 1;
        setWave(state.wave);
        spawnAliens();
        setTimeRemaining((t) => t + 12);
        state.particles.push({
          x: 200,
          y: 130,
          vx: 0,
          vy: -0.6,
          color: "#10b981",
          size: 10,
          alpha: 1.5,
          decay: 0.012,
          text: "+12s TIME BONUS",
        });
      }

      // Update particles
      state.particles.forEach((p, pIdx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) state.particles.splice(pIdx, 1);
      });
    };

    // ---- Render ----
    const render = () => {
      const state = gameStateRef.current;
      const phase = gamePhaseRef.current;

      // Background
      ctx.fillStyle = "rgba(8, 8, 14, 0.25)";
      ctx.fillRect(0, 0, 400, 260);

      // Stars
      state.stars.forEach((star) => {
        ctx.globalAlpha = star.speed * 0.6;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });
      ctx.globalAlpha = 1.0;

      // Grid
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

      // ---- MENU: static ship at Y=75 ----
      if (phase === "menu") {
        drawShip(200, 75, state.playerWidth, state.playerHeight);
        return;
      }

      // ---- LAUNCHING: ship glides down + countdown ----
      if (phase === "launching") {
        const shipY = Math.min(state.launchShipY, 215);
        drawShip(200, shipY, state.playerWidth, state.playerHeight);

        const countdownText =
          state.launchGoTimer > 0
            ? "GO!"
            : state.launchCountdown > 0
              ? String(state.launchCountdown)
              : null;

        if (countdownText !== null) {
          const isGo = countdownText === "GO!";
          const fontSize = isGo ? 52 : 64;
          const color = isGo ? "#10b981" : "#ffffff";
          const glowColor = isGo ? "#10b981" : "#3b82f6";
          const frameRatio = isGo
            ? 1 - state.launchGoTimer / 40
            : state.launchCountdownTimer / 55;
          const scale = 1 + frameRatio * 0.18;

          ctx.save();
          ctx.translate(200, 145);
          ctx.scale(scale, scale);
          ctx.font = `900 ${fontSize}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.shadowBlur = isGo ? 30 : 20;
          ctx.shadowColor = glowColor;
          ctx.fillStyle = color;
          ctx.globalAlpha = isGo
            ? Math.max(0.2, 1 - (1 - state.launchGoTimer / 40) * 0.5)
            : 1;
          ctx.fillText(countdownText, 0, 0);
          ctx.restore();
          ctx.globalAlpha = 1.0;

          if (!isGo) {
            ctx.save();
            ctx.font = "bold 8px monospace";
            ctx.fillStyle = "rgba(150,150,180,0.7)";
            ctx.textAlign = "center";
            ctx.fillText("LAUNCHING IN", 200, 175);
            ctx.restore();
          }
        }
        return;
      }

      // ---- PLAYING ----

      // Particles
      state.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = Math.min(1, p.alpha);
        if (p.text) {
          ctx.fillStyle = p.color;
          ctx.font = "bold 11px monospace";
          ctx.textAlign = "center";
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          ctx.fillText(p.text, p.x, p.y);
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 4;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Lasers
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

      // Player ship (moving)
      drawShip(
        state.playerX,
        state.playerY,
        state.playerWidth,
        state.playerHeight,
      );

      // Aliens
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

      // ---- In-canvas Timer HUD (centered at bottom of board) ----
      const t = timeRemainingRef.current;
      const isLow = t < 10;
      const timerColor = isLow ? "#ff5e7e" : "#10b981";
      const timerGlow = isLow ? "#ff3e7e" : "#06d6a0";
      const pillW = 96,
        pillH = 18;
      const pillX = 200 - pillW / 2;
      const pillY = 238;

      // Pill background
      ctx.save();
      ctx.fillStyle = isLow ? "rgba(255,62,126,0.22)" : "rgba(16,185,129,0.18)";
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 5);
      ctx.fill();
      ctx.strokeStyle = isLow
        ? "rgba(255,94,126,0.80)"
        : "rgba(16,185,129,0.70)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // "TIME" label
      ctx.save();
      ctx.font = "bold 7.5px monospace";
      ctx.fillStyle = isLow
        ? "rgba(255,180,195,0.95)"
        : "rgba(160,255,210,0.90)";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("TIME", pillX + 9, pillY + pillH / 2);
      ctx.restore();

      // Separator
      ctx.save();
      ctx.strokeStyle = isLow
        ? "rgba(255,94,126,0.40)"
        : "rgba(16,185,129,0.35)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(pillX + 42, pillY + 3);
      ctx.lineTo(pillX + 42, pillY + pillH - 3);
      ctx.stroke();
      ctx.restore();

      // Timer value
      ctx.save();
      ctx.font = "900 11px monospace";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = isLow ? 14 : 8;
      ctx.shadowColor = timerGlow;
      ctx.fillStyle = timerColor;
      if (isLow) ctx.globalAlpha = 0.85 + 0.15 * Math.sin(Date.now() / 160);
      ctx.fillText(`${t}s`, pillX + pillW - 8, pillY + pillH / 2);
      ctx.restore();
      ctx.globalAlpha = 1.0;
    };

    const loop = () => {
      update();
      render();
      animationId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animationId);
  }, [gameOver, gamePhase]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col h-full justify-between select-none outline-none relative">
      {/* Top HUD */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 shrink-0 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
          <span className="text-[10px] font-display font-black uppercase tracking-widest text-zinc-900 dark:text-white">
            Retro Strike
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

      {/* Scanline overlay */}
      <div className="absolute inset-x-0 top-10 bottom-12 pointer-events-none z-10 bg-scanlines opacity-[0.03] dark:opacity-[0.07]" />

      {/* Canvas area */}
      <div className="relative flex-1 flex items-center justify-center bg-[#08080e] min-h-42.5 border border-black/10 dark:border-white/5 my-2.5 rounded-xl overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          width={400}
          height={260}
          className="w-full h-full max-h-65 object-contain aspect-400/260"
        />

        {/* MAIN MENU overlay — ship is drawn on canvas at Y=75 */}
        {gamePhase === "menu" && (
          <div className="absolute inset-0 bg-[#08080e]/40 backdrop-blur-[0.5px] flex flex-col items-center justify-center p-4 text-center z-20 animate-fadeIn">
            {/* Push content below canvas ship (Y≈75 maps to ~33% of 260px canvas) */}
            <div className="h-22" />

            <h4 className="font-display font-black text-2xl text-pink-accent uppercase tracking-widest leading-none mb-1 animate-pulse drop-shadow-[0_0_10px_rgba(255,94,126,0.4)]">
              RETRO STRIKE
            </h4>

            <p className="text-[7.5px] font-mono text-zinc-400 max-w-[80%] mb-4 uppercase tracking-widest leading-relaxed">
              AUTOPILOT DEMO SIMULATION
            </p>

            <button
              onClick={() => {
                const state = gameStateRef.current;
                resetLaunchState();
                state.lasers = [];
                state.aliens = [];
                state.particles = [];
                state.playerX = 200;
                state.playerVx = 0;
                setGamePhase("launching");
              }}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-display font-black text-[10px] uppercase rounded-xl neo-border shadow-[0_0_15px_rgba(16,185,129,0.45)] transition-all cursor-pointer hover:shadow-[0_0_22px_rgba(16,185,129,0.7)]"
            >
              PLAY GAME
            </button>
          </div>
        )}

        {/* TIME OVER popup */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center z-20 animate-fadeIn">
            <div className="px-3 py-1 bg-pink-accent/15 border border-pink-500/30 text-pink-accent font-mono text-[8px] font-bold rounded mb-3 flex items-center gap-1.5 uppercase tracking-widest animate-pulse">
              <AlertTriangle size={11} />
              <span>SYSTEM TIMEOUT</span>
            </div>

            <h4 className="font-display font-black text-2xl text-pink-accent uppercase tracking-wider leading-none mb-1">
              TIME OVER
            </h4>

            <p className="text-[9px] font-mono text-zinc-350 max-w-[80%] mb-4 uppercase leading-relaxed">
              SIMULATION CONCLUDED <br />
              WAVES DEFEATED:{" "}
              <span className="text-white font-extrabold">{wave}</span> {"//"} FINAL
              SCORE: <span className="text-lime-green font-black">{score}</span>
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-display font-black text-[9px] uppercase rounded-xl neo-border shadow-[0_0_12px_rgba(16,185,129,0.35)] transition-all cursor-pointer hover:shadow-[0_0_18px_rgba(16,185,129,0.55)]"
              >
                PLAY AGAIN
              </button>
              <button
                onClick={handleGoToMainMenu}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-200 hover:text-white font-display font-black text-[9px] uppercase rounded-xl neo-border border-zinc-700 shadow-[0_0_12px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
              >
                MAIN MENU
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between shrink-0 pt-1.5 border-t border-zinc-200 dark:border-zinc-800 relative z-10">
        <span className="text-[7.5px] font-mono text-zinc-450 dark:text-zinc-550 flex items-center gap-1.5 uppercase font-bold tracking-tight">
          <span>DEMO PREVIEW</span>
        </span>

        {/* Timer is rendered inside canvas during play — hidden here */}
        <span className="text-[7.5px] font-mono text-zinc-450 dark:text-zinc-550 select-none uppercase font-bold tracking-tight">
          V.1.0.0
        </span>
      </div>
    </div>
  );
}
