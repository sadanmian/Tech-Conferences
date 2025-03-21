import Link from "next/link";
import ConferenceFilters from "../components/ConferenceFilters";

export default async function ConferencesPage({ searchParams }) {
  const conferences = await fetch("http://localhost:3000/api/conferences").then(
    (res) => res.json()
  );

  const { location, technology, date, page = 1 } = searchParams;
  const itemsPerPage = 5;
  const currentPage = parseInt(page);

  // Filter conferences based on search parameters
  const filteredConferences = conferences.filter((conference) => {
    return (
      (!location ||
        conference.location.toLowerCase().includes(location.toLowerCase())) &&
      (!technology ||
        conference.sessions.some((session) =>
          session.technology.toLowerCase().includes(technology.toLowerCase())
        )) &&
      (!date ||
        new Date(conference.sessions[0].date).toDateString() ===
          new Date(date).toDateString())
    );
  });

  // Paginate results
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedConferences = filteredConferences.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredConferences.length / itemsPerPage);

  // Generate page numbers
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tech Conferences</h1>

      <ConferenceFilters
        location={location}
        technology={technology}
        date={date}
      />

      {/* Conference List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedConferences.map((conference) => (
          <div key={conference.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{conference.name}</h2>
            <p className="text-gray-600">{conference.organizer}</p>
            <p className="text-gray-600">{conference.location}</p>
            <p className="text-gray-600">
              {conference.sessions.length} sessions
            </p>
            <Link
              href={`/conferences/${conference.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {currentPage > 1 && (
          <Link
            href={`/conferences?page=${currentPage - 1}&location=${
              location || ""
            }&technology=${technology || ""}&date=${date || ""}`}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Previous
          </Link>
        )}

        {pageNumbers.map((pageNumber, index) => (
          <Link
            key={index}
            href={`/conferences?page=${pageNumber}&location=${
              location || ""
            }&technology=${technology || ""}&date=${date || ""}`}
            className={`px-4 py-2 ${
              pageNumber === currentPage
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } rounded-md`}
          >
            {pageNumber}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            href={`/conferences?page=${currentPage + 1}&location=${
              location || ""
            }&technology=${technology || ""}&date=${date || ""}`}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}

// Helper function to generate page numbers
const generatePageNumbers = (currentPage, totalPages) => {
  const pages = [];
  const maxVisiblePages = 5; // Number of visible page numbers

  if (totalPages <= maxVisiblePages) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show a range of pages with ellipsis
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
  }

  return pages;
};
