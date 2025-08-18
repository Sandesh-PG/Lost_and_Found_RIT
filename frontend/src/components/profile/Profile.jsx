import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext.jsx";
import { FaPen, FaSignOutAlt } from "react-icons/fa";
import AvatarSelect from "./AvatarSelect";
import defaultAvatar from "../../assets/default-avatar.png";
import avatar1 from "../../assets/avatar1.png";

const avatarImages = [defaultAvatar, avatar1];

export default function Profile() {
  const { currentUser, updateProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
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
    updateProfile(form);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center relative">
        <div className="relative mb-6">
          <img
            src={form.avatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-blue-400 object-cover"
          />
          <button
            className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition"
            onClick={() => setEditingAvatar(true)}
            aria-label="Edit Avatar"
          >
            <FaPen />
          </button>
          {/* AvatarSelect modal */}
          {editingAvatar && (
            <AvatarSelect
              avatars={avatarImages}
              selected={form.avatar}
              onSelect={handleAvatarSelect}
              onClose={() => setEditingAvatar(false)}
            />
          )}
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label
              className="block text-lg font-semibold text-gray-700 mb-1"
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
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label
              className="block text-lg font-semibold text-gray-700 mb-1"
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
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
        <button
          onClick={handleLogout}
          className="w-full mt-6 py-2 rounded-lg bg-red-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}
