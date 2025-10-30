import React from 'react'

const Header: React.FC = () => {
    return (
        <div className='flex w-full justify-end sm:p-7 py-7 px-4 mb-20 z-50'>
            <a
                href="https://github.com/NISHANTCHAUHAN1/Github-wrapped-clientt"
                target='_blank'
                className="flex cursor-pointer overflow-hidden items-center  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9  py-2 px-4 whitespace-pre md:flex group relative  justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black ring-offset-1"
            >
                <span
                    className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"
                ></span>
                <div className="flex items-center gap-1 text-base font-medium ">
                     <div className="ml-2 flex items-center gap-1 text-sm md:flex">
                    <svg
                        className="w-4 h-4 text-white transition-all duration-300 group-hover:text-yellow-300"
                        data-slot="icon"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.orgher/2000/svg"
                    >
                        <path
                            clip-rule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill-rule="evenodd"
                        ></path>
                    </svg>
                </div>
                    <span className="ml-1 text-white">Star on GitHub</span>
                </div>
               
            </a>


        </div>
    )
}

export default Header