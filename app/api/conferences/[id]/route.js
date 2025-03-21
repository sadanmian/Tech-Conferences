// app/api/conferences/[id]/route.js
export async function GET(request, { params }) {
  const { id } = await params;

  // Log the ID for debugging
  // console.log("Fetching conference with ID:", id);

  try {
    // Fetch data from JSONPlaceholder
    const users = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    ).then((res) => res.json());
    const posts = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then((res) => res.json());

    // Find the conference by ID
    const conference = users.find((user) => user.id === parseInt(id));

    if (!conference) {
      return Response.json({ error: "Conference not found" }, { status: 404 });
    }

    // Fetch location data using Nominatim API
    const locationResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        conference.address.city
      )}`
    );
    const locationData = await locationResponse.json();
    const venue =
      locationData.length > 0
        ? {
            address: locationData[0].display_name,
            mapLink: `https://www.openstreetmap.org/?mlat=${locationData[0].lat}&mlon=${locationData[0].lon}#map=12/${locationData[0].lat}/${locationData[0].lon}`,
          }
        : null;

    // Fetch sessions for the conference
    const sessions = await Promise.all(
      posts
        .filter((post) => post.userId === conference.id)
        .map(async (post) => {
          // Fetch speaker details using GitHub API
          let speakerData = {};
          try {
            const speakerResponse = await fetch(
              `https://api.github.com/users/${conference.username}`
            );
            speakerData = await speakerResponse.json();
          } catch (error) {
            console.error("Failed to fetch speaker details:", error);
          }

          // Fetch repositories related to the session topic
          let repositoriesData = { items: [] };
          try {
            const repositoriesResponse = await fetch(
              `https://api.github.com/search/repositories?q=topic:${
                post.title.split(" ")[0]
              }`
            );
            repositoriesData = await repositoriesResponse.json();
          } catch (error) {
            console.error("Failed to fetch repositories:", error);
          }

          return {
            id: post.id,
            title: post.title,
            description: post.body,
            date: new Date().toISOString(), // Mock date
            speaker: {
              id: conference.id,
              name: speakerData.name || conference.name,
              profile:
                speakerData.html_url ||
                `https://github.com/${conference.username}`,
              bio: speakerData.bio || "No bio available",
              repositories: repositoriesData.items
                ? repositoriesData.items.map((repo) => ({
                    name: repo.name,
                    url: repo.html_url,
                    description: repo.description,
                  }))
                : [],
            },
          };
        })
    );

    // Return detailed conference information
    return Response.json({
      id: conference.id,
      name: `Tech Conference ${conference.id}`,
      organizer: conference.name,
      location: conference.address.city,
      date: new Date().toISOString(), // Mock date
      venue,
      sessions,
    });
  } catch (error) {
    console.error("Error fetching conference data:", error);
    return Response.json(
      { error: "Failed to fetch conference data" },
      { status: 500 }
    );
  }
}
