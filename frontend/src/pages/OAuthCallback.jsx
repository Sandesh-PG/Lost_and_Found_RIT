// src/pages/OAuthCallback.jsx
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const { setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(true); // Set authenticated state
    navigate("/"); // Redirect to home
  }, [setIsLogin, navigate]);

  return null;
};

export default OAuthCallback;
