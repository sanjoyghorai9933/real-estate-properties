"use client";

import { useEffect, useState } from "react";

const properties = [
  {
    id: 1,
    type: "Residential",
    name: "Premium Heights",
    location: "Sector 65, Gurgaon",
    configuration: "3 & 4 BHK",
    price: "₹2.45 Cr onwards",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    type: "Commercial",
    name: "Business Avenue",
    location: "Golf Course Extension Road",
    configuration: "Office & Retail",
    price: "₹1.20 Cr onwards",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    type: "Residential",
    name: "The Grand Residences",
    location: "Sector 58, Gurgaon",
    configuration: "3 & 4 BHK",
    price: "₹3.10 Cr onwards",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    type: "Commercial",
    name: "Corporate Square",
    location: "Golf Course Road, Gurgaon",
    configuration: "Office Spaces",
    price: "₹2.25 Cr onwards",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    type: "Residential",
    name: "Luxury Garden Homes",
    location: "Sector 70A, Gurgaon",
    configuration: "4 BHK Luxury Floors",
    price: "₹4.50 Cr onwards",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    type: "Commercial",
    name: "Central Business Hub",
    location: "MG Road, Gurgaon",
    configuration: "Retail & Office",
    price: "₹1.85 Cr onwards",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
  },
];

const phoneNumber = "+91 98765 43210";
const whatsappNumber = "919876543210";

type Property = (typeof properties)[number];

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M6.6 2.5 4.8 2.9A2.9 2.9 0 0 0 2.6 5.7c.3 8.4 7.3 15.4 15.7 15.7a2.9 2.9 0 0 0 2.8-2.2l.4-1.8a2.1 2.1 0 0 0-1.2-2.4l-3.1-1.3a2.1 2.1 0 0 0-2.4.6l-.9 1.1a12.1 12.1 0 0 1-4.1-4.1l1.1-.9a2.1 2.1 0 0 0 .6-2.4L10.2 3.7a2.1 2.1 0 0 0-2.4-1.2L6.6 2.5Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.9L2.2 21.8l4.8-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.8.8.8-2.7-.2-.3A8.1 8.1 0 1 1 12 20Zm4.4-6.1c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.1-.3.2-.5.1-1.8-.9-3-1.6-4.2-3.5-.1-.2 0-.3.1-.4l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5 1.5.7 2.1.7 2.9.6.5-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedProperty ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProperty]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProperty(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#17251f]">
      <header className="sticky top-0 z-30 border-b border-[#17251f]/10 bg-[#f5f3ed]/95 backdrop-blur">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#top" className="text-xl font-semibold tracking-[0.16em] text-[#17251f]">
            ESTATE<span className="text-[#b08a4a]">.</span>
          </a>

          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="hidden items-center gap-2 text-sm font-medium text-[#17251f] sm:flex"
            >
              <PhoneIcon />
              {phoneNumber}
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#17251f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#b08a4a]"
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pb-20">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#b08a4a]">
            Trusted Builders · Curated Properties
          </p>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Find a property
            <br />
            worth coming home to.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#17251f]/60 sm:text-lg">
            Explore carefully selected residential and commercial properties from trusted builders, all in one place.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#17251f]/45">Our Properties</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Featured opportunities</h2>
          </div>
          <p className="hidden text-sm text-[#17251f]/45 sm:block">{properties.length} properties</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <article
              key={property.id}
              className="group overflow-hidden rounded-2xl border border-[#17251f]/10 bg-white shadow-[0_10px_35px_rgba(23,37,31,0.05)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#17251f]/5">
                <img
                  src={property.image}
                  alt={property.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#f5f3ed] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#17251f] shadow-sm">
                  {property.type}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold tracking-tight text-[#17251f]">{property.name}</h3>
                <p className="mt-1 text-sm text-[#17251f]/50">{property.location}</p>

                <div className="mt-6 flex items-end justify-between gap-4 border-t border-[#17251f]/10 pt-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#17251f]/40">Configuration</p>
                    <p className="mt-1 text-sm font-medium">{property.configuration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#17251f]/40">Price</p>
                    <p className="mt-1 text-sm font-semibold">{property.price}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProperty(property)}
                  className="mt-5 flex w-full items-center justify-center rounded-full bg-[#b08a4a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#17251f]"
                >
                  Enquire Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#17251f]/10 bg-[#17251f] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 Estate. All rights reserved.</p>
          <a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="font-medium text-white/80 hover:text-white">
            {phoneNumber}
          </a>
        </div>
      </footer>

      {selectedProperty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1511]/75 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProperty(null);
          }}
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#f5f3ed] shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedProperty(null)}
              aria-label="Close enquiry form"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f3ed]/90 text-[#17251f] shadow-sm transition hover:bg-white"
            >
              <CloseIcon />
            </button>

            <div className="grid md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative hidden min-h-[500px] md:block">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1511]/80 via-[#0c1511]/10 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="inline-flex rounded-full bg-[#b08a4a] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                    {selectedProperty.type}
                  </span>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight">{selectedProperty.name}</h3>
                  <p className="mt-2 text-sm text-white/75">{selectedProperty.location}</p>
                </div>
              </div>

              <div className="p-7 sm:p-9 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b08a4a]">Register Your Interest</p>
                <h2 id="enquiry-title" className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight text-[#17251f]">
                  Get more details about {selectedProperty.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#17251f]/55">
                  Share your details and our property advisor will contact you shortly.
                </p>

                <form
                  className="mt-7 space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const form = event.currentTarget;
                    const data = new FormData(form);
                    const name = String(data.get("name") || "");
                    const phone = String(data.get("phone") || "");
                    const email = String(data.get("email") || "");
                    const message = `Hi, I am interested in ${selectedProperty.name} (${selectedProperty.type}) in ${selectedProperty.location}. Name: ${name}. Phone: ${phone}. Email: ${email || "Not provided"}.`;
                    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
                    form.reset();
                    setSelectedProperty(null);
                  }}
                >
                  <label className="block">
                    <span className="sr-only">Full Name</span>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Full Name"
                      className="h-12 w-full rounded-xl border border-[#17251f]/15 bg-white px-4 text-sm outline-none transition placeholder:text-[#17251f]/35 focus:border-[#b08a4a] focus:ring-2 focus:ring-[#b08a4a]/15"
                    />
                  </label>

                  <label className="block">
                    <span className="sr-only">Phone Number</span>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="Phone Number"
                      className="h-12 w-full rounded-xl border border-[#17251f]/15 bg-white px-4 text-sm outline-none transition placeholder:text-[#17251f]/35 focus:border-[#b08a4a] focus:ring-2 focus:ring-[#b08a4a]/15"
                    />
                  </label>

                  <label className="block">
                    <span className="sr-only">Email Address</span>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address (Optional)"
                      className="h-12 w-full rounded-xl border border-[#17251f]/15 bg-white px-4 text-sm outline-none transition placeholder:text-[#17251f]/35 focus:border-[#b08a4a] focus:ring-2 focus:ring-[#b08a4a]/15"
                    />
                  </label>

                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-[#17251f] px-5 text-sm font-semibold text-white transition hover:bg-[#b08a4a]"
                  >
                    Submit Enquiry
                  </button>
                </form>

                <p className="mt-4 text-center text-[11px] leading-5 text-[#17251f]/40">
                  Your information is kept confidential and used only to respond to your property enquiry.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
