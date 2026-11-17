import { useEffect, useState } from "react";
import { contact } from "../data/portfolio";

export default function EnquireModal({ open, design, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "" });

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const lines = [
      contact.whatsappMessage,
      design ? `Design I like: ${design.url}` : "",
      `Name: ${form.name}`,
      `My number: ${form.phone}`,
      form.date ? `Wedding date: ${form.date}` : "",
    ].filter(Boolean);
    window.open(
      `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noreferrer"
    );
    onClose();
  };

  const field =
    "mt-1 w-full rounded-xl border border-pine/25 bg-white px-4 py-3 outline-none focus:border-pine";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enquire"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-deep/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-paper p-7"
      >
        <h3 className="font-display text-3xl font-semibold">Get your invitation</h3>
        <p className="mt-1 text-pine/70">
          {design ? `You chose ${design.title}. ` : ""}Send your details and I'll reply on WhatsApp.
        </p>

        <label className="mt-5 block text-sm font-medium">
          Your name
          <input required value={form.name} onChange={set("name")} className={field} />
        </label>
        <label className="mt-4 block text-sm font-medium">
          WhatsApp number
          <input required inputMode="tel" value={form.phone} onChange={set("phone")} className={field} />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Wedding date
          <input type="date" value={form.date} onChange={set("date")} className={field} />
        </label>

        <div className="mt-6 flex items-center gap-3">
          <button type="submit" className="rounded-full bg-pine px-6 py-3 font-medium text-paper hover:bg-deep">
            Send on WhatsApp
          </button>
          <button type="button" onClick={onClose} className="px-3 py-3 text-pine/70 hover:text-deep">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
