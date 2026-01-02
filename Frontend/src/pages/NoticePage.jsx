import { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";

const NoticePage = ({ isOpen, setIsOpen }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-gray-100">
      <NavBar />

    
      <div className="flex pt-16">
        {/* Sidebar */}
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content */}
        <main
          className={`
            flex-1 
            p-4 sm:p-6 
            transition-all duration-300
        ${isOpen ? "lg:ml-64 duration-300" : "lg:ml-15 duration-300"}`}
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Notices</h1>

          {loading ? (
            <p>Loading notices...</p>
          ) : notices.length === 0 ? (
            <p>No notices available.</p>
          ) : (
            <div className="grid gap-4 ml-[15%] md:ml-[8%] lg:ml-[2%]">
              {notices.map((notice) => (
                <div
                  key={notice._id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <p className="text-lg">{notice.message}</p>
                  <p className="text-[12px] md:text-sm lg:text-[15px] text-gray-500 mt-2">
                    {new Date(notice.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default NoticePage;
