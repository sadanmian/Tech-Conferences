"use client";
import { useState } from "react";
import { useSchedule } from "@/context/ScheduleContext";

export default function SessionItem({ session }) {
  const { schedule, addToSchedule, removeFromSchedule } = useSchedule();
  const [error, setError] = useState(null);

  // Check if a session is already in the schedule
  const isSessionInSchedule = schedule.some((s) => s.id === session.id);

  // Format the date for user display (time only)
  const formattedTime = new Date(session.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleAddToSchedule = () => {
    try {
      addToSchedule(session);
      setError(null);
    } catch (error) {
      // If addToSchedule throws or you want to catch other possible errors
      setError(error.message);
    }
  };

  return (
    <li className="border p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{session.title}</h3>
      <p className="text-gray-600">{session.description}</p>
      <p className="text-gray-600">
        <strong>Time:</strong> {formattedTime}
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
          {session.speaker.repositories?.length > 0 && (
            <div className="mt-2">
              <p className="text-gray-600 font-semibold">Repositories:</p>
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

      {/* Add/Remove from schedule button */}
      {isSessionInSchedule ? (
        <button
          onClick={() => removeFromSchedule(session.id)}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Remove from Schedule
        </button>
      ) : (
        <button
          onClick={handleAddToSchedule}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add to Schedule
        </button>
      )}

      {/* Conflict / other errors */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </li>
  );
}
