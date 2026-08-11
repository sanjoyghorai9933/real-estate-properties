import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import EnquiryActions from "./EnquiryActions";

export const dynamic = "force-dynamic";

type Enquiry = {
  id: number;
  property_id: number | null;
  property_name: string | null;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  status: "New" | "Contacted" | "Closed";
  created_at: string;
};

export default async function AdminEnquiriesPage({ searchParams }: { searchParams: Promise<{ changed?: string; deleted?: string; error?: string }> }) {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");

  const db = getDb();
  const [rows] = await db.query(
    `SELECT e.id, e.property_id, p.property_name, e.name, e.phone, e.email, e.message, e.status, e.created_at
     FROM enquiries e
     LEFT JOIN properties p ON p.id = e.property_id
     ORDER BY e.created_at DESC`,
  );
  const enquiries = rows as Enquiry[];
  const { changed, deleted, error } = await searchParams;

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#17251f]">
      <header className="border-b border-[#17251f]/10 bg-[#122019] text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/admin/dashboard" className="font-serif text-2xl tracking-[0.14em]">ESTATE<span className="text-[#c8a46b]">.</span></Link>
          <div className="flex items-center gap-5">
            <Link href="/admin/dashboard" className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55 hover:text-[#d4b57d]">Dashboard</Link>
            <Link href="/admin/properties" className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55 hover:text-[#d4b57d]">Properties</Link>
            <form action="/api/admin/logout" method="post"><button className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 hover:border-[#c8a46b] hover:text-[#d4b57d]">Logout</button></form>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a27d45]">Lead management</p>
            <h1 className="mt-3 font-serif text-5xl tracking-tight">Enquiries</h1>
            <p className="mt-3 text-sm text-[#17251f]/50">Every enquiry submitted from the public property catalogue.</p>
          </div>
          <div className="rounded-full bg-white px-5 py-3 text-xs font-semibold shadow-sm">{enquiries.length} {enquiries.length === 1 ? "enquiry" : "enquiries"}</div>
        </div>

        {changed === "1" && <div className="mt-8 rounded-sm border border-[#b9c9bb] bg-[#edf5ed] px-5 py-4 text-sm text-[#315239]">Enquiry status updated.</div>}
        {deleted === "1" && <div className="mt-8 rounded-sm border border-[#b9c9bb] bg-[#edf5ed] px-5 py-4 text-sm text-[#315239]">Enquiry deleted.</div>}
        {error && <div className="mt-8 rounded-sm border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>}

        <div className="mt-10 overflow-hidden rounded-sm bg-white shadow-[0_14px_40px_rgba(23,37,31,0.06)] ring-1 ring-[#17251f]/[0.06]">
          {enquiries.length === 0 ? (
            <div className="px-6 py-24 text-center"><p className="font-serif text-3xl">No enquiries yet.</p><p className="mt-3 text-sm text-[#17251f]/45">New website enquiries will appear here automatically.</p></div>
          ) : (
            <div className="divide-y divide-[#17251f]/10">
              {enquiries.map((enquiry) => (
                <article key={enquiry.id} className="p-6 sm:p-7">
                  <div className="flex flex-col justify-between gap-5 lg:flex-row">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] ${enquiry.status === "New" ? "bg-[#fff2dc] text-[#936b2e]" : enquiry.status === "Contacted" ? "bg-[#e7f0f7] text-[#3e637e]" : "bg-[#e8f2e8] text-[#3d6944]"}`}>{enquiry.status}</span>
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#17251f]/30">#{enquiry.id}</span>
                      </div>
                      <h2 className="mt-3 font-serif text-2xl">{enquiry.name}</h2>
                      <p className="mt-1 text-xs text-[#17251f]/50">{enquiry.property_name || "General enquiry"} · {new Date(enquiry.created_at).toLocaleString()}</p>
                      <div className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                        <a href={`tel:${enquiry.phone.replace(/\s/g, "")}`} className="rounded-sm bg-[#f4f1e9] px-4 py-3 font-semibold hover:bg-[#e8e2d5]">{enquiry.phone}</a>
                        {enquiry.email ? <a href={`mailto:${enquiry.email}`} className="truncate rounded-sm bg-[#f4f1e9] px-4 py-3 hover:bg-[#e8e2d5]">{enquiry.email}</a> : <div className="rounded-sm bg-[#f4f1e9] px-4 py-3 text-[#17251f]/40">No email</div>}
                      </div>
                      {enquiry.message && <p className="mt-4 whitespace-pre-wrap rounded-sm border border-[#17251f]/10 px-4 py-3 text-sm leading-6 text-[#17251f]/65">{enquiry.message}</p>}
                    </div>
                    <EnquiryActions id={enquiry.id} status={enquiry.status} phone={enquiry.phone} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
