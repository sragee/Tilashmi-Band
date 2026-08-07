export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-black/15 animate-ping" />
        <span className="absolute inset-2 rounded-full border border-black/20" />
        <span className="font-display text-xl tracking-widest text-black">T</span>
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.4em] text-black/60">Tilashmi</p>
    </div>
  );
}
