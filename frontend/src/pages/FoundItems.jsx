import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ItemDetailModal from "./ItemDetailModal";
import Pagination from "../components/Pagination";
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

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const FoundItemCard = ({ item, onViewDetails }) => (
  <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
    <div className="relative h-56 overflow-hidden bg-slate-100">
      <ItemImage
        src={item.photoUrl}
        alt={item.item}
        label="No Image"
        className="h-full"
        imageClassName="transition duration-500 group-hover:scale-105"
      />
      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur">
        Found
      </div>
    </div>

    <div className="flex flex-col p-6">
      <h3 className="text-xl font-bold text-slate-900">{item.item}</h3>
      <p className="mt-1 text-sm text-slate-500">Reported by {item.name}</p>

      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
          <span className="font-medium text-slate-500">Location</span>
          <span className="text-right font-semibold text-slate-800">{item.location}</span>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
          <span className="font-medium text-slate-500">Date found</span>
          <span className="text-right font-semibold text-slate-800">{formatDate(item.date)}</span>
        </div>
      </div>

      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
        {item.description}
      </p>

      <button
        onClick={() => onViewDetails(item)}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
      >
        View Details
      </button>
    </div>
  </article>
);

const FoundItemsPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const response = await fetch("/api/found");
        if (!response.ok) {
          throw new Error("Could not load found items");
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

    fetchFoundItems();
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

  const totalItems = items.length;
  const matchedItems = filteredItems.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #082f49 0%, #0f172a 55%, #020617 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.14),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-medium text-blue-100 backdrop-blur">
                Found Items Board
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Share found items and help return them to the right person.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                Browse what the community has found, filter by item or location,
                and open a card to quickly review details before contacting the reporter.
              </p>
            </div>

            <Link
              to="/report-found"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-bold text-blue-950 shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-50 lg:w-auto"
            >
              <PlusIcon />
              Report a Found Item
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
              <p className="mt-2 text-3xl font-black">Compare & contact</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Explore reports
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Filter the found items feed
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>
          </div>
        </div>

        {loading && <div className="py-20 text-center text-slate-500">Loading found items...</div>}

        {error && !loading && (
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-center text-blue-700">
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
                  {searchTerm ? <span className="ml-1 text-slate-500">for “{searchTerm}”</span> : null}
                </div>

                <div className="flex-shrink-0">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    activeColor="bg-blue-600"
                    size="compact"
                  />
                </div>
              </div>
            ) : null}

            {currentItems.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {currentItems.map((item) => (
                  <FoundItemCard
                    key={item._id}
                    item={item}
                    onViewDetails={(selected) => setSelectedItem(selected)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <SearchIcon />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">No items found</h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
                  {searchTerm
                    ? `Nothing matches “${searchTerm}”. Try another item name, place, or description.`
                    : "There are no found item reports yet. Be the first to add one and help someone recover their item."}
                </p>
                <Link
                  to="/report-found"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <PlusIcon />
                  Create a Report
                </Link>
              </div>
            )}
          </>
        )}
      </main>

      <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default FoundItemsPage;