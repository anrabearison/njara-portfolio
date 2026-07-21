import { useState, useEffect } from "react";

function Particles() {
  const [particles, setParticles] = useState<
    { left: number; top: number; size: number; delay: number; duration: number; cyan: boolean }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 28 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 8,
        cyan: Math.random() > 0.4,
      })),
    );
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(0,212,255,0.12), transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(124,58,237,0.12), transparent 50%)",
        }}
      />
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.cyan ? "#00D4FF" : "#7C3AED",
            boxShadow: p.cyan ? "0 0 10px rgba(0,212,255,0.8)" : "0 0 10px rgba(124,58,237,0.8)",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default Particles;
