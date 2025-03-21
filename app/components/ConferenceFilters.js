"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";

export default function ConferenceFilters({ location, technology, date }) {
  const router = useRouter();

  const [locationValue, setLocationValue] = useState(location || "");
  const [technologyValue, setTechnologyValue] = useState(technology || "");
  const [dateValue, setDateValue] = useState(date || "");

  useEffect(() => {
    setLocationValue(location || "");
    setTechnologyValue(technology || "");
    setDateValue(date || "");
  }, [location, technology, date]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    const url = new URL(window.location);

    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }

    router.push(url.toString());
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setLocationValue("");
    setTechnologyValue("");
    setDateValue("");

    // Clear query parameters
    const url = new URL(window.location);
    url.searchParams.delete("location");
    url.searchParams.delete("technology");
    url.searchParams.delete("date");
    router.push(url.toString());
  };

  const isFiltersApplied = location || technology || date;

  return (
    <div className="mb-6 space-y-4 md:space-y-0 md:flex md:space-x-4">
      <input
        type="text"
        placeholder="Filter by location"
        value={locationValue}
        onChange={(e) => {
          setLocationValue(e.target.value);
          handleFilterChange("location", e.target.value);
        }}
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Filter by technology"
        value={technologyValue}
        onChange={(e) => {
          setTechnologyValue(e.target.value);
          handleFilterChange("technology", e.target.value);
        }}
        className="p-2 border rounded-md"
      />
      <input
        type="date"
        value={dateValue}
        onChange={(e) => {
          setDateValue(e.target.value);
          handleFilterChange("date", e.target.value);
        }}
        className="p-2 border rounded-md"
      />
      <button
        onClick={handleClearFilters}
        disabled={!isFiltersApplied}
        className={`px-4 py-2 ${
          isFiltersApplied
            ? "bg-gray-500 hover:bg-gray-600"
            : "bg-gray-300 cursor-not-allowed"
        } text-white rounded-md flex items-center space-x-2`}
      >
        <FaTimes />
        <span>Clear Filters</span>
      </button>
    </div>
  );
}
