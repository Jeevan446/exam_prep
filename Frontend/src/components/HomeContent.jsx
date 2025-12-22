function HomeContent({ isOpen }) {
    // Reusable button class
    const btnClass = "font-bold relative group flex bg-slate-400 p-6 text-slate-900 border-none rounded-xl cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-600";

    return (
        <div className={`
            grid grid-cols-1 grid-rows-3 gap-8 
            
            mt-20 md:mt-[25vh] p-6 md:p-20 
            mx-4 md:mx-40 

            ml-18
            
            ${isOpen ? "md:ml-80 duration-300" : "md:ml-40 duration-300"}

            bg-slate-300 border-2 border-slate-400 rounded-xl drop-shadow-2xl min-h-screen
        `}>
            
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-400 pb-6">
                <p className="text-lg text-slate-800  max-w-md text-wrap">
                    The Demo Mode contains different list of exam types, their subjects and questions.
                </p>
                <button className={btnClass}>Demo Mode</button>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-400 pb-6">
                <p className="text-lg text-slate-800 max-w-md">
                    Access practice sessions to improve your speed and accuracy.
                </p>
                <button className={btnClass}>Practice Mode</button>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-lg text-slate-800 max-w-md">
                    Review your results and track your progress over time.
                </p>
                <button className={btnClass}>Demo Mode</button>
                
            </div>

        </div>
    );
}

export default HomeContent;