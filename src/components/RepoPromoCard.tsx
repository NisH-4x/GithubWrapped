import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export default function RepoPromoCard() {
  const lines = ["Built for devs,", "loved by devs."];
  const [currentLine, setCurrentLine] = useState(0);
  const [displayed, setDisplayed] = useState(["", ""]);

  useEffect(() => {
    let i = 0;
    const typeLine = () => {
      const interval = setInterval(() => {
        setDisplayed(prev => {
          const updated = [...prev];
          updated[currentLine] = lines[currentLine].slice(0, i + 1);
          return updated;
        });
        i++;
        if (i === lines[currentLine].length) {
          clearInterval(interval);
          if (currentLine < lines.length - 1) {
            setTimeout(() => {
              setCurrentLine(currentLine + 1);
            }, 500); // pause before next line
          }
        }
      }, 70);
    };
    typeLine();
  }, [currentLine]);

  return (
    <div className="relative flex items-center justify-center isolate w-full max-w-[430px] h-full overflow-hidden bg-[#0c0d12] text-white shadow-2xl ring-1 ring-white/10">
      {/* animated waves */}
      <Waves className="absolute inset-0 -z-10 opacity-40 animate-swell" />

      {/* soft purple glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/16 blur-3xl" />

      {/* content */}
      <div className="relative px-6 py-10 sm:px-8 text-center">
        {/* headline typing effect with two lines */}
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl space-y-2">
          <div>
            <span className="whitespace-pre">{displayed[0]}</span>
            {currentLine === 0 && (
              <span className="inline-block w-1 h-6 ml-1 bg-indigo-300 animate-pulse align-middle" />
            )}
          </div>
          <div>
            <span className="text-indigo-300 whitespace-pre">{displayed[1]}</span>
            {currentLine === 1 && (
              <span className="inline-block w-1 h-6 ml-1 bg-indigo-300 animate-pulse align-middle" />
            )}
          </div>
        </h2>

        <p className="mt-4 text-white/70">
          Simple, fast, and open-source. <br className="hidden sm:block" />
          Start with our repo today.
        </p>

        <div className="flex justify-center">
          <a
            href="https://github.com/NISHANTCHAUHAN1/Github-wrapped-clientt"
            target="_blank"
            rel="noreferrer"
            className="group mt-6 inline-flex items-center gap-3 justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            Star Repo
            <FaStar className="text-yellow-500" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Waves({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wave-stroke" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {Array.from({ length: 11 }).map((_, i) => {
        const y = 40 + i * 50;
        const band = i % 3;
        return (
          <path
            key={i}
            d={`M0 ${y} C 70 ${y - 25}, 130 ${y + 25}, 200 ${y} S 330 ${y - 25}, 400 ${y}`}
            fill="none"
            stroke="url(#wave-stroke)"
            strokeWidth="1"
            strokeDasharray="6 10"
            className={`wave wave-${band}`}
          />
        );
      })}
    </svg>
  );
}
