import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function PrivateRoute() {
  // Get the token from the global authentication context.
  const { token } = useContext(AuthContext);

  // If a token exists, the user is authenticated, so render the requested page (Outlet).
  // If not, redirect the user to the login page.
  return token ? <Outlet /> : <Navigate to="/login" />;
}
