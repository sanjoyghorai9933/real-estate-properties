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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f6f3] text-[#171717]">
      <header className="border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#top" className="text-xl font-semibold tracking-[0.16em]">
            ESTATE<span className="text-[#9b7a45]">.</span>
          </a>

          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="hidden items-center gap-2 text-sm font-medium sm:flex"
            >
              <PhoneIcon />
              {phoneNumber}
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#9b7a45]"
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pb-20">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#9b7a45]">
            Trusted Builders · Curated Properties
          </p>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Find a property
            <br />
            worth coming home to.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-black/60 sm:text-lg">
            Explore carefully selected residential and commercial properties from trusted builders, all in one place.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/45">Our Properties</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Featured opportunities</h2>
          </div>
          <p className="hidden text-sm text-black/45 sm:block">{properties.length} properties</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <article
              key={property.id}
              className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                <img
                  src={property.image}
                  alt={property.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] shadow-sm">
                  {property.type}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold tracking-tight">{property.name}</h3>
                <p className="mt-1 text-sm text-black/50">{property.location}</p>

                <div className="mt-6 flex items-end justify-between gap-4 border-t border-black/10 pt-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-black/40">Configuration</p>
                    <p className="mt-1 text-sm font-medium">{property.configuration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/40">Price</p>
                    <p className="mt-1 text-sm font-semibold">{property.price}</p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I am interested in ${property.name} in ${property.location}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex w-full items-center justify-center rounded-full border border-[#171717] px-5 py-3 text-sm font-semibold transition hover:bg-[#171717] hover:text-white"
                >
                  Enquire Now
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-black/50 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 Estate. All rights reserved.</p>
          <a href={`tel:${phoneNumber.replace(/\s/g, "")} `} className="font-medium text-black/70 hover:text-black">
            {phoneNumber}
          </a>
        </div>
      </footer>
    </main>
  );
}
