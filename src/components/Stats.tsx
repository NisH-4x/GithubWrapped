import React, { useRef, useState } from "react";
import { IoIosShareAlt } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import { useGlobalContext } from "../context/GloabalContext";
import * as htmlToImage from "html-to-image";

const Stats: React.FC = () => {
  const { userStats, characterInfo } = useGlobalContext();

  // capture target
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);

  const capturePNG = async () => {
    const node = cardRef.current!;
    return htmlToImage.toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#0b1220", 
      filter: (n) => {
        if (n instanceof Element) {
          if ((n as HTMLElement).dataset?.noexport === "true") return false;
        }
        return true;
      },
    });
  };

  const handleDownload = async () => {
    if (busy) return;
    try {
      setBusy(true);
      const dataUrl = await capturePNG();
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${userStats?.user?.login || "github-year"}-stats.png`;
      a.click();
    } catch (e) {
      console.error(e);
      alert("Couldn't generate the image. Check console for details.");
    } finally {
      setBusy(false);
    }
  };

  const handleShare = async () => {
    if (busy) return;
    try {
      setBusy(true);
      const dataUrl = await capturePNG();
      const resp = await fetch(dataUrl);
      const blob = await resp.blob();
      const file = new File([blob], "stats.png", { type: "image/png" });

      const shareData: ShareData = {
        title: `${userStats?.user?.login}'s GitHub Year`,
        text: "My GitHub year in one image 🔥",
      };

      // share with file if supported
      if ((navigator as any).canShare?.({ files: [file] })) {
        await navigator.share({ ...shareData, files: [file] });
        return;
      }

      // fallback: WhatsApp text (user can attach the downloaded image)
      const text = encodeURIComponent(`${shareData.title}\n${shareData.text}`);
      window.open(`https://wa.me/?text=${text}`, "_blank");
    } catch (e) {
      console.error(e);
      alert("Sharing not available on this device. Try downloading instead.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="absolute inset-0 flex z-50 items-center justify-center text-white transition-opacity duration-700 ease-in-out mt-5 overflow-visible">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="relative h-full w-full">
        {/* capture region */}
        <div
          ref={cardRef}
          className="relative max-w-md min-w-[350px] mx-auto rounded-md overflow-"
        >
          {/* header */}
          <div className="p-3">
            {/* these paths should now point to /public, e.g.: /images/itachi.gif */}
            <img
              src={characterInfo.gif} 
              alt={characterInfo.name}
              className="rounded max-h-[150px] w-full object-cover"
            />

            <div className="flex items-center justify-center -mt-8 flex-col">
              <img
                src={userStats?.user?.avatar_url}
                alt=""
                className="w-16 h-16 rounded-full border-2"
              />
              <h1 className="mt-2 font-semibold">{userStats?.user?.login}</h1>
            </div>
          </div>

          {/* stats grid */}
          <div className="grid grid-cols-2 p-3 justify-between gap-4 overflow-visible">
            <div className="bg-pink-300/20 p-2 rounded-md relative inline-block group">
              <h1 className="text-[13px]">⛩️ Character</h1>
              <h1 className="text-pink-500 font-semibold text-lg">{characterInfo.name}</h1>

              {/* tooltip excluded from export */}
              <div
                data-noexport="true"
                className="absolute z-[500] invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2"
              >
                <div className="relative p-4 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
                  <div className="space-y-2">
                    <ul className="text-sm">
                      <li className="flex items-center gap-2 text-gray-300 ">
                        5000+ commits/year <GoArrowRight /> Itachi
                      </li>
                      <li className="flex items-center gap-2 text-gray-300 ">
                        2000+ commits/year <GoArrowRight /> Satoru Gojo
                      </li>
                      <li className="flex items-center gap-2 text-gray-300 ">
                        1000+ commits/year <GoArrowRight /> Goku
                      </li>
                      <li className="flex items-center gap-2 text-gray-300 ">
                        500+ commits/year <GoArrowRight /> Kakashi
                      </li>
                      <li className="flex items-center gap-2 text-gray-300 ">
                        200+ commits/year <GoArrowRight /> Naruto
                      </li>
                      <li className="flex items-center gap-2 text-gray-300 ">
                        50+ commits/year <GoArrowRight /> Roronoa Zoro
                      </li>
                      <li className="flex items-center gap-2 text-gray-300 ">
                        Less than 50 commits <GoArrowRight /> Luffy
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
              <h1 className="text-green-500 font-semibold text-lg">{userStats?.stats?.longestStreak}</h1>
            </div>

            <div className="bg-yellow-300/20 p-2 rounded-md">
              <h1 className="text-[13px]"> 🎖️ Total Commits</h1>
              <h1 className="text-yellow-500 font-semibold text-lg">{userStats?.stats?.totalCommits}</h1>
            </div>

            <div className="bg-purple-300/20 p-2 rounded-md">
              <h1 className="text-[13px]">📟 Top Language</h1>
              <h1 className="text-purple-500 font-semibold text-lg">{userStats?.stats?.topLanguages?.[0]}</h1>
            </div>

            <div className="bg-blue-300/20 p-2 rounded-md">
              <h1 className="text-[13px]">📅 Most Active Month</h1>
              <h1 className="text-blue-500 font-semibold text-lg">
                {userStats?.stats?.mostActiveMonth?.name}
              </h1>
            </div>

            <div className="bg-red-300/20 p-2 rounded-md">
              <h1 className="text-[13px]">🌤️ Most Active Day</h1>
              <h1 className="text-red-500 font-semibold text-lg">
                {userStats?.stats?.mostActiveDay?.name}
              </h1>
            </div>

            <div className="bg-teal-300/20 p-2 rounded-md">
              <h1 className="text-[13px]">⭐ Star Earn</h1>
              <h1 className="text-teal-500 font-semibold text-lg">
                {userStats?.stats?.starsEarned}
              </h1>
            </div>

            <div className="bg-orange-300/20 p-2 rounded-md relative inline-block group">
              <h1 className="text-[13px]">⚡︎ Level</h1>
              <h1 className="text-orange-500 font-semibold text-lg">{characterInfo.level}</h1>

              <div
                data-noexport="true"
                className="absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2"
              >
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
                        50+ commits : Swordsman
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
          </div>
        </div>

        {/* controls (excluded from image) */}
        <div className="flex justify-end items-center px-3 gap-2" data-noexport="true">
          <button
            onClick={handleShare}
            disabled={busy}
            className="bg-white/10 p-1.5 cursor-pointer rounded disabled:opacity-40"
            title="Share"
          >
            <IoIosShareAlt />
          </button>
          <button
            onClick={handleDownload}
            disabled={busy}
            className="bg-white/10 p-1.5 cursor-pointer rounded disabled:opacity-40"
            title="Download"
          >
            <MdFileDownload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stats;
