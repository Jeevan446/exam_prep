import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";

const AdminPage = ({ isOpen, setIsOpen }) => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Navbar */}
      <NavBar />

      {/* Sidebar */}
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <main
        className={`
          flex-1 transition-all duration-300
          pt-[5vh] px-4 sm:px-6 lg:px-10
          ${isOpen ? "lg:ml-64" : "lg:ml-20"} ml-2
        `}
      >
        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 ">
          {[
            "Total no of users",
            "Total no of questions",
            "Active users",
            "Total admins",
          ].map((title, index) => (
            <div
              key={index}
              className="bg-base-200 text-ghost rounded-xl p-5 text-center shadow-md border border-secondary/75"
            >
              <p className="text-sm opacity-80">{title}</p>
              <p className="text-2xl font-bold mt-2">1000</p>
            </div>
          ))}
        </div>

        {/* Buttons Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <button className="btn btn-info">Add questions</button>
          <button className="btn btn-info">
            Add questions for live
          </button>
          <button className="btn btn-info">
            Add roles to users
          </button>
          <button className="btn btn-info">
            Add roles to users
          </button>
          <button className="btn btn-info">
            Add roles to users
          </button>
          <button className="btn btn-info">
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
