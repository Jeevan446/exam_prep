import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const AdminPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full">

            {/* Navbar */}
            <Navbar />

            <main className="mt-[10vh] w-full bg-red-300 p-4">

                {/* Card row */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1 flex flex-col min-w-[150px] p-4  bg-green-200 rounded text-center">
                        <span>Total no of users</span>
                        <span>1000</span>
                    </div>
                    <div className="flex-1 flex flex-col min-w-[150px] p-4  bg-green-200 rounded text-center">
                        <span>Total of questions</span>
                        <span>1000</span>
                    </div>
                    <div className="flex-1 flex flex-col min-w-[150px] p-4  bg-green-200 rounded text-center">
                        <span>active users</span>
                        <span>1000</span>
                    </div>
                    <div className="flex-1 flex flex-col min-w-[150px] p-4  bg-green-200 rounded text-center">
                        <span>Total no of users</span>
                        <span>1000</span>
                    </div>

                </div>


                {/* Buttons row */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add questions
                    </button>
                    <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add questions for live questions
                    </button>
                     <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
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
