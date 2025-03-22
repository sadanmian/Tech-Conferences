"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ConferenceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current filter values from URL query parameters
  const locationParam = searchParams.get("location") || "";
  const technologyParam = searchParams.get("technology") || "";
  const dateParam = searchParams.get("date") || "";

  // Local state for input values
  const [location, setLocation] = useState(locationParam);
  const [technology, setTechnology] = useState(technologyParam);
  const [date, setDate] = useState(dateParam);

  // Sync local state with URL query parameters
  useEffect(() => {
    setLocation(locationParam);
    setTechnology(technologyParam);
    setDate(dateParam);
  }, [locationParam, technologyParam, dateParam]);

  // Check if any filter is active
  const isFilterActive = location || technology || date;

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set(key, value); // Set the query parameter if value exists
    } else {
      url.searchParams.delete(key); // Remove the query parameter if value is empty
    }
    router.push(url.toString());
  };

  // Clear all filters
  const clearFilters = () => {
    const url = new URL(window.location);
    url.searchParams.delete("location");
    url.searchParams.delete("technology");
    url.searchParams.delete("date");
    router.push(url.toString());
  };

  return (
    <div className="mb-6 space-y-4 md:space-y-0 md:flex md:space-x-4">
      <input
        type="text"
        placeholder="Filter by location"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value); // Update local state
          handleFilterChange("location", e.target.value); // Update URL
        }}
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Filter by technology"
        value={technology}
        onChange={(e) => {
          setTechnology(e.target.value); // Update local state
          handleFilterChange("technology", e.target.value); // Update URL
        }}
        className="p-2 border rounded-md"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value); // Update local state
          handleFilterChange("date", e.target.value); // Update URL
        }}
        className="p-2 border rounded-md"
      />
      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        disabled={!isFilterActive} // Disable the button if no filters are active
        className={`px-4 py-2 rounded-md ${
          isFilterActive
            ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Clear Filters
      </button>
    </div>
  );
}
