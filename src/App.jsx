import { useState } from "react";
import { brand, contact, stats, invitations, steps } from "./data/portfolio";
import PhoneCard from "./components/PhoneCard";
import PreviewModal from "./components/PreviewModal";
import EnquireModal from "./components/EnquireModal";

export default function App() {
  const [preview, setPreview] = useState(null);
  const [enquiry, setEnquiry] = useState({ open: false, design: null });

  const trending = invitations.filter((i) => i.trending);
  const newest = invitations;
  const waLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  const openEnquiry = (design = null) => {
    setPreview(null);
    setEnquiry({ open: true, design });
  };

  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <a href="#top" className="font-display text-2xl font-semibold">
          {brand.name}
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#work" className="hover:text-rose">Our work</a>
          <a href="#process" className="hover:text-rose">How it works</a>
          <button
            onClick={() => openEnquiry()}
            className="rounded-full bg-pine px-5 py-2 text-paper hover:bg-deep"
          >
            Enquire
          </button>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-8 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="hero-rise text-rose">{brand.tagline}</p>
            <h1 className="hero-rise d1 mt-3 font-display text-5xl font-semibold leading-[1.02] sm:text-7xl">
              {brand.headline}
            </h1>
            <p className="hero-rise d2 mt-6 max-w-md text-lg text-pine/80">{brand.subheadline}</p>
            <div className="hero-rise d2 mt-8 flex flex-wrap gap-3">
              <a href="#work" className="rounded-full bg-pine px-7 py-3.5 font-medium text-paper hover:bg-deep">
                See live designs
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-pine px-7 py-3.5 font-medium hover:bg-pine hover:text-paper"
              >
                Chat on WhatsApp
              </a>
            </div>
            <dl className="mt-12 flex gap-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-sm text-pine/70">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="flex gap-4">
              <div className="mt-10 -rotate-3"><PhoneCard item={trending[0]} onOpen={setPreview} /></div>
              {trending[1] && (
                <div className="hidden rotate-2 sm:block"><PhoneCard item={trending[1]} onOpen={setPreview} /></div>
              )}
            </div>
          </div>
        </section>

        {/* Trending */}
        <section id="work" className="bg-pine py-16 text-paper">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">Trending designs</h2>
            <p className="mt-2 text-paper/70">The designs couples choose most. Swipe to see more.</p>
          </div>
          <div className="no-scrollbar mx-auto mt-8 flex max-w-6xl gap-6 overflow-x-auto px-5 pb-4">
            {trending.map((item) => (
              <div key={item.id} className="[&_p]:text-paper [&_p+p]:text-paper/70">
                <PhoneCard item={item} onOpen={setPreview} size="lg" />
              </div>
            ))}
          </div>
        </section>

        {/* All */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">All invitations</h2>
          <p className="mt-2 text-pine/70">Tap any phone to open it live.</p>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {newest.map((item) => (
              <div key={item.id} className="flex justify-center">
                <PhoneCard item={item} onOpen={setPreview} />
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto max-w-6xl px-5 pb-20">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">How it works</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-paper p-6">
                <span className="font-display text-4xl text-rose">{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-pine/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="bg-deep py-16 text-center text-paper">
          <h2 className="mx-auto max-w-xl px-5 font-display text-4xl font-semibold sm:text-5xl">
            Want one like these?
          </h2>
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => openEnquiry()}
              className="rounded-full bg-paper px-7 py-3.5 font-medium text-deep hover:bg-white"
            >
              Enquire now
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-paper/50 px-7 py-3.5 font-medium hover:bg-paper hover:text-deep"
            >
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-pine/70">
        <span>Crafted by {brand.name}</span>
        <a href={brand.instagram} target="_blank" rel="noreferrer" className="hover:text-rose">
          {brand.instagramHandle}
        </a>
      </footer>

      <PreviewModal item={preview} onClose={() => setPreview(null)} onEnquire={openEnquiry} />
      <EnquireModal
        open={enquiry.open}
        design={enquiry.design}
        onClose={() => setEnquiry({ open: false, design: null })}
      />
    </>
  );
}
