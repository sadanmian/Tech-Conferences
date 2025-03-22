"use client";

import { useState, useEffect } from "react";
import { useSchedule } from "@/context/ScheduleContext";

import { FaChartLine } from "react-icons/fa";
import RecommendationSkeleton from "./RecommendationSkeleton";
import { getEnhancedRecommendations } from "@/lib/getRecommendations";
import RecommendationCard from "./RecommendationCard"; // Import the new component

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

          return (
            <RecommendationCard
              key={session.id}
              session={session}
              isInSchedule={isSessionInSchedule(session.id)}
              addToSchedule={addToSchedule}
              removeFromSchedule={removeFromSchedule}
            />
          );
        })}
      </div>
    </div>
  );
}
