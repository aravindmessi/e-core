import React, { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

type TabKey = "rules" | "register" | "draw";

type Registration = {
  id: string;
  name: string;
  gameId: string;
  phone: string;
  amount: number;
  transactionId: string;
  slotStatus?: string;
};

const TOURNAMENT_SIZE = 16;
const ENTRY_FEE = 50;
const PAYMENT_NUMBER = "9159385383";

const Tournaments: React.FC = () => {
  const [tab, setTab] = useState<TabKey>("rules");

  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userUpi, setUserUpi] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [savedDetails, setSavedDetails] = useState<Registration | null>(null);

  useEffect(() => {
    const registrationsRef = collection(db, "tournamentRegistrations");
    const registrationsQuery = query(
      registrationsRef,
      orderBy("createdAt", "asc"),
      limit(TOURNAMENT_SIZE)
    );

    const unsubscribe = onSnapshot(registrationsQuery, (snapshot) => {
      const players = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "Unknown",
          gameId: data.gameId || "--",
          phone: data.phone || "--",
          amount: data.amount || ENTRY_FEE,
          transactionId: data.transactionId || "--",
          slotStatus: data.slotStatus || "BOOKED",
        } as Registration;
      });

      setRegistrations(players);
    });

    return () => unsubscribe();
  }, []);

  const spotsLeft = Math.max(TOURNAMENT_SIZE - registrations.length, 0);

  const drawPairs = useMemo(() => {
    const seeded = [...registrations];
    const pairs: Array<[Registration | null, Registration | null]> = [];

    for (let i = 0; i < TOURNAMENT_SIZE; i += 2) {
      pairs.push([seeded[i] || null, seeded[i + 1] || null]);
    }

    return pairs;
  }, [registrations]);

  const isValidEmail = (value: string) => value.includes("@") && value.includes(".");

  const isValidPhone = (value: string) => /^\d{10}$/.test(value);

  const whatsappLink = (details: {
    name: string;
    gameId: string;
    phone: string;
    transactionId: string;
  }) => {
    const message = [
      "Hello E-Football Core, I have paid the entry fee.",
      `Name: ${details.name}`,
      `Game ID: ${details.gameId}`,
      `Phone: ${details.phone}`,
      `Transaction ID: ${details.transactionId}`,
      `Amount: ₹${ENTRY_FEE}`,
      "Please confirm my slot.",
    ].join("\n");

    return `https://wa.me/91${PAYMENT_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async () => {
    if (!name.trim() || !gameId.trim() || !email.trim() || !phone.trim() || !userUpi.trim() || !transactionId.trim()) {
      alert("Please fill all fields before booking your slot.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Enter a valid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (registrations.length >= TOURNAMENT_SIZE) {
      alert("All slots are full for this tournament.");
      return;
    }

    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, "tournamentRegistrations"), {
        name: name.trim(),
        gameId: gameId.trim(),
        email: email.trim(),
        phone: phone.trim(),
        userUpi: userUpi.trim(),
        transactionId: transactionId.trim(),
        amount: ENTRY_FEE,
        paymentMethod: "GPay / PhonePe",
        paymentReceiver: PAYMENT_NUMBER,
        paymentStatus: "PAID_NEEDS_WHATSAPP_CONFIRMATION",
        slotStatus: "BOOKED",
        createdAt: serverTimestamp(),
      });

      const details = {
        id: docRef.id,
        name: name.trim(),
        gameId: gameId.trim(),
        phone: phone.trim(),
        amount: ENTRY_FEE,
        transactionId: transactionId.trim(),
        slotStatus: "BOOKED",
      };

      setSavedDetails(details);
      alert("Slot saved! Please click WhatsApp confirm now.");

      setName("");
      setGameId("");
      setEmail("");
      setPhone("");
      setUserUpi("");
      setTransactionId("");
      setTab("draw");
    } catch (err) {
      console.error(err);
      alert("Unable to save registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-16 text-white">
      <h2 className="text-3xl font-bold gamer-font mb-8 text-white">Tournament Slot Booking</h2>

      <div className="flex gap-4 mb-10 flex-wrap">
        {(["rules", "register", "draw"] as TabKey[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded font-bold ${
              tab === t ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-300"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {tab === "rules" && (
        <div className="bg-slate-900 p-6 rounded-xl border border-purple-500/20 space-y-3">
          <h3 className="text-xl font-bold text-purple-400">Tournament Rules</h3>
          <ul className="text-slate-300 list-disc pl-6 space-y-1">
            <li>Entry fee is fixed at ₹{ENTRY_FEE} per player.</li>
            <li>Pay to {PAYMENT_NUMBER} using GPay or PhonePe only.</li>
            <li>After payment, submit your transaction ID and click WhatsApp confirm.</li>
            <li>Your name appears in the draw after successful slot booking.</li>
            <li>Single elimination knockout format for {TOURNAMENT_SIZE} players.</li>
          </ul>
        </div>
      )}

      {tab === "register" && (
        <div className="bg-slate-900 p-6 rounded-xl border border-cyan-500/20 max-w-xl space-y-4">
          <h3 className="text-xl font-bold text-cyan-400">Book Your Slot</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              placeholder="Your Name"
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
              placeholder="Phone (10 digits)"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            />
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              placeholder="yourupi@bank"
              value={userUpi}
              onChange={(e) => setUserUpi(e.target.value)}
            />
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              placeholder="Payment Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>

          <div className="bg-slate-800 p-4 rounded border border-slate-700 text-center space-y-2">
            <p className="text-lg text-cyan-400 font-bold">Required Entry Fee: ₹{ENTRY_FEE}</p>
            <p className="text-slate-100">Pay to this number on GPay / PhonePe:</p>
            <p className="text-2xl font-extrabold tracking-wide">{PAYMENT_NUMBER}</p>
            <button
              className="mt-2 bg-purple-600 px-4 py-2 rounded text-white"
              onClick={() => navigator.clipboard.writeText(PAYMENT_NUMBER)}
            >
              COPY PAYMENT NUMBER
            </button>
            <p className="text-xs text-slate-400">Slots left: {spotsLeft}</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white py-3 rounded font-bold"
          >
            {loading ? "SAVING..." : "BOOK SLOT"}
          </button>

          {savedDetails && (
            <a
              href={whatsappLink(savedDetails)}
              target="_blank"
              rel="noreferrer"
              className="w-full block bg-[#25D366] hover:bg-[#1fb85a] text-white text-center py-3 rounded font-bold"
            >
              CONFIRM PAYMENT ON WHATSAPP
            </a>
          )}
        </div>
      )}

      {tab === "draw" && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-pink-500/20">
            <h3 className="text-xl font-bold text-pink-400">Tournament Box Draw</h3>
            <p className="text-slate-300 text-sm mt-2">
              First {TOURNAMENT_SIZE} booked players are placed in the live bracket.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {drawPairs.map(([playerOne, playerTwo], index) => (
              <div key={index} className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-2">Match {index + 1}</p>
                <div className="space-y-2">
                  <div className="bg-slate-800 rounded p-3">
                    {playerOne ? `${playerOne.name} (${playerOne.gameId})` : "Waiting for player..."}
                  </div>
                  <div className="bg-slate-800 rounded p-3">
                    {playerTwo ? `${playerTwo.name} (${playerTwo.gameId})` : "Waiting for player..."}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournaments;
