// ForthStep.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../context/GloabalContext";

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const ForthStep: React.FC = () => {
  const { userStats } = useGlobalContext();
  const target = Math.max(0, Number(userStats?.stats?.longestStreak ?? 0));

  // animated count-up (requestAnimationFrame + easing)
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf = 0;
    const dur = 1400;
    const start = performance.now();
    const from = 0;
    const to = target;

    const tick = (now: number) => {
      const p = clamp((now - start) / dur, 0, 1);
      setCount(Math.round(from + (to - from) * easeOutCubic(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  // milestones (auto-activate based on streak)
  const milestones = useMemo(
    () => [
    //   { label: "7d", value: 7 },
      { label: "14d", value: 14 },
      { label: "30d", value: 30 },
      { label: "50d", value: 50 },
      { label: "100d", value: 100 },
    ],
    []
  );

  // progress ring math
  const size = 124;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const goal = 100; // you can map to your own goal; 100 is a nice round target
  const pct = clamp(target / goal, 0, 1);
  const dash = C * pct;

  // animation variants
  const container = { show: { transition: { staggerChildren: 0.08 } } };
  const item = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl text-white">
      {/* --- BACKGROUND LAYERS --- */}
      {/* wave grid */}
      <div className="absolute inset-0 -z-20 opacity-25">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      {/* animated aurora blobs */}
      <motion.div
        className="absolute -z-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(168,85,247,0.45), transparent 70%)",
            top: "-10%",
            left: "-10%",
          }}
          animate={{ x: [0, 30, -20, 0], y: [0, 20, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,0.4), transparent 70%)",
            bottom: "-15%",
            right: "-15%",
          }}
          animate={{ x: [0, -20, 10, 0], y: [0, -15, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* sheen sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 [mask-image:radial-gradient(120%_80%_at_50%_-10%,#000_40%,transparent_70%)]" />
        <motion.div
          className="absolute -top-1/3 left-0 w-full h-24 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ y: ["-30%", "140%"] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>

      {/* --- CONTENT --- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 h-full w-full px-5 py-6 flex  justify-center flex-col"
      >
        {/* title row */}
        {/* <motion.div variants={item} className="flex items-center justify-between">
          <div className="text-sm uppercase tracking-widest text-white/70">Your year</div>
          <div className="text-xs text-white/60">Longest Streak</div>
        </motion.div> */}

        {/* main card */}
        <motion.div
          variants={item}
          className="mt-3 relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        >
          <div className="gap-4 items-center">
            {/* progress ring */}
            <div className="col-span-1 mb-4 flex items-center justify-center">
              <div className="relative">
                <svg width={size} height={size} className="-rotate-90">
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth={stroke}
                    fill="none"
                  />
                  <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    stroke="url(#grad)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${dash} ${C - dash}`}
                    initial={{ strokeDasharray: `0 ${C}` }}
                    animate={{ strokeDasharray: `${dash} ${C - dash}` }}
                    transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.35, type: "spring", stiffness: 120, damping: 10 }}
                    className="text-center"
                  >
                    <div className="text-[12px] uppercase tracking-widest text-white/60">days</div>
                    <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      {count}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* copy */}
            <div className="col-span-2 text-center my-3 mb-6">
              <div className="text-lg font-semibold">
                Longest Streak <span className="text-yellow-300">⚡</span>
              </div>
              <div className="text-sm text-white/70 mt-1">
                {target > 0 ? "consecutive days of code flow" : "no streak recorded yet"}
              </div>

              {/* progress bar to goal */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-white/60 mb-1">
                  <span>Goal</span>
                  <span>
                    {Math.round(pct * 100)}% &middot; {target}/{goal}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* milestone chips */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {milestones.map((m, i) => {
              const unlocked = target >= m.value;
              return (
                <motion.span
                  key={m.label}
                  variants={item}
                  className={[
                    "px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur",
                    unlocked
                      ? "border-emerald-400/40 text-emerald-200 bg-emerald-400/10 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                      : "border-white/10 text-white/60 bg-white/5",
                  ].join(" ")}
                >
                  {m.label} {unlocked ? "✓" : ""}
                </motion.span>
              );
            })}
          </div>

          {/* corner glow */}
          <div className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rounded-full bg-amber-400/20 blur-2xl" />
        </motion.div>

        {/* footer hint */}
        <motion.div variants={item} className="mt-3 text-center text-xs text-white/55">
          Keep a daily rhythm, short sessions count!
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForthStep;
