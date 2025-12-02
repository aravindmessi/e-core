import React, { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Tournaments: React.FC = () => {
  const [tab, setTab] = useState<"rules" | "register" | "fixtures">("rules");

  // Form Fields
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userUpi, setUserUpi] = useState("");
  const [amount, setAmount] = useState(50);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

  // Your QR URL
  const qrUrl =
    "https://firebasestorage.googleapis.com/v0/b/e-core-c34c3.firebasestorage.app/o/tournament%2Fqr.png?alt=media&token=5979b9c6-4067-4a28-adcd-3ed4fa9976b7";

  // Handle Submit
  const handleSubmit = async () => {
    if (
      !name.trim() ||
      !gameId.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !userUpi.trim() ||
      !screenshotFile
    ) {
      alert("Please fill all fields and upload screenshot.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Enter a valid email.");
      return;
    }

    if (phone.length < 10) {
      alert("Enter a valid phone number.");
      return;
    }

    if (!userUpi.includes("@")) {
      alert("Enter a valid UPI ID.");
      return;
    }

    try {
      // Upload screenshot
      const filePath = `paymentScreenshots/${Date.now()}_${screenshotFile.name}`;
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, screenshotFile);
      const screenshotUrl = await getDownloadURL(storageRef);

      // Save to Firestore
      await addDoc(collection(db, "tournamentRegistrations"), {
        name,
        gameId,
        email,
        phone,
        userUpi,
        amount,
        screenshotUrl,
        paymentMethod: "QR Scan",
        paymentStatus: "PENDING", // You will check manually
        createdAt: serverTimestamp(),
      });

      alert("Registration saved successfully!");
      setName("");
      setGameId("");
      setEmail("");
      setPhone("");
      setUserUpi("");
      setScreenshotFile(null);

    } catch (err) {
      console.error(err);
      alert("Error saving registration.");
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <h2 className="text-3xl font-bold gamer-font mb-8 text-white">
        Tournament
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-10">
        {["rules", "register", "fixtures"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-4 py-2 rounded font-bold ${
              tab === t
                ? "bg-purple-600 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* RULES */}
      {tab === "rules" && (
        <div className="bg-slate-900 p-6 rounded-xl border border-purple-500/20 space-y-2">
          <h3 className="text-xl font-bold text-purple-400">
            Tournament Rules
          </h3>
          <ul className="text-slate-300 list-disc pl-6">
            <li>Online matches only</li>
            <li>No cheating or modded apps</li>
            <li>Direct knockout</li>
            <li>Winner must submit screenshot</li>
          </ul>
        </div>
      )}

      {/* REGISTER */}
      {tab === "register" && (
        <div className="bg-slate-900 p-6 rounded-xl border border-cyan-500/20 max-w-md">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Register</h3>

          <div className="space-y-4">
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />

            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="Game ID"
            />

            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />

            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              value={userUpi}
              onChange={(e) => setUserUpi(e.target.value)}
              placeholder="yourupi@bank"
            />

            <select
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1 mb-4"
            >
              <option value={20}>₹20</option>
              <option value={30}>₹30</option>
              <option value={50}>₹50</option>
            </select>

            {/* QR */}
            <div className="mt-4 text-center">
              <h4 className="text-cyan-400 font-bold mb-2">Scan & Pay</h4>
              <img
                src={qrUrl}
                alt="Tournament QR"
                className="w-56 mx-auto rounded-lg"
              />
            </div>

            {/* SCREENSHOT UPLOAD */}
            <div className="mt-4">
              <label className="text-slate-300 text-sm">Upload Payment Screenshot</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                className="w-full mt-1"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded font-bold mt-4"
            >
              SAVE MY REGISTRATION
            </button>
          </div>
        </div>
      )}

      {/* FIXTURES */}
      {tab === "fixtures" && (
        <div className="bg-slate-900 p-6 rounded-xl border border-pink-500/20 text-white">
          Fixtures coming soon…
        </div>
      )}
    </div>
  );
};

export default Tournaments;
