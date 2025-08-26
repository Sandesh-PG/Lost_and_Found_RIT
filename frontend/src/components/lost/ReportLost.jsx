import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../AuthContext"; // Make sure this path is correct

// SVG Icon for the upload button
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
    className="w-5 h-5 mr-2 text-gray-500"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export default function ReportLost() {
  // --- Your existing logic ---
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
    if (document.getElementById("photo-upload")) {
      document.getElementById("photo-upload").value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let photoUrl = null;
    if (form.photo) {
      // In a real app, you would upload the photo to a service
      // and get the real URL.
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
    return null; // Render nothing while redirecting
  }

  // --- New Aesthetic UI ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <Toaster position="top-center" />
      <div className="w-full max-w-2xl">
        <header className="mb-6">
          <Link
            to="/lost"
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium"
          >
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
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>Back to Lost Items</span>
          </Link>
        </header>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Report a Lost Item
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Please fill out the details below to report an item you've lost.
          </p>

          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Black Wallet, iPhone 13"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location Lost
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g., Central Park, Library Room 204"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date Lost
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="photo-upload"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Photo
                </label>
                <label
                  htmlFor="photo-upload"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-500 flex items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  <UploadIcon />
                  <span className="truncate">
                    {form.photo?.name || "Choose a file..."}
                  </span>
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
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Provide a brief description of the item, including any identifying features."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {submitting ? "Submitting..." : "Report Lost Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
