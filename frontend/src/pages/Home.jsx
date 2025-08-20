import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-3xl font-bold mt-4 mb-2">HomePage</h1>
        {/* Welcome Message */}
        {currentUser && (
          <p className="text-lg text-gray-700">
            Welcome, {currentUser.username || currentUser.firstName}!
          </p>
        )}
      </div>
    </div>
  );
}
