import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ItemImage from "../components/ItemImage";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function FoundItemDetailPage() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await fetch(`/api/found/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch item details.");
        }

        const data = await res.json();
        if (data.success) {
          setItem(data.data);
        } else {
          throw new Error(data.message || "Could not load item.");
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Loading item details...
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 text-center text-red-500">
        Error: Could not load item.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Toaster position="top-center" />

      <section className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0f172a 58%, #020617 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.12),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link to="/found" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Found Items
          </Link>
          <div className="mt-6 max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-medium text-blue-100 backdrop-blur">
              Found Item Details
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              {item.item}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              Review the item details, location, and description before contacting the reporter or claiming it.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <ItemImage
            src={item.photoUrl}
            alt={item.item}
            label="No Image"
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            imageClassName="h-full w-full object-cover"
          />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Reported by</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{item.name}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Date found</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{formatDate(item.date)}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-slate-600">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Location</p>
                <p className="mt-1 text-base font-medium text-slate-800">{item.location}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Description</p>
                <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
              <p className="text-sm font-semibold text-blue-800">Claim or contact safely</p>
              <p className="mt-1 text-sm leading-6 text-blue-700">
                Use the details above to confirm whether this belongs to you before you proceed.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                Contact Reporter
              </button>
              <Link
                to="/found"
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to Found Items
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}