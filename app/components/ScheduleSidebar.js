"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";
import { useSchedule } from "@/context/ScheduleContext";

export default function ScheduleSidebar() {
  const { schedule } = useSchedule();
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const [isClient, setIsClient] = useState(false); // State to track client-side rendering

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Set isClient to true after the component mounts (client-side)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the sidebar on the client
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed right-4 top-4 z-50 p-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        {isOpen ? "Close Schedule" : "Open Schedule"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-lg p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Your Schedule</h2>
        {schedule.length === 0 ? (
          <p className="text-gray-600">No sessions added yet.</p>
        ) : (
          <ul className="space-y-4">
            {schedule.map((session) => (
              <li
                key={`${session.id}-${session.title}`}
                className="border p-4 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold">{session.title}</h3>
                <p className="text-gray-600">
                  <strong>Time:</strong>{" "}
                  {new Date(session.date).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
