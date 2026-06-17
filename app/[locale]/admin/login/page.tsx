"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("نام کاربری یا رمز عبور اشتباه است");
    } else {
      router.push(`/${locale}/admin`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10" style={{ background: "rgb(30, 11, 59)" }} />

      {/* Gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" style={{
        filter: "url(#blurMe) blur(40px)",
      }}>
        <div style={{
          position: "absolute",
          background: "radial-gradient(circle at center, rgba(249,115,22,0.8) 0, rgba(249,115,22,0) 50%) no-repeat",
          width: "80%", height: "80%",
          top: "calc(50% - 40%)", left: "calc(50% - 40%)",
          animation: "moveVertical 30s ease infinite",
          mixBlendMode: "hard-light",
        }} />
        <div style={{
          position: "absolute",
          background: "radial-gradient(circle at center, rgba(139,0,255,0.8) 0, rgba(139,0,255,0) 50%) no-repeat",
          width: "80%", height: "80%",
          top: "calc(50% - 40%)", left: "calc(50% - 40%)",
          animation: "moveInCircle 20s reverse infinite",
          mixBlendMode: "hard-light",
          transformOrigin: "calc(50% - 400px)",
        }} />
        <div style={{
          position: "absolute",
          background: "radial-gradient(circle at center, rgba(251,191,36,0.8) 0, rgba(251,191,36,0) 50%) no-repeat",
          width: "80%", height: "80%",
          top: "calc(50% - 40%)", left: "calc(50% - 40%)",
          animation: "moveInCircle 40s linear infinite",
          mixBlendMode: "hard-light",
          transformOrigin: "calc(50% + 400px)",
        }} />
      </div>

      {/* SVG filter */}
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Card */}
      <div className="w-full max-w-sm z-10 bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src="/logo-munch.jpg"
            alt="Munch Box"
            className="w-10 h-10 rounded-full border border-orange-400/50"
          />
          <div>
            <h1 className="text-xl font-bold text-white">پنل مدیریت</h1>
            <p className="text-gray-400 text-xs">ورود به داشبورد</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">نام کاربری</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-gray-800/80 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-800/80 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg font-bold text-white transition-all duration-300 disabled:opacity-50 mt-2"
            style={{
              background: "linear-gradient(135deg, #f97316, #fbbf24)",
              boxShadow: "0 4px 24px rgba(249,115,22,0.3)",
            }}
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes moveVertical {
          0% { transform: translateY(-50%); }
          50% { transform: translateY(50%); }
          100% { transform: translateY(-50%); }
        }
        @keyframes moveInCircle {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}