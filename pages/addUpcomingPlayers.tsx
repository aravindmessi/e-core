import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddUpcomingPlayer = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !rating || !imageFile) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Upload Image
      const imageRef = ref(storage, `upcoming/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      // Save to Firestore
      await addDoc(collection(db, "upcomingPlayers"), {
        name,
        rating: Number(rating),
        imageUrl,
        createdAt: new Date(),
      });

      alert("Player added successfully!");
      navigate("/admin/upcoming");

    } catch (error) {
      console.error(error);
      alert("Error adding player");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Add Upcoming Player</h1>

      <form
        onSubmit={handleAdd}
        className="bg-slate-800 p-6 rounded-xl max-w-lg space-y-5 border border-slate-700"
      >
        {/* Player Name */}
        <div>
          <label className="text-sm text-slate-300">Player Name</label>
          <input
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white mt-1"
            placeholder="Example: Mbappe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm text-slate-300">Rating</label>
          <input
            type="number"
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white mt-1"
            placeholder="Example: 88"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm text-slate-300">Player Image</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 p-3 rounded font-bold hover:bg-green-500"
        >
          {loading ? "Saving..." : "Add Player"}
        </button>
      </form>
    </div>
  );
};

export default AddUpcomingPlayer;
