"use client";
import { useState, useEffect } from "react";
import { useSchedule } from "@/context/ScheduleContext";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons from react-icons

export default function ScheduleSidebar() {
  const { schedule } = useSchedule();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Only render on the client

  return (
    <>
      {/* Button to toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed right-4 top-4 z-50 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-in-out hover:scale-110"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Schedule</h2>
        {schedule.length === 0 ? (
          <p className="text-gray-500">No sessions added yet.</p>
        ) : (
          <ul className="space-y-4">
            {schedule.map((session) => (
              <li
                key={session.id}
                className="border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {session.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  <strong>Time:</strong>{" "}
                  {new Date(session.startTime).toLocaleTimeString("en-US", {
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
