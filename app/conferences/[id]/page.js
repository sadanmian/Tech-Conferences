// app/conferences/[id]/page.js
export const revalidate = 3600; // Revalidate every 1 hour

export default async function ConferenceDetailPage({ params }) {
  const { id } = await params;

  // Log the ID for debugging
  console.log("Fetching conference with ID:", id);

  let conference;
  try {
    // Fetch conference details from the API
    const response = await fetch(`http://localhost:3000/api/conferences/${id}`);
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
            <li key={session.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{session.title}</h3>
              <p className="text-gray-600">{session.description}</p>
              <p className="text-gray-600">
                <strong>Time:</strong>{" "}
                {new Date(session.date).toLocaleTimeString()}
              </p>
              {session.speaker && (
                <div className="mt-2">
                  <p className="text-gray-600">
                    <strong>Speaker:</strong>{" "}
                    <a
                      href={session.speaker.profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {session.speaker.name}
                    </a>
                  </p>
                  {session.speaker.bio && (
                    <p className="text-gray-600">
                      <strong>Bio:</strong> {session.speaker.bio}
                    </p>
                  )}
                  {session.speaker.repositories.length > 0 && (
                    <div className="mt-2">
                      <p className="text-gray-600 font-semibold">
                        Repositories:
                      </p>
                      <ul className="list-disc list-inside">
                        {session.speaker.repositories.map((repo) => (
                          <li key={repo.url}>
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {repo.name}
                            </a>
                            {repo.description && ` - ${repo.description}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
