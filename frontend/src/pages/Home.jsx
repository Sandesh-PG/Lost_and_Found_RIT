import React from "react";
const Home = ({ user }) => (
  <div>
    <h1>HomePage</h1>
    {user && <p>Welcome, {user.username}!</p>}
  </div>
);
export default Home;
