export async function GET() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (res) => res.json()
  );
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json()
  );

  // Transform data into conferences
  const conferences = users.map((user) => ({
    id: user.id,
    name: `Tech Conference ${user.id}`,
    organizer: user.name,
    location: user.address.city,
    sessions: posts
      .filter((post) => post.userId === user.id)
      .map((post) => ({
        id: post.id,
        title: post.title,
        description: post.body,
        date: new Date().toISOString(), // Mock date
        technology: post.title.split(" ")[0], // Mock technology focus
      })),
  }));

  return Response.json(conferences);
}
