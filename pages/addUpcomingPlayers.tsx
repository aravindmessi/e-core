import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddUpcomingPlayer = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [overall, setOverall] = useState("");
  const [cardType, setCardType] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("DEBUG: SUBMIT CLICKED");

    if (!name || !position || !overall || !cardType || !imageFile) {
      console.log("DEBUG: VALIDATION FAILED");
      alert("Please fill all fields and select an image.");
      return;
    }

    console.log("DEBUG: VALIDATION PASSED");

    setLoading(true);

    try {
      console.log("DEBUG: STARTING UPLOAD");

      const filePath = `upcomingPlayers/${Date.now()}-${imageFile.name}`;

      console.log("DEBUG FILE =>", imageFile);
      console.log("DEBUG STORAGE =>", storage);
      console.log("DEBUG PATH =>", filePath);

      // STORAGE REF
      const storageRef = ref(storage, filePath);

      // UPLOAD IMAGE
      await uploadBytes(storageRef, imageFile);

      // GET DOWNLOAD URL
      const downloadURL = await getDownloadURL(storageRef);

      // SAVE TO FIRESTORE
      await addDoc(collection(db, "upcomingPlayers"), {
        name,
        position,
        overall: Number(overall),
        cardType,
        imageUrl: downloadURL,
        date: serverTimestamp()
      });

      alert("Player added successfully!");
      navigate("/admin/upcoming");

    } catch (error) {
      console.error(error);
      alert("Error saving player.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Add New Upcoming Player</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label>Name</label>
          <input
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Player Name"
          />
        </div>

        <div>
          <label>Position</label>
          <input
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g. CF, CMF, RB"
          />
        </div>

        <div>
          <label>Overall</label>
          <input
            type="number"
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
            value={overall}
            onChange={(e) => setOverall(e.target.value)}
            placeholder="e.g. 82"
          />
        </div>

        <div>
          <label>Card Type</label>
          <input
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            placeholder="Base, Big Time, Epic, Featured..."
          />
        </div>

        <div>
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 py-2 rounded font-bold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Player"}
        </button>
      </form>
    </div>
  );
};

export default AddUpcomingPlayer;
