"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PropertyActionProps = {
  id: number;
  name: string;
  status: "Active" | "Inactive";
};

export default function PropertyActions({ id, name, status }: PropertyActionProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const nextStatus = status === "Active" ? "Inactive" : "Active";

  async function toggleStatus() {
    if (!confirm(`${nextStatus === "Inactive" ? "Deactivate" : "Activate"} ${name}?`)) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/properties/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to update status.");
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to update status.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteProperty() {
    if (!confirm(`Delete ${name} permanently? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to delete property.");
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to delete property.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2 sm:justify-end">
      <Link
        href={`/admin/properties/${id}`}
        className="inline-flex items-center justify-center rounded-full border border-[#17251f]/15 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#17251f] hover:border-[#c8a46b] hover:bg-[#fbf8f1]"
      >
        Edit
      </Link>
      <button
        type="button"
        disabled={busy}
        onClick={toggleStatus}
        className="inline-flex items-center justify-center rounded-full border border-[#17251f]/15 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#17251f] hover:border-[#c8a46b] hover:bg-[#fbf8f1] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? "Working…" : nextStatus === "Inactive" ? "Deactivate" : "Activate"}
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={deleteProperty}
        className="inline-flex items-center justify-center rounded-full border border-red-200 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
