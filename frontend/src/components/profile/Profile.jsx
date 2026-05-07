import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext.jsx";
import {
  FaPen,
  FaSignOutAlt,
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";
import AvatarSelect from "./AvatarSelect";
import defaultAvatar from "../../assets/default-avatar.png";
import avatar1 from "../../assets/avatar1.png";

const avatarImages = [defaultAvatar, avatar1];

export default function Profile() {
  const { currentUser, updateProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const displayName =
    currentUser?.name ||
    currentUser?.username ||
    [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(" ") ||
    "User";

  const [form, setForm] = useState({
    name: displayName,
    email: currentUser?.email || "",
    avatar: currentUser?.avatar || avatarImages[0],
  });

  const [editingAvatar, setEditingAvatar] = useState(false);

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarSelect = (img) => {
    setForm((prev) => ({ ...prev, avatar: img }));
    setEditingAvatar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof updateProfile === "function") {
      updateProfile(form);
    }
    alert("Profile updated!");
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, #1d4ed8 0%, #0f172a 60%, #020617 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(147,197,253,0.26),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(96,165,250,0.2),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-blue-100 backdrop-blur">
            Account Center
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Profile settings
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Manage your identity, review account details, and keep your
            lost-and-found activity up to date.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="relative mx-auto mb-6 w-fit">
              <img
                src={form.avatar}
                alt="Avatar"
                className="h-28 w-28 rounded-full border-4 border-blue-400 object-cover"
              />
              <button
                className="absolute bottom-1 right-1 rounded-full bg-blue-600 p-2 text-white shadow-lg transition hover:bg-blue-700"
                onClick={() => setEditingAvatar(true)}
                aria-label="Edit Avatar"
              >
                <FaPen />
              </button>
            </div>

            {editingAvatar && (
              <AvatarSelect
                avatars={avatarImages}
                selected={form.avatar}
                onSelect={handleAvatarSelect}
                onClose={() => setEditingAvatar(false)}
              />
            )}

            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-slate-900">{displayName}</h2>
              <p className="text-sm text-slate-500">{form.email}</p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <FaUserCircle className="text-blue-600" />
                Community member profile
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <FaEnvelope className="text-blue-600" />
                Email-based account identity
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <FaShieldAlt className="text-blue-600" />
                Secure session enabled
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Personal details
              </p>
              <h3 className="mt-2 text-3xl font-black text-slate-900">
                Edit your profile
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Keep your name current so people can identify and contact you
                correctly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-slate-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-slate-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  value={form.email}
                  disabled
                  className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700"
              >
                Save Changes
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}