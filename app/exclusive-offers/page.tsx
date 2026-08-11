import Link from "next/link";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

type Property = {
  id: number;
  property_name: string;
  property_type: "Residential" | "Commercial";
  builder: string | null;
  location: string;
  configuration: string | null;
  price: string;
  image_path: string | null;
};

export default async function ExclusiveOffersPage() {
  const db = getDb();
  const [rows] = await db.query(
    `SELECT id, property_name, property_type, builder, location, configuration, price, image_path
     FROM properties
     WHERE status = 'Active' AND is_exclusive_offer = 1
     ORDER BY display_order ASC, created_at DESC`,
  );
  const properties = rows as Property[];

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#17251f]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#122019]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1380px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" className="font-serif text-[22px] tracking-[0.14em]">ESTATE<span className="text-[#c8a46b]">.</span></Link>
          <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/65 transition hover:text-[#d4b57d]">← Back to properties</Link>
        </div>
      </header>

      <section className="border-b border-[#17251f]/10 bg-[#122019] text-white">
        <div className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4b57d]">Curated opportunities</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-7xl">Exclusive offer properties.</h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">A handpicked selection of properties currently marked as exclusive offers by our property team.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        {properties.length === 0 ? (
          <div className="rounded-sm bg-white px-6 py-24 text-center shadow-[0_16px_45px_rgba(23,37,31,0.07)]">
            <p className="font-serif text-4xl">No exclusive offers at the moment.</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#17251f]/50">The property team can select exclusive offers from the admin panel. Selected active properties will appear here automatically.</p>
            <Link href="/" className="mt-8 inline-flex rounded-full bg-[#122019] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#c8a46b] hover:text-[#122019]">View all properties</Link>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <article key={property.id} className="group overflow-hidden rounded-sm bg-white shadow-[0_16px_45px_rgba(23,37,31,0.09)] ring-1 ring-[#17251f]/[0.06] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(23,37,31,0.14)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ded9ce]">
                  {property.image_path ? <img src={property.image_path} alt={property.property_name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" /> : <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-[#17251f]/30">Image coming soon</div>}
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4"><span className="rounded-full bg-[#c8a46b] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#122019]">Exclusive offer</span><span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#17251f]">{property.property_type}</span></div>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a27d45]">{property.builder || "Trusted builder"}</p>
                  <h2 className="mt-2 font-serif text-[29px] leading-tight tracking-tight">{property.property_name}</h2>
                  <p className="mt-2 text-sm text-[#17251f]/50">{property.location}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-sm bg-[#f4f1e9] px-4 py-3"><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#17251f]/40">Configuration</p><p className="mt-1.5 text-sm font-semibold">{property.configuration || "On request"}</p></div>
                    <div className="rounded-sm bg-[#f4f1e9] px-4 py-3"><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#17251f]/40">Starting from</p><p className="mt-1.5 text-sm font-semibold">{property.price}</p></div>
                  </div>
                  <Link href={`/?property=${property.id}#properties`} className="mt-5 flex h-12 items-center justify-between rounded-sm bg-[#122019] px-5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#c8a46b] hover:text-[#122019]">View property <span>→</span></Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
