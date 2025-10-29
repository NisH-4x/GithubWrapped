import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";

type User = {
  username: string;
  profile: string;
  character: string;
  score: number;
  commits: number;
  streak: number;
};

const rank = ["./first.png", "./second.png", "./third.png"];

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.6"],
  });
  const [loading, setLoading] = useState(true);

  // keep your animation exactly the same
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/stats/leaderboard`);
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      }
    };
    fetchTopUsers();
  }, []);

  const skeleton = Array(10).fill(0);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="bg-black z-40 md:min-w-6xl md:max-w-xl mt-10 transition-transform duration-300"
    >
      {/* ------- Mobile-only compact cards (no desktop changes) ------- */}
      <div className="md:hidden space-y-2 min-w-[19rem]">
        {(loading ? skeleton : users).map((_, idx) =>
          loading ? (
            <div key={`sk-${idx}`} className="rounded-lg border border-gray-700 bg-[#18181C] p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#212121] animate-pulse rounded-sm" />
                <div className="w-10 h-10 bg-[#212121] animate-pulse rounded-full" />
                <div className="flex-1">
                  <div className="h-4 w-28 bg-[#212121] animate-pulse rounded-sm" />
                  <div className="h-3 w-20 mt-2 bg-[#212121] animate-pulse rounded-sm" />
                </div>
                <div className="w-16 h-7 bg-[#212121] animate-pulse rounded-sm" />
              </div>
            </div>
          ) : (
            <div key={users[idx].username} className="rounded-lg border border-gray-700 bg-[#18181C] p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-gray-300 bg-[#121111] rounded-sm">
                  {idx + 1 <= 3 ? <img src={rank[idx]} className="w-7" /> : idx + 1}
                </div>

                <a href={`https://github.com/${users[idx].username}`}>
                  <img
                    src={users[idx].profile}
                    alt={users[idx].username}
                    className="w-10 h-10 rounded-full border border-white/20"
                  />
                </a>

                <div className="flex-1">
                  <a
                    href={`https://github.com/${users[idx].username}`}
                    className="block text-white text-sm font-medium hover:underline"
                  >
                    {users[idx].username}
                  </a>
                  <p className="text-xs text-purple-300 line-clamp-1">{users[idx].character}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-400">Commits</div>
                  <div className="text-sm text-white">{users[idx].commits}</div>
                  <div className="text-xs mt-1 text-pink-400">{users[idx].streak}🔥</div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* ------- Original desktop/table view (unchanged) ------- */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-lg border border-gray-700 bg-[#18181C]">
          <table className="w-full divide-y divide-gray-700 text-sm">
            <thead className="bg-[#121111] text-gray-300 text-xs">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-sm">Rank</th>
                <th className="px-4 py-3 text-left font-semibold text-sm">Username</th>
                <th className="px-4 py-3 text-left font-semibold text-sm">Character</th>
                <th className="px-4 py-3 text-left font-semibold text-sm">Commits</th>
                <th className="px-4 py-3 text-left font-semibold text-sm">Streak</th>
              </tr>
            </thead>
            <tbody className="text-white divide-y divide-gray-700/50">
              {loading
                ? Array(10)
                    .fill("")
                    .map((_, i) => (
                      <tr key={`sk-row-${i}`} className="hover:bg-[#1a1a1a] transition">
                        <td className={`px-4 py-3 font-semibold text-gray-400 `}>
                          <div className="bg-[#212121] w-8 h-7 animate-pulse rounded-xs"></div>
                        </td>
                        <td className="px-4 py-3 flex item-center gap-4">
                          <div className="bg-[#212121] w-8 h-8 rounded-full animate-pulse "></div>
                          <div className="bg-[#212121] w-20 h-7 animate-pulse rounded-xs"></div>
                        </td>
                        <td className="px-4 py-3 text-purple-300">
                          <div className="bg-[#212121] w-24 h-7 animate-pulse rounded-xs"></div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="bg-[#212121] w-16 h-7 animate-pulse rounded-xs"></div>
                        </td>
                        <td className="px-4 py-3 text-pink-400">
                          <div className="bg-[#212121] w-16 h-7 animate-pulse rounded-xs"></div>
                        </td>
                      </tr>
                    ))
                : users.map((user, idx) => (
                    <tr key={user.username} className="hover:bg-[#1a1a1a] transition">
                      <td className={`px-4 ${idx + 1 > 3 && "pl-7"} py-3 font-semibold text-gray-400`}>
                        {idx + 1 <= 3 ? <img src={rank[idx]} className="w-9" /> : idx + 1}
                      </td>
                      <td className="px-4 py-3 flex item-center gap-4">
                        <a href={`https://github.com/${user.username}`}>
                          <img
                            src={user.profile}
                            alt={user.username}
                            className="w-8 h-8 rounded-full border border-white/20"
                          />
                        </a>
                        <a href={`https://github.com/${user.username}`} className="mt-1 hover:underline">
                          {user.username}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-purple-300">{user.character}</td>
                      <td className="px-4 py-3">{user.commits}</td>
                      <td className="px-4 py-3 text-pink-400">{user.streak}🔥</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
