import { Link } from "react-router-dom";
import Footer from "./Footer";


function HomeContent({ isOpen }) {
    // Reusable button class
const btnClass = "btn btn-secondary flex text-center item-center p-6 cursor-pointer";

    return (
        <div>
            <div className={`
                grid grid-cols-1 grid-rows-3 gap-8 
                
                mt-20 md:mt-[15vh] p-6 md:p-10
                mx-4 md:mx-40 

                ml-18
                
                 ${isOpen ? "lg:ml-80 duration-300" : "lg:ml-40 duration-300"}

                bg-base-300 border-2 rounded drop-shadow-2xl min-h-screen 
            `}>
                
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-2 border-base-400 px-18  pb-6">
                    <p className="sm:text-md md:text-xl border p-12 max-w-md text-wrap">
                        -The Demo Mode contains different list of exam types, their subjects and questions.
                    </p>
                    <Link to = "/examtype"><button className={btnClass}>Demo Mode</button></Link>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-2 px-18 pb-6">
                    <p className="sm:text-md md:text-xl  border p-12 max-w-md">
                        Access practice sessions to improve your speed and accuracy.
                    </p>
                    <Link to = "/examtype"><button className={btnClass}>Practice Mode</button></Link>
                </div>

                {/* Row 3 */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-2 px-18  pb-6">
                    <p className="sm:text-md md:text-xl  border p-12 max-w-md">
                        Review your results and track your progress over time.
                    </p>
                    <Link to = "/examtype"><button className={btnClass}>Weekly Test</button></Link>
                    
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default HomeContent;