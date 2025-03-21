// import SessionItem from "@/components/SessionItem";

import Recommendations from "@/app/components/Recommendations";
import SessionItem from "@/app/components/SessionItem";

export const revalidate = 3600; // Revalidate every 1 hour (ISR)

export default async function ConferenceDetailPage({ params }) {
  const { id } = await params;

  // Log the ID for debugging
  // console.log("Fetching conference with ID:", id);

  let conference;
  try {
    // Fetch conference details from the API
    const response = await fetch(
      `http://localhost:3000/api/conferences/${id}`,
      {
        cache: "no-store", // Ensure SSR
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch conference details");
    }
    conference = await response.json();
  } catch (error) {
    // Handle errors
    return (
      <div className="container mx-auto p-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  // Handle case where conference is not found
  if (!conference) {
    return <div className="container mx-auto p-4">Conference not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Conference Name */}
      <h1 className="text-3xl font-bold mb-6">{conference.name}</h1>

      {/* Detailed Conference Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Conference Details</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            <strong>Organizer:</strong> {conference.organizer}
          </p>
          <p className="text-gray-600">
            <strong>Location:</strong> {conference.location}
          </p>
          <p className="text-gray-600">
            <strong>Date:</strong>{" "}
            {new Date(conference.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Venue Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Venue</h2>
        {conference.venue ? (
          <>
            <p className="text-gray-600 mb-2">
              <strong>Address:</strong> {conference.venue.address}
            </p>
            <a
              href={conference.venue.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on Map
            </a>
          </>
        ) : (
          <p className="text-gray-600">Venue details not available.</p>
        )}
      </div>

      {/* Conference Schedule */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Schedule</h2>
        <ul className="space-y-4">
          {conference.sessions.map((session) => (
            <SessionItem key={session.id} session={session} />
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <Recommendations allSessions={conference.sessions} />
    </div>
  );
}
