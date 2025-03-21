"use client"; // Mark this as a Client Component

import { useSchedule } from "@/context/ScheduleContext";

function getRecommendations(selectedSessions, allSessions) {
  // Extract technology interests from selected sessions
  const interests = selectedSessions.flatMap((session) =>
    (session.technology || "").split(" ")
  );

  // Find sessions that match the user's interests
  const recommendations = allSessions.filter((session) =>
    interests.some((interest) =>
      (session.technology || "").toLowerCase().includes(interest.toLowerCase())
    )
  );

  // Filter out sessions that conflict with the user's schedule
  const nonConflictingRecommendations = recommendations.filter(
    (session) =>
      !selectedSessions.some(
        (selected) =>
          new Date(selected.startTime) < new Date(session.endTime) &&
          new Date(selected.endTime) > new Date(session.startTime)
      )
  );

  return nonConflictingRecommendations;
}

export default function Recommendations({ allSessions }) {
  const { schedule, addToSchedule } = useSchedule();

  // Get recommended sessions
  const recommendations = getRecommendations(schedule, allSessions);

  // Check if a session is already in the schedule
  const isSessionInSchedule = (sessionId) =>
    schedule.some((s) => s.id === sessionId);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recommended Sessions</h2>
      {recommendations.length === 0 ? (
        <p className="text-gray-600">No recommendations available.</p>
      ) : (
        <ul className="space-y-4">
          {recommendations.map((session) => {
            // Format the date consistently using a fixed locale
            const formattedTime = new Date(session.date).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            );

            return (
              <li
                key={`${session.id}-${session.title}`}
                className="border p-4 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold">{session.title}</h3>
                <p className="text-gray-600">{session.description}</p>
                <p className="text-gray-600">
                  <strong>Time:</strong> {formattedTime}
                </p>
                {isSessionInSchedule(session.id) ? (
                  <button
                    onClick={() => removeFromSchedule(session.id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove from Schedule
                  </button>
                ) : (
                  <button
                    onClick={() => addToSchedule(session)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add to Schedule
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
