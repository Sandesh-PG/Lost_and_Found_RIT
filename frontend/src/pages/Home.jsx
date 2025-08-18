import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext'; 
import Navbar from '../layout/Navbar'; // 1. Import the Navbar

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      {/* 2. Render the Navbar at the top of the page */}
      <Navbar />

      {/* 3. The rest of your page content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold">HomePage</h1>
        {currentUser && <p className="mt-4 text-lg">Welcome, {currentUser.username || currentUser.firstName}!</p>}
      </div>
    </div>
  );
}