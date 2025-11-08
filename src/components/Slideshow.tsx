import React, { useState, useEffect, useRef, use } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Stats from "./Stats";
import SecondStory from "./SecondStory";
// import ThirdStep from "./ThirdStep";
import ForthStep from "./ForthStep";
import { useGlobalContext } from "../context/GloabalContext";
import MusicPlayer from "./MusicPlayer";
import RepoPromoCard from "./RepoPromoCard";
import YearCascadeSlide from "./YearCascadeSlide";
const AUTO_PLAY_INTERVAL = 8000; // milliseconds

const loadingMessages: string[] = [
  "Wrapping your GitHub year...",
  "Analyzing commits and stars...",
  "Pulling contributions from the matrix...",
  "Sorting PRs and issues...",
  "Making your stats beautiful...",
];

// const characterMap = [
//   {
//     min: 5000,
//     profile:
//       "https://i.pinimg.com/736x/c4/d8/bd/c4d8bd2bc75d17c9bec2edf92c7aa8e8.jpg",
//     name: "Itachi",
//     gif: "/itachigif.gif",
//     level: "Akatsuki",
//   },
//   {
//     min: 2000,
//     profile:
//       "https://i.pinimg.com/736x/51/85/c2/5185c26e752c6c50e1f4704640c9ad96.jpg",
//     name: "Satoru Gojo",
//     gif: "/satorugojogif.gif",
//     level: "Jujutsu Special",
//   },
//   {
//     min: 1000,
//     profile:
//       "https://i.pinimg.com/736x/c5/65/9e/c5659e228862cc1911e80bc7d11d09de.jpg",
//     name: "Goku",
//     gif: "/gokugif.gif",
//     level: "Saiyan God",
//   },
//   {
//     min: 500,
//     profile:
//       "https://i.pinimg.com/736x/da/23/b9/da23b9fe3f689477e1ba960b3c6c8e39.jpg",
//     name: "Kakashi",
//     gif: "/kakashigif.gif",
//     level: "Hasira",
//   },
//   {
//     min: 200,
//     profile:
//       "https://i.pinimg.com/736x/11/d4/13/11d41360d4d51ad3e07eca1f4bc7f8dd.jpg",
//     name: "Naruto",
//     gif: "/narutogif.gif",
//     level: "Hokage",
//   },
//   {
//     min: 50,
//     profile:
//       "https://i.pinimg.com/736x/79/e2/c9/79e2c9402014ead1eebf6c9f184c5bf8.jpg",
//     name: "Roronoa Zoro",
//     gif: "zorogif.gif",
//     level: "Swordsman",
//   },
//   {
//     min: 0,
//     profile:
//       "https://i.pinimg.com/736x/a8/2d/76/a82d7650231cbc5cbfba1920d07003fb.jpg",
//     name: "Luffy",
//     gif: "luffygif.gif",
//     level: "Rookie",
//   },
// ];


const characterMap = [
  {
    min: 5000,
    profile:
      "https://i.pinimg.com/736x/a8/2d/76/a82d7650231cbc5cbfba1920d07003fb.jpg",
    name: "Luffy",
    gif: "luffy.gif",
    level: "Priate King",
  },
  {
    min: 2000,
    profile:
      "https://i.pinimg.com/736x/79/e2/c9/79e2c9402014ead1eebf6c9f184c5bf8.jpg",
    name: "Roronoa Zoro",
    gif: "zorogif.gif",
    level: "Swordsman",
  },
  {
    min: 1000,
    profile:
      "https://i.pinimg.com/736x/c5/65/9e/c5659e228862cc1911e80bc7d11d09de.jpg",
    name: "Goku",
    gif: "/gokugif.gif",
    level: "Saiyan God",
  },
  {
    min: 500,
    profile:
      "https://i.pinimg.com/736x/ee/47/18/ee47184776cd7d44bcb8f72ff21751aa.jpg",
    name: "Aizen Sosuke",
    gif: "/aizen.gif",
    level: "Soul Reaper ",
  },
  {
    min: 200,
    profile:
      "https://i.pinimg.com/736x/11/d4/13/11d41360d4d51ad3e07eca1f4bc7f8dd.jpg",
    name: "Naruto",
    gif: "/narutogif.gif",
    level: "Hokage",
  },
  {
    min: 50,
    profile:
      "https://i.pinimg.com/736x/4c/68/b1/4c68b1d22a2bc422d039b6ffb2d5cdfb.jpg",
    name: "Itoshi Sae",
    gif: "/sea.gif",
    level: "GOAT",
  },
  {
    min: 0,
    profile:
      "https://i.pinimg.com/736x/51/85/c2/5185c26e752c6c50e1f4704640c9ad96.jpg",
    name: "Satoru Gojo",
    gif: "/satorugojogif.gif",
    level: "Jujutsu Special",
  },
];



const SlideShow: React.FC = () => {
  const {
    user,
    username,
    userStats,
    setUserStats,
    notification,
    setNotification,
    setCharacterInfo,
  } = useGlobalContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const username = queryParams.get('username')
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      setNotification({
        msg: "User not found",
        text: "Please check username and try again",
      });
      navigate("/");
      return;
    }
  }, [username]);

  // Update loading message every 2.5 seconds
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [loading]);

  const slides = [
    <SecondStory />,
    <YearCascadeSlide year={2025} rows={5} />,
    <ForthStep />,
    <RepoPromoCard />,
    <Stats />,
  ];

  const getCharacterInfo = (totalCommits: number) => {
    return (
      characterMap.find(({ min }) => totalCommits >= min) ||
      characterMap[characterMap.length - 1]
    );
  };

  //============== get user stats ======================
  useEffect(() => {
    const fetchUserStats = async () => {
      if (!username) return;
      try {
        const statsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/stats?username=${username}`
        );

        // const user = userRes.data;
        const stats = statsRes.data;
        setUserStats({ user, stats });

        const totalCommits = stats.totalCommits || 0;
        console.log(stats.totalCommits);

        const characterInfo = getCharacterInfo(stats.totalCommits);
        setCharacterInfo(characterInfo);
        console.log(characterInfo);

        // Save/update to your MongoDB via backend
        await axios.post(`${import.meta.env.VITE_API_URL}/api/stats/save`, {
          username,
          user,
          stats,
          characterInfo,
        });
        console.log(user, user, characterInfo);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [username]);

  const goNext = () => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const canAutoPlay = !loading && currentIndex < slides.length;

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white relative overflow-hidden">
      {loading ? (
        <div className="text-center max-w-xs mx-auto flex flex-col items-center justify-center space-y-4 p-6  rounded-lg shadow-lg">
          <div className="loader"></div>
          <p className="text-white/70 animate-pulse text-sm">
            {loadingMessages[loadingIndex]}
          </p>
        </div>
      ) : (
        <div
          className={`max-w-md min-w-[350px] h-[620px] rounded-md relative overflow-visible border border-white/10  shadow-lg bg-slate-950`}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute top-0 left-0 w-full flex gap-1 p-2 z-30 bg-transparent">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 h-1 relative overflow-hidden rounded bg-white/15"
              >
                {/* Completed strips */}
                {idx < currentIndex && (
                  <div className="absolute inset-0 bg-white" />
                )}

                {/* Active strip — animated */}
                {idx === currentIndex && canAutoPlay && (
                  <motion.div
                    key={currentIndex}
                    className="absolute inset-y-0 left-0 w-full bg-white" // note the w-full
                    style={{ transformOrigin: "left" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: AUTO_PLAY_INTERVAL / 1000,
                      ease: "linear",
                    }}
                    onAnimationComplete={goNext}
                  />
                )}
              </div>
            ))}
          </div>

          {slides[currentIndex]}
        </div>
      )}

      {/* Navigation Buttons */}
      {!loading && (
        <div className="absolute top-1/2 left-10 right-10 flex justify-between items-center px-4 transform -translate-y-1/2 z-30">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={`bg-white/10 text-white p-3 rounded-full disabled:opacity-30 ${
              currentIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <MdOutlineKeyboardArrowLeft size={24} />
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === slides.length - 1}
            className={`bg-white/10 text-white p-3 rounded-full disabled:opacity-30 ${
              currentIndex === slides.length - 1
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <MdKeyboardArrowRight size={24} />
          </button>
        </div>
      )}

      {!loading && <MusicPlayer />}
    </div>
  );
};

export default SlideShow;
