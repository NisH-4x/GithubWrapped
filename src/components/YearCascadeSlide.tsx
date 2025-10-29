// YearCascadeSlide.tsx
import React from "react";
import { motion } from "framer-motion";

export default function YearCascadeSlide({
  year = 2024,
  rows = 6,
}: {
  year?: number;
  rows?: number;
}) {
  const gradients = [
    "from-emerald-400 via-green-500 to-lime-400",
    "from-rose-400 via-orange-400 to-amber-300",
    "from-cyan-400 via-sky-400 to-teal-300",
    "from-violet-400 via-indigo-400 to-blue-400",
    "from-orange-400 via-amber-500 to-yellow-500",
    "from-fuchsia-500 via-purple-500 to-violet-600",
  ];

  // parent controls children staggering
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.16, // spacing between rows
      },
    },
  };

  // each row animates in
  const rowVariants = {
    hidden: { opacity: 0, y: 36, scale: 0.98, filter: "blur(6px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // smooth easeOut
        delay: i * 0.05, // tiny extra offset so overlap looks stacked
      },
    }),
  };

  return (
    <div className="relative h-full w-full bg-black overflow-hidden rounded-md">
      {/* --- wavy bg (unchanged) --- */}
      <svg
        className="absolute inset-0 w-full h-full "
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#waveGrad)" strokeWidth="2">
          <path id="p1" d="" />
          <path id="p2" d="" />
          <path id="p3" d="" />
        </g>
        <script>{`
          const w = 1200, h = 800, A = 28, L = 260;
          const rows = [0,120,260];
          const paths = [document.getElementById('p1'),document.getElementById('p2'),document.getElementById('p3')];
          let t = 0;
          function draw(){
            t += 0.8;
            paths.forEach((p,i)=>{
              const y0 = rows[i], phase = t*(0.6 + i*0.15);
              let d = 'M 0 '+(y0 + h*0.25)+' ';
              for(let x=0; x<=w; x+=16){
                const y = y0 + h*0.25 + Math.sin((x+phase)/L*6.28318)*A*(1+i*0.25);
                d += 'L '+x+' '+y+' ';
              }
              p.setAttribute('d', d);
              p.setAttribute('transform', 'translate(0,'+(i*160)+')');
            });
            requestAnimationFrame(draw);
          }
          draw();
        `}</script>
      </svg>

      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_80%_at_50%_-10%,#000_40%,transparent_70%)]" />

      {/* --- stacked rows with framer-motion --- */}
      <div className="relative h-full w-full flex flex-col items-center justify-center select-none">
        <motion.div
          className="relative isolate"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {Array.from({ length: rows }).map((_, i) => {
            const z = rows - i; // 5,4,3,2,1
            return (
              <motion.div
                key={i}
                custom={i}
                variants={rowVariants}
                style={{ zIndex: z }}
                className={[
                  "relative",
                  "leading-none font-black tracking-tight",
                  "text-[110px] sm:text-[140px]",
                  "drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]",
                  "bg-clip-text text-transparent",
                  `bg-gradient-to-br ${gradients[i % gradients.length]}`,
                  i === 0 ? "mt-0" : "-mt-12",
                  `animate-pulse `,
                  "opacity-95",
                ].join(" ")}
              >
                {year}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-white/5" />
    </div>
  );
}
