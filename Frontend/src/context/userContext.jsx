import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);      
  const [loading, setLoading] = useState(true); 
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // Set token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Load user profile if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        setAuthToken(token);
        try {
          const res = await axios.get("/api/users/profile");
          setUser(res.data);
        } catch (err) {
          console.error(err);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post("/api/user/register", formData);
      return res.data; // message & user
    } catch (err) {
      throw err.response?.data?.message || "Registration failed";
    }
  };

  // Login user
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("/api/user/login", { email, password });
      const { token, user } = res.data;
      setToken(token);
      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(user);
      return user;
    } catch (err) {
      throw err.response?.data?.message || "Login failed";
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  // Change password
  const changePassword = async ({ currentPassword, newPassword }) => {
    try {
      const res = await axios.put("/api/users/change-password", { currentPassword, newPassword });
      return res.data.message;
    } catch (err) {
      throw err.response?.data?.message || "Password change failed";
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        token,
        login,
        logout,
        register,
        changePassword,
        setUser,
        setToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const useUser = () => useContext(UserContext);
