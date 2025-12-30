import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';

const AdminPage = ( { isOpen, setIsOpen} ) => {
    return (
        <div className="flex flex-col min-h-screen w-full items-center justify-center ">

            {/* Navbar */}
            <Navbar />

            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

            <main className="mt-[20vh] w-full bg-gray-300 border-2 border-black ml-auto mr-auto justify-center p-30">

                {/* Card row */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1 flex flex-col min-w-[150px] p-4  bg-gray-500 rounded text-center text-white">
                        <span>Total no of users</span>
                        <span>1000</span>
                    </div>
                    <div className="flex-1 flex flex-col min-w-[150px] p-4  bg-gray-500 rounded text-center text-white">
                        <span>Total of questions</span>
                        <span>1000</span>
                    </div>
                    <div className="flex-1 flex flex-col min-w-[150px] p-4  bg-gray-500 rounded text-center text-white">
                        <span>active users</span>
                        <span>1000</span>
                    </div>
                    <div className="flex-1 flex flex-col min-w-[150px] p-4  bg-gray-500 rounded text-center text-white">
                        <span>Total no of users</span>
                        <span>1000</span>
                    </div>

                </div>


                {/* Buttons row */}
                <div className="flex flex-col md:flex-row justify-center gap-4">

                        <button className="px-4 py-4 font-bold md:px-9 md:py-5 bg-black lg:px-18 lg:py-6 text-white rounded-xl cursor-pointer border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all duration-500  flex justify-center ">
                            Add questions
                        </button>
                        <button className="px-4 py-4 font-bold  bg-black lg:px-18 lg:py-6 text-white rounded-xl cursor-pointer border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all duration-500  flex justify-center ">
                            Add questions for live questions
                        </button>
                        <button className="px-4 py-4 font-bold  bg-black lg:px-18 lg:py-6 text-white rounded-xl cursor-pointer border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all duration-500  flex justify-center ">
                            Add roles to users
                        </button>

                </div>

            </main>

            {/* Footer */}
            <Footer />

        </div>
    );
};

export default AdminPage;
