import React from "react";

// --- SVG Icons ---
const ChevronLeftIcon = () => (
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
  >
    <polyline points="15,18 9,12 15,6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
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
  >
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);

// --- Reusable Pagination Component ---
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  activeColor = "bg-blue-500", // Default blue, can be overridden
  size = "compact", // compact or full
}) => {
  const getVisiblePages = () => {
    const pages = [];

    if (size === "compact") {
      // For top pagination, show fewer pages to save space
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    } else {
      // Full pagination logic (for bottom placement)
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (end < totalPages - 1) pages.push("...");

      if (totalPages > 1) pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const buttonSize = size === "compact" ? "px-2 py-1 text-sm" : "px-3 py-2";
  const pageButtonSize = size === "compact" ? "px-3 py-1 text-sm" : "px-3 py-2";

  return (
    <div className="flex items-center space-x-1">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center ${buttonSize} rounded transition-colors ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        }`}
      >
        <ChevronLeftIcon />
        {size !== "compact" && <span className="ml-1">Previous</span>}
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {size === "compact" && currentPage > 2 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            >
              1
            </button>
            {currentPage > 3 && <span className="px-1 text-gray-400">...</span>}
          </>
        )}

        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`${pageButtonSize} rounded transition-colors ${
              page === currentPage
                ? `${activeColor} text-white`
                : page === "..."
                ? "text-gray-400 cursor-default"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        {size === "compact" && currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && (
              <span className="px-1 text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center ${buttonSize} rounded transition-colors ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        }`}
      >
        <ChevronRightIcon />
        {size !== "compact" && <span className="mr-1">Next</span>}
      </button>
    </div>
  );
};

export default Pagination;
