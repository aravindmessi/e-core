import React, { useState } from "react";

const Tournaments: React.FC = () => {
  const [tab, setTab] = useState<"rules" | "register" | "fixtures">("rules");

  // Form Fields
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Payment selection
  const [amount, setAmount] = useState(50);
  const [method, setMethod] = useState("");
  const [userUpi, setUserUpi] = useState("");

  // UPDATED — Your new working Kotak UPI ID
  const receiverUpi = "9159385383@kotak811";
  const receiverName = "EFootball Core Tournament";

  // Payment handler
  const handlePay = () => {
    // VALIDATION
    if (!name.trim() || !gameId.trim() || !email.trim() || !phone.trim() || !userUpi.trim()) {
      alert("Please fill all the fields and provide valid information.");
      return;
    }

    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone validation
    if (phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    // UPI validation
    if (!userUpi.includes("@")) {
      alert("Please enter a valid UPI ID.");
      return;
    }

    if (!method) {
      alert("Select a payment method first!");
      return;
    }

    const baseParams =
      `pa=${receiverUpi}` +
      `&pn=${encodeURIComponent(receiverName)}` +
      `&am=${amount}` +
      `&cu=INR` +
      `&tn=Tournament`;

    // Google Pay
    if (method === "Google Pay") {
      window.location.href = `upi://pay?${baseParams}`;
    }

    // PhonePe (correct)
    if (method === "PhonePe") {
      window.location.href =
        `intent://pay?${baseParams}` +
        `#Intent;scheme=upi;package=com.phonepe.app;end;`;
    }

    // Paytm (correct)
    if (method === "Paytm") {
      window.location.href =
        `intent://pay?${baseParams}` +
        `#Intent;scheme=upi;package=net.one97.paytm;end;`;
    }
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Page Title */}
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
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* RULES */}
      {tab === "rules" && (
        <div className="bg-slate-900 p-6 rounded-xl border border-purple-500/20 space-y-4">
          <h3 className="text-xl font-bold text-purple-400">Tournament Rules</h3>
          <ul className="list-disc pl-6 text-slate-300 space-y-2">
            <li>Match Type: Online Match</li>
            <li>No cheating or modded apps</li>
            <li>Direct knockout — lose = eliminated</li>
            <li>No quitting mid-match</li>
            <li>Winner must submit screenshot</li>
            <li>Use valid eFootball ID</li>
            <li>Organizers’ decision is final</li>
          </ul>
        </div>
      )}

      {/* REGISTER */}
      {tab === "register" && (
        <div className="bg-slate-900 p-6 rounded-xl border border-cyan-500/20 max-w-md">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Register for Tournament</h3>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-slate-400 text-sm">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                placeholder="Your name"
              />
            </div>

            {/* eFootball ID */}
            <div>
              <label className="text-slate-400 text-sm">eFootball ID</label>
              <input
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                placeholder="Game ID"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-slate-400 text-sm">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                placeholder="example@gmail.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-slate-400 text-sm">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                placeholder="9876543210"
              />
            </div>

            {/* Player UPI */}
            <div>
              <label className="text-slate-400 text-sm">Your UPI ID</label>
              <input
                value={userUpi}
                onChange={(e) => setUserUpi(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                placeholder="yourupi@bank"
              />
            </div>

            {/* Payment Section */}
            <div className="mt-6">
              <h4 className="text-cyan-400 font-bold mb-3">Payment</h4>

              {/* Amount Selector */}
              <label className="text-slate-400 text-sm">Select Amount</label>
              <select
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1 mb-4"
              >
                <option value={20}>₹20</option>
                <option value={30}>₹30</option>
                <option value={50}>₹50</option>
              </select>

              {/* Payment Methods */}
              <label className="text-slate-400 text-sm">Payment Method</label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <button
                  onClick={() => setMethod("Google Pay")}
                  className={`p-3 rounded text-sm font-bold ${
                    method === "Google Pay"
                      ? "bg-green-600 text-white"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  GPay
                </button>

                <button
                  onClick={() => setMethod("PhonePe")}
                  className={`p-3 rounded text-sm font-bold ${
                    method === "PhonePe"
                      ? "bg-purple-600 text-white"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  PhonePe
                </button>

                <button
                  onClick={() => setMethod("Paytm")}
                  className={`p-3 rounded text-sm font-bold ${
                    method === "Paytm"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  Paytm
                </button>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePay}
                className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded font-bold mt-6"
              >
                Pay ₹{amount} via {method || "Select Method"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FIXTURES */}
      {tab === "fixtures" && (
        <div className="bg-slate-900 p-6 rounded-xl border border-pink-500/20">
          <h3 className="text-xl font-bold text-pink-400 mb-6">Tournament Bracket</h3>

          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-800 p-3 rounded text-white text-center border border-slate-700"
                >
                  Player {i + 1}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-800 p-3 rounded text-white text-center border border-slate-700"
                >
                  Player {i + 11}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournaments;
