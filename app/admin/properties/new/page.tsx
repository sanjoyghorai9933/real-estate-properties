"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewPropertyPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return setPreview(null);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/admin/properties", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to save property.");
      router.push("/admin/properties?saved=1");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save property.");
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#17251f]">
      <header className="border-b border-[#17251f]/10 bg-[#122019] text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/admin/dashboard" className="font-serif text-2xl tracking-[0.14em]">ESTATE<span className="text-[#c8a46b]">.</span></Link>
          <Link href="/admin/properties" className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/60 hover:text-[#d4b57d]">← Properties</Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a27d45]">Catalogue</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight">Add property</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#17251f]/50">Create a polished property listing. The thumbnail and details will be stored in MySQL and displayed on the public catalogue.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-sm bg-white p-6 shadow-[0_14px_40px_rgba(23,37,31,0.06)] ring-1 ring-[#17251f]/[0.06] sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Property name" name="propertyName" placeholder="e.g. The Grand Residences" required />
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#17251f]/45">Property type</label>
                <select name="propertyType" required className="mt-2 h-12 w-full border-b border-[#17251f]/15 bg-transparent px-0 text-sm outline-none focus:border-[#c8a46b]">
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              <Field label="Builder" name="builder" placeholder="Trusted builder / developer" />
              <Field label="Location" name="location" placeholder="Sector 65, Gurgaon" required />
              <Field label="Configuration" name="configuration" placeholder="3 & 4 BHK" />
              <Field label="Price" name="price" placeholder="₹2.45 Cr onwards" required />
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#17251f]/45">Status</label>
                <select name="status" defaultValue="Active" className="mt-2 h-12 w-full border-b border-[#17251f]/15 bg-transparent px-0 text-sm outline-none focus:border-[#c8a46b]">
                  <option value="Active">Active — show publicly</option>
                  <option value="Inactive">Inactive — hide publicly</option>
                </select>
              </div>
              <Field label="Display order" name="displayOrder" type="number" placeholder="0" defaultValue="0" min="0" />
            </div>

            <div className="mt-8 border-t border-[#17251f]/10 pt-7">
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#17251f]/45">Thumbnail image</label>
              <p className="mt-2 text-xs text-[#17251f]/45">JPG, PNG or WebP · maximum 5 MB</p>
              <input name="image" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} className="mt-4 block w-full cursor-pointer rounded-sm border border-dashed border-[#17251f]/20 bg-[#f8f6f0] p-4 text-xs file:mr-4 file:rounded-full file:border-0 file:bg-[#122019] file:px-4 file:py-2 file:text-[10px] file:font-bold file:uppercase file:tracking-[0.12em] file:text-white" />
            </div>

            {error && <div className="mt-7 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link href="/admin/properties" className="inline-flex h-12 items-center justify-center rounded-sm px-5 text-xs font-bold uppercase tracking-[0.14em] text-[#17251f]/55 hover:text-[#17251f]">Cancel</Link>
              <button disabled={saving} className="h-12 rounded-sm bg-[#122019] px-7 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#c8a46b] hover:text-[#122019] disabled:cursor-not-allowed disabled:opacity-50">
                {saving ? "Saving…" : "Save property"}
              </button>
            </div>
          </div>

          <aside className="self-start rounded-sm bg-[#122019] p-5 text-white shadow-[0_14px_40px_rgba(23,37,31,0.1)] sm:p-6 lg:sticky lg:top-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4b57d]">Thumbnail preview</p>
            <div className="mt-5 aspect-[4/3] overflow-hidden rounded-sm bg-white/10">
              {preview ? <img src={preview} alt="Selected property thumbnail preview" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center px-8 text-center text-sm leading-6 text-white/35">Choose a property image to preview it here.</div>}
            </div>
            <p className="mt-5 text-xs leading-5 text-white/40">Use a clean, high-quality landscape image. The public property cards use a 4:3 presentation.</p>
          </aside>
        </form>
      </section>
    </main>
  );
}

function Field({ label, name, placeholder, required = false, type = "text", defaultValue, min }: { label: string; name: string; placeholder?: string; required?: boolean; type?: string; defaultValue?: string; min?: string }) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#17251f]/45">{label}</label>
      <input name={name} type={type} placeholder={placeholder} required={required} defaultValue={defaultValue} min={min} className="mt-2 h-12 w-full border-b border-[#17251f]/15 bg-transparent px-0 text-sm outline-none placeholder:text-[#17251f]/25 focus:border-[#c8a46b]" />
    </div>
  );
}
