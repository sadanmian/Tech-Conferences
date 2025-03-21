export function getRecommendations(selectedSessions, allSessions) {
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
