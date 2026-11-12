"use client";

import React from "react";
import { Terminal, ShieldCheck } from "lucide-react";

export function AcademyFooter() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const sections = [
    { id: "parfum-intro", label: "Apa itu Parfum & Konsentrasi Minyak" },
    { id: "fragrance-wheel", label: "Note & Circular Fragrance Wheel" },
    { id: "scent-pyramid", label: "Scent Pyramid & Drydown" },
    { id: "accord", label: "Accord (Akord Aroma)" },
    { id: "spl-performance", label: "Sillage, Projection, Longevity" },
    { id: "extraction-methods", label: "Metode Ekstraksi Bahan Baku" },
    { id: "formulation-science", label: "Teknik Formulasi & Maserasi" },
    { id: "ifra-and-olfactory-health", label: "Regulasi IFRA & Kesehatan Olfaktori" },
  ];

  return (
    <footer className="py-16 bg-white border-t border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-zinc-200">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center text-white font-mono font-bold text-xs shadow-xs">
                SC
              </div>
              <span className="font-extrabold tracking-tight text-xl text-zinc-950">
                SCENT
              </span>
            </div>
            <p className="text-xs text-zinc-600 max-w-sm leading-relaxed font-normal text-justify">
              Platform ensiklopedia dan studio sains wewangian interaktif: dirancang dengan standar presisi penimbangan laboratorium 0.001g, kinetika penguapan molekuler, dan kepatuhan dermatologis IFRA Kategori 4.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase font-bold text-zinc-900 block mb-4">
              Indeks Pembahasan Wewangian
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs text-zinc-600">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className="text-left hover:text-zinc-950 hover:font-bold transition-all truncate"
                >
                  &rarr; {sec.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            &copy; 2026 SCENT. Ensiklopedia Sains Wewangian &amp; Formulasi Parfum.
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>Next.js 16 &bull; Tailwind CSS &bull; React 19</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
