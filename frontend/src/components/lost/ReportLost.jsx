import React, { useState } from "react";

export default function ReportLost() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
    photo: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call logic here
    alert("Lost item reported!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-green-100">
      <div className="w-full max-w-lg bg-white bg-opacity-80 rounded-xl shadow-lg p-8 border border-blue-200">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          Report Lost Item
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="name"
            >
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-200 outline-none"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="location"
            >
              Location<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-200 outline-none"
              value={form.location}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          {/* Date */}
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="date"
            >
              Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-200 outline-none"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="description"
            >
              Item Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-200 outline-none resize-none"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Upload Photo */}
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="photo"
            >
              Upload Photo{" "}
              <span className="text-sm text-gray-500">(if available)</span>
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-200 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* Submit and Reset */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
            >
              Submit
            </button>
            <button
              type="reset"
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition"
              onClick={() =>
                setForm({
                  name: "",
                  location: "",
                  date: "",
                  description: "",
                  photo: null,
                })
              }
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
