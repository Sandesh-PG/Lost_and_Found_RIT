import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./../components/Pagination";
import ItemImage from "../components/ItemImage";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-slate-400"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

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

const LostItemModal = ({ item, onClose }) => {
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
            <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
              Lost Item
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
                  Date lost
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

            <div className="mt-8 rounded-2xl border border-rose-100 bg-rose-50/80 p-4">
              <p className="text-sm font-semibold text-rose-800">
                Know something about this item?
              </p>
              <p className="mt-1 text-sm leading-6 text-rose-700">
                Share any useful details with the reporter or compare it against
                the found listings.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/report-found"
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                I Found This Item
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

const LostItemCard = ({ item, onViewDetails }) => (
  <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
    <div className="relative h-56 overflow-hidden bg-slate-100">
      <ItemImage
        src={item.photoUrl}
        alt={item.item}
        label="No Image"
        className="h-full"
        imageClassName="transition duration-500 group-hover:scale-105"
      />
      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700 shadow-sm backdrop-blur">
        Lost
      </div>
    </div>

    <div className="flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{item.item}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Reported by {item.name}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
          <span className="font-medium text-slate-500">Location</span>
          <span className="text-right font-semibold text-slate-800">{item.location}</span>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
          <span className="font-medium text-slate-500">Date lost</span>
          <span className="text-right font-semibold text-slate-800">{formatDate(item.date)}</span>
        </div>
      </div>

      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
        {item.description}
      </p>

      <button
        onClick={() => onViewDetails(item)}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
      >
        View Details
      </button>
    </div>
  </article>
);

const LostItemsPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await fetch("/api/lost");
        if (!response.ok) {
          throw new Error("Could not load lost items");
        }

        const data = await response.json();
        if (data.success) {
          setItems(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch items");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.item?.toLowerCase().includes(term) ||
        item.location?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term)
    );
  }, [items, searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalItems = items.length;
  const matchedItems = filteredItems.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, #4c0519 0%, #111827 55%, #020617 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(251,113,133,0.32), transparent 28%), radial-gradient(circle at bottom left, rgba(59,130,246,0.2), transparent 30%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-medium text-rose-100 backdrop-blur">
                Lost Items Board
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Search lost items and reconnect people with what matters.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                Browse recent reports, filter by item or location, and open a
                detailed card to compare clues before you reach out.
              </p>
            </div>

            <Link
              to="/report-lost"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-bold text-rose-950 shadow-lg shadow-rose-950/30 transition hover:-translate-y-0.5 hover:bg-rose-50 lg:w-auto"
            >
              <PlusIcon />
              Report a Lost Item
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/10 backdrop-blur-sm">
              <p className="text-sm text-slate-300">Total reports</p>
              <p className="mt-2 text-3xl font-black">{totalItems}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/10 backdrop-blur-sm">
              <p className="text-sm text-slate-300">Visible now</p>
              <p className="mt-2 text-3xl font-black">{matchedItems}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/10 backdrop-blur-sm">
              <p className="text-sm text-slate-300">Best action</p>
              <p className="mt-2 text-3xl font-black">Search + match</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">
                Explore reports
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Filter the lost items feed
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Look by item name, location, or details in the description.
              </p>
            </div>

            <div className="w-full lg:max-w-xl">
              <label className="relative block">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search by item, place, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100"
                />
              </label>
            </div>
          </div>
        </div>

        {loading && (
          <div className="py-20 text-center text-slate-500">
            Loading lost items...
          </div>
        )}

        {error && !loading && (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-center text-rose-700">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredItems.length > 0 ? (
              <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="text-sm text-slate-600">
                  Showing <span className="font-semibold text-slate-900">{startIndex + 1}</span>
                  -<span className="font-semibold text-slate-900">{Math.min(endIndex, matchedItems)}</span>
                  {' '}of <span className="font-semibold text-slate-900">{matchedItems}</span> items
                  {searchTerm ? (
                    <span className="ml-1 text-slate-500">for “{searchTerm}”</span>
                  ) : null}
                </div>

                <div className="flex-shrink-0">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    activeColor="bg-rose-600"
                    size="compact"
                  />
                </div>
              </div>
            ) : null}

            {currentItems.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {currentItems.map((item) => (
                  <LostItemCard
                    key={item._id}
                    item={item}
                    onViewDetails={(selected) => setSelectedItem(selected)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                  <SearchIcon />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  No items found
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
                  {searchTerm
                    ? `Nothing matches “${searchTerm}”. Try another item name, place, or description.`
                    : "There are no lost item reports yet. Be the first to add one and help the community."}
                </p>
                <Link
                  to="/report-lost"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  <PlusIcon />
                  Create a Report
                </Link>
              </div>
            )}
          </>
        )}
      </main>

      <LostItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default LostItemsPage;