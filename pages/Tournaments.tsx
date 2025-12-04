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
  const adminEmail = "efootballcore2026@gmail.com";

  const handleSubmit = async () => {
    if (
      !name.trim() ||
      !gameId.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !userUpi.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Enter a valid email");
      return;
    }

    if (phone.length < 10) {
      alert("Enter a valid phone number");
      return;
    }

    if (!userUpi.includes("@")) {
      alert("Enter a valid UPI ID");
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
        paymentStatus: "WAITING_FOR_SS",
        createdAt: serverTimestamp(),
      });

      alert("Registration saved! Now send your screenshot.");
    } catch (err) {
      console.error(err);
      alert("Error saving registration");
    }
  };

  const mailLink = () => {
    return (
      `mailto:${adminEmail}` +
      `?subject=Tournament%20Payment%20-%20${name}` +
      `&body=` +
      `Name: ${name}%0D%0A` +
      `Game ID: ${gameId}%0D%0A` +
      `Email: ${email}%0D%0A` +
      `Phone: ${phone}%0D%0A` +
      `UPI: ${userUpi}%0D%0A` +
      `Amount Paid: ₹${amount}%0D%0A%0D%0A` +
      `Please attach your payment screenshot.`
    );
  };

  return (
    <div className="min-h-screen pb-16 text-white">
      <h2 className="text-3xl font-bold gamer-font mb-8 text-white">Tournament</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-10">
        {["rules", "register", "fixtures"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-4 py-2 rounded font-bold ${
              tab === t ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-300"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* RULES */}
      {tab === "rules" && (
        <div className="bg-slate-900 p-6 rounded-xl border border-purple-500/20 space-y-2">
          <h3 className="text-xl font-bold text-purple-400">Tournament Rules</h3>
          <ul className="text-slate-300 list-disc pl-6 space-y-1">
            <li>Online matches only</li>
            <li>No cheating or modded apps</li>
            <li>Direct knockout</li>
            <li>Winner must submit screenshot</li>
            <li>Organizers' decision is final</li>
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
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              placeholder="Game ID"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            />

            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              placeholder="yourupi@bank"
              value={userUpi}
              onChange={(e) => setUserUpi(e.target.value)}
            />

            <select
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
            >
              <option value={20}>₹20</option>
              <option value={30}>₹30</option>
              <option value={50}>₹50</option>
            </select>

            {/* PAYMENT INFO */}
            <div className="bg-slate-800 p-4 rounded border border-slate-700 text-center">
              <p className="text-lg text-cyan-400 font-bold">Send payment to:</p>

              <p className="mt-2 text-xl font-bold">{receiverUpi}</p>

              <button
                className="mt-3 bg-purple-600 px-4 py-2 rounded text-white"
                onClick={() => navigator.clipboard.writeText(receiverUpi)}
              >
                COPY UPI ID
              </button>

              <p className="text-slate-400 text-sm mt-3">
                After copying, open GPay/PhonePe manually <br />
                paste the UPI and send the amount.
              </p>
            </div>

            {/* SAVE REGISTRATION */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded font-bold"
            >
              SAVE REGISTRATION
            </button>

            {/* SEND EMAIL BUTTON */}
            {name && email && (
              <a
                href={mailLink()}
                className="w-full block bg-blue-600 hover:bg-blue-500 text-white text-center py-3 rounded font-bold"
              >
                SEND PAYMENT SCREENSHOT
              </a>
            )}
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
