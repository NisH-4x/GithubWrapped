
import React, { useEffect } from 'react'
import { useGlobalContext } from "../context/GloabalContext";

const ToastNotification: React.FC = () => {
    const { notification, setNotification } = useGlobalContext()

    useEffect(() => {
        const id = setTimeout(() => {
            setNotification(null)
        }, 2000)
        return () => clearTimeout(id)
    }, [])

    return (
        <div className='w-full fixed top-10 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center'>
            <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
                <div
                    className="animate-slide-down cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]"
                >
                    <div className="flex gap-2">
                        <div className="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-white">{notification.msg}</p>
                            <p className="text-gray-500">{notification.text}</p>
                        </div>
                    </div>
                    <button
                        className="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ToastNotification