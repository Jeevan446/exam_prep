import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../Frontend/src/context/userContext";
import Loading from "../src/components/Loading";

const ProtectedRoute = ({ children, requirePrivilege = false }) => {
  const { user, loading, isAdmin, isModerator } = useUser();

  if (loading) return <Loading />;

  //  If not logged in at all, go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //only Admin and Moderator can acess this page
  if (requirePrivilege) {
    if (isAdmin || isModerator) {
      return children;
    } else {
      
      return <Navigate to="/" replace />; 
    }
  }


  return children;
};

export default ProtectedRoute;