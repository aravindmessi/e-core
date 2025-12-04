import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Tournaments: React.FC = () => {
  const [tab, setTab] = useState<"rules" | "register" | "fixtures">("rules");

  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userUpi, setUserUpi] = useState("");
  const [amount, setAmount] = useState(50);

  const receiverUpi = "9159385383@kotak811";

  const handleSubmit = async () => {
    if (
      !name.trim() ||
      !gameId.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !userUpi.trim()
    ) {
      alert("Please fill all fields.");
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
      await addDoc(collection(db, "tournamentRegistrations"), {
        name,
        gameId,
        email,
        phone,
        userUpi,
        amount,
        paymentStatus: "PENDING",
        createdAt: serverTimestamp(),
      });

      alert("Registration submitted!");

      setName("");
      setGameId("");
      setEmail("");
      setPhone("");
      setUserUpi("");
    } catch (err) {
      console.error(err);
      alert("Error saving registration");
    }
  };

  return (
    <div className="min-h-screen pb-16 text-white">
      <h2 className="text-3xl font-bold gamer-font mb-8">Tournament</h2>

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
        <div className="bg-slate-900 p-6 rounded-xl border border-purple-500/20 space-y-4 max-w-xl">
          <h3 className="text-2xl font-bold text-purple-400">Tournament Rules</h3>

          <ul className="list-disc pl-6 text-slate-300 space-y-2">
            <li>Online match only (No eFootball Friend Match).</li>
            <li>Only fair play — no cheating, no modded apps.</li>
            <li>Direct knockout format (Lose = Eliminated).</li>
            <li>Winner must report match result immediately.</li>
            <li>If opponent does not respond within 10 mins → walkover.</li>
            <li>No rage quit — quitting = disqualification.</li>
            <li>Organizer decisions are final.</li>
          </ul>

          <p className="text-slate-400 text-sm italic mt-3">
            Play fair and respect opponents!
          </p>
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

            {/* AMOUNT */}
            <select
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
            >
              <option value={20}>₹20</option>
              <option value={30}>₹30</option>
              <option value={50}>₹50</option>
            </select>

            {/* SIMPLE PAYMENT INSTRUCTIONS */}
            <div className="p-4 bg-slate-800 border border-slate-700 rounded text-center">
              <p className="text-white font-semibold mb-2">
                Send payment manually to:
              </p>

              <p className="text-cyan-400 text-lg font-bold">{receiverUpi}</p>

              <button
                className="mt-3 bg-purple-600 text-white px-4 py-2 rounded"
                onClick={() => navigator.clipboard.writeText(receiverUpi)}
              >
                COPY UPI ID
              </button>

              <div className="flex gap-3 justify-center mt-4">
                <a
                  href="phonepe://"
                  className="bg-purple-700 px-4 py-2 rounded text-white text-sm"
                >
                  Open PhonePe
                </a>

                <a
                  href="gpay://"
                  className="bg-green-600 px-4 py-2 rounded text-white text-sm"
                >
                  Open GPay
                </a>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded font-bold"
            >
              SUBMIT REGISTRATION
            </button>
          </div>
        </div>
      )}

      {/* FIXTURES */}
      {tab === "fixtures" && (
        <div className="bg-slate-900 p-6 rounded-xl border border-pink-500/20 max-w-3xl">
          <h3 className="text-2xl font-bold text-pink-400 mb-6">
            Knockout Fixtures (Mindmap View)
          </h3>

          <div className="grid grid-cols-3 gap-6 text-center">

            {/* Round 1 */}
            <div className="space-y-6">
              <h4 className="text-sm text-slate-400">ROUND 1</h4>
              {[1,2,3,4].map((n) => (
                <div key={n} className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                  Player {n} vs Player {n+1}
                </div>
              ))}
            </div>

            {/* Semi Finals */}
            <div className="space-y-12 pt-10">
              <h4 className="text-sm text-slate-400">SEMI FINALS</h4>
              <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                Winner Match 1 vs Winner Match 2
              </div>
              <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                Winner Match 3 vs Winner Match 4
              </div>
            </div>

            {/* Finals */}
            <div className="space-y-20 pt-16">
              <h4 className="text-sm text-slate-400">FINALS</h4>
              <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                SF Winner 1 vs SF Winner 2
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Tournaments;
