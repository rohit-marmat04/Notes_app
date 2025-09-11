// src/components/NotificationCard.jsx
import React from "react";

const NotificationCard = ({ title, type, description, link, buttonLabel }) => {
  const typeColor = {
    job: "bg-blue-100 text-blue-800",
    internship: "bg-green-100 text-green-800",
    training: "bg-yellow-100 text-yellow-800",
    update: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="border p-4 rounded-lg shadow-md mb-4 bg-gray-800 text-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${typeColor[type] || "bg-gray-100 text-gray-800"}`}>
          {type}
        </span>
      </div>
      <p className="text-sm text-white mb-4">{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          {buttonLabel || "Apply"}
        </a>
      )}
    </div>
  );
};

export default NotificationCard;
