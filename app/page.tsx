"use client";

import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={{
        background: "rgb(30, 11, 59)",
      }} />

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
        <div style={{
          position: "absolute",
          background: "radial-gradient(circle at center, rgba(200,50,200,0.6) 0, rgba(200,50,200,0) 50%) no-repeat",
          width: "80%", height: "80%",
          top: "calc(50% - 40%)", left: "calc(50% - 40%)",
          animation: "moveHorizontal 40s ease infinite",
          mixBlendMode: "hard-light",
          transformOrigin: "calc(50% - 200px)",
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

      {/* Logo */}
      <div className="flex items-center gap-3 mb-12 z-10">
        <img
          src="/logo-munch.jpg"
          alt="Munch Box"
          className="w-16 h-16 rounded-full border-2 border-orange-400"
          style={{ boxShadow: "0 0 20px rgba(249,115,22,0.5)" }}
        />
        <h1
          className="text-4xl font-black tracking-widest text-orange-400"
          style={{ textShadow: "0 0 30px rgba(249,115,22,0.6)" }}
        >
          MUNCHBOX
        </h1>
      </div>

      {/* Buttons */}
      <div className="flex gap-5 z-10">
        <button
          onClick={() => router.push("/fa")}
          className="py-3 px-10 rounded-2xl text-lg font-bold text-white transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #f97316, #fbbf24)",
            boxShadow: "0 4px 24px rgba(249,115,22,0.5)",
          }}
        >
          منو
        </button>

        <button
          onClick={() => router.push("/fa/admin/login")}
          className="py-3 px-10 rounded-2xl text-xl font-bold text-orange-300 border border-orange-500/40 hover:border-orange-400 hover:bg-orange-500/10 transition-all duration-300 hover:scale-105"
          style={{ backdropFilter: "blur(10px)" }}
        >
          داشبورد
        </button>
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
        @keyframes moveHorizontal {
          0% { transform: translateX(-50%) translateY(-10%); }
          50% { transform: translateX(50%) translateY(10%); }
          100% { transform: translateX(-50%) translateY(-10%); }
        }
      `}</style>
    </div>
  );
}