export function AmbientGlow({ variant = "default" }: { variant?: "default" | "hero" }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="light-rays" />
      <div className="aura w-[500px] h-[500px] -top-40 -left-40 animate-pulse-glow" />
      <div className="aura-accent w-[420px] h-[420px] top-1/3 -right-32 animate-pulse-glow" />
      {variant === "hero" && (
        <>
          <div className="geo-ring w-[600px] h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="geo-ring w-[420px] h-[420px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="aura w-[700px] h-[700px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
        </>
      )}
      <div className="noise-overlay" />
    </div>
  );
}
