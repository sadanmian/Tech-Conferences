// app/components/ConferenceFilters.js
"use client"; // Mark this as a Client Component

import { useRouter } from "next/navigation";

export default function ConferenceFilters({ location, technology, date }) {
  const router = useRouter();

  const handleFilterChange = (key, value) => {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set(key, value); // Set the query parameter if value exists
    } else {
      url.searchParams.delete(key); // Remove the query parameter if value is empty
    }
    router.push(url.toString());
  };

  return (
    <div className="mb-6 space-y-4 md:space-y-0 md:flex md:space-x-4">
      <input
        type="text"
        placeholder="Filter by location"
        defaultValue={location}
        onChange={(e) => handleFilterChange("location", e.target.value)}
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Filter by technology"
        defaultValue={technology}
        onChange={(e) => handleFilterChange("technology", e.target.value)}
        className="p-2 border rounded-md"
      />
      <input
        type="date"
        defaultValue={date}
        onChange={(e) => handleFilterChange("date", e.target.value)}
        className="p-2 border rounded-md"
      />
    </div>
  );
}
