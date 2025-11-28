import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

// PUBLIC PAGES
import Home from "./pages/Home";
import UpcomingPlayers from "./pages/UpcomingPlayers";
import Formations from "./pages/Formations";
import Managers from "./pages/Managers";
import Tournaments from "./pages/Tournaments";

// ADMIN PAGES
import AdminLogin from "./pages/adminLogin";
import AdminDashboard from "./pages/adminDashboard";
import RequireAdmin from "./components/requireAdmin";
import UpcomingList from "./pages/UpcomingList";
import EditUpcomingPlayer from "./pages/editUpcomingPlayer";
import AddUpcomingPlayer from "./pages/addUpcomingPlayers";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/upcoming" element={<UpcomingPlayers />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/tournaments" element={<Tournaments />} />
        </Route>

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />

        {/* ADMIN → LIST UPCOMING PLAYERS */}
        <Route
          path="/admin/upcoming"
          element={
            <RequireAdmin>
              <UpcomingList />
            </RequireAdmin>
          }
        />

        {/* ADMIN → ADD UPCOMING PLAYER */}
        <Route
          path="/admin/upcoming/add"
          element={
            <RequireAdmin>
              <AddUpcomingPlayer />
            </RequireAdmin>
          }
        />

        {/* ADMIN → EDIT UPCOMING PLAYER */}
        <Route
          path="/admin/upcoming/edit/:id"
          element={
            <RequireAdmin>
              <EditUpcomingPlayer />
            </RequireAdmin>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;
