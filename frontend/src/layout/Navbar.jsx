import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Correct the path if necessary

const Navbar = () => {
  // Use the token and logout function from the context
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the backend to invalidate the session/cookie
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Important for sending the httpOnly cookie
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Always update the frontend state and redirect
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div>
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-blue-600"
        >
          Lost<span className="text-gray-800">N</span>Found
        </Link>
      </div>
      <div className="flex gap-4">
        {/* Check for the token to determine if the user is logged in */}
        {token ? (
          <>
            <Link to="/profile">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Profile
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;