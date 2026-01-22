import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../src/context/userContext";
import Loading from "../src/components/Loading";

const SubscriptionRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  // Not logged in or not subscribed
  if (!user.hasPaid) {
    return <Navigate to="/subscriptionpage" replace />;
  }

  return children;
};

export default SubscriptionRoute;
