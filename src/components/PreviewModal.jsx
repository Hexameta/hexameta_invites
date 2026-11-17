import { useEffect } from "react";

export default function PreviewModal({ item, onClose, onEnquire }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-deep/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-4xl flex-col gap-6 overflow-auto rounded-3xl bg-paper p-5 sm:flex-row sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto w-[260px] shrink-0 sm:w-[300px]">
          <div className="rounded-[2.4rem] bg-deep p-2.5">
            <iframe
              title={item.title}
              src={item.url}
              loading="lazy"
              className="aspect-[9/18] w-full rounded-[1.9rem] bg-white"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <p className="text-sm text-rose">{item.category}</p>
          <h3 className="mt-1 font-display text-4xl font-semibold leading-tight">{item.title}</h3>
          {(item.date || item.place) && (
            <p className="mt-2 text-pine/70">{[item.date, item.place].filter(Boolean).join(" · ")}</p>
          )}
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.features.map((f) => (
              <li key={f} className="rounded-full border border-pine/20 px-3 py-1 text-sm">
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-pine px-6 py-3 font-medium text-paper hover:bg-deep"
            >
              Open full page
            </a>
            <button
              type="button"
              onClick={() => onEnquire(item)}
              className="rounded-full border border-pine px-6 py-3 font-medium hover:bg-pine hover:text-paper"
            >
              I want this design
            </button>
            <button type="button" onClick={onClose} className="px-3 py-3 text-pine/70 hover:text-deep">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
