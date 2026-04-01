"use client";

import Image from "next/image";
import { useState } from "react";

interface PhoneMockupProps {
  screenshots: string[];
  accentColor?: string;
}

export default function PhoneMockup({ screenshots, accentColor = "#7c6aff" }: PhoneMockupProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* phone frame */}
      <div
        className="relative w-[220px] h-[440px] rounded-[42px] overflow-hidden shadow-2xl select-none"
        style={{
          background: "#18181b",
          border: "8px solid #2a2a2a",
          boxShadow: `0 0 0 1px #3a3a3a, 0 32px 64px rgba(0,0,0,0.7), 0 0 60px ${accentColor}30`,
        }}
      >
        {/* notch */}
        <div className="absolute top-0 inset-x-0 flex justify-center z-10 pt-2">
          <div className="w-20 h-5 bg-[#18181b] rounded-b-2xl" />
        </div>
        {/* screen content */}
        <div className="w-full h-full relative">
          {screenshots.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="App screenshot"
              fill
              className="object-cover transition-opacity duration-300"
              style={{ opacity: i === active ? 1 : 0 }}
              sizes="220px"
              priority={i === 0}
            />
          ))}
        </div>
      </div>

      {/* dot indicators */}
      <div className="flex items-center gap-2">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="w-2 h-2 rounded-full transition-all duration-200 focus:outline-none"
            style={{
              background: i === active ? accentColor : "#374151",
              transform: i === active ? "scale(1.2)" : "scale(1)",
            }}
            aria-label={`Screenshot ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
