import Link from "next/link";
import { FaCalendar, FaMapMarkerAlt, FaCode } from "react-icons/fa";

export default function ConferenceCard({ conference }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          {conference.name}
        </h2>
        <p className="text-sm text-gray-600">{conference.organizer}</p>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center space-x-2 mb-3">
          <FaMapMarkerAlt className="text-gray-500" />
          <p className="text-sm text-gray-700">{conference.location}</p>
        </div>

        {/* Technology Focus */}
        {/* <div className="flex items-center space-x-2 mb-4">
          <FaCode className="text-gray-500" />
          <p className="text-sm text-gray-700">
            Technology: {conference.technology || "General"}
          </p>
        </div> */}

        {/* Sessions Count */}
        <div className="text-sm text-gray-600 mb-4">
          {conference.sessions.length} sessions
        </div>

        {/* Call-to-Action Button */}
        <Link
          href={`/conferences/${conference.id}`}
          className="inline-block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
