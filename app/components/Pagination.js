// app/components/Pagination.js
"use client"; // Mark this as a Client Component

import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from "react-icons/fa"; // Import icons
import { useMemo } from "react";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  filterParams,
}) {
  // Memoize the total number of pages
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  // Generate an array of page numbers to display
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxPagesToShow = 5; // Number of page numbers to display
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if endPage is at the limit
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Add ellipsis at the beginning if needed
    if (startPage > 1) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis at the end if needed
    if (endPage < totalPages) {
      pages.push("...");
    }

    return pages;
  }, [currentPage, totalPages]);

  // Function to build the query string dynamically
  const buildQueryString = (page) => {
    const params = new URLSearchParams();

    // Add page parameter
    params.set("page", page);

    // Add filter parameters only if they have a value
    if (filterParams.location) {
      params.set("location", filterParams.location);
    }
    if (filterParams.technology) {
      params.set("technology", filterParams.technology);
    }
    if (filterParams.date) {
      params.set("date", filterParams.date);
    }

    return params.toString();
  };

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link
          href={`/conferences?${buildQueryString(currentPage - 1)}`}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 flex items-center space-x-2 transition-all duration-200"
        >
          <FaChevronLeft className="text-gray-600" />
          <span className="text-gray-700">Previous</span>
        </Link>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <div
            key={`ellipsis-${index}`}
            className="px-4 py-2 text-gray-600 flex items-center"
          >
            <FaEllipsisH />
          </div>
        ) : (
          <Link
            key={page}
            href={`/conferences?${buildQueryString(page)}`}
            className={`px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center transition-all duration-200 ${
              page === currentPage
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={`/conferences?${buildQueryString(currentPage + 1)}`}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 flex items-center space-x-2 transition-all duration-200"
        >
          <span className="text-gray-700">Next</span>
          <FaChevronRight className="text-gray-600" />
        </Link>
      )}
    </div>
  );
}
