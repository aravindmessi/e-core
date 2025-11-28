import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ADMIN_EMAIL = "aravindappu935@gmail.com"; // change this!

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white p-4">Checking admin...</div>;

  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
