// app/conferences/page.js
import Link from "next/link";
import ConferenceFilters from "../components/ConferenceFilters";

export default async function ConferencesPage({ searchParams }) {
  // Extract filter parameters from URL query
  const { location, technology, date, page = 1 } = await searchParams;
  const itemsPerPage = 10;
  const currentPage = parseInt(page);

  // Fetch conferences from the API
  const conferences = await fetch("http://localhost:3000/api/conferences").then(
    (res) => res.json()
  );

  // Validate the date parameter
  const isValidDate = (dateString) => {
    if (!dateString) return false; // Skip if dateString is undefined or null
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // Check if the date is valid
  };

  const filterDateUTC = isValidDate(date)
    ? new Date(date).toISOString().split("T")[0]
    : null;

  // console.log("Filter Date (UTC):", filterDateUTC); // Debugging
  // console.log(
  //   "Conference Dates:",
  //   conferences.map((c) => c.date)
  // ); // Debugging

  // Filter conferences based on search parameters
  const filteredConferences = conferences.filter((conference) => {
    const hasMatchingSession = conference.sessions.some((session) => {
      const sessionDateUTC = isValidDate(session.date)
        ? new Date(session.date).toISOString().split("T")[0]
        : null;

      return !filterDateUTC || sessionDateUTC === filterDateUTC;
    });

    return (
      (!location ||
        conference.location.toLowerCase().includes(location.toLowerCase())) &&
      (!technology ||
        conference.sessions.some((session) =>
          session.technology.toLowerCase().includes(technology.toLowerCase())
        )) &&
      (!filterDateUTC || hasMatchingSession)
    );
  });

  // Paginate results
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedConferences = filteredConferences.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tech Conferences</h1>

      {/* Use the Client Component for filters */}
      <ConferenceFilters
        location={location}
        technology={technology}
        date={date}
      />

      {/* Conference List */}
      {filteredConferences.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          <p className="text-xl">No conferences found matching your filters.</p>
          <p className="text-sm mt-2">
            Try adjusting your filters or clearing them to see all conferences.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedConferences.map((conference) => (
            <div
              key={conference.id}
              className="border p-4 rounded-lg shadow-sm"
            >
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
      )}

      {/* Pagination */}
      {filteredConferences.length > 0 && (
        <div className="flex justify-center mt-8 space-x-4">
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
          {filteredConferences.length > startIndex + itemsPerPage && (
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
      )}
    </div>
  );
}
