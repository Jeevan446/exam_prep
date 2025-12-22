function NavBar() {
    // Added responsive text sizes and horizontal padding
    const btnClass = "font-bold relative group bg-slate-200 text-slate-900 border-none rounded-xl px-3 md:px-6 py-2 cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-600 text-xs md:text-base";
    const underlineClass = "absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-600 group-hover:w-full";

    return (
        <div className="bg-slate-400 text-black flex justify-between items-center p-4 h-16 z-20 fixed top-0 w-full border-b-2 border-slate-900">
            <div className="flex items-center font-bold">
                <p>LOGO</p>
            </div>

            {/* Hidden on mobile, flex on medium (md) screens and up */}
            <div className="hidden lg:flex justify-center items-center gap-4 lg:gap-16">
                <button className={btnClass}>
                    <span className="relative">COURSES<span className={underlineClass}></span></span>
                </button>
                <button className={btnClass}>
                    <span className="relative">NOTICE<span className={underlineClass}></span></span>
                </button>
                <button className={btnClass}>
                    <span className="relative">ABOUT US<span className={underlineClass}></span></span>
                </button>
            </div>

            {/* Smaller gap for mobile, larger for desktop */}
            <div className="flex gap-2 md:gap-12 items-center">
                <button className={btnClass}>
                    <span className="relative">SUBSCRIPTION<span className={underlineClass}></span></span>
                </button>
                <button className={btnClass}>
                    <span className="relative">ACCOUNT<span className={underlineClass}></span></span>
                </button>
            </div>
        </div>
    );
}

export default NavBar;