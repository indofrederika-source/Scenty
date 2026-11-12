"use client";

import React, { useState } from "react";
import { CONCENTRATION_TIERS, ConcentrationTier } from "@/data/perfumery-data";
import { PrecisionSlider } from "@/components/assets/PrecisionSlider";
import { Droplets, Info } from "lucide-react";

export function ConcentrationSimulator() {
  const [selectedTier, setSelectedTier] = useState<ConcentrationTier>(CONCENTRATION_TIERS[3]); // EDP default
  const [customOilPercent, setCustomOilPercent] = useState<number>(18);

  const handleTierSelect = (tier: ConcentrationTier) => {
    setSelectedTier(tier);
    setCustomOilPercent(tier.oilDefault);
  };

  const alcoholPercent = 100 - customOilPercent;

  // Spaced marks on the slider track to eliminate any text collisions
  const concentrationMarks = [
    { value: 1, label: "1%" },
    { value: 10, label: "10%" },
    { value: 20, label: "20%" },
    { value: 30, label: "30%" },
    { value: 40, label: "40%" },
  ];

  // Colored range bands
  const concentrationBands = [
    { from: 1, to: 3, color: "#bae6fd" }, // Eau Fraîche
    { from: 3, to: 5, color: "#fef08a" }, // EDC
    { from: 5, to: 15, color: "#fed7aa" }, // EDT
    { from: 15, to: 20, color: "#fdba74" }, // EDP
    { from: 20, to: 40, color: "#f97316" }, // Extrait
  ];

  const getTierFromPercent = (pct: number) => {
    if (pct < 3) return "Eau Fraîche (1%–3%)";
    if (pct < 5) return "Eau de Cologne / EDC (3%–5%)";
    if (pct <= 15) return "Eau de Toilette / EDT (5%–15%)";
    if (pct <= 20) return "Eau de Parfum / EDP (15%–20%)";
    return "Extrait de Parfum (20%–40%)";
  };

  const getActiveTierIndex = (pct: number) => {
    if (pct < 3) return 0;
    if (pct < 5) return 1;
    if (pct <= 15) return 2;
    if (pct <= 20) return 3;
    return 4;
  };

  const activeTierIdx = getActiveTierIndex(customOilPercent);

  const tierBadges = [
    { name: "Eau Fraîche", range: "1%–3%", color: "bg-sky-100 border-sky-300 text-sky-950 font-bold" },
    { name: "EDC", range: "3%–5%", color: "bg-yellow-100 border-yellow-300 text-yellow-950 font-bold" },
    { name: "EDT", range: "5%–15%", color: "bg-orange-100 border-orange-300 text-orange-950 font-bold" },
    { name: "EDP", range: "15%–20%", color: "bg-amber-200 border-amber-400 text-amber-950 font-bold" },
    { name: "Extrait", range: "20%–40%", color: "bg-orange-500 border-orange-600 text-white font-bold" },
  ];

  return (
    <section id="parfum-intro" className="py-24 bg-gradient-to-b from-white via-zinc-50/40 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title & Fundamental Theory: Explained from the very basics */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 uppercase leading-tight">
            Apa itu Parfum &amp; Konsentrasi Minyak?
          </h2>

          <div className="text-sm sm:text-base text-zinc-700 leading-relaxed space-y-4 text-justify font-normal pt-2">
            <p>
              Secara etimologi, kata <strong>parfum</strong> berakar dari bahasa Latin <em>&quot;per fumum&quot;</em> yang berarti <em>&quot;melalui asap&quot;</em>—merujuk pada ritual kuno ribuan tahun lalu ketika manusia membakar getah damar, dupa aromatik, dan kayu cendana untuk menghasilkan wewangian yang membubung ke udara. Dalam sains modern, parfum didefinisikan sebagai larutan homogen terukur yang tersusun dari perpaduan esens konsentrat aroma, cairan pelarut pembawa, dan bahan penahan penguapan (fiksatif).
            </p>
            <p>
              Bagaimana wewangian bekerja di tubuh kita? Ketika cairan parfum disemprotkan ke permukaan kulit, panas tubuh (36.5°C) memicu penguapan molekul-molekul aroma ke udara sekitar. Partikel uap tak kasat mata ini kemudian melayang, terhirup melalui rongga hidung, dan berikatan dengan jutaan silia pada epitel olfaktori. Sinyal biokimia tersebut kemudian diteruskan ke bulbus olfaktori di otak untuk dipersepsikan sebagai memori dan karakter aroma tertentu.
            </p>
            <p>
              Sebuah formula wewangian tersusun dari tiga komponen mutlak:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-left">
              <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1">
                  1. Fragrance Oil Concentrate
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Minyak wangi murni tanpa campuran pelarut, terdiri dari minyak esensial alami (ekstrak bunga, buah, getah, akar) dan senyawa molekul aroma sintetis murni.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1">
                  2. Solvent (Cairan Pelarut)
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Umumnya berupa Etanol murni berkadar 96% (Alcohol Denat). Pelarut berfungsi melarutkan molekul minyak yang pekat, mensterilkan formula, dan bertindak sebagai media semprot.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1">
                  3. Fixative (Fiksatif)
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Senyawa berbobot molekul tinggi yang memperlambat laju penguapan molekul-molekul ringan agar aroma tidak langsung hilang dalam hitungan menit.
                </p>
              </div>
            </div>
            <p className="pt-2">
              Istilah klasifikasi seperti EDC, EDT, EDP, dan Extrait de Parfum merupakan <strong>standar rasio persentase matematis</strong> konsentrat minyak wangi terhadap total volume larutan. Semakin tinggi rasio minyaknya, semakin rapat aromanya melekat di kulit dan semakin panjang durasi ketahanannya.
            </p>
          </div>
        </div>

        {/* 5 Concentration Tier Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-mono uppercase text-zinc-500 font-bold mb-3 text-center">
            5 Tingkatan Konsentrasi Standar Industri Internasional:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {CONCENTRATION_TIERS.map((tier) => {
              const isSelected = selectedTier.id === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => handleTierSelect(tier)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border text-center flex flex-col justify-between ${
                    isSelected
                      ? "bg-zinc-950 text-white border-zinc-950 shadow-xs scale-[1.02]"
                      : "bg-white border-zinc-200 text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <div className="mb-2">
                    <span
                      className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded font-bold mb-1.5 ${
                        isSelected ? "bg-zinc-800 text-zinc-200" : "bg-zinc-100 text-zinc-700 border border-zinc-200"
                      }`}
                    >
                      {tier.oilMin}–{tier.oilMax}% Oil
                    </span>
                    <h3 className="text-sm font-extrabold">{tier.name}</h3>
                  </div>
                  <div className={`text-xs font-mono ${isSelected ? "text-zinc-300" : "text-zinc-500"}`}>
                    {tier.longevityHours}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Lab Workspace: Beaker & Slider */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Beaker Cylinder (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col items-center shadow-xs">
            <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-zinc-100">
              <span className="text-xs font-mono uppercase text-zinc-700 font-bold flex items-center gap-2">
                <Droplets className="w-4 h-4 text-zinc-900" />
                Gelas Kimia Laboratorium (100g)
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200 font-bold">
                Formula Selesai
              </span>
            </div>

            {/* The Clean Beaker Cylinder */}
            <div className="relative w-44 h-56 bg-zinc-50 rounded-b-2xl rounded-t-lg border-2 border-zinc-400 p-1 flex flex-col justify-end overflow-hidden mb-4 shadow-inner">
              {/* Measurement Ticks */}
              <div className="absolute top-3 left-2 flex flex-col justify-between h-[85%] text-[9px] font-mono text-zinc-400 select-none z-20 pointer-events-none">
                <span>— 100g</span>
                <span>— 75g</span>
                <span>— 50g</span>
                <span>— 25g</span>
                <span>— 10g</span>
              </div>

              {/* Alcohol Layer (Top) */}
              <div
                className="w-full bg-blue-50 border-b border-blue-200 transition-all duration-300 flex items-center justify-center relative"
                style={{ height: `${alcoholPercent}%` }}
              >
                <span className="text-[10px] font-mono text-blue-900 font-bold tracking-tight px-1 text-center">
                  Alkohol 96%: {alcoholPercent.toFixed(1)}g
                </span>
              </div>

              {/* Fragrance Oil Layer (Bottom) */}
              <div
                className="w-full bg-amber-500 transition-all duration-300 flex items-center justify-center relative shadow-xs"
                style={{ height: `${Math.max(customOilPercent, 10)}%` }}
              >
                <span className="text-[10px] font-mono text-white font-bold tracking-tight text-center px-1">
                  {customOilPercent.toFixed(1)}g Minyak Murni
                </span>
              </div>
            </div>

            {/* Formula Recipe Output */}
            <div className="w-full bg-zinc-50 rounded-xl p-3 border border-zinc-200 space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Minyak Konsentrat:</span>
                <span className="font-bold text-amber-700">{customOilPercent.toFixed(1)}% ({customOilPercent.toFixed(1)}g)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Pelarut Alkohol 96%:</span>
                <span className="font-bold text-blue-700">{alcoholPercent.toFixed(1)}% ({alcoholPercent.toFixed(1)}g)</span>
              </div>
            </div>
          </div>

          {/* Precision Slider with Dynamic Active Range Badges (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs font-mono uppercase text-zinc-500 font-bold block">
                    Penyesuaian Presisi Rasio
                  </span>
                  <h4 className="text-base font-bold text-zinc-950">
                    Geser Persentase Minyak Konsentrat
                  </h4>
                </div>
                <div className="text-2xl font-mono font-extrabold text-zinc-950 px-3.5 py-1 rounded-xl bg-zinc-100 border border-zinc-200">
                  {customOilPercent.toFixed(1)}%
                </div>
              </div>

              {/* Exact Precision Slider */}
              <div className="pt-2 pb-2">
                <PrecisionSlider
                  min={1}
                  max={40}
                  step={0.5}
                  value={customOilPercent}
                  onChange={(v) => setCustomOilPercent(v)}
                  marks={concentrationMarks}
                  bands={concentrationBands}
                  formatValue={(v) => `${v}%`}
                  ariaLabel="Persentase Minyak Konsentrat"
                />
              </div>

              {/* Dynamic Range Badges (Zero text collisions) */}
              <div className="mt-5 pt-3 border-t border-zinc-100">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1.5">
                  Indikator Rentang Aktif:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {tierBadges.map((badge, idx) => {
                    const isActive = activeTierIdx === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg text-center border transition-all ${
                          isActive
                            ? `${badge.color} shadow-xs scale-105 ring-2 ring-zinc-950/10`
                            : "bg-zinc-50 border-zinc-200 text-zinc-500 opacity-50"
                        }`}
                      >
                        <div className="text-[11px] font-bold leading-tight">{badge.name}</div>
                        <div className="text-[10px] font-mono">{badge.range}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
                <span>Pelarut Alkohol: <strong className="text-zinc-900">{alcoholPercent.toFixed(1)}%</strong></span>
                <span>Kategori: <strong className="text-zinc-900">{getTierFromPercent(customOilPercent)}</strong></span>
              </div>
            </div>

            {/* Scientific Reality Insight */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
              <Info className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                <strong>Catatan Formulasi:</strong> Eau de Toilette mengandung 85% alkohol yang cepat menguap (<em>flash-off</em>), bertindak melontarkan top notes jauh ke udara (proyeksi luas). Sebaliknya, Extrait de Parfum didominasi molekul berat lipofilik yang mengikat sebum kulit; ia membentuk lapisan aroma yang intim menempel di kulit namun bertahan hingga 24 jam lebih.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
