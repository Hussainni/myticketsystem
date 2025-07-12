import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import Spinner from "@app/_shared/Spinner";
import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated, loading , setIsAuthenticated} = useAuth();
    if (loading) {
      return <Spinner />;
    }

    if (!isAuthenticated) {
      //  setIsAuthenticated(false);
      return <Navigate to="/auth/login" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
