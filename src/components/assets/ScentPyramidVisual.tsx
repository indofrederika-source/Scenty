"use client";

import React, { useState } from "react";
import { SCENT_PYRAMID } from "@/data/perfumery-data";
import { Layers, Clock, Gauge, Atom } from "lucide-react";

export function ScentPyramidVisual() {
  const [selectedTierId, setSelectedTierId] = useState<"top" | "heart" | "base">("top");

  const tier = SCENT_PYRAMID.find((t) => t.id === selectedTierId) || SCENT_PYRAMID[0];

  const representativeMolecules: Record<"top" | "heart" | "base", { name: string; type: string; role: string }[]> = {
    top: [
      { name: "Limonene", type: "Citrus Isolate", role: "Ledakan kesegaran jeruk (MW: 136.2 g/mol)" },
      { name: "Linalool", type: "Floral Fresh", role: "Aroma herbal lavender & citrus lembut" },
      { name: "Aldehyde C-10", type: "Aliphatic", role: "Nuansa segar bersih berangin (sparkling)" },
    ],
    heart: [
      { name: "Hedione", type: "Ester", role: "Nuansa melati transparan & penyebar difusi" },
      { name: "Citronellol", type: "Floral Rose", role: "Karakter utama mawar hijau segar" },
      { name: "Eugenol", type: "Spicy", role: "Nuansa rempah cengkeh & anyelir hangat" },
    ],
    base: [
      { name: "Iso E Super", type: "Woody Amber", role: "Aroma kayu cedar beludru & fiksatif modern" },
      { name: "Ambroxan", type: "Ambergris", role: "Kehangatan mineral amber & radiasi kering" },
      { name: "Galaxolide", type: "Polycyclic Musk", role: "Kebersihan kain bersih & ketahanan 24+ jam" },
    ],
  };

  return (
    <div className="card-clean p-6 sm:p-8 bg-white border border-zinc-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Isometric Scent Pyramid Asset (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="text-xs font-mono uppercase text-zinc-500 font-bold mb-4 tracking-wider text-center">
            Piramida Kinetika Evaporasi
          </div>

          <div className="w-full max-w-sm flex flex-col items-center gap-2 select-none">
            {/* Top Tier (Apex) */}
            <button
              onClick={() => setSelectedTierId("top")}
              onMouseEnter={() => setSelectedTierId("top")}
              className={`w-40 sm:w-44 py-3.5 px-4 rounded-t-2xl border transition-all duration-200 text-center relative ${
                selectedTierId === "top"
                  ? "bg-amber-100 border-amber-500 text-zinc-950 font-bold shadow-md -translate-y-0.5"
                  : "bg-amber-50/60 border-amber-200 text-zinc-700 hover:bg-amber-100/60"
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-amber-700 font-bold">15 - 45 Menit</div>
              <div className="text-sm font-extrabold uppercase tracking-tight">Top Notes</div>
              <div className="text-[10px] font-mono text-zinc-500">&lt; 150 g/mol</div>
            </button>

            {/* Heart Tier (Middle Body) */}
            <button
              onClick={() => setSelectedTierId("heart")}
              onMouseEnter={() => setSelectedTierId("heart")}
              className={`w-64 sm:w-72 py-4 px-4 border transition-all duration-200 text-center relative ${
                selectedTierId === "heart"
                  ? "bg-rose-100 border-rose-500 text-zinc-950 font-bold shadow-md -translate-y-0.5"
                  : "bg-rose-50/60 border-rose-200 text-zinc-700 hover:bg-rose-100/60"
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-rose-700 font-bold">2 - 5 Jam</div>
              <div className="text-base font-extrabold uppercase tracking-tight">Heart / Middle Notes</div>
              <div className="text-[10px] font-mono text-zinc-500">150–220 g/mol</div>
            </button>

            {/* Base Tier (Foundation) */}
            <button
              onClick={() => setSelectedTierId("base")}
              onMouseEnter={() => setSelectedTierId("base")}
              className={`w-full py-5 px-4 rounded-b-2xl border transition-all duration-200 text-center relative ${
                selectedTierId === "base"
                  ? "bg-zinc-900 border-zinc-950 text-white font-bold shadow-md -translate-y-0.5"
                  : "bg-zinc-100 border-zinc-200 text-zinc-800 hover:bg-zinc-200"
              }`}
            >
              <div className={`text-[10px] font-mono uppercase font-bold ${selectedTierId === "base" ? "text-amber-400" : "text-zinc-600"}`}>
                6 - 24+ Jam
              </div>
              <div className="text-lg font-extrabold uppercase tracking-tight">Base Notes (Drydown)</div>
              <div className={`text-[10px] font-mono ${selectedTierId === "base" ? "text-zinc-400" : "text-zinc-500"}`}>
                &gt; 220 g/mol • Fiksatif
              </div>
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 mt-4 text-center">
            Arahkan kursor (hover) ke lapisan untuk membedah data kinetika evaporasi
          </div>
        </div>

        {/* Right: Detailed Dossier (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="pb-3 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase text-zinc-500 block font-bold">
                Lapisan Terpilih:
              </span>
              <h3 className="text-2xl font-extrabold text-zinc-950 uppercase">{tier.title}</h3>
            </div>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 font-mono text-xs font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {tier.timeframe}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 font-mono text-xs font-semibold flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5" />
                {tier.molecularWeight.split(" ")[0]} g/mol
              </span>
            </div>
          </div>

          <p className="text-sm text-zinc-700 leading-relaxed font-normal text-justify">
            {tier.role}
          </p>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <span className="text-xs font-mono uppercase font-bold text-zinc-900 block mb-1 flex items-center gap-1.5">
              <Atom className="w-4 h-4 text-zinc-700" />
              Kinetika Penguapan &amp; Tekanan Uap:
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed text-justify">
              {tier.scientificInsight}
            </p>
          </div>

          {/* Representative Molecules (Text tags, NO photo gallery) */}
          <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-zinc-800 block">
              Contoh Senyawa Molekuler Representatif:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {representativeMolecules[selectedTierId].map((mol, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-left">
                  <div className="text-xs font-bold text-zinc-950 font-mono">{mol.name}</div>
                  <div className="text-[10px] text-zinc-500 font-mono mb-1">{mol.type}</div>
                  <div className="text-[11px] text-zinc-600 leading-tight">{mol.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
