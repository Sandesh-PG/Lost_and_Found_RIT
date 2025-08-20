import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ReportLost() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
    photo: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let photoUrl = null;
    if (form.photo) {
      photoUrl = "/placeholder-photo.jpg";
    }

    try {
      const response = await fetch("/api/lost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          location: form.location,
          date: form.date,
          description: form.description,
          photoUrl,
        }),
      });
      if (!response.ok) throw new Error("Failed to report lost item.");
      toast.success("Lost item reported!");
      handleReset();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a1241] via-[#121e52] to-[#12307c] flex flex-col relative overflow-hidden">
      {/* SVG Accent */}
      <svg
        className="absolute left-1/2 top-28 md:top-1/3 -translate-x-1/2 -translate-y-1/2 w-[75vw] max-w-xl sm:max-w-2xl h-[240px] sm:h-[400px] md:h-[520px] pointer-events-none z-0 opacity-70"
        viewBox="0 0 700 700"
      >
        <ellipse
          cx="350"
          cy="350"
          rx="300"
          ry="170"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={6}
          style={{ filter: "drop-shadow(0 0 24px #a259f7)" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7F1FE1" />
            <stop offset="100%" stopColor="#30ABE2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Top Bar */}
      <div className="w-full flex items-center justify-between px-2 sm:px-4 md:px-8 py-4 sm:py-6 z-10">
        {/* Go Back Button */}
        <button
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#3623A7] text-white font-semibold shadow-xl hover:bg-[#462DE1] transition active:scale-95 text-sm sm:text-base"
          onClick={() => navigate(-1)}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Go Back
        </button>
        {/* Logo (Right) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <svg className="h-8 w-8 sm:h-10 sm:w-10 text-[#7d4cff] drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="14" rx="3" className="stroke-current" />
            <polyline points="3,7 12,14 21,7" className="stroke-current" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-extrabold text-[#41E2F8] text-xl sm:text-3xl md:text-4xl tracking-wide font-sans drop-shadow-2xl" style={{ letterSpacing: "0.03em" }}>
            LostNFound
          </span>
        </div>
      </div>

      {/* Form wrapper: Centered & Spaced Responsively */}
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-4xl mx-auto px-2 sm:px-6 z-10">
        <form
          onSubmit={handleSubmit}
          className="w-full mt-6 sm:mt-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans mb-10 sm:mb-14 text-center drop-shadow-xl">
            Report Lost Item
          </h2>
          {/* Input grid: responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full mb-6">
            <div className="min-w-0 flex flex-col">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border-none bg-[#172663]/80 text-white placeholder-[#bdd8ff] shadow-lg focus:outline-none focus:ring-4 focus:ring-[#8e66e8] transition font-semibold min-w-0"
                placeholder="Item name (e.g. Wallet, Phone...)"
              />
            </div>
            <div className="min-w-0 flex flex-col">
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border-none bg-[#172663]/80 text-white placeholder-[#bdd8ff] shadow-lg focus:outline-none focus:ring-4 focus:ring-[#49cbfa] transition font-semibold min-w-0"
                placeholder="Location lost"
              />
            </div>
            <div className="min-w-0 flex flex-col">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border-none bg-[#172663]/80 text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-[#7F1FE1] transition font-semibold min-w-0"
              />
            </div>
            <div className="min-w-0 flex flex-col">
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-2 sm:px-4 py-3 sm:py-4 rounded-2xl border-none bg-[#172663]/80 text-[#bdd8ff] shadow-lg focus:outline-none focus:ring-4 focus:ring-[#30ABE2] transition min-w-0"
              />
            </div>
          </div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border-none bg-[#172663]/80 text-white placeholder-[#bdd8ff] shadow-lg focus:outline-none focus:ring-4 focus:ring-[#30ABE2] font-semibold mb-6 sm:mb-10"
            rows={4}
            placeholder="Describe the item and any details."
          />
          <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2">
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 py-3 sm:py-4 rounded-2xl bg-[#41E2F8] text-[#171e44] font-bold text-lg shadow-xl hover:bg-[#7F1FE1] hover:text-white transition duration-150
                ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {submitting ? "Submitting..." : "Report Lost Item"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={submitting}
              className="flex-1 py-3 sm:py-4 rounded-2xl border-2 border-[#30ABE2] text-[#30ABE2] bg-transparent font-bold text-lg shadow hover:bg-[#28355a]/60 hover:text-white transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
