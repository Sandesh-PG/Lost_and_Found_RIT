import React, { useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLogin, loading } = useContext(AuthContext);

  // Wait until auth checking is complete
  if (loading) {
    return null; // Or show a spinner
  }

  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
