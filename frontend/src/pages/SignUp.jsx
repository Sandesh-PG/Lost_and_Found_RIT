import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext.jsx"; // Import AuthContext
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import AuthBackdrop from "../components/AuthBackdrop";

const Signup = () => {
  const { setIsLogin } = useContext(AuthContext); // Use context setter
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        // Optionally auto-login by setting login state and navigating home:
        // setIsLogin(true);
        // navigate("/");

        // Or redirect to login page with alert:
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      alert("Server error! Please try again.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  //...rest of your component remains unchanged

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-slate-50 px-4 py-10">
      <AuthBackdrop />
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Join the community
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Create your account
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Report items, search faster, and stay connected with found listings.
          </p>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/90 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
          disabled={loading}
        >
          <FcGoogle size={22} />
          <span className="font-semibold text-slate-700">Sign up with Google</span>
        </button>
        <div className="flex items-center my-6 py-1">
          <hr className="flex-1 border-slate-200" />
          <span className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">or</span>
          <hr className="flex-1 border-slate-200" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:from-emerald-700 hover:to-blue-700"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
