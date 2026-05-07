import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../AuthContext.jsx";

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-5 w-5 text-slate-500"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export default function ReportFoundPage() {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    item: "",
    location: "",
    date: "",
    description: "",
    photoUrl: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      toast.error("You must be logged in to report an item.");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!currentUser || !currentUser._id) {
        throw new Error("User information is missing. Please log in again.");
      }

      const submissionData = {
        ...formData,
        reportedBy: currentUser._id,
      };

      const res = await fetch("/api/found", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message || "An unknown error occurred.");
        toast.error(data.message || "Failed to submit report.");
        setLoading(false);
        return;
      }

      setLoading(false);
      toast.success("Report submitted successfully! Notifications will be sent.");
      navigate("/found");
    } catch (err) {
      console.error("Submission Error:", err);
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <Toaster position="top-center" />

      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-6 flex items-center justify-between gap-4">
          <Link
            to="/found"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Found Items
          </Link>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Found Report Form
          </span>
        </header>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500" />

          <div className="p-6 sm:p-8 lg:p-10">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Report a Found Item
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Help someone recover their item by sharing clear and accurate details.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="e.g., John Doe"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="item" className="mb-2 block text-sm font-semibold text-slate-700">
                    Item Found
                  </label>
                  <input
                    type="text"
                    id="item"
                    placeholder="e.g., Black Wallet, iPhone 13"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    onChange={handleChange}
                    value={formData.item}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="location" className="mb-2 block text-sm font-semibold text-slate-700">
                    Location Found
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="e.g., Central Park, Library Room 204"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    onChange={handleChange}
                    value={formData.location}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="date" className="mb-2 block text-sm font-semibold text-slate-700">
                    Date Found
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    onChange={handleChange}
                    value={formData.date}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="5"
                  placeholder="Provide a brief description of the item."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  onChange={handleChange}
                  value={formData.description}
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="photo-upload" className="mb-2 block text-sm font-semibold text-slate-700">
                  Upload Photo
                </label>
                <label
                  htmlFor="photo-upload"
                  className="flex w-full cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <UploadIcon />
                  <span className="truncate">Choose a file...</span>
                </label>
                <input
                  type="file"
                  id="photo-upload"
                  name="photo"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>

              <button
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </form>

            {error && <p className="mt-5 text-center text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}