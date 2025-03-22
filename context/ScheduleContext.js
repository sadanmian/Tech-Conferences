"use client";
import { createContext, useContext, useState } from "react";

const ScheduleContext = createContext();

export function ScheduleProvider({ children }) {
  const [schedule, setSchedule] = useState([]);

  // Add a session to the schedule
  const addToSchedule = (session) => {
    // If your session data does NOT have startTime/endTime, derive them here.
    // For example, assume each session is 1 hour. Or skip this if your data
    // already includes start/end times.
    const start = new Date(session.date);
    const end = new Date(session.date);
    end.setHours(end.getHours() + 1);

    // Check for conflicts
    const hasConflict = schedule.some(
      (s) =>
        // Make sure s.startTime and s.endTime exist, or derive them similarly
        new Date(s.startTime) < end && new Date(s.endTime) > start
    );

    if (hasConflict) {
      alert("This session conflicts with your schedule!");
      return;
    }

    // Save the session along with start/end so that we can check them later
    setSchedule([
      ...schedule,
      {
        ...session,
        startTime: start.toString(),
        endTime: end.toString(),
      },
    ]);
  };

  // Remove a session from the schedule
  const removeFromSchedule = (sessionId) => {
    setSchedule(schedule.filter((s) => s.id !== sessionId));
  };

  return (
    <ScheduleContext.Provider
      value={{ schedule, addToSchedule, removeFromSchedule }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  return useContext(ScheduleContext);
}
