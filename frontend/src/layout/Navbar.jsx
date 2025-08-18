import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
  const avatarUrl = currentUser?.avatar || defaultAvatar;

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
            className="text-base font-medium hover:text-blue-700 transition"
          >
            {label}
          </Link>
        ))}
        {token ? (
          <Link to="/profile" className="block">
            <img
              src={avatarUrl}
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-600 hover:border-blue-800 transition"
              title={currentUser?.username || "Profile"}
            />
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <FaSignInAlt />
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Sign Up
              </button>
            </Link>
          </>
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
          {token ? (
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
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="flex items-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <FaSignInAlt />
                  Sign In
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <button className="flex items-center gap-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
