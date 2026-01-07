import { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { useSidebar } from "../context/sidebarContext";


const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen } = useSidebar();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/user/getnotice");
      setNotices(response.data.data.reverse());
    } catch (error) {
      console.error("Error fetching notices:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-base">
      {/* Navbar */}
      <NavBar />

      {/* Sidebar (FIXED) */}
      <SideBar  />

      {/* Main Content */}
      <main
        className={`
          pt-5
          md:pt-17
          px-4 sm:px-6 lg:px-8
          transition-all duration-300
          ${isOpen ? "lg:ml-64" : "lg:ml-20"}
        `}
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-secondary">
          Notices
        </h1>

        {loading ? (
          <p className="text-center text-ghost">Loading notices...</p>
        ) : notices.length === 0 ? (
          <p className="text-center text-ghost">No notices available.</p>
        ) : (
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
          ">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="
                  bg-base
                  p-4 sm:p-5
                  rounded-xl
                  border border-primary/40
                  shadow-sm
                  hover:border-secondary/75 transition-colors
                "
              >
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-1 underline">
                  {notice.title}
                </h2>

                <p className="text-sm sm:text-base text-ghost leading-relaxed">
                  {notice.message}
                </p>

                <p className="text-xs sm:text-sm text-gray-500 mt-3">
                  {new Date(notice.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NoticePage;
