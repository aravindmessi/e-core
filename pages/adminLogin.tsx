import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e: any) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={login}
        className="bg-slate-800 p-6 rounded-xl w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-white text-center">Admin Login</h2>

        <input
          type="email"
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-purple-600 py-2 rounded font-bold text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
