export default function GradientBackground() {
  return (
    <>
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "rgb(30, 11, 59)" }}
      />

      {/* Gradient blobs */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ filter: "url(#blurMe) blur(40px)" }}
      >
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
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

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
    </>
  );
}