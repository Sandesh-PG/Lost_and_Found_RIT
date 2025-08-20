import React from "react";
import { FaTimes } from "react-icons/fa";

export default function AvatarSelect({ avatars, selected, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-30">
      <div className="bg-white rounded-lg p-6 shadow-2xl min-w-[340px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Choose an Avatar</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {avatars.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(img)}
              className={`rounded-full border-2
                hover:border-blue-600 focus:border-blue-600 transition-all
                ${selected === img ? "border-blue-600" : "border-transparent"}`}
              style={{ padding: 0 }}
            >
              <img
                src={img}
                alt={`Avatar ${idx + 1}`}
                className="w-12 h-12 rounded-full bg-gray-100 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
