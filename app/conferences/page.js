import Link from "next/link";
import ConferenceFilters from "../components/ConferenceFilters";
import Pagination from "../components/Pagination";
import ConferenceCard from "../components/ConferenceCard";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default async function ConferencesPage({ searchParams }) {
  // Extract filter parameters from URL query
  const { location, technology, date, page = 1 } = await searchParams;
  const itemsPerPage = 10;
  const currentPage = parseInt(page);

  // Fetch conferences from the API
  const conferences = await fetch(`${apiBaseUrl}/api/conferences`).then((res) =>
    res.json()
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
            <ConferenceCard key={conference.id} conference={conference} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredConferences.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredConferences.length}
          itemsPerPage={itemsPerPage}
          filterParams={{ location, technology, date }}
        />
      )}
    </div>
  );
}
