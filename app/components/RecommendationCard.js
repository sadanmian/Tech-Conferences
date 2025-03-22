import { FaRegClock, FaTags, FaStar } from "react-icons/fa";

export default function RecommendationCard({
  session,
  isInSchedule,
  addToSchedule,
  removeFromSchedule,
}) {
  const formatSessionTime = (date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const tags = session.tags || []; // Ensure tags is always an array

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
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
        {isInSchedule ? (
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
}
