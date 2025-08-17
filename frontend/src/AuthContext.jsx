import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
