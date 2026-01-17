import axios from "axios";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

const PromoteUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");

  const fetchAllUserDetails = async () => {
    try {
      const response = await axios.get("/api/user/getallusers");
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUserDetails();
  }, []);

  const upgradeRole = async (userId) => {
    try {
      const response = await axios.put(`/api/user/updaterole/${userId}`);
      toast.success(response.data.message);
      await fetchAllUserDetails();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const filteredUsers =
    searchEmail.trim() === ""
      ? []
      : users
          .filter((user) =>
            user.email.toLowerCase().includes(searchEmail.toLowerCase())
          )
          .slice(0, 3);

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="flex">
        <SideBar />
        
        <main className="flex-1 p-6 flex justify-center mt-10">
          <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-primary mb-4">
                User Management
              </h2>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Search by Email</span>
                </label>
                <input
                  type="text"
                  placeholder="example@mail.com..."
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="input input-bordered input-primary w-full"
                />
              </div>

              <div className="divider text-xs opacity-50 uppercase">Results</div>

              {loading && (
                <div className="flex justify-center p-4">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              )}

              {/* User List with Toggleable Arrows */}
              <div className="space-y-3">
                {!loading && filteredUsers.map((user) => (
                  <div key={user._id} className="collapse collapse-arrow bg-base-200 border border-base-300">
                    {/* Checkbox makes the arrow and collapse toggleable */}
                    <input type="checkbox" className="peer" /> 
                    
                    <div className="collapse-title flex items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          <span>{user.username.charAt(0).toUpperCase()}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{user.username}</p>
                        <p className="text-xs opacity-60">{user.email}</p>
                      </div>
                    </div>

                    <div className="collapse-content">
                      <div className="flex justify-between items-center bg-base-100 p-4 rounded-lg border border-base-300 mt-2">
                        <div>
                          <span className="text-[10px] font-bold block opacity-50 mb-1">CURRENT STATUS</span>
                          <div className={`badge badge-sm ${user.role === 'admin' ? 'badge-secondary' : 'badge-ghost'} font-mono uppercase`}>
                            {user.role}
                          </div>
                        </div>
                        <button
                          className={`btn btn-sm ${user.role === 'admin' ? 'btn-outline btn-error' : 'btn-primary'}`}
                          onClick={() => upgradeRole(user._id)}
                        >
                          {user.role === "admin" ? "Demote" : "Promote"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {!searchEmail && (
                <div className="text-center py-10 opacity-40">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                   <p className="text-sm italic">Search for a user to manage roles</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PromoteUserPage;