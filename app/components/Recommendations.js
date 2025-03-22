"use client";

import { useState, useEffect } from "react";
import { useSchedule } from "@/context/ScheduleContext";

import { FaRegClock, FaTags, FaStar, FaChartLine } from "react-icons/fa";
import RecommendationSkeleton from "./RecommendationSkeleton";
import { getEnhancedRecommendations } from "@/lib/getRecommendations";

export default function Recommendations({ allSessions = [] }) {
  const { schedule, addToSchedule, removeFromSchedule } = useSchedule();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      try {
        const recs = await getEnhancedRecommendations(schedule, allSessions);
        setRecommendations(recs || []); // Ensure recommendations is an array
      } catch (error) {
        console.error("Error loading recommendations:", error);
        setRecommendations([]); // Fallback to empty array on error
      }
      setLoading(false);
    };

    loadRecommendations();
  }, [schedule, allSessions]);

  const isSessionInSchedule = (sessionId) =>
    schedule.some((s) => s.id === sessionId);

  const formatSessionTime = (date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  if (loading) {
    return <RecommendationSkeleton />;
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Recommended Sessions</h2>
        <p className="text-gray-600">
          No recommendations available. Try adding more sessions to your
          schedule!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaChartLine className="text-blue-500" />
        Recommended For You
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((session) => {
          if (!session) return null; // Skip if session is undefined
          const tags = session.tags || []; // Ensure tags is always an array

          return (
            <div
              key={session.id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold">{session.title}</h3>
                {session.popularity > 75 && (
                  <span className="flex items-center text-sm bg-yellow-100 px-2 py-1 rounded">
                    <FaStar className="text-yellow-500 mr-1" />
                    Popular
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-4">{session.description}</p>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaRegClock />
                  <span>{formatSessionTime(session.date)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaTags />
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                {isSessionInSchedule(session.id) ? (
                  <button
                    onClick={() => removeFromSchedule(session.id)}
                    className="w-full py-2 px-4 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                  >
                    Remove from Schedule
                  </button>
                ) : (
                  <button
                    onClick={() => addToSchedule(session)}
                    className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
                  >
                    Add to Schedule
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
