import React from "react";
import { Link } from "react-router-dom";
import ItemImage from "../components/ItemImage";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const ItemDetailModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
          aria-label="Close details"
        >
          <CloseIcon />
        </button>

        <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr]">
          <ItemImage
            src={item.photoUrl}
            alt={item.item}
            label="No Image"
            className="lg:min-h-[520px]"
            imageClassName="lg:min-h-[520px]"
          />

          <div className="p-6 sm:p-8 lg:p-10">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Found Item
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
              {item.item}
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Reported by
                </p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  {item.name}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Date found
                </p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  {formatDate(item.date)}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-slate-600">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Location
                </p>
                <p className="mt-1 text-base font-medium text-slate-800">
                  {item.location}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Description
                </p>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
              <p className="text-sm font-semibold text-blue-800">
                This might be yours?
              </p>
              <p className="mt-1 text-sm leading-6 text-blue-700">
                Check the details carefully and contact the reporter if it looks like your item.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/report-lost"
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                I Own This Item
              </Link>
              <button
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Keep Browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;