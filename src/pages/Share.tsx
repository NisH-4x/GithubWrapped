import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { useGlobalContext } from "../context/GloabalContext";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Share: React.FC = () => {
  const { userStats, characterInfo } = useGlobalContext();
  const buttonsRef = useRef<HTMLDivElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!wrapperRef.current) return;

    try {
      const canvas = await html2canvas(wrapperRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#000", // or null if you want transparent
        // ignore any element with data-html2canvas-ignore="true"
        ignoreElements: (el) =>
          el.getAttribute?.("data-html2canvas-ignore") === "true",
      });

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${userStats?.user?.login || "github-wrapped"}.png`;
        document.body.appendChild(a); // some browsers require this
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (e) {
      console.error("Failed to download image:", e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col justify-center min-w-xl min-h-screen bg-black">
      <div ref={wrapperRef}>
        <div className="w-full h-full relative bg-[#111111] items-center justify-center text-white transition-opacity duration-700 ease-in-out mt-5 overflow-visible">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="relative h-full w-full ">
            {/* profile and */}
            <div className="p-3 flex gap-5">
              <img
                src={userStats?.user?.avatar_url}
                alt=""
                className="w-16 h-16 rounded-full border-2"
              />
              <div className="">
                <h1 className="font-semibold">
                  {userStats?.user?.login || "Aditya"}
                </h1>
                <h1 className="font-medium">2025 Year in Code</h1>
              </div>
            </div>

            {/* github stats */}

            <div className="grid grid-cols-2 p-3 justify-between gap-4 overflow-visible">
              <div className="bg-pink-300/20 p-2 rounded-md relative inline-block group">
                <h1 className="text-[13px]">⛩️ Character</h1>
                <h1 className="text-pink-500 font-semibold text-lg">
                  {characterInfo.name || "Itachi"}
                </h1>

                <div className="absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
                  <div className="relative p-4 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
                    <div className="space-y-2">
                      <ul className="text-sm">
                        <li className="flex items-center gap-2 text-gray-300 ">
                          5000+ commits/year <GoArrowRight /> Luffy
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          2000+ commits/year <GoArrowRight /> Roronoa Zoro
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          1000+ commits/year <GoArrowRight /> Goku
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          500+ commits/year <GoArrowRight /> Aizen Sosuke
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          200+ commits/year <GoArrowRight /> Naruto
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          50+ commits/year <GoArrowRight /> Itoshi Sae{" "}
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          Less than 50 commits <GoArrowRight />
                          Satoru Gojo{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl opacity-50"></div>

                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-gray-900/95 to-gray-800/95 rotate-45 border-r border-b border-white/10"></div>
                  </div>
                </div>
              </div>
              <div className="bg-green-300/20 p-2 rounded-md">
                <h1 className="text-[13px]">🔥 Longest Streak</h1>
                <h1 className="text-green-500 font-semibold text-lg">
                  {userStats?.stats?.longestStreak || "999 Days"}
                </h1>
              </div>
              <div className="bg-yellow-300/20 p-2 rounded-md">
                <h1 className="text-[13px]"> 🎖️ Total Commits</h1>
                <h1 className="text-yellow-500 font-semibold text-lg">
                  {userStats?.stats?.totalCommits || "567"}
                </h1>
              </div>
              <div className="bg-purple-300/20 p-2 rounded-md">
                <h1 className="text-[13px]">📟 Top Language</h1>
                <h1 className="text-purple-500 font-semibold text-lg">
                  {userStats?.stats?.topLanguages?.[0] || "Rust"}
                </h1>
              </div>
              <div className="bg-blue-300/20 p-2 rounded-md">
                <h1 className="text-[13px]">📅 Most Active Month</h1>
                <h1 className="text-blue-500 font-semibold text-lg">
                  {userStats?.stats?.mostActiveMonth?.name || "June"}
                </h1>
              </div>
              <div className="bg-red-300/20 p-2 rounded-md">
                <h1 className="text-[13px]">🌤️ Most Active Day</h1>
                <h1 className="text-red-500 font-semibold text-lg">
                  {userStats?.stats?.mostActiveDay?.name || "Sunday"}
                </h1>
              </div>
              <div className="bg-teal-300/20 p-2 rounded-md">
                <h1 className="text-[13px]">⭐ Star Earn</h1>
                <h1 className="text-teal-500 font-semibold text-lg">
                  {userStats?.stats?.starsEarned || 5}
                </h1>
              </div>
              <div className="bg-orange-300/20 p-2 rounded-md relative inline-block group">
                <h1 className="text-[13px]">⚡︎ Level</h1>
                <h1 className="text-orange-500 font-semibold text-lg">
                  {characterInfo.level || "Akatsuki"}
                </h1>
                <div className="absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
                  <div className="relative p-4 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
                    <div className="space-y-2">
                      <ul className="text-sm">
                        <li className="flex items-center gap-2 text-gray-300 ">
                          5000+ commits : Akatsuki
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          2000+ commits : Jujutsu Special
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          1000+ commits : Saiyan God
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          500+ commits : Hasira
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          200+ commits : Hokage
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          50+ commits : Swordsman{" "}
                        </li>
                        <li className="flex items-center gap-2 text-gray-300 ">
                          Less than 50 commits : Rookie
                        </li>
                      </ul>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl opacity-50"></div>

                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-gray-900/95 to-gray-800/95 rotate-45 border-r border-b border-white/10"></div>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm">git-wrapped.dotdazzle.in</p>
            </div>
          </div>
        </div>
      </div>
      <div ref={buttonsRef} className="flex items-center justify-center gap-5">
        <button onClick={handleDownload} className="text-white">
          Download
        </button>
        <Link to="/" className="text-white">
          Generate Your Wrapped
        </Link>
      </div>
    </div>
  );
};

export default Share;
