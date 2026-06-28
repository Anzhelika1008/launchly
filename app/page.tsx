"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateBrand() {
    if (!idea.trim()) return;

    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: idea }),
    });

    const data = await res.json();
    setResult(data.result || data.error || "Something went wrong.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 z-50 flex w-full justify-between border-b border-white/10 bg-black/50 px-8 py-5 backdrop-blur">
        <div className="font-semibold">Launchly</div>
        <div className="flex gap-8 text-sm text-zinc-400">
          <span>Features</span>
          <span>Examples</span>
          <span>Pricing</span>
        </div>
      </nav>

      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb70,transparent_30%),radial-gradient(circle_at_bottom,#7c3aed60,transparent_35%)]" />

        <div className="relative z-10 max-w-4xl">
          <p className="mb-6 text-sm text-blue-300">AI brand builder for founders</p>

          <h1 className="text-6xl font-bold tracking-tight md:text-8xl">
            Launch your startup
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              in minutes.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            Describe your idea. Launchly creates your brand, messaging,
            landing page copy and social media kit — instantly.
          </p>

          <div className="mx-auto mt-10 flex max-w-2xl gap-3 rounded-3xl border border-white/10 bg-white/5 p-3">
            <input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your startup idea..."
              className="flex-1 rounded-2xl bg-black/50 px-5 py-4 outline-none"
            />
            <button
              onClick={generateBrand}
              disabled={loading}
              className="rounded-2xl bg-white px-7 py-4 font-semibold text-black"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl whitespace-pre-wrap rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
                Generated Brand
              </p>
              <p className="leading-8 text-zinc-200">{result}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}