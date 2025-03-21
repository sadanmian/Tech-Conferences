"use client";
import { createContext, useContext, useState } from "react";

const ScheduleContext = createContext();

export function ScheduleProvider({ children }) {
  const [schedule, setSchedule] = useState([]);

  // Add a session to the schedule
  const addToSchedule = (session) => {
    // Check for conflicts
    const hasConflict = schedule.some(
      (s) =>
        new Date(s.startTime) < new Date(session.endTime) &&
        new Date(s.endTime) > new Date(session.startTime)
    );

    if (hasConflict) {
      alert("This session conflicts with your schedule!");
      return;
    }

    setSchedule([...schedule, session]);
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
