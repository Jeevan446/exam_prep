import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import axios from "axios";
import Loading from "../components/Loading"

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";



const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, user } = useUser();
 

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getnotice");
      setNotices(response.data.data.reverse());
    } catch (error) {
      console.error("Error fetching notices:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete notice handler (admin only)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    try {
      await axios.delete(`/api/notice/${id}`);
      setNotices((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert("Failed to delete notice");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base">
      {/* Navbar */}
      <NavBar />

      {/* Sidebar (FIXED) */}
      <SideBar />

      {/* Main Content */}
      <main
        className="flex-1 pt-5 md:pt-17 px-4 sm:px-6 lg:px-8 transition-all duration-300"
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-secondary">
          Notices
        </h1>

        {loading ? (
          <Loading />
        ) : notices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-center text-ghost">No notices available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="bg-base p-4 sm:p-5 rounded-xl border border-primary/40 shadow-sm hover:border-secondary/75 transition-colors"
              >
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-1 underline">
                  {notice.title}
                </h2>

                <p className="text-sm sm:text-base text-ghost leading-relaxed">
                  {notice.message}
                </p>

                <p className="text-xs sm:text-sm text-ghost mt-3">
                  {new Date(notice.createdAt).toLocaleString()}
                </p>

                {/* Admin controls */}
                {isAdmin && (
                  <div className="flex gap-2 mt-2">
                    {/* Edit button placeholder */}
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => alert("Edit feature coming soon")}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(notice._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
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
