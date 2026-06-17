"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("پسورد جدید و تکرار آن یکسان نیستند");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage("پسورد با موفقیت تغییر کرد — لطفاً دوباره وارد شوید");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => signOut({ callbackUrl: "/fa/admin/login" }), 2000);
      } else {
        setStatus("error");
        setMessage(data.error);
      }
    } catch {
      setStatus("error");
      setMessage("خطایی رخ داد، دوباره امتحان کنید");
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
      <div className="w-full max-w-md z-10 bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src="/logo-munch.jpg"
            alt="Munch Box"
            className="w-10 h-10 rounded-full border border-orange-400/50"
          />
          <div>
            <h1 className="text-xl font-bold text-white">تنظیمات</h1>
            <p className="text-gray-400 text-xs">مدیریت حساب کاربری</p>
          </div>
        </div>

        <h2 className="text-sm font-semibold text-orange-400 mb-4 pb-2 border-b border-gray-700">
          تغییر پسورد
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">پسورد فعلی</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="bg-gray-800/80 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">پسورد جدید</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="bg-gray-800/80 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">تکرار پسورد جدید</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-gray-800/80 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700"
            />
          </div>

          {message && (
            <p className={`text-sm text-center ${
              status === "success" ? "text-green-400" : "text-red-400"
            }`}>
              {message}
            </p>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex-1 py-2 rounded-lg font-bold text-white transition-all duration-300 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #f97316, #fbbf24)",
                boxShadow: "0 4px 24px rgba(249,115,22,0.3)",
              }}
            >
              {status === "loading" ? "در حال ذخیره..." : "تغییر پسورد"}
            </button>

           
          </div>
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