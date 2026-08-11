"use client";

import { useState } from "react";

const statuses = ["New", "Contacted", "Closed"] as const;
type Status = (typeof statuses)[number];

export default function EnquiryActions({ id, status, phone }: { id: number; status: Status; phone: string }) {
  const [current, setCurrent] = useState<Status>(status);
  const [busy, setBusy] = useState(false);

  async function updateStatus(next: Status) {
    if (next === current) return;
    setBusy(true);
    try {
      const response = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      if (!response.ok) throw new Error();
      setCurrent(next);
    } catch {
      alert("Unable to update enquiry status.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm("Delete this enquiry permanently?")) return;
    setBusy(true);
    try {
      const response = await fetch("/api/admin/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error();
      window.location.href = "/admin/enquiries?deleted=1";
    } catch {
      alert("Unable to delete enquiry.");
      setBusy(false);
    }
  }

  return (
    <div className="flex shrink-0 flex-col gap-2 lg:w-44">
      <a href={`tel:${phone.replace(/\s/g, "")}`} className="rounded-full bg-[#122019] px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#c8a46b] hover:text-[#122019]">Call</a>
      <select value={current} disabled={busy} onChange={(event) => updateStatus(event.target.value as Status)} className="h-10 rounded-full border border-[#17251f]/15 bg-white px-3 text-[10px] font-bold uppercase tracking-[0.12em] outline-none focus:border-[#c8a46b]">
        {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <button type="button" disabled={busy} onClick={remove} className="rounded-full border border-red-200 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-red-700 hover:bg-red-50">Delete</button>
    </div>
  );
}
