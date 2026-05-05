import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const actionCards = [
  {
    title: "Report a Lost Item",
    description:
      "Create a detailed post so others can identify and return your item faster.",
    to: "/report-lost",
    color: "from-rose-500 to-red-600",
  },
  {
    title: "Post a Found Item",
    description:
      "Share what you found and notify the community in just a few steps.",
    to: "/report-found",
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Browse Listings",
    description:
      "Search the latest lost and found posts by item name or location.",
    to: "/found",
    color: "from-emerald-500 to-green-600",
  },
];

const highlights = [
  "Searchable item listings",
  "Fast reporting flow",
  "Google sign-in and profile access",
  "Email alerts for found items",
];

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const displayName = currentUser?.username || currentUser?.firstName || "there";

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.35),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(34,197,94,0.18),_transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium tracking-wide text-blue-100 backdrop-blur">
                Welcome back, {displayName}
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Bring lost things home faster with a clear, trusted community board.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100/90">
                Post what you lost, share what you found, and scan live listings in one place.
                The portal keeps the process simple, fast, and easy to navigate.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/report-lost"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-900 shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  Report Lost Item
                </Link>
                <Link
                  to="/found"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Explore Listings
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-blue-50 shadow-sm backdrop-blur"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                  Quick Overview
                </p>
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Your profile</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {currentUser?.firstName || currentUser?.username || "Active user"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-blue-50 p-4">
                      <p className="text-sm text-blue-700">Lost</p>
                      <p className="mt-2 text-2xl font-black text-blue-950">Report</p>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <p className="text-sm text-emerald-700">Found</p>
                      <p className="mt-2 text-2xl font-black text-emerald-950">Track</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-900 p-4 text-white">
                    <p className="text-sm text-slate-300">Best next step</p>
                    <p className="mt-1 text-base font-semibold">
                      Add a detailed report with location, date, and a photo for better matches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Simple actions that keep the community moving
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {actionCards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${card.color}`} />
              <h3 className="mt-5 text-xl font-bold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
              <div className="mt-6 text-sm font-semibold text-blue-600 transition group-hover:translate-x-1">
                Open section →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
