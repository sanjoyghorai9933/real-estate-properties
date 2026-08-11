import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import PropertyActions from "./PropertyActions";

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
  status: "Active" | "Inactive";
  display_order: number;
};

export default async function AdminPropertiesPage({ searchParams }: { searchParams: Promise<{ saved?: string; changed?: string; error?: string }> }) {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");

  const db = getDb();
  const [rows] = await db.query(
    `SELECT id, property_name, property_type, builder, location, configuration, price, image_path, status, display_order
     FROM properties ORDER BY display_order ASC, created_at DESC`,
  );
  const properties = rows as Property[];
  const { saved, changed, error } = await searchParams;

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#17251f]">
      <header className="border-b border-[#17251f]/10 bg-[#122019] text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/admin/dashboard" className="font-serif text-2xl tracking-[0.14em]">ESTATE<span className="text-[#c8a46b]">.</span></Link>
          <div className="flex items-center gap-5"><Link href="/admin/dashboard" className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55 hover:text-[#d4b57d]">Dashboard</Link><form action="/api/admin/logout" method="post"><button className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 hover:border-[#c8a46b] hover:text-[#d4b57d]">Logout</button></form></div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a27d45]">Catalogue</p><h1 className="mt-3 font-serif text-5xl tracking-tight">Properties</h1><p className="mt-3 text-sm text-[#17251f]/50">Manage every property shown on the public website.</p></div><Link href="/admin/properties/new" className="inline-flex items-center justify-center rounded-full bg-[#122019] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#c8a46b] hover:text-[#122019]">+ Add property</Link></div>

        {saved === "1" && <div className="mt-8 rounded-sm border border-[#b9c9bb] bg-[#edf5ed] px-5 py-4 text-sm text-[#315239]">Property saved successfully.</div>}
        {changed === "1" && <div className="mt-8 rounded-sm border border-[#b9c9bb] bg-[#edf5ed] px-5 py-4 text-sm text-[#315239]">Property updated successfully.</div>}
        {error && <div className="mt-8 rounded-sm border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>}

        <div className="mt-10 overflow-hidden rounded-sm bg-white shadow-[0_14px_40px_rgba(23,37,31,0.06)] ring-1 ring-[#17251f]/[0.06]">
          {properties.length === 0 ? (
            <div className="px-6 py-20 text-center"><p className="font-serif text-3xl">No properties yet.</p><p className="mt-3 text-sm text-[#17251f]/45">Add your first property to start building the public catalogue.</p><Link href="/admin/properties/new" className="mt-7 inline-flex rounded-full bg-[#122019] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white">Add first property</Link></div>
          ) : (
            <div className="divide-y divide-[#17251f]/10">
              {properties.map((property) => (
                <div key={property.id} className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
                  <div className="h-28 w-full shrink-0 overflow-hidden rounded-sm bg-[#e8e2d5] sm:h-24 sm:w-36">{property.image_path ? <img src={property.image_path} alt={property.property_name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[9px] font-bold uppercase tracking-[0.12em] text-[#17251f]/30">No image</div>}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#f0eadf] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#8a6738]">{property.property_type}</span><span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.13em] ${property.status === "Active" ? "bg-[#e8f2e8] text-[#3d6944]" : "bg-[#eee] text-[#777]"}`}>{property.status}</span></div>
                    <h2 className="mt-2 font-serif text-2xl leading-tight">{property.property_name}</h2>
                    <p className="mt-1 text-xs text-[#17251f]/50">{property.builder || "Builder not specified"} · {property.location}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#17251f]/65"><span>{property.configuration || "Configuration —"}</span><span className="font-semibold">{property.price}</span></div>
                  </div>
                  <div className="flex flex-col items-stretch gap-2 sm:w-52 sm:items-end">
                    <div className="mb-1 text-xs text-[#17251f]/40 sm:text-right"><p>Order {property.display_order}</p><p className="mt-1">ID #{property.id}</p></div>
                    <PropertyActions id={property.id} name={property.property_name} status={property.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
