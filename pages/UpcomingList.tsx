import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocsFromServer, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const UpcomingList = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    const snap = await getDocsFromServer(collection(db, "upcomingPlayers")); // 🔥 FORCE SERVER
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setPlayers(list);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this player?")) {
      await deleteDoc(doc(db, "upcomingPlayers", id));
      fetchPlayers(); // refresh list
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  if (loading)
    return <div className="text-white p-6">Loading players...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Players</h1>

      <Link
        to="/admin/upcoming/add"
        className="bg-green-600 px-4 py-2 rounded inline-block mb-4"
      >
        Add New Upcoming Player
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {players.map((p) => (
          <div
            key={p.id}
            className="bg-slate-800 p-4 rounded-xl border border-slate-700"
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h2 className="text-lg font-bold">{p.name}</h2>
            <p className="text-sm text-slate-400">Rating: {p.rating}</p>

            <div className="flex gap-2 mt-3">
              <Link
                to={`/admin/upcoming/edit/${p.id}`}
                className="bg-blue-600 px-3 py-1 rounded text-sm"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-600 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingList;
