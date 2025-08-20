import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function LostPage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Lost Items</h1>
    </div>
  );
}
