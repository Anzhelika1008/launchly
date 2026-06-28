"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-lg font-semibold">Launchly</div>
          <div className="hidden gap-8 text-sm text-zinc-400 md:flex">
            <span>Features</span>
            <span>Examples</span>
            <span>Pricing</span>
          </div>
          <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
            Get Started
          </button>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center justify-center px-6 pt-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb70,transparent_30%),radial-gradient(circle_at_bottom,#7c3aed60,transparent_35%)]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mx-auto mb-8 w-fit rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300">
            AI brand builder for founders
          </div>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl">
            Launch your startup
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              in minutes.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            Describe your idea. Launchly creates your brand, messaging,
            landing page copy and social media kit — instantly.
          </p>

          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl shadow-blue-500/20 backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="min-h-14 flex-1 rounded-2xl border border-white/10 bg-black/40 px-5 text-white outline-none placeholder:text-zinc-600"
                placeholder="Describe your startup idea..."
              />
              <button
                onClick={() => setResult(true)}
                className="rounded-2xl bg-white px-7 py-4 font-semibold text-black transition hover:scale-105"
              >
                Generate
              </button>
            </div>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
                Generated Brand
              </p>

              <h2 className="mt-4 text-3xl font-semibold">NovaPilot</h2>

              <p className="mt-3 text-zinc-400">
                A modern AI-powered brand concept based on:{" "}
                <span className="text-white">{idea || "your startup idea"}</span>
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-zinc-500">Slogan</p>
                  <p className="mt-2 font-medium">
                    Launch smarter. Grow faster.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-zinc-500">Brand Style</p>
                  <p className="mt-2 font-medium">
                    Minimal, premium, futuristic
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-zinc-500">Colors</p>
                  <p className="mt-2 font-medium">
                    Electric blue, deep black, soft violet
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-zinc-500">Logo Idea</p>
                  <p className="mt-2 font-medium">
                    A clean abstract spark inside a rounded symbol
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}