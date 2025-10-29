import React, { useEffect, useRef, useState } from 'react'
import { FaMusic, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'

type TrackType  = {
    name : string;
    file : string
}

const tracks : TrackType[] = [
    {
        name: 'Bawe Raftaar ft. Badshah',
        file: '/bawe.mp3'
    },
    {
        name: 'Kendrick Lamar - Not Like Us',
        file: '/notlikeus.mp3'
    },
    {
        name: 'Wavy - Karan Aujla',
        file: '/wavy.mp3'
    }
]

const MusicPlayer : React.FC = () => {
    const audioRef = useRef(new Audio(tracks[1].file)) // Default track: Techno House
    const [currentTrack, setCurrentTrack] = useState(tracks[1])
    const [isMuted, setIsMuted] = useState(false)
    const [isDown, setIsDown] = useState(true);

    // Auto-play on mount
    useEffect(() => {
        audioRef.current.play()
        return () => audioRef.current.pause()
    }, [])

    // Update track
    const changeTrack = (track) => {
        if (track.name === currentTrack.name) return
        audioRef.current.pause()
        audioRef.current = new Audio(track.file)
        audioRef.current.muted = isMuted
        audioRef.current.play()
        setCurrentTrack(track)
    }

    // Mute toggle
    const toggleMute = () => {
        const newMute = !isMuted
        setIsMuted(newMute)
        audioRef.current.muted = newMute
    }

    return (
        <div className={`bg-[#111] text-gray-300 transition-all absolute ${isDown ? '-bottom-43' : 'bottom-10'} left-10 rounded-lg w-64 shadow-lg p-4 border border-white/10`}>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-base font-medium">
                    <FaMusic />
                    Music Player
                </div>
                <IoIosArrowDown onClick={()=>setIsDown(!isDown)} className={`${isDown && 'rotate-180'}`} />
            </div>

            <div className="space-y-2 mb-3">
                {tracks.map((track) => (
                    <div
                        key={track.name}
                        className={`cursor-pointer text-sm px-3 py-2 rounded-md hover:bg-white/10 transition ${currentTrack.name === track.name ? 'bg-white/10 font-semibold' : ''
                            }`}
                        onClick={() => changeTrack(track)}
                    >
                        {track.name}
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center text-xs text-blue-400">
                <span>Now Playing: {currentTrack.name}</span>
                <button onClick={toggleMute} className="text-white ml-2">
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
            </div>
        </div>
    )
}

export default MusicPlayer
