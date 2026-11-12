"use client";

import React, { useState } from "react";
import { Music, Layers, ArrowRight, Info, Check } from "lucide-react";

interface AccordFormula {
  id: string;
  name: string;
  category: string;
  notes: { name: string; role: string; pct: number; color: string }[];
  olfactoryOutcome: string;
  musicalAnalogy: string;
  famousUsage: string;
}

export function AccordVisualizer() {
  const accords: AccordFormula[] = [
    {
      id: "amber",
      name: "Classic Amber Accord",
      category: "Warm & Resinous",
      notes: [
        { name: "Labdanum Resinoid", role: "Basis getah pekat, balsamik, hangat", pct: 45, color: "#ea580c" },
        { name: "Vanillin", role: "Kelembutan manis balsamik, menutupi kepahitan getah", pct: 35, color: "#f59e0b" },
        { name: "Benzoin Siam", role: "Jembatan pengikat, nuansa almond dupa", pct: 20, color: "#d97706" },
      ],
      olfactoryOutcome: "Menghasilkan aroma 'Amber' hangat, keemasan, dan manis balsamik yang kaya. (Di alam, tidak ada getah bernama 'Amber' cair; aroma amber murni adalah ciptaan akord manusia).",
      musicalAnalogy: "Seperti akord C Major pada piano: nada Do, Mi, dan Sol menyatu menghasilkan bunyi harmoni baru.",
      famousUsage: "Shalimar (Guerlain, 1925), Grand Soir (Maison Francis Kurkdjian, 2016).",
    },
    {
      id: "fougere",
      name: "The Barbershop Fougère Accord",
      category: "Aromatic & Fresh Clean",
      notes: [
        { name: "Lavender Oil", role: "Pembuka aromatik herbal segar di puncak", pct: 40, color: "#8b5cf6" },
        { name: "Coumarin (Tonka)", role: "Kehangatan jerami kering dan almond di tengah", pct: 35, color: "#06b6d4" },
        { name: "Oakmoss Absolute", role: "Dasar lumut hutan gelap basah yang dingin", pct: 25, color: "#059669" },
      ],
      olfactoryOutcome: "Melahirkan sensasi aroma 'sabun cukur mewah', padang rumput segar berembun, dan kebersihan maskulin klasik.",
      musicalAnalogy: "Kontras dinamis antara nada tinggi (Lavender) dan nada bass tanah (Oakmoss) yang diikat nada tengah manis (Coumarin).",
      famousUsage: "Fougère Royale (Houbigant, 1882), Cool Water (Davidoff, 1988).",
    },
    {
      id: "chypre",
      name: "Archetypal Chypre Accord",
      category: "Contrast Drama",
      notes: [
        { name: "Bergamot Oil", role: "Ledakan citrus segar bercahaya", pct: 35, color: "#eab308" },
        { name: "Oakmoss / Evernyl", role: "Kedalaman lumut kayu basah yang dingin", pct: 35, color: "#047857" },
        { name: "Patchouli Oil", role: "Tubuh tanah lembap, kakao gelap berbobot", pct: 30, color: "#78350f" },
      ],
      olfactoryOutcome: "Struktur kontras paling legendaris dalam wewangian: kesegaran langit citrus di atas yang jatuh ke lantai hutan lumut bumi yang misterius.",
      musicalAnalogy: "Kontras dramatis seperti harmoni minor yang megah dan berwibawa.",
      famousUsage: "Chypre de Coty (1917), Mitsouko (Guerlain, 1919), Aventus (Creed, 2010).",
    },
  ];

  const [activeAccordId, setActiveAccordId] = useState<string>("amber");
  const selectedAccord = accords.find((a) => a.id === activeAccordId) || accords[0];

  return (
    <div className="card-clean p-6 sm:p-8 bg-white border border-zinc-200">
      <div className="max-w-2xl mx-auto text-center mb-6">
        <span className="text-xs font-mono uppercase text-zinc-500 font-bold block mb-1">
          Harmonisasi Multi-Note
        </span>
        <h4 className="text-xl sm:text-2xl font-extrabold text-zinc-950 uppercase mb-2">
          Struktur &amp; Formula Akord Ikonik
        </h4>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
          Akord (Accord) adalah perpaduan dua atau lebih bahan baku (notes) yang diracik dalam proporsi tertentu sehingga menghasilkan kesatuan identitas wangi baru yang tidak bisa lagi dipisahkan oleh hidung.
        </p>
      </div>

      {/* Accord Tabs (Centered) */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {accords.map((accord) => (
          <button
            key={accord.id}
            onClick={() => setActiveAccordId(accord.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeAccordId === accord.id
                ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            {accord.name}
          </button>
        ))}
      </div>

      {/* Accord Composition Breakdown */}
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200">
          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">Kategori Akord:</span>
            <h5 className="text-lg font-bold text-zinc-950">{selectedAccord.name}</h5>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-white border border-zinc-200 text-zinc-700 font-semibold self-start sm:self-auto">
            {selectedAccord.category}
          </span>
        </div>

        {/* Visual Stacked Proportion Bar */}
        <div>
          <span className="text-[11px] font-mono text-zinc-600 font-bold uppercase block mb-2">
            Rasio Komposisi Penyusun Akord:
          </span>
          <div className="w-full h-8 rounded-xl bg-zinc-200 p-1 flex gap-1 overflow-hidden">
            {selectedAccord.notes.map((note, i) => (
              <div
                key={i}
                className="h-full rounded-lg transition-all flex items-center justify-center text-white text-[11px] font-mono font-bold truncate px-2"
                style={{ width: `${note.pct}%`, backgroundColor: note.color }}
                title={`${note.name}: ${note.pct}%`}
              >
                {note.name.split(" ")[0]} ({note.pct}%)
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {selectedAccord.notes.map((note, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-zinc-950">{note.name}</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800">
                  {note.pct}%
                </span>
              </div>
              <p className="text-xs text-zinc-600 font-normal leading-relaxed">{note.role}</p>
            </div>
          ))}
        </div>

        {/* Sensory Result & Music Analogy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white border border-zinc-200">
            <span className="text-[11px] font-mono font-bold uppercase text-zinc-800 block mb-1">
              Hasil Karakter Wewangian:
            </span>
            <p className="text-xs text-zinc-700 leading-relaxed font-normal">
              {selectedAccord.olfactoryOutcome}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-zinc-200">
            <span className="text-[11px] font-mono font-bold uppercase text-zinc-800 block mb-1 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-zinc-700" />
              Analogi Musik:
            </span>
            <p className="text-xs text-zinc-700 leading-relaxed font-normal mb-2">
              {selectedAccord.musicalAnalogy}
            </p>
            <div className="text-[11px] font-mono text-zinc-500 pt-1 border-t border-zinc-100">
              Contoh Parfum: <strong>{selectedAccord.famousUsage}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
