import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./../components/Pagination";

// --- SVG Icons ---
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
    className="text-gray-400"
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

// --- Helper Function to Format Dates ---
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// --- Item Detail Modal Component ---
const ItemDetailModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
        >
          <CloseIcon />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={
                item.photoUrl ||
                "https://placehold.co/600x400/E2E8F0/A0AEC0?text=No+Image"
              }
              alt={item.item}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2 flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800">{item.item}</h2>
            <div className="mt-4 space-y-3 text-gray-600">
              <p>
                <strong>Lost by:</strong> {item.name}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(item.date)}
              </p>
              <p className="pt-2">
                <strong>Description:</strong>
                <br />
                {item.description}
              </p>
            </div>
            <button className="w-full mt-auto bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
              I Found This!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Item Card Component ---
const LostItemCard = ({ item, onViewDetails }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
    <div className="w-full h-48 bg-gray-100 overflow-hidden">
      <img
        src={
          item.photoUrl ||
          "https://placehold.co/600x400/E2E8F0/A0AEC0?text=No+Image"
        }
        alt={item.item}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-gray-500 uppercase tracking-wider">
        {item.item}
      </h3>
      <p className="text-base text-gray-700 font-semibold mt-2">
        Lost by: {item.name}
      </p>
      <p className="text-sm text-gray-500 mt-1">Location: {item.location}</p>
      <p className="text-sm text-gray-500 mt-1">
        Date: {formatDate(item.date)}
      </p>
      <div className="flex-grow"></div>
      <button
        onClick={() => onViewDetails(item)}
        className="text-blue-500 font-semibold mt-4 self-start hover:text-blue-700 transition-colors"
      >
        View Details →
      </button>
    </div>
  </div>
);

// --- Main Page Component ---
const LostItemsPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Show 8 items per page (2 rows of 4)

  // --- Fetching data from your backend ---
  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        // This makes a request to your backend's GET /api/lost endpoint
        const response = await fetch("/api/lost");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.success) {
          setItems(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch items");
        }
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []); // Empty dependency array means this runs once when the component mounts

  // --- Reset to first page when search term changes ---
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // --- Filter and Paginate Items ---
  const filteredItems = items.filter(
    (item) =>
      (item.item &&
        item.item.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.location &&
        item.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Lost Items</h1>
          <Link
            to="/report-lost"
            className="w-full md:w-auto flex items-center justify-center bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
          >
            <PlusIcon />
            Report a Lost Item
          </Link>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search by item name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {loading && (
          <div className="text-center py-16 text-gray-500">
            Loading items...
          </div>
        )}

        {error && (
          <div className="text-center py-16 text-red-500">Error: {error}</div>
        )}

        {!loading && !error && (
          <>
            {/* Results Summary and Top Pagination */}
            {filteredItems.length > 0 && (
              <div className="flex justify-between items-center gap-4 mb-6">
                <div className="text-gray-600 text-sm">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredItems.length)} of{" "}
                  {filteredItems.length} items
                  {searchTerm && ` for "${searchTerm}"`}
                </div>

                {/* Reusable Pagination - Red theme for lost items */}
                <div className="flex-shrink-0 ml-auto">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    activeColor="bg-red-500"
                    size="compact"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentItems.map((item) => (
                <LostItemCard
                  key={item._id}
                  item={item}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-700">
                  No Items Found
                </h3>
                <p className="text-gray-500 mt-2">
                  {searchTerm
                    ? `No items match "${searchTerm}". Try a different search term.`
                    : "No one has reported a lost item yet. Be the first!"}
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <ItemDetailModal item={selectedItem} onClose={handleCloseModal} />
    </div>
  );
};

export default LostItemsPage;
