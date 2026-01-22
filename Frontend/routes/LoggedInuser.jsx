import React from "react";
import { Navigate } from "react-router-dom";


const LoggedinuserRoute = ({ children }) => {
  
  const isLoggedIn = !!localStorage.getItem("token"); 

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Render children if logged in
  return children;
};

export default LoggedinuserRoute;
