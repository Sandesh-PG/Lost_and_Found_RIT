import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user-profile')) || null
  );
  const [token, setToken] = useState(localStorage.getItem('jwt-token') || null);

  const login = (userData, authToken) => {
    setCurrentUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (currentUser && token) {
      localStorage.setItem('user-profile', JSON.stringify(currentUser));
      localStorage.setItem('jwt-token', token);
    } else {
      localStorage.removeItem('user-profile');
      localStorage.removeItem('jwt-token');
    }
  }, [currentUser, token]);

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
