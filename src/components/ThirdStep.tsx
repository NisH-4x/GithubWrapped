import React from 'react'

const ThirdStep : React.FC = () => {
    return (
        <div
            className="absolute inset-0 flex z-50 items-center justify-center text-white transition-opacity duration-700 ease-in-out mt-5"
        >

            <video src="./itachi.mp4" autoPlay loop className='z-50'></video>
        </div>
    )
}

export default ThirdStep