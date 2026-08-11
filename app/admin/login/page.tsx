"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to sign in.");
        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#122019] px-5 py-10 text-[#17251f]">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[4px] bg-[#f4f1e9] shadow-2xl md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[620px] overflow-hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=90"
            alt="Luxury property"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#07100c]/55" />
          <div className="absolute inset-x-9 bottom-10 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4b57d]">Private workspace</p>
            <h1 className="mt-3 font-serif text-5xl leading-none">Manage your<br />property collection.</h1>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">Add properties, manage enquiries and keep your public catalogue up to date.</p>
          </div>
        </div>

        <div className="flex min-h-[620px] items-center px-7 py-12 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <a href="/" className="font-serif text-2xl tracking-[0.14em] text-[#122019]">ESTATE<span className="text-[#c8a46b]">.</span></a>
            <p className="mt-14 text-[10px] font-bold uppercase tracking-[0.3em] text-[#a27d45]">Administrator</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight">Welcome back</h2>
            <p className="mt-3 text-sm leading-6 text-[#17251f]/50">Sign in to manage properties and enquiries.</p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#17251f]/50">Username</span>
                <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required className="mt-2 h-12 w-full border-b border-[#17251f]/20 bg-transparent px-0 outline-none transition focus:border-[#a27d45]" />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#17251f]/50">Password</span>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required className="mt-2 h-12 w-full border-b border-[#17251f]/20 bg-transparent px-0 outline-none transition focus:border-[#a27d45]" />
              </label>

              {error && <p className="rounded-sm border border-red-900/10 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

              <button disabled={loading} className="flex h-13 w-full items-center justify-between rounded-sm bg-[#122019] px-5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#c8a46b] hover:text-[#122019] disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Signing in..." : "Sign in"}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <a href="/" className="mt-8 block text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#17251f]/40 hover:text-[#a27d45]">← Back to website</a>
          </div>
        </div>
      </div>
    </main>
  );
}
