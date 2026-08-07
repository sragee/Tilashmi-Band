"use client";

import { useEffect, useRef } from "react";

export function Particles({ count = 60 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.25 + 0.05,
      drift: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.5 + 0.15,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let raf: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        p.twinklePhase += p.twinkleSpeed;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,10,10,${(p.alpha * (0.4 + twinkle * 0.6)).toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
