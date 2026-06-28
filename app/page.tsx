"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Sparkles, Palette, PenLine, ImageIcon, Globe2, Megaphone } from "lucide-react";

type Brand = {
  name: string;
  tagline: string;
  style: string;
  colors: { name: string; hex: string }[];
  logoIdea: string;
  landingPage: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  instagramBio: string;
  marketingHooks: string[];
};

export default function Home() {
  const [idea, setIdea] = useState("");
  const [brand, setBrand] = useState<Brand | null>(null);
  const [rawResult, setRawResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateBrand() {
    if (!idea.trim()) return;

    setLoading(true);
    setBrand(null);
    setRawResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: idea }),
      });

      const data = await res.json();
      const text = data.result || "";

      setRawResult(text);
      setBrand(JSON.parse(text));
    } catch (error) {
      console.error(error);
      setRawResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const copyText = brand
    ? `${brand.name}\n${brand.tagline}\n\n${brand.style}\n\n${brand.logoIdea}`
    : rawResult;

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,#2563eb80,transparent_30%),radial-gradient(circle_at_bottom,#7c3aed70,transparent_35%)]" />
      <div className="pointer-events-none fixed left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="pointer-events-none fixed bottom-10 right-10 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

      <nav className="relative z-10 flex w-full justify-between border-b border-white/10 bg-black/40 px-8 py-5 backdrop-blur-xl">
        <div className="font-semibold">Launchly</div>
        <div className="hidden gap-8 text-sm text-zinc-400 md:flex">
          <span>Features</span>
          <span>Examples</span>
          <span>Pricing</span>
        </div>
      </nav>

      <section className="relative z-10 flex min-h-screen flex-col items-center px-6 pb-24 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl"
        >
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-200">
            <Sparkles size={16} />
            AI brand builder for founders
          </div>

          <h1 className="text-6xl font-black tracking-tight md:text-8xl">
            Launch your startup
            <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              in minutes.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-300">
            Describe your idea. Launchly creates your brand identity, colors,
            logo direction, landing page copy and marketing hooks.
          </p>

          <div className="mx-auto mt-10 flex max-w-3xl gap-3 rounded-[2rem] border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
            <input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your startup idea..."
              className="flex-1 rounded-3xl bg-black/50 px-5 py-4 outline-none"
            />
            <button
              onClick={generateBrand}
              disabled={loading}
              className="rounded-3xl bg-white px-8 py-4 font-bold text-black disabled:opacity-50"
            >
              {loading ? "Creating..." : "Generate"}
            </button>
          </div>
        </motion.div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 rounded-3xl border border-white/10 bg-white/10 px-8 py-6 backdrop-blur-xl"
          >
            <p className="text-lg font-semibold">✨ Creating your brand kit...</p>
            <p className="mt-2 text-sm text-zinc-400">
              Naming, colors, logo concept and marketing copy.
            </p>
          </motion.div>
        )}

        {brand && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 w-full max-w-6xl text-left"
          >
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-blue-300">
                  Brand Kit
                </p>
                <h2 className="mt-3 text-4xl font-black md:text-5xl">
                  Your AI-generated identity
                </h2>
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(copyText)}
                className="flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black hover:bg-zinc-200"
              >
                <Copy size={16} />
                Copy all
              </button>
            </div>

            <div className="mb-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-black p-8 shadow-2xl shadow-purple-500/20">
                <p className="text-sm uppercase tracking-[0.35em] text-blue-300">
                  Launchly Preview
                </p>
                <h3 className="mt-8 text-6xl font-black tracking-tight md:text-7xl">
                  {brand.name}
                </h3>
                <p className="mt-4 text-2xl text-zinc-300">{brand.tagline}</p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 backdrop-blur-xl">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-black">
                  <ImageIcon size={36} />
                </div>
                <p className="text-sm uppercase tracking-[0.25em] text-purple-300">
                  Logo Concept
                </p>
                <p className="mt-4 leading-7 text-zinc-200">{brand.logoIdea}</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <Card icon={<Palette />} title="Brand Colors">
                <div className="flex flex-wrap gap-4">
                  {brand.colors.map((color) => (
                    <div key={color.hex} className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <p className="font-semibold">{color.name}</p>
                        <p className="text-sm text-zinc-400">{color.hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card icon={<PenLine />} title="Brand Style">
                {brand.style}
              </Card>

              <Card icon={<Globe2 />} title="Landing Page">
                <p className="text-xl font-bold">{brand.landingPage.headline}</p>
                <p className="mt-3 text-zinc-300">{brand.landingPage.subheadline}</p>
                <button className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
                  {brand.landingPage.cta}
                </button>
              </Card>

              <Card icon={<Sparkles />} title="Instagram Bio">
                {brand.instagramBio}
              </Card>

              <Card icon={<Megaphone />} title="Marketing Hooks">
                <ul className="space-y-3">
                  {brand.marketingHooks.map((hook, i) => (
                    <li key={i}>• {hook}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </motion.div>
        )}

        {rawResult && !brand && !loading && (
          <div className="mt-10 max-w-3xl rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-left">
            {rawResult}
          </div>
        )}
      </section>
    </main>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
  initial={{ opacity: 0, y: 30, scale: 0.96 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  whileHover={{
    y: -8,
    scale: 1.03,
    transition: { duration: 0.2 }
  }}
  transition={{ duration: 0.45 }}
  className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-6 shadow-xl shadow-black/30 backdrop-blur-xl"
>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
        {icon}
      </div>
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-purple-300">
        {title}
      </p>
      <div className="leading-7 text-zinc-200">{children}</div>
    </motion.div>
  );
}
