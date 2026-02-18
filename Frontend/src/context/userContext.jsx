import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Load token on app start
const storedToken = localStorage.getItem("token");
if (storedToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(storedToken);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setAuthToken(token);
        const res = await axios.get("/api/user/profile");
        setUser(res.data.user);
      } catch (err) {
        console.error("Token invalid or expired");
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("/api/user/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      setAuthToken(token);
      setToken(token);
      setUser(user);

      return user;
    } catch (error) {
      if (error.response) {
        // Backend returned an error response
        const errorMessage = error.response.data?.message || "Login failed";
        throw new Error(errorMessage);
      } else if (error.request) {
        
        throw new Error("Network error. Please check your connection.");
      } else {
      
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post("/api/user/register", formData);
      return res.data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.message || "Registration failed";
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error("Network error. Please check your connection.");
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    setToken(null);
  };

  const changePassword = async (data) => {
    try {
      const res = await axios.put("/api/user/changepassword", data);
      return res.data.message;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.message || "Failed to change password";
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error("Network error. Please check your connection.");
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
  };
  
  const isAdmin = user?.role === "admin";

  const isModerator =user?.role ==="moderator"
      
  

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        setUser,
        login,
        logout,
        setToken,
        register,
        changePassword ,
        isAdmin ,
        isModerator
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
