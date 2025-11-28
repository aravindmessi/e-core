import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">
          Logout
        </button>
      </div>

      <div className="space-y-4">
        
        {/* ADD PLAYER BUTTON */}
        <Link
          className="bg-green-600 px-4 py-2 rounded inline-block"
          to="/admin/upcoming/add"
        >
          Add Upcoming Player
        </Link>

        {/* VIEW PLAYERS BUTTON */}
        <Link
          className="bg-blue-600 px-4 py-2 rounded inline-block"
          to="/admin/upcoming"
        >
          View Upcoming Players
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;
