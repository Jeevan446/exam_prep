


function HomeContent(){

    return(
        <div className = " flex items-center justify-around mt-[30vh] flex-col bg-slate-300 gap-6 p-32 ml-40 mr-40 border-2 border-slate-400 rounded-xl drop-shadow-slate-800 h-screen">
            <div className=" flex gap-24 border-b-2 w-full justify-center pb-4">
                <button className="font-bold relative group flex bg-slate-400  p-6 text-slate-900 border-none rounded-xl  cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-600">
                        Demo Mode
                </button>

                <button className="font-bold relative group flex bg-slate-400  p-6 text-slate-900 border-none rounded-xl  cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-600">
                       Practice Mode
                </button>
            </div>
                    
                <button className="font-bold relative group flex bg-slate-400  p-6 text-slate-900 border-none rounded-xl  cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-600">
                        Demo Mode
                </button>  
        </div>
    );
}

export default HomeContent;