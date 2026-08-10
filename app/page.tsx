"use client";

import { useEffect, useState } from "react";

const properties = [
  { id: 1, type: "Residential", name: "Premium Heights", location: "Sector 65, Gurgaon", configuration: "3 & 4 BHK", price: "₹2.45 Cr onwards", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90" },
  { id: 2, type: "Commercial", name: "Business Avenue", location: "Golf Course Extension Road", configuration: "Office & Retail", price: "₹1.20 Cr onwards", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=90" },
  { id: 3, type: "Residential", name: "The Grand Residences", location: "Sector 58, Gurgaon", configuration: "3 & 4 BHK", price: "₹3.10 Cr onwards", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90" },
  { id: 4, type: "Commercial", name: "Corporate Square", location: "Golf Course Road, Gurgaon", configuration: "Office Spaces", price: "₹2.25 Cr onwards", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=90" },
  { id: 5, type: "Residential", name: "Luxury Garden Homes", location: "Sector 70A, Gurgaon", configuration: "4 BHK Luxury Floors", price: "₹4.50 Cr onwards", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90" },
  { id: 6, type: "Commercial", name: "Central Business Hub", location: "MG Road, Gurgaon", configuration: "Retail & Office", price: "₹1.85 Cr onwards", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=90" },
];

const phoneNumber = "+91 98765 43210";
const whatsappNumber = "919876543210";
type Property = (typeof properties)[number];

function PhoneIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M6.6 2.5 4.8 2.9A2.9 2.9 0 0 0 2.6 5.7c.3 8.4 7.3 15.4 15.7 15.7a2.9 2.9 0 0 0 2.8-2.2l.4-1.8a2.1 2.1 0 0 0-1.2-2.4l-3.1-1.3a2.1 2.1 0 0 0-2.4.6l-.9 1.1a12.1 12.1 0 0 1-4.1-4.1l1.1-.9a2.1 2.1 0 0 0 .6-2.4L10.2 3.7a2.1 2.1 0 0 0-2.4-1.2L6.6 2.5Z" /></svg>; }
function WhatsAppIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.9L2.2 21.8l4.8-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.8.8.8-2.7-.2-.3A8.1 8.1 0 1 1 12 20Zm4.4-6.1c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.1-.3.2-.5.1-1.8-.9-3-1.6-4.2-3.5-.1-.2 0-.3.1-.4l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5 1.5.7 2.1.7 2.9.6.5-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.5-.3Z" /></svg>; }
function CloseIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>; }
function ArrowIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>; }

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedProperty ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProperty]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setSelectedProperty(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#17251f]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#122019]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1380px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#top" className="font-serif text-[22px] tracking-[0.14em]">ESTATE<span className="text-[#c8a46b]">.</span></a>
          <div className="flex items-center gap-3 sm:gap-7">
            <a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="hidden items-center gap-2 text-sm text-white/75 transition hover:text-white sm:flex"><PhoneIcon />{phoneNumber}</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#c8a46b]/50 bg-[#c8a46b] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#122019] transition hover:bg-white"><WhatsAppIcon />WhatsApp</a>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden bg-[#122019] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=90')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#122019] via-[#122019]/90 to-[#122019]/35" />
        <div className="relative mx-auto flex min-h-[590px] max-w-[1380px] items-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:px-10">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4b57d]"><span className="h-px w-10 bg-[#c8a46b]" />Trusted builders · Curated properties</div>
            <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.035em] sm:text-7xl lg:text-[88px]">Exceptional spaces.<br /><span className="text-[#d4b57d]">Worth investing in.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">A refined collection of residential and commercial properties from trusted builders, selected for location, quality and long-term value.</p>
            <a href="#properties" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#c8a46b] px-6 py-3.5 text-sm font-semibold text-[#122019] transition hover:bg-white">Explore properties <ArrowIcon /></a>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-black/10">
          <div className="mx-auto grid max-w-[1380px] grid-cols-3 px-5 py-5 sm:px-8 lg:px-10">
            <div className="border-r border-white/10 pr-4"><p className="font-serif text-2xl text-white">01</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">Trusted selection</p></div>
            <div className="border-r border-white/10 px-4"><p className="font-serif text-2xl text-white">06+</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">Featured projects</p></div>
            <div className="pl-4"><p className="font-serif text-2xl text-white">24/7</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">Enquiry support</p></div>
          </div>
        </div>
      </section>

      <section id="properties" className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a27d45]">The collection</p><h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Featured properties</h2></div>
          <p className="max-w-sm text-sm leading-6 text-[#17251f]/50">Residential and commercial opportunities presented with only the details that matter.</p>
        </div>

        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <article key={property.id} className="group">
              <div className="relative aspect-[1.08/1] overflow-hidden bg-[#ded9ce]">
                <img src={property.image} alt={property.name} className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.045]" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-[#f4f1e9]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#17251f]">{property.type}</span>
                <button type="button" onClick={() => setSelectedProperty(property)} className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-[#c8a46b] text-[#122019] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white" aria-label={`Enquire about ${property.name}`}><ArrowIcon /></button>
              </div>
              <div className="pt-5">
                <div className="flex items-start justify-between gap-4"><div><h3 className="font-serif text-[26px] leading-tight">{property.name}</h3><p className="mt-1 text-sm text-[#17251f]/50">{property.location}</p></div><p className="whitespace-nowrap text-sm font-semibold text-[#a27d45]">{property.price}</p></div>
                <div className="mt-5 flex items-center justify-between border-y border-[#17251f]/10 py-3.5"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#17251f]/40">Configuration</p><p className="text-sm font-medium">{property.configuration}</p></div>
                <button type="button" onClick={() => setSelectedProperty(property)} className="mt-4 flex w-full items-center justify-between border-b border-[#17251f]/30 pb-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:border-[#c8a46b] hover:text-[#a27d45]">Enquire about this property <ArrowIcon /></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#17251f]/10 bg-[#e8e2d5]">
        <div className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 lg:flex lg:items-center lg:justify-between lg:px-10 lg:py-20">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a27d45]">Looking for the right opportunity?</p><h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Let&apos;s find your next address.</h2></div>
          <button type="button" onClick={() => setSelectedProperty(properties[0])} className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#122019] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c8a46b] hover:text-[#122019] lg:mt-0">Start an enquiry <ArrowIcon /></button>
        </div>
      </section>

      <footer className="bg-[#122019] text-white">
        <div className="mx-auto max-w-[1380px] px-5 py-12 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><a href="#top" className="font-serif text-2xl tracking-[0.14em]">ESTATE<span className="text-[#c8a46b]">.</span></a><p className="mt-3 max-w-sm text-sm leading-6 text-white/45">Trusted builders. Carefully selected properties. A simpler way to discover your next investment.</p></div><div className="text-sm sm:text-right"><p className="text-white/40">Enquiries</p><a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="mt-1 block text-white/80 hover:text-[#d4b57d]">{phoneNumber}</a></div></div>
          <div className="mt-10 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.15em] text-white/30">© 2026 Estate · All rights reserved</div>
        </div>
      </footer>

      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07100c]/80 p-4 backdrop-blur-md sm:p-6" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProperty(null); }}>
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-[#f4f1e9] shadow-2xl">
            <button type="button" onClick={() => setSelectedProperty(null)} aria-label="Close enquiry form" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f1e9]/90 text-[#17251f] shadow-md transition hover:bg-white"><CloseIcon /></button>
            <div className="grid md:grid-cols-[0.82fr_1.18fr]">
              <div className="relative hidden min-h-[540px] md:block"><img src={selectedProperty.image} alt={selectedProperty.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#07100c]/85 via-[#07100c]/15 to-transparent" /><div className="absolute bottom-9 left-8 right-8 text-white"><span className="inline-flex rounded-full bg-[#c8a46b] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#122019]">{selectedProperty.type}</span><h3 className="mt-4 font-serif text-4xl leading-tight">{selectedProperty.name}</h3><p className="mt-2 text-sm text-white/65">{selectedProperty.location}</p></div></div>
              <div className="p-7 sm:p-10 lg:p-12"><p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#a27d45]">Private enquiry</p><h2 id="enquiry-title" className="mt-3 max-w-lg font-serif text-4xl leading-tight">Tell us what you&apos;re looking for.</h2><p className="mt-3 max-w-md text-sm leading-6 text-[#17251f]/50">Request pricing, availability, floor plans or a callback for {selectedProperty.name}.</p>
                <form className="mt-8 space-y-4" onSubmit={(event) => { event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); const name = String(data.get("name") || ""); const phone = String(data.get("phone") || ""); const email = String(data.get("email") || ""); const message = `Hi, I am interested in ${selectedProperty.name} (${selectedProperty.type}) in ${selectedProperty.location}. Name: ${name}. Phone: ${phone}. Email: ${email || "Not provided"}.`; window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer"); form.reset(); setSelectedProperty(null); }}>
                  <div><label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#17251f]/45">Full name</label><input name="name" required placeholder="Your full name" className="h-12 w-full border-b border-[#17251f]/20 bg-transparent px-0 text-sm outline-none transition placeholder:text-[#17251f]/30 focus:border-[#c8a46b]" /></div>
                  <div><label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#17251f]/45">Phone number</label><input name="phone" type="tel" required placeholder="+91 98765 43210" className="h-12 w-full border-b border-[#17251f]/20 bg-transparent px-0 text-sm outline-none transition placeholder:text-[#17251f]/30 focus:border-[#c8a46b]" /></div>
                  <div><label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#17251f]/45">Email address <span className="font-normal normal-case tracking-normal">(optional)</span></label><input name="email" type="email" placeholder="you@example.com" className="h-12 w-full border-b border-[#17251f]/20 bg-transparent px-0 text-sm outline-none transition placeholder:text-[#17251f]/30 focus:border-[#c8a46b]" /></div>
                  <div className="mt-6 border border-[#17251f]/10 bg-white/50 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#17251f]/40">Selected property</p><p className="mt-1 text-sm font-semibold">{selectedProperty.name}</p><p className="mt-0.5 text-xs text-[#17251f]/50">{selectedProperty.type} · {selectedProperty.configuration} · {selectedProperty.price}</p></div>
                  <button type="submit" className="mt-2 flex h-13 w-full items-center justify-center gap-3 rounded-full bg-[#122019] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#c8a46b] hover:text-[#122019]">Request a callback <ArrowIcon /></button>
                </form>
                <p className="mt-5 text-center text-[10px] leading-5 text-[#17251f]/35">By submitting, you agree to be contacted regarding this property enquiry.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
