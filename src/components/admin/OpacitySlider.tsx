"use client";

import { useState } from "react";

export function OpacitySlider({
  name,
  defaultValue = 30,
  label = "Photo Opacity",
}: {
  name: string;
  defaultValue?: number;
  label?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={name} className="block text-xs uppercase tracking-widest text-black/60">
          {label}
        </label>
        <span className="text-xs text-black/60">{value}%</span>
      </div>
      <input
        id={name}
        name={name}
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-black"
      />
      <p className="mt-1 text-xs text-black/60">
        Controls how visible the banner photo is behind the logo. Lower = more subtle.
      </p>
    </div>
  );
}
