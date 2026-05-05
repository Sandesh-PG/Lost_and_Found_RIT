import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { FaBars, FaTimes, FaSignInAlt } from "react-icons/fa";
import defaultAvatar from "../assets/default-avatar.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/lost", label: "Lost" },
  { to: "/found", label: "Found" },
  { to: "/report-lost", label: "Report Lost" },
  { to: "/report-found", label: "Report Found" },
];

const Navbar = () => {
  const { token, currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const avatarUrl = currentUser?.avatar || defaultAvatar;

  const isActive = (path) => location.pathname === path;

  if (!token) {
    return (
      <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-blue-600"
        >
          Lost<span className="text-gray-800">N</span>Found
        </Link>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-wide text-blue-600"
      >
        Lost<span className="text-gray-800">N</span>Found
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        {navLinks.map(({ to, label }) => (
          <Link
            to={to}
            key={label}
            className={`text-base font-medium hover:text-blue-700 transition ${
              isActive(to)
                ? "text-blue-400 border-b-2 border-blue-400" // Active state - light orange
                : "text-gray-700" // Default state
            }`}
          >
            {label}
          </Link>
        ))}
        {token && (
          <Link to="/profile" className="block">
            <img
              src={avatarUrl}
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-600 hover:border-blue-800 transition"
              title={currentUser?.username || "Profile"}
            />
          </Link>
        )}
      </div>

      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full z-30 bg-white border-b shadow-md flex flex-col gap-4 px-6 py-4 md:hidden">
          {navLinks.map(({ to, label }) => (
            <Link
              to={to}
              key={label}
              className="text-base font-medium py-2 hover:text-blue-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {token && (
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex justify-center"
            >
              <img
                src={avatarUrl}
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-600 hover:border-blue-800 transition"
                title={currentUser?.username || "Profile"}
              />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
