import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
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
  const displayName =
    currentUser?.name ||
    currentUser?.username ||
    [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(" ") ||
    "Profile";

  const isActive = (path) => location.pathname === path;

  if (!token) {
    return (
      <nav className="relative overflow-hidden border-b border-slate-200/80 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-md">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70" />
        <div className="absolute right-6 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full bg-blue-100/40 blur-3xl md:block" />

        <div className="relative flex items-center justify-between gap-4">
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-600/25 transition duration-300 group-hover:scale-105">
              L
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-2xl font-extrabold tracking-wide text-blue-600">
                Lost<span className="text-slate-800">N</span>Found
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Campus community support board
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              Find, report, and recover faster
            </div>
            <div className="h-9 w-px bg-slate-200" />
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
              Trusted lost & found board
            </div>
          </div>

          <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm md:hidden">
            Lost & Found
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="relative z-50 flex w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-6 py-4 shadow-sm backdrop-blur-md">
      <Link to="/" className="group flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-600/25 transition duration-300 group-hover:scale-105">
          L
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-2xl font-extrabold tracking-wide text-blue-600">
            Lost<span className="text-slate-800">N</span>Found
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Campus community support board
          </span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
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
        className="relative z-[70] md:hidden focus:outline-none"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu backdrop"
            className="fixed inset-0 top-[86px] z-[60] bg-slate-900/30 md:hidden"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed inset-x-0 top-[86px] z-[65] max-h-[calc(100vh-86px)] overflow-y-auto border-b border-slate-200 bg-white px-6 py-5 shadow-xl md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map(({ to, label }) => (
                <Link
                  to={to}
                  key={label}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-slate-800 transition hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
              >
                <img
                  src={avatarUrl}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full border-2 border-blue-600"
                  title={displayName}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900">{displayName}</span>
                  <span className="text-xs font-medium text-slate-500">View profile</span>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
