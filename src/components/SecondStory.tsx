import React from 'react'
import { motion } from 'framer-motion'
import { useGlobalContext } from '../context/GloabalContext';

const SecondStory: React.FC = () => {

  const { userStats, characterInfo } = useGlobalContext()

  return (
    <div className="absolute inset-0 flex z-50 items-center justify-center bg-transparent text-white mt-5">
      <div className="relative h-full w-full">

        <div className="flex items-center justify-center flex-col h-full">

          <div className="flex items-center justify-center">
            <motion.img
              src={userStats?.user?.avatar_url}
              alt=""
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-28 h-28 rounded-full border-4 border-white"
            />

            <motion.img
              src={characterInfo?.profile}
              alt=""
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-28 h-28 rounded-full -ml-8 border-4 border-white"
            />
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <h1 className="text-3xl font-bold">{userStats?.user?.login}</h1>
            <span className="font-semibold">X</span>
            <h1 className="text-3xl font-bold">{characterInfo?.name}</h1>
          </motion.div>

        </div>

      </div>
    </div>
  )
}

export default SecondStory
