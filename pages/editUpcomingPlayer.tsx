import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditUpcomingPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [oldImageUrl, setOldImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);

  // Fetch old data
  const fetchPlayer = async () => {
    const refDoc = doc(db, "upcomingPlayers", id!);
    const snap = await getDoc(refDoc);

    if (snap.exists()) {
      const data = snap.data();

      setName(data.name);
      setRating(String(data.overall)); // ✅ FIXED (previously data.rating)
      setOldImageUrl(data.imageUrl);

      setLoading(false);
    } else {
      alert("Player not found");
      navigate("/admin/upcoming");
    }
  };

  useEffect(() => {
    fetchPlayer();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !rating) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      let finalImageUrl = oldImageUrl;

      // If user selected a new image
      if (newImageFile) {
        const imgRef = ref(storage, `upcoming/${Date.now()}_${newImageFile.name}`);
        await uploadBytes(imgRef, newImageFile);
        finalImageUrl = await getDownloadURL(imgRef);
      }

      const playerRef = doc(db, "upcomingPlayers", id!);

      await updateDoc(playerRef, {
        name,
        overall: Number(rating), // ✅ FIXED — update correct field
        imageUrl: finalImageUrl,
      });

      alert("Player updated!");
      navigate("/admin/upcoming");

    } catch (err) {
      console.error(err);
      alert("Error updating player");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Upcoming Player</h1>

      <form
        onSubmit={handleUpdate}
        className="bg-slate-800 p-6 rounded-xl max-w-lg space-y-5"
      >
        {/* Name */}
        <div>
          <label className="text-sm">Player Name</label>
          <input
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm">Rating</label>
          <input
            type="number"
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded mt-1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        {/* Old Image */}
        <div>
          <p className="text-sm mb-1">Current Image</p>
          <img
            src={oldImageUrl}
            className="w-40 h-40 object-cover rounded"
          />
        </div>

        {/* New Image */}
        <div>
          <label className="text-sm">Upload New Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1"
            onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 p-3 rounded font-bold"
        >
          Update Player
        </button>
      </form>
    </div>
  );
};

export default EditUpcomingPlayer;
