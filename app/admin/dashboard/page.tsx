import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");

  const db = getDb();
  const [[propertyCount]] = await Promise.all([
    db.query("SELECT COUNT(*) AS count FROM properties WHERE status = 'Active'") as Promise<any>,
  ]);
  const [[enquiryCount]] = await Promise.all([
    db.query("SELECT COUNT(*) AS count FROM enquiries") as Promise<any>,
  ]);
  const [[newEnquiryCount]] = await Promise.all([
    db.query("SELECT COUNT(*) AS count FROM enquiries WHERE status = 'New'") as Promise<any>,
  ]);

  const stats = [
    { label: "Active properties", value: Number(propertyCount?.count ?? 0) },
    { label: "Total enquiries", value: Number(enquiryCount?.count ?? 0) },
    { label: "New enquiries", value: Number(newEnquiryCount?.count ?? 0) },
  ];

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#17251f]">
      <header className="border-b border-[#17251f]/10 bg-[#122019] text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="/admin/dashboard" className="font-serif text-2xl tracking-[0.14em]">ESTATE<span className="text-[#c8a46b]">.</span></a>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm text-white/50 sm:block">Signed in as <strong className="font-medium text-white/80">{admin.username}</strong></span>
            <form action="/api/admin/logout" method="post">
              <button className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/75 hover:border-[#c8a46b] hover:text-[#d4b57d]">Logout</button>
            </form>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a27d45]">Administration</p>
            <h1 className="mt-3 font-serif text-5xl tracking-tight">Dashboard</h1>
            <p className="mt-3 text-sm text-[#17251f]/50">Manage your property catalogue and incoming enquiries.</p>
          </div>
          <a href="/admin/properties/new" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#122019] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#c8a46b] hover:text-[#122019]">+ Add property</a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-sm bg-white p-7 shadow-[0_14px_40px_rgba(23,37,31,0.06)] ring-1 ring-[#17251f]/[0.06]">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#17251f]/40">{stat.label}</p>
              <p className="mt-4 font-serif text-5xl">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <a href="/admin/properties" className="group rounded-sm bg-[#122019] p-8 text-white transition hover:-translate-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d4b57d]">Catalogue</p>
            <h2 className="mt-3 font-serif text-3xl">Properties</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/50">Add, edit, activate or deactivate properties shown on the public website.</p>
            <span className="mt-8 inline-block text-sm text-[#d4b57d]">Manage properties →</span>
          </a>
          <a href="/admin/enquiries" className="group rounded-sm bg-white p-8 shadow-[0_14px_40px_rgba(23,37,31,0.06)] ring-1 ring-[#17251f]/[0.06] transition hover:-translate-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a27d45]">Leads</p>
            <h2 className="mt-3 font-serif text-3xl">Enquiries</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#17251f]/50">Review visitor enquiries and track which leads are new, contacted or closed.</p>
            <span className="mt-8 inline-block text-sm text-[#a27d45]">View enquiries →</span>
          </a>
        </div>
      </section>
    </main>
  );
}
