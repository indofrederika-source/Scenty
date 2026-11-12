"use client";

import React from "react";
import { ExtractionProcessVisualizer } from "@/components/assets/ExtractionProcessVisualizer";

export function ExtractionMaterialsSection() {
  return (
    <section id="extraction-methods" className="py-24 bg-gradient-to-b from-white via-zinc-50/40 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Centered Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 uppercase leading-tight">
            Metode Ekstraksi Bahan Baku
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-zinc-700 leading-relaxed max-w-2xl mx-auto text-justify font-normal">
            <p>
              Palet wewangian tersusun dari perpaduan dua kelompok material: <strong>Bahan Alami (Naturals)</strong> yang diperoleh dari tumbuhan serta <strong>Molekul Sintetis (Aroma Chemicals)</strong> hasil sintesis laboratorium presisi. Untuk memisahkan molekul wangi aromatik dari sel tumbuhan hidup tanpa merusak karakternya, industri parfum menggunakan metode pemisahan fisika-kimia khusus sesuai ketahanan organ tanaman terhadap panas dan tekanan.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
              <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1">
                  1. Naturals (Kompleksitas Organik)
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Satu tetes minyak esensial murni mengandung ratusan komponen fitokimia alami yang menghasilkan dimensi aroma hidup, berlapis, dan dinamis di kulit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1">
                  2. Synthetics (Fiksasi &amp; Difusi)
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Isolat murni berstandar tinggi (seperti <em>Ambroxan</em> atau <em>Iso E Super</em>) yang menghadirkan stabilitas formula, konsistensi antar-batch, dan daya pancar yang konsisten.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Extraction Methods Visualizer (Centered) */}
        <div>
          <div className="text-center mb-3">
            <span className="text-xs font-mono uppercase text-zinc-500 font-bold">
              4 Metode Ekstraksi Fisika-Kimia Bahan Alami (Klik Tab untuk Melihat Proses):
            </span>
          </div>
          <ExtractionProcessVisualizer />
        </div>
      </div>
    </section>
  );
}
