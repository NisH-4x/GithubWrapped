
import React, { useState } from 'react'
import Header from '../components/Header'
import { FaGithub } from 'react-icons/fa'
import Leaderboard from '../components/Leaderboard'
import { useNavigate } from 'react-router-dom'
import { ImSpinner2 } from 'react-icons/im'
import { useGlobalContext } from '../context/GloabalContext'
import axios from 'axios'
import ToastNotification from '../components/ToastNotification'

const Home: React.FC = () => {

    const { setUser, username, setUsername, notification, setNotification } = useGlobalContext()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserStats = async () => {
        setLoading(true);
        if (!username) {
            setLoading(false);
            return;
        }
        try {
            const res = await axios.get(`https://api.github.com/users/${username}`);
            if (res.status == 200) {
                setUser(res.data)
                navigate(`/stats`);
            }
        } catch (err) {
            setNotification({ msg: "User not found", text: "Please check username and try again" })
            console.error('Error fetching GitHub user:', err);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="relative min-h-screen w-full">
            <div className="absolute z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#F5F5F5B3_50%,transparent_100%)]">
            </div>
            <div className='w-full text-white h-full flex items-center flex-col z-[10000] bg-transparent px-4 overflow-hidden'>
                <Header />
                <h1 className='text-3xl sm:text-6xl md:text-7xl font-bold'>Code, Push, Merge, <br /></h1>
                <h1 className='text-3xl sm:text-6xl md:text-7xl font-bold'> Repeat - Wrapped.</h1>
                <p className=' mt-8 text-sm text-center md:text-lg'>See how many commits you crushed, bugs you squashed, and stars you earned.</p>
                <p className='mt-2 text-sm hidden sm:block text-center md:text-lg font-outfit'>Your GitHub activity, transformed into a beautiful, shareable story.</p>
                <div className='border z-50 bg-black pl-3 pr-1.5 py-1.5 mt-5 rounded-3xl flex items-center gap-4'>
                    <FaGithub size={28} />
                    <input
                        type="text"
                        placeholder='Enter your github username'
                        className='border-none outline-none md:text-lg md:w-70'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button disabled={loading} onClick={handleUserStats} className='bg-white cursor-pointer outline-none flex justify-center items-center md:min-w-28 min-h-[40px] text-black px-4 py-1.5 text-lg rounded-3xl font-medium'>
                        {
                            loading ? <div className='animate-spin'> <ImSpinner2 size={20} /></div>
                                : 'Search'
                        }
                    </button>
                </div>

                <Leaderboard />

                <footer className='mt-20 pb-10 z-[99999] text-center'>
                    <h1 className='text-white text-sm  text-center'>build🤍 by <a href="https://nishh3.vercel.app/" target='_blank' className='underline cursor-pointer'>Nishant Chauhan</a> </h1>
                    <a href='https://nishh3.vercel.app/' className='mt-2 underline text-sm text-center'>Request a feature ⚡ or report a bug 🪲 </a>
                </footer>
            </div>

            {notification && <ToastNotification />}
        </div>

    )
}

export default Home