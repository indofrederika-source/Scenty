"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FRAGRANCE_FAMILIES } from "@/data/perfumery-data";
import { BookOpen, Compass, Layers, Info, Droplet } from "lucide-react";

export function ArchiveLeft() {
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>("citrus");
  const [hoveredFamily, setHoveredFamily] = useState<string | null>(null);

  const activeFamily =
    FRAGRANCE_FAMILIES.find((f) => f.id === (hoveredFamily || selectedFamilyId)) ||
    FRAGRANCE_FAMILIES[0];

  const familiesList = [
    { id: "citrus", name: "Citrus", color: "#eab308", desc: "Zesty, segar, mudah menguap (Bergamot, Lemon)" },
    { id: "floral", name: "Floral", color: "#f43f5e", desc: "Romantis, kelopak bunga, feminin/unisex (Rose, Jasmine)" },
    { id: "amber", name: "Amber / Oriental", color: "#f97316", desc: "Hangat, manis balsamik, sensual (Labdanum, Vanillin)" },
    { id: "woody", name: "Woody", color: "#854d0e", desc: "Kering, bersahaja, fiksatif alami (Sandalwood, Cedar)" },
    { id: "fougere", name: "Fougère", color: "#16a34a", desc: "Aromatik barbershop, lavender & oakmoss" },
    { id: "gourmand", name: "Gourmand", color: "#b45309", desc: "Edible manis, karamel, kakao, vanila" },
    { id: "chypre", name: "Chypre", color: "#0d9488", desc: "Kontras lumut ek, bergamot & patchouli" },
    { id: "aquatic", name: "Aquatic / Ozonik", color: "#0284c7", desc: "Udara laut segar, molekul Calone 1951" },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen px-4 sm:px-12 py-6 flex flex-col justify-start relative select-none">
      {/* Header Plaque */}
      <div className="max-w-5xl mx-auto w-full mb-4 flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center font-mono font-bold text-amber-200 text-xs shadow-md">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
              The Perfumer&apos;s Archive (Katalog &amp; Fragrance Wheel)
            </h2>
            <p className="text-xs font-mono text-zinc-400">
              Poster Roda Aroma Dinding &bull; Laci Apoteker Master &bull; Ensiklopedia Formulasi Terbuka
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-[10px]">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Klik segmen roda aroma untuk membedah data taksonomi</span>
        </div>
      </div>

      {/* MAIN LAYOUT: WALL POSTERS (TOP) & APOTHECARY WORKBENCH (BOTTOM) */}
      <div className="max-w-5xl mx-auto w-full space-y-6">
        {/* WALL AREA: Fragrance Wheel Poster & Scent Pyramid Chart */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* LEFT POSTER: The Fragrance Wheel Poster (7 Cols) */}
          <div
            className="md:col-span-7 p-6 rounded-2xl border border-amber-900/40 shadow-2xl relative"
            style={{
              backgroundColor: "#f4ebd0", // Aged parchment
              backgroundImage: "radial-gradient(#e8ddbe 1px, transparent 1px)",
              backgroundSize: "16px 16px",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8), inset 0 0 40px rgba(180, 130, 70, 0.25)",
            }}
          >
            {/* Masking tape on four corners */}
            <div className="absolute -top-2 left-6 w-12 h-4 bg-amber-100/70 border border-amber-300/50 backdrop-blur-xs -rotate-3" />
            <div className="absolute -top-2 right-6 w-12 h-4 bg-amber-100/70 border border-amber-300/50 backdrop-blur-xs rotate-3" />
            <div className="absolute -bottom-2 left-6 w-12 h-4 bg-amber-100/70 border border-amber-300/50 backdrop-blur-xs rotate-2" />
            <div className="absolute -bottom-2 right-6 w-12 h-4 bg-amber-100/70 border border-amber-300/50 backdrop-blur-xs -rotate-2" />

            {/* Poster Header */}
            <div className="text-center border-b border-amber-900/30 pb-3 mb-4">
              <span className="font-mono text-[9px] font-bold text-amber-900 tracking-widest uppercase block">
                MICHAEL EDWARDS INDUSTRIAL TAXONOMY
              </span>
              <h3 className="text-xl font-extrabold text-zinc-950 uppercase tracking-tight">
                The Fragrance Wheel (Roda Aroma)
              </h3>
            </div>

            {/* Visual Circular Segments Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {familiesList.map((fam) => {
                const isSelected = selectedFamilyId === fam.id;
                return (
                  <button
                    key={fam.id}
                    onClick={() => setSelectedFamilyId(fam.id)}
                    onMouseEnter={() => setHoveredFamily(fam.id)}
                    onMouseLeave={() => setHoveredFamily(null)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-zinc-950 text-white border-zinc-950 shadow-md scale-102"
                        : "bg-white/80 hover:bg-white text-zinc-900 border-amber-900/20"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: fam.color }}
                      />
                      <span className="font-mono text-[10px] font-bold uppercase truncate">
                        {fam.name}
                      </span>
                    </div>
                    <p className={`text-[9px] line-clamp-2 leading-tight ${isSelected ? "text-zinc-300" : "text-zinc-600"}`}>
                      {fam.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Family Dossier Preview */}
            <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-900/20 text-zinc-900 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase text-amber-950">
                  Rumpun Terpilih: {activeFamily.name}
                </span>
                <span className="text-[9px] font-mono font-semibold text-amber-800">
                  {activeFamily.classificationSystem}
                </span>
              </div>
              <p className="text-[11px] text-zinc-700 leading-relaxed font-serif italic">
                &ldquo;{activeFamily.moodDescription}&rdquo;
              </p>
              <div className="pt-1 flex flex-wrap gap-1 text-[9px] font-mono">
                <span className="text-zinc-500 font-bold">Molekul Kunci:</span>
                {activeFamily.heroMolecules.map((m, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-zinc-900 text-white font-semibold">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT POSTER: Scent Pyramid Chart on Vintage Paper (5 Cols) */}
          <div
            className="md:col-span-5 p-6 rounded-2xl border border-amber-900/40 shadow-2xl relative"
            style={{
              backgroundColor: "#f4ebd0",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8), inset 0 0 30px rgba(180, 130, 70, 0.25)",
            }}
          >
            <div className="absolute -top-2 left-10 w-12 h-4 bg-amber-100/70 border border-amber-300/50 backdrop-blur-xs rotate-2" />
            <div className="text-center border-b border-amber-900/30 pb-2 mb-4">
              <span className="font-mono text-[9px] font-bold text-amber-900 tracking-widest uppercase block">
                EVAPORATION KINETICS
              </span>
              <h3 className="text-lg font-extrabold text-zinc-950 uppercase tracking-tight">
                Scent Pyramid Chart
              </h3>
            </div>

            {/* Triangular Scent Pyramid Diagram */}
            <div className="space-y-2 py-1 select-none">
              {/* Top Layer */}
              <div className="p-3 rounded-lg bg-amber-100/90 border border-amber-300 text-center shadow-xs">
                <span className="font-mono text-[9px] text-amber-800 font-bold uppercase block">
                  15 - 45 MENIT &bull; &lt; 150 g/mol
                </span>
                <span className="text-xs font-extrabold uppercase text-amber-950 block">
                  Top Notes (Pembuka)
                </span>
                <span className="text-[9px] text-zinc-600 block mt-0.5">
                  Citrus, Lavender, Herbal aromatik, Aldehydes
                </span>
              </div>

              {/* Heart Layer */}
              <div className="p-3.5 rounded-lg bg-rose-100/90 border border-rose-300 text-center shadow-xs">
                <span className="font-mono text-[9px] text-rose-800 font-bold uppercase block">
                  2 - 5 JAM &bull; 150 - 220 g/mol
                </span>
                <span className="text-xs font-extrabold uppercase text-rose-950 block">
                  Heart / Middle Notes (Jantung)
                </span>
                <span className="text-[9px] text-zinc-600 block mt-0.5">
                  Rose, Jasmine, Spices, Fruity esters, Hedione
                </span>
              </div>

              {/* Base Layer */}
              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-950 text-white text-center shadow-xs">
                <span className="font-mono text-[9px] text-amber-400 font-bold uppercase block">
                  6 - 24+ JAM &bull; &gt; 220 g/mol
                </span>
                <span className="text-xs font-extrabold uppercase text-amber-100 block">
                  Base Notes &amp; Drydown (Fondasi)
                </span>
                <span className="text-[9px] text-zinc-400 block mt-0.5">
                  Sandalwood, Patchouli, Resins, Ambroxan, Musks
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE AREA: Vintage Lamp, Apothecary Cabinet & Open Master Ledger */}
        <div
          className="rounded-3xl p-5 sm:p-6 shadow-2xl border-t border-amber-900/50 relative"
          style={{
            backgroundColor: "#20120a",
            backgroundImage: "linear-gradient(to bottom, #2b170c 0%, #150904 100%)",
            boxShadow: "0 30px 60px -15px rgba(0,0,0,0.95), inset 0 2px 4px rgba(255,255,255,0.08)",
          }}
        >
          {/* Vintage Banker's Desk Lamp in Corner */}
          <div className="absolute -top-12 left-6 hidden sm:flex flex-col items-center z-20 pointer-events-none">
            {/* Emerald Green Glass Shade */}
            <div
              className="w-20 h-9 rounded-t-full shadow-2xl border border-emerald-400/30 relative"
              style={{
                backgroundColor: "#064e3b",
                boxShadow: "0 10px 20px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.3)",
              }}
            >
              {/* Luminous warm pool underneath */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-full bg-amber-200 blur-xs" />
            </div>
            {/* Brass Stand */}
            <div className="w-2 h-14 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 shadow-md" />
            <div className="w-12 h-3 rounded-full bg-amber-600 border border-amber-400 shadow-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* LEFT: Wooden Apothecary Drawers Cabinet (4 Cols) */}
            <div className="md:col-span-4 p-4 rounded-2xl bg-[#2e190e] border border-amber-950/60 shadow-xl space-y-2">
              <span className="font-mono text-[9px] font-bold uppercase text-amber-400 block border-b border-amber-900/40 pb-1">
                KABINET APOTEKER BAHAN:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "01. CITRUS ESSENCE",
                  "02. FLORAL ABSOLUTES",
                  "03. WOODS & RESINS",
                  "04. SYNTHETIC ISOLATES",
                  "05. MUSKS & FIXATIVES",
                  "06. ORGANIC SOLVENTS",
                ].map((drawer, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-[#3d2214] border border-amber-900 shadow-inner flex flex-col justify-between hover:bg-[#4a2a19] transition-colors cursor-pointer group"
                  >
                    <span className="font-mono text-[7px] text-zinc-300 font-bold block truncate">
                      {drawer}
                    </span>
                    {/* Brass Handle */}
                    <div className="w-6 h-1.5 mx-auto mt-2 rounded-full bg-amber-500 border border-amber-300 shadow-xs group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: The Open Master Botanical Compendium Ledger (8 Cols) */}
            <div className="md:col-span-8 bg-[#faf6ee] rounded-2xl p-5 sm:p-7 shadow-2xl border border-amber-900/30 relative">
              <div className="flex items-center justify-between border-b border-amber-900/20 pb-2 mb-3">
                <span className="font-mono text-[10px] font-bold uppercase text-amber-950">
                  THE PERFUMER&apos;S MASTER COMPENDIUM &bull; CATATAN BOTANI
                </span>
                <span className="font-mono text-[8px] text-amber-800">ISIPCA REFERENCE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-800 text-xs">
                <div className="space-y-1.5 border-r border-amber-900/10 pr-3">
                  <h4 className="font-bold font-mono text-zinc-950 uppercase text-[11px]">
                    1. Prinsip Piramida Volatilitas
                  </h4>
                  <p className="text-[10px] text-zinc-600 leading-relaxed font-serif italic text-justify">
                    &ldquo;Semua minyak wangi memiliki kepribadian termal yang bergantung pada berat molekul. Top notes adalah bisikan pertama yang terbang menyapa, heart notes adalah jiwa yang bercerita, dan base notes adalah kenangan yang menetap di kulit.&rdquo;
                  </p>
                </div>

                <div className="space-y-1.5 pl-1">
                  <h4 className="font-bold font-mono text-zinc-950 uppercase text-[11px]">
                    2. Etika Keamanan Kulit
                  </h4>
                  <p className="text-[10px] text-zinc-600 leading-relaxed font-serif italic text-justify">
                    &ldquo;Kreativitas tanpa batas regulasi adalah bahaya. Setiap peracik sejati menghormati batas IFRA Category 4 demi melindungi pemakainya dari luka fototoksik dan dermatitis.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
