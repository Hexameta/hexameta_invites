import { useState } from "react";

export default function PhoneCard({ item, onOpen, size = "md" }) {
  const [broken, setBroken] = useState(false);
  const width = size === "lg" ? "w-64 sm:w-62" : "w-48 sm:w-50";

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`Open ${item.title} invitation`}
      className={`${width} shrink-0 text-left group`}
    >
      <div className="rounded-[2.2rem] bg-deep p-2 shadow-[0_18px_40px_-18px_rgba(6,42,33,.55)] transition-transform duration-300 group-hover:-translate-y-1.5">
        <div className="relative aspect-[9/18] overflow-hidden rounded-[1.7rem]" style={{ background: item.color }}>
          {!broken && (
            <img
              src={item.image}
              alt=""
              loading="lazy"
              onError={() => setBroken(true)}
              className="h-full w-full object-cover"
            />
          )}
          {broken && (
            <div className="flex h-full items-center justify-center p-5 text-center font-display text-2xl font-semibold text-white/90">
              {item.title}
            </div>
          )}
          <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-deep/90" />
        </div>
      </div>
      <div className="mt-3 px-1">
        <p className="font-display text-xl font-semibold leading-tight">{item.title}</p>
        <p className="mt-0.5 text-sm text-pine/70">
          {[item.category, item.date].filter(Boolean).join(", ")}
        </p>
      </div>
    </button>
  );
}
