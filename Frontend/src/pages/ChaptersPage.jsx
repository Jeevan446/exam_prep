import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";

function ChaptersPage({ isOpen, setIsOpen}) {

    
    return (
        <div className="w-full flex flex-col items-center  justify-center">
            <NavBar />
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className=" flex mt-30 gap-4 items-center justify-center">
            
                <h1 className=" sm:text-xl  md:text-2xl text-gray-600 font-bold">
                    Select a chapter:
                </h1>

                <div
                    className={`mt-[30px]  py-10 transition-all duration-300 w-[80%] ml-16 lg:w-[70%] bg-gray-300 border-2 border-gray-400 flex flex-col gap-6 md:gap-8 items-center
                    ${isOpen ? "lg:ml-50 duration-300" : "lg:ml-20 duration-300"}
                    `}>




                </div>




            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default ChaptersPage;