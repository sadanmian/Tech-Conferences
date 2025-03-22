export const getEnhancedRecommendations = (
  selectedSessions = [],
  allSessions = []
) => {
  // Ensure inputs are arrays
  if (!Array.isArray(selectedSessions) || !Array.isArray(allSessions)) {
    console.error(
      "Invalid input: selectedSessions and allSessions must be arrays"
    );
    return [];
  }

  // Get user interests with weights
  const interests = selectedSessions.reduce((acc, session) => {
    (session.tags || []).forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  // Score sessions
  const scoredSessions = allSessions.map((session) => {
    let score = 0;

    // Tag matching
    (session.tags || []).forEach((tag) => {
      score += (interests[tag] || 0) * 2;
    });

    // Time proximity bonus
    const hasCloseSession = selectedSessions.some((selected) => {
      const timeDiff = Math.abs(
        new Date(selected.date) - new Date(session.date)
      );
      return timeDiff < 3600000; // 1 hour window
    });
    if (hasCloseSession) score += 15;

    // Popularity bonus
    score += (session.popularity || 0) / 10;

    // Avoid recommending already scheduled sessions
    if (selectedSessions.some((s) => s.id === session.id)) score = -Infinity;

    return { ...session, score };
  });

  // Filter out invalid and sort by score
  return scoredSessions
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6); // Return top 6 recommendations
};
