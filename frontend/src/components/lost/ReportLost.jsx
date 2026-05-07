import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../AuthContext";

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

export default function ReportLost() {
  const { currentUser, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
    photo: null,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      toast.error("You must be logged in to report an item.");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleReset = () => {
    setForm({
      name: "",
      location: "",
      date: "",
      description: "",
      photo: null,
    });
    const photoInput = document.getElementById("photo-upload");
    if (photoInput) {
      photoInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let photoUrl = null;
    if (form.photo) {
      photoUrl = "/placeholder-photo.jpg";
    }

    try {
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch("/api/lost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          location: form.location,
          date: form.date,
          description: form.description,
          photoUrl,
          reportedBy: currentUser._id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to report lost item.");
      }

      toast.success("Lost item reported!");
      navigate("/lost");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
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
            to="/lost"
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
            Back to Lost Items
          </Link>

          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
            Lost Report Form
          </span>
        </header>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-orange-400 to-blue-500" />

          <div className="p-6 sm:p-8 lg:p-10">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Report a Lost Item
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add clear details so others can identify and help return your item quickly.
            </p>

            <form onSubmit={handleSubmit} onReset={handleReset} className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g., Black Wallet, iPhone 13"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="mb-2 block text-sm font-semibold text-slate-700">
                    Location Lost
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g., Central Park, Library Room 204"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="date" className="mb-2 block text-sm font-semibold text-slate-700">
                    Date Lost
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    required
                  />
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
                    <span className="truncate">{form.photo?.name || "Choose a file..."}</span>
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
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Provide a brief description of the item, including unique identifiers."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                ></textarea>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70"
                >
                  {submitting ? "Submitting..." : "Report Lost Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}