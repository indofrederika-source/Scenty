"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROCESS_IMAGES } from "@/data/materials";
import { FlaskConical, Droplet, Flame, ArrowRight, Info } from "lucide-react";

export function ExtractionProcessVisualizer() {
  const [activeProcess, setActiveProcess] = useState<string>("steam-distillation");

  const processes = [
    {
      slug: "steam-distillation",
      name: "Steam Distillation (Distilasi Uap)",
      image: "/assets/process/steam-distillation.jpg",
      usedFor: "Lavender, Sandalwood, Patchouli, Cedarwood, Clove Bud, Cardamom",
      description: "Uap air bertekanan dialirkan menembus bahan tanaman di dalam bejana alembik tembaga/baja. Panas uap memecah kantung kelenjar minyak atsiri. Uap campuran air dan minyak volatil kemudian dikondensasi melalui pendingin koil spiral ke dalam bejana pemisah Florentine. Minyak atsiri murni yang memiliki massa jenis lebih ringan mengapung di atas air suling (hydrosol) dan dipisahkan.",
      keyYield: "Hasil murni: Essential Oil 100% murni + Hydrosol (air mawar / air lavender).",
    },
    {
      slug: "cold-expression",
      name: "Cold Expression (Pengepresan Dingin)",
      image: "/assets/process/cold-expression.jpg",
      usedFor: "Bergamot, Lemon, Grapefruit, Sweet Orange, Mandarin, Lime",
      description: "Metode ekstraksi mekanis tanpa paparan panas tinggi. Kulit buah citrus diparut atau diperas secara fisik untuk memecahkan sel-sel kantung minyak perikarp. Emulsi cairan minyak dan air buah kemudian disentrifugasi untuk memisahkan minyak esensial murni yang mempertahankan kesegaran zesty alami tanpa terdegradasi panas.",
      keyYield: "Hasil murni: Expressed Oil segar. Minyak mentah ini mengandung senyawa furocoumarins (bergapten) yang wajib dimurnikan menjadi FCF.",
    },
    {
      slug: "solvent-extraction",
      name: "Solvent Extraction (Concrete & Absolute)",
      image: "/assets/process/solvent-extraction.jpg",
      usedFor: "Jasmine Sambac, Rose Damascena, Tuberose, Vanilla, Oakmoss",
      description: "Bunga-bunga rapuh dan resin akan rusak jika terkena panas uap distilasi. Bahan dilarutkan ke dalam pelarut organik non-polar volatil (seperti heksana) untuk melarutkan molekul wangi dan lilin tanaman, menghasilkan pasta padat berlilin yang disebut 'Concrete'. Concrete kemudian dilarutkan dalam etanol hangat, didinginkan untuk mengendapkan lilin, dan alkohol diuapkan kembali di bawah vakum rendah untuk menghasilkan 'Absolute' murni berkonsentrasi sangat tinggi.",
      keyYield: "Hasil murni: Absolute (cairan kental pekat dengan aroma paling mendekati bunga segar di alam).",
    },
  ];

  const current = processes.find((p) => p.slug === activeProcess) || processes[0];

  return (
    <div className="card-clean p-6 sm:p-8 bg-white border border-zinc-200 max-w-5xl mx-auto">
      <div className="max-w-2xl mx-auto text-center pb-4 mb-6 border-b border-zinc-200">
        <span className="text-xs font-mono uppercase text-zinc-500 font-bold block mb-1">
          Teknologi Pengolahan Bahan Baku Alami
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 uppercase">
          Metode Ekstraksi Botanical ke Minyak Wangi
        </h3>
      </div>

      {/* Process Selector Tabs (Centered) */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {processes.map((proc) => (
          <button
            key={proc.slug}
            onClick={() => setActiveProcess(proc.slug)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-colors ${
              activeProcess === proc.slug
                ? "bg-zinc-950 text-white shadow-xs"
                : "bg-zinc-50 border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            {proc.name.split(" (")[0]}
          </button>
        ))}
      </div>

      {/* Main Feature Layout with Real Editorial Photography */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Photo Visual (6 Cols) */}
        <div className="lg:col-span-6">
          <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-100 overflow-hidden relative border border-zinc-200 shadow-sm">
            <Image
              src={current.image}
              alt={current.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm border border-zinc-200 text-zinc-900 font-mono text-[11px] font-bold shadow-xs">
              {current.name}
            </div>
          </div>
        </div>

        {/* Explanation & Technical Process (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h4 className="text-lg font-extrabold text-zinc-950 uppercase mb-1">
              {current.name}
            </h4>
            <div className="text-xs font-mono text-zinc-500">
              <span className="font-semibold text-zinc-800">Digunakan Untuk: </span>
              {current.usedFor}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal text-justify">
            {current.description}
          </p>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <span className="text-[11px] font-mono uppercase font-bold text-zinc-800 block mb-1 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-zinc-700" />
              Karakteristik Hasil Ekstraksi:
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal text-justify">
              {current.keyYield}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
