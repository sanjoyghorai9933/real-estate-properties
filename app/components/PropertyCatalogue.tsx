"use client";

import { useEffect, useState } from "react";

type Property = {
  id: number;
  property_type: "Residential" | "Commercial";
  property_name: string;
  builder: string | null;
  location: string;
  configuration: string | null;
  price: string;
  image_path: string | null;
};

function Icon({ children, className = "h-5 w-5" }: { children: React.ReactNode; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}

export default function PropertyCatalogue() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/properties", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load properties");
        return response.json();
      })
      .then((data) => setProperties(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProperty ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProperty]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedProperty(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const phoneNumber = "+91 98765 43210";
  const whatsappNumber = "919876543210";

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#17251f]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#122019]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1380px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#top" className="font-serif text-[22px] tracking-[0.14em]">ESTATE<span className="text-[#c8a46b]">.</span></a>
          <div className="flex items-center gap-3 sm:gap-7">
            <a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="hidden items-center gap-2 text-sm text-white/75 transition hover:text-white sm:flex"><Icon className="h-4 w-4"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9Z" /></Icon>{phoneNumber}</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#c8a46b] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#122019] transition hover:bg-white">WhatsApp</a>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden bg-[#122019] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=90')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#122019] via-[#122019]/90 to-[#122019]/35" />
        <div className="relative mx-auto flex min-h-[560px] max-w-[1380px] items-end px-5 pb-16 pt-28 sm:px-8 lg:px-10"><div className="max-w-4xl"><div className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4b57d]"><span className="h-px w-10 bg-[#c8a46b]" />Trusted builders · Curated properties</div><h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.035em] sm:text-7xl lg:text-[88px]">Exceptional spaces.<br /><span className="text-[#d4b57d]">Worth investing in.</span></h1><p className="mt-7 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">A refined collection of residential and commercial properties from trusted builders, selected for location, quality and long-term value.</p><a href="#properties" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#c8a46b] px-6 py-3.5 text-sm font-semibold text-[#122019] transition hover:bg-white">Explore properties <Icon className="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6" /></Icon></a></div></div>
      </section>

      <section id="properties" className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a27d45]">The collection</p><h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Featured properties</h2></div><p className="max-w-sm text-sm leading-6 text-[#17251f]/50">Live catalogue from our trusted-property database.</p></div>

        {loading && <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">{[1,2,3,4,5,6].map((item) => <div key={item} className="h-[480px] animate-pulse rounded-[4px] bg-white/70" />)}</div>}
        {error && <div className="rounded-sm border border-red-200 bg-red-50 px-5 py-6 text-sm text-red-700">Properties could not be loaded. Please check the MySQL connection and refresh the page.</div>}
        {!loading && !error && properties.length === 0 && <div className="rounded-sm bg-white px-6 py-20 text-center shadow-sm"><p className="font-serif text-3xl">No active properties yet.</p><p className="mt-3 text-sm text-[#17251f]/50">Add an active property from the admin panel.</p></div>}

        {!loading && !error && properties.length > 0 && <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <article key={property.id} className="group overflow-hidden rounded-[4px] bg-white shadow-[0_16px_45px_rgba(23,37,31,0.09)] ring-1 ring-[#17251f]/[0.07] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(23,37,31,0.14)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#ded9ce]">
                {property.image_path ? <img src={property.image_path} alt={property.property_name} className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.06]" /> : <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-[#17251f]/30">Image coming soon</div>}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07100c]/65 via-transparent to-[#07100c]/10" />
                <div className="absolute left-5 top-5"><span className="rounded-full bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#17251f] shadow-lg">{property.property_type}</span></div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white"><div><p className="text-[10px] uppercase tracking-[0.18em] text-white/60">Starting from</p><p className="mt-1 text-xl font-semibold">{property.price}</p></div><button type="button" onClick={() => setSelectedProperty(property)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c8a46b] text-[#122019] shadow-lg transition hover:bg-white" aria-label={`Enquire about ${property.property_name}`}><Icon className="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6" /></Icon></button></div>
              </div>
              <div className="p-6"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a27d45]">{property.builder || "Trusted builder"}</p><h3 className="mt-2 font-serif text-[28px] leading-tight tracking-tight">{property.property_name}</h3><div className="mt-2 flex items-center gap-2 text-sm text-[#17251f]/50"><Icon className="h-4 w-4"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></Icon>{property.location}</div><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-sm bg-[#f4f1e9] px-4 py-3.5"><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#17251f]/40">Configuration</p><p className="mt-1.5 text-sm font-semibold">{property.configuration || "On request"}</p></div><div className="rounded-sm bg-[#f4f1e9] px-4 py-3.5"><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#17251f]/40">Property type</p><p className="mt-1.5 text-sm font-semibold">{property.property_type}</p></div></div><button type="button" onClick={() => setSelectedProperty(property)} className="mt-5 flex h-12 w-full items-center justify-between rounded-sm bg-[#122019] px-5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#c8a46b] hover:text-[#122019]">Enquire now <Icon className="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6" /></Icon></button></div>
            </article>
          ))}
        </div>}
      </section>

      <section className="border-y border-[#17251f]/10 bg-[#e8e2d5]"><div className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 lg:flex lg:items-center lg:justify-between lg:px-10 lg:py-20"><div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a27d45]">Looking for the right opportunity?</p><h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Let&apos;s find your next address.</h2></div>{properties[0] && <button type="button" onClick={() => setSelectedProperty(properties[0])} className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#122019] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c8a46b] hover:text-[#122019] lg:mt-0">Start an enquiry <Icon className="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6" /></Icon></button>}</div></section>

      <footer className="bg-[#122019] text-white"><div className="mx-auto max-w-[1380px] px-5 py-12 sm:px-8 lg:px-10"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><a href="#top" className="font-serif text-2xl tracking-[0.14em]">ESTATE<span className="text-[#c8a46b]">.</span></a><p className="mt-3 max-w-sm text-sm leading-6 text-white/45">Trusted builders. Carefully selected properties. A simpler way to discover your next investment.</p></div><div className="text-sm sm:text-right"><p className="text-white/40">Enquiries</p><a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="mt-1 block text-white/80 hover:text-[#d4b57d]">{phoneNumber}</a></div></div><div className="mt-10 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.15em] text-white/30">© 2026 Estate · All rights reserved</div></div></footer>

      {selectedProperty && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07100c]/80 p-4 backdrop-blur-md sm:p-6" role="dialog" aria-modal="true" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProperty(null); }}><div className="relative w-full max-w-4xl overflow-hidden rounded-[4px] bg-[#f4f1e9] shadow-2xl"><button type="button" onClick={() => setSelectedProperty(null)} aria-label="Close enquiry form" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#17251f] shadow-lg hover:bg-[#c8a46b]"><Icon className="h-5 w-5"><path d="M6 6l12 12M18 6L6 18" /></Icon></button><div className="grid md:grid-cols-[0.9fr_1.1fr]"><div className="relative hidden min-h-[540px] md:block">{selectedProperty.image_path && <img src={selectedProperty.image_path} alt={selectedProperty.property_name} className="absolute inset-0 h-full w-full object-cover" />}<div className="absolute inset-0 bg-gradient-to-t from-[#07100c]/90 via-[#07100c]/15 to-transparent" /><div className="absolute bottom-9 left-8 right-8 text-white"><span className="rounded-full bg-[#c8a46b] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#122019]">{selectedProperty.property_type}</span><h2 className="mt-4 font-serif text-4xl">{selectedProperty.property_name}</h2><p className="mt-2 text-sm text-white/65">{selectedProperty.location}</p></div></div><div className="p-7 sm:p-10"><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a27d45]">Private enquiry</p><h2 className="mt-3 font-serif text-4xl" id="enquiry-title">Interested in {selectedProperty.property_name}?</h2><p className="mt-3 text-sm leading-6 text-[#17251f]/55">Share your details and our property consultant will contact you.</p><form className="mt-8 space-y-4" action="/api/enquiries" method="post"><input type="hidden" name="property_id" value={selectedProperty.id} /><input name="name" required placeholder="Full name" className="h-12 w-full rounded-sm border border-[#17251f]/10 bg-white px-4 text-sm outline-none focus:border-[#c8a46b]" /><input name="phone" required placeholder="Phone number" className="h-12 w-full rounded-sm border border-[#17251f]/10 bg-white px-4 text-sm outline-none focus:border-[#c8a46b]" /><input name="email" type="email" placeholder="Email address (optional)" className="h-12 w-full rounded-sm border border-[#17251f]/10 bg-white px-4 text-sm outline-none focus:border-[#c8a46b]" /><textarea name="message" rows={4} placeholder="Tell us what you are looking for" className="w-full resize-none rounded-sm border border-[#17251f]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#c8a46b]" /><button className="flex h-12 w-full items-center justify-center rounded-sm bg-[#122019] text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#c8a46b] hover:text-[#122019]">Submit enquiry</button></form></div></div></div></div>}
    </main>
  );
}
