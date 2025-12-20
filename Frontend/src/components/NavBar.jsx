


function NavBar() {
    return (
        <div className="navbar-container bg-slate-400 text-black flex justify-between p-4 h-16 z-20 fixed top-0 w-full">



            <div className="left-section flex items-center cursor">
                <p>LOGO</p>
            </div>



            <div className="middle-section flex justify-center items-center gap-16">

                <button className="font-bold relative group bg-slate-200 text-slate-900 border-none rounded-xl px-6 py-2.5 cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-600">
                    <span className="relative">
                        COURSES
                        {/* Animated Underline */}
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-600 group-hover:w-full"></span>
                    </span>
                </button>

                <button className="font-bold relative group bg-slate-200 text-slate-900 border-none rounded-xl px-6 py-2.5 cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-600">
                    <span className="relative">
                        NOTICE
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-600 group-hover:w-full"></span>
                    </span>
                </button>

                <button className="font-bold relative group bg-slate-200 text-slate-900 border-none rounded-xl px-6 py-2.5 cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-600">
                    <span className="relative">
                        ABOUT US
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-600 group-hover:w-full"></span>
                    </span>
                </button>

            </div>



            <div className="right-section flex gap-12 items-center cursor">

                <button className="font-bold relative group bg-slate-200 text-slate-900 border-none rounded-xl px-6 py-2.5 cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-600">
                    <span className="relative">
                        SUBSCRIPTION
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-600 group-hover:w-full"></span>
                    </span>
                </button>

                <button className="font-bold relative group bg-slate-200 text-slate-900 border-none rounded-xl px-6 py-2.5 cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-600">
                    <span className="relative">
                        ACCOUNT
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-600 group-hover:w-full"></span>
                    </span>
                </button>

            </div>
        </div>
    );
}

export default NavBar;