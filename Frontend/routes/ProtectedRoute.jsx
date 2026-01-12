import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../Frontend/src/context/userContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useUser();

  // Show nothing or loader while checking user
  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;


  if (!user) return <Navigate to="/login" replace />;

  // Logged in but not admin
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

  //  User is allowed
  return children;
};

export default ProtectedRoute;
