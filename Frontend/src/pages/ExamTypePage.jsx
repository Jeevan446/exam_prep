import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function ExamTypePage({ isOpen, setIsOpen }) {
    return (
        <div>

            <main className="grow">

                <NavBar />

                <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

                <h1 className={`
                    font-bold text-2xl
                    mt-20 md:mt-[15vh]
                    mx-4 md:mx-40 
                    ml-18
                    ${isOpen ? "lg:ml-80 duration-300" : "lg:ml-40 duration-300"}
                `}>Please select your exam type:</h1>

                <div className={`
                    flex flex-col col-gap-8 
                    
                    mt-1 md:mt-1 p-6 md:p-10
                    mx-4 md:mx-40 

                    ml-18
                    
                    {} ${isOpen ? "lg:ml-80 duration-300" : "lg:ml-40 duration-300"}

                    bg-slate-300 border-2 border-slate-400 rounded-xl drop-shadow-2xl min-h-screen
                `}>

                    <p className="border-b border-slate-400"> 
                        <h1 className="font-bold  ">IOST</h1>
                        Institute of Science and Technology is a institute of TU that provides Programs like:
                        B.Sc. (Nutrition & Dietetics)
                        B.Sc. CSIT (Computer Science & Information Technology)
                        B.Math Sc. (Bachelor in Mathematical Sciences)
                        BIT (Bachelor in Information Technology)
                        BDS (Bachelor in Data Science)
                        B.Tech (Food Technology). <br />
                        <button className="font-bold relative group bg-slate-200 text-slate-900 border-none rounded-xl 
                        px-3 md:px-6 py-2 cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-600 text-xs md:text-base">
                            IOST
                        </button>
                    </p>
                </div>

            </main>

            <Footer />
        </div>
    );
}

export default ExamTypePage;