import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import EFootballCard from "../components/EFootballCard";

const normalize = (str: string) => {
  if (!str) return "";
  return str.trim().toLowerCase();
};

const UpcomingPlayers: React.FC = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");
  const [filterPos, setFilterPos] = useState("All");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const snap = await getDocs(collection(db, "upcomingPlayers"));
        let list: any[] = [];

        snap.forEach((doc) => {
          const data = doc.data();

          const fixed = {
            id: doc.id,
            name: data.name || "Unknown",
            position: data.position?.toUpperCase() || "N/A",
            cardType: data.cardType || "Featured",
            overall: data.overall || 0,
            releaseDate: data.releaseDate || "",
            cardImageUrl:
              data.cardImageUrl ||
              data.imageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
          };

          list.push(fixed);
        });

        setPlayers(list);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((p) => {
    const typeOk =
      filterType === "All" || normalize(p.cardType) === normalize(filterType);

    const posOk =
      filterPos === "All" || normalize(p.position) === normalize(filterPos);

    return typeOk && posOk;
  });

  return (
    <div className="min-h-screen pb-12">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold gamer-font text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Upcoming Players
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Check out the latest leaks
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-900 border border-purple-500/30 rounded-lg px-4 py-3 text-sm text-slate-300"
          >
            <option value="All">All Types</option>
            <option value="Epic">Epic</option>
            <option value="Big Time">Big Time</option>
            <option value="Featured">Featured</option>
            <option value="Highlight">Highlight</option>
          </select>

          <select
            value={filterPos}
            onChange={(e) => setFilterPos(e.target.value)}
            className="bg-slate-900 border border-purple-500/30 rounded-lg px-4 py-3 text-sm text-slate-300"
          >
            <option value="All">Pos</option>
            <option value="CF">CF</option>
            <option value="SS">SS</option>
            <option value="LWF">LWF</option>
            <option value="RWF">RWF</option>
            <option value="AMF">AMF</option>
            <option value="CMF">CMF</option>
            <option value="DMF">DMF</option>
            <option value="CB">CB</option>
            <option value="GK">GK</option>
          </select>
        </div>
      </div>

      {/* Responsive Grid */}
      {loading ? (
        <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] bg-slate-800/50 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="flex justify-center p-0 m-0 bg-transparent shadow-none border-none"
              >
                <EFootballCard player={player} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-400">
              No players found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingPlayers;