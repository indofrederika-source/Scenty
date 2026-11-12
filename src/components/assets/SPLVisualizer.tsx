"use client";

import React, { useState } from "react";

type SPLMetric = "sillage" | "projection" | "longevity";

export function SPLVisualizer() {
  const [activeMetric, setActiveMetric] = useState<SPLMetric>("sillage");

  // Dynamic slider values that directly transform the visual graphics:
  const [sillageIntensity, setSillageIntensity] = useState<number>(3); // 1 to 5 scale
  const [projectionRadius, setProjectionRadius] = useState<number>(2); // 1 to 4 scale
  const [longevityHours, setLongevityHours] = useState<number>(8); // 2 to 24 hours

  // Calculate clock hand angle for Longevity
  // 12 hours = 360 deg, so 1 hour = 30 deg
  const hourAngle = (longevityHours % 12) * 30;
  const minuteAngle = ((longevityHours % 1) * 60) * 6;

  return (
    <div className="card-clean p-6 sm:p-10 bg-white border border-zinc-200 space-y-10 max-w-4xl mx-auto shadow-2xs">
      {/* 3 Main Figures Selection Cards (Centered) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. SILLAGE FIGURE */}
        <div
          onClick={() => setActiveMetric("sillage")}
          className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col items-center justify-between text-center select-none ${
            activeMetric === "sillage"
              ? "bg-sky-50 border-sky-500 shadow-md ring-2 ring-sky-500/20 scale-[1.02]"
              : "bg-zinc-50 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100/70"
          }`}
        >
          {/* Dynamic SVG Visual: Wake waves grow dynamically with sillageIntensity */}
          <div className="w-full h-48 flex items-center justify-center relative">
            <svg viewBox="0 0 220 160" className="w-full h-full max-w-[210px]">
              {/* Dynamic Trail Waves: rendered conditionally based on slider value */}
              {sillageIntensity >= 5 && (
                <ellipse cx="25" cy="80" rx="24" ry="46" fill="#0284c7" fillOpacity="0.45" />
              )}
              {sillageIntensity >= 4 && (
                <ellipse cx="52" cy="80" rx="26" ry="44" fill="#0284c7" fillOpacity="0.60" />
              )}
              {sillageIntensity >= 3 && (
                <ellipse cx="80" cy="80" rx="26" ry="40" fill="#0284c7" fillOpacity="0.75" />
              )}
              {sillageIntensity >= 2 && (
                <ellipse cx="106" cy="80" rx="22" ry="34" fill="#0369a1" fillOpacity="0.85" />
              )}
              {sillageIntensity >= 1 && (
                <ellipse cx="126" cy="80" rx="16" ry="26" fill="#075985" fillOpacity="0.95" />
              )}

              {/* Walking Silhouette Figure */}
              <g fill="#09090b">
                <circle cx="152" cy="38" r="13" />
                <path d="M 144 53 C 144 50 160 50 160 53 L 158 92 C 158 94 146 94 146 92 Z" />
                <line x1="146" y1="56" x2="132" y2="76" stroke="#09090b" strokeWidth="6" strokeLinecap="round" />
                <line x1="158" y1="56" x2="170" y2="76" stroke="#09090b" strokeWidth="6" strokeLinecap="round" />
                <path d="M 154 90 L 168 116 L 180 142" stroke="#09090b" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 148 90 L 136 114 L 124 138" stroke="#09090b" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>
            </svg>
          </div>

          <div className="mt-2">
            <h4 className="text-xl font-extrabold text-zinc-950 uppercase tracking-tight">
              Sillage
            </h4>
            <p className="text-xs text-sky-800 font-mono font-bold mt-1">
              Jejak Wangi di Udara
            </p>
          </div>
        </div>

        {/* 2. PROJECTION FIGURE */}
        <div
          onClick={() => setActiveMetric("projection")}
          className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col items-center justify-between text-center select-none ${
            activeMetric === "projection"
              ? "bg-rose-50 border-rose-500 shadow-md ring-2 ring-rose-500/20 scale-[1.02]"
              : "bg-zinc-50 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100/70"
          }`}
        >
          {/* Dynamic SVG Visual: Concentric red aura expands with projectionRadius */}
          <div className="w-full h-48 flex items-center justify-center relative">
            <svg viewBox="0 0 200 160" className="w-full h-full max-w-[190px]">
              {/* Outer Aura (Tier 4: Room presence) */}
              {projectionRadius >= 4 && (
                <ellipse cx="100" cy="80" rx="80" ry="76" fill="#ef4444" fillOpacity="0.25" />
              )}
              {/* Mid Aura (Tier 3: Moderate radius) */}
              {projectionRadius >= 3 && (
                <ellipse cx="100" cy="80" rx="60" ry="65" fill="#f87171" fillOpacity="0.40" />
              )}
              {/* Arm-length Aura (Tier 2: Intimate) */}
              {projectionRadius >= 2 && (
                <ellipse cx="100" cy="80" rx="42" ry="52" fill="#ef4444" fillOpacity="0.60" />
              )}
              {/* Skin Scent Aura (Tier 1: Close to body) */}
              {projectionRadius >= 1 && (
                <ellipse cx="100" cy="80" rx="26" ry="40" fill="#dc2626" fillOpacity="0.75" />
              )}

              {/* Standing Silhouette Figure */}
              <g fill="#09090b">
                <circle cx="100" cy="36" r="13" />
                <rect x="91" y="52" width="18" height="42" rx="4" />
                <line x1="88" y1="56" x2="84" y2="100" stroke="#09090b" strokeWidth="6" strokeLinecap="round" />
                <line x1="112" y1="56" x2="116" y2="100" stroke="#09090b" strokeWidth="6" strokeLinecap="round" />
                <line x1="95" y1="94" x2="95" y2="142" stroke="#09090b" strokeWidth="7" strokeLinecap="round" />
                <line x1="105" y1="94" x2="105" y2="142" stroke="#09090b" strokeWidth="7" strokeLinecap="round" />
              </g>
            </svg>
          </div>

          <div className="mt-2">
            <h4 className="text-xl font-extrabold text-zinc-950 uppercase tracking-tight">
              Projection
            </h4>
            <p className="text-xs text-rose-800 font-mono font-bold mt-1">
              Jarak Pancaran Tubuh Diam
            </p>
          </div>
        </div>

        {/* 3. LONGEVITY FIGURE */}
        <div
          onClick={() => setActiveMetric("longevity")}
          className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col items-center justify-between text-center select-none ${
            activeMetric === "longevity"
              ? "bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/20 scale-[1.02]"
              : "bg-zinc-50 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100/70"
          }`}
        >
          {/* Dynamic SVG Visual: Clock hands spin & green aura reflects hours */}
          <div className="w-full h-48 flex items-center justify-center relative">
            <svg viewBox="0 0 200 160" className="w-full h-full max-w-[190px]">
              {/* Dynamic green persistence aura scaling with hours */}
              <ellipse
                cx="100"
                cy="80"
                rx={24 + (longevityHours / 24) * 44}
                ry={34 + (longevityHours / 24) * 40}
                fill="#10b981"
                fillOpacity={0.25 + (longevityHours / 24) * 0.35}
              />
              <ellipse
                cx="100"
                cy="80"
                rx={18 + (longevityHours / 24) * 24}
                ry={26 + (longevityHours / 24) * 26}
                fill="#059669"
                fillOpacity={0.35 + (longevityHours / 24) * 0.35}
              />

              {/* Standing Human Silhouette */}
              <g fill="#09090b">
                <circle cx="100" cy="36" r="13" />
                <rect x="90" y="52" width="20" height="42" rx="4" />
                <line x1="87" y1="56" x2="84" y2="100" stroke="#09090b" strokeWidth="6" strokeLinecap="round" />
                <line x1="113" y1="56" x2="116" y2="100" stroke="#09090b" strokeWidth="6" strokeLinecap="round" />
                <line x1="95" y1="94" x2="95" y2="142" stroke="#09090b" strokeWidth="7" strokeLinecap="round" />
                <line x1="105" y1="94" x2="105" y2="142" stroke="#09090b" strokeWidth="7" strokeLinecap="round" />
              </g>

              {/* Dynamic Analog Clock on Torso */}
              <circle cx="100" cy="73" r="14" fill="#ffffff" stroke="#09090b" strokeWidth="1.5" />
              {/* Spinning Hour Hand based on longevityHours */}
              <line
                x1="100"
                y1="73"
                x2={100 + 7 * Math.sin((hourAngle * Math.PI) / 180)}
                y2={73 - 7 * Math.cos((hourAngle * Math.PI) / 180)}
                stroke="#09090b"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Spinning Minute Hand based on longevityHours */}
              <line
                x1="100"
                y1="73"
                x2={100 + 10 * Math.sin((minuteAngle * Math.PI) / 180)}
                y2={73 - 10 * Math.cos((minuteAngle * Math.PI) / 180)}
                stroke="#09090b"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="100" cy="73" r="1.5" fill="#09090b" />
            </svg>
          </div>

          <div className="mt-2">
            <h4 className="text-xl font-extrabold text-zinc-950 uppercase tracking-tight">
              Longevity
            </h4>
            <p className="text-xs text-emerald-800 font-mono font-bold mt-1">
              Daya Tahan di Kulit
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Detail & Factors Section */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-6">
        {/* Metric 1: Sillage */}
        {activeMetric === "sillage" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 uppercase">
                Sillage: Jejak Wangi di Udara
              </h3>
              <div className="px-4 py-2 rounded-xl bg-sky-950 text-white font-mono font-extrabold text-sm shadow-xs self-start sm:self-auto">
                Jangkauan Jejak: <span className="text-sky-300">
                  {sillageIntensity === 1 && "0.5 Meter (Sangat Dekat)"}
                  {sillageIntensity === 2 && "1.5 Meter (Sedang)"}
                  {sillageIntensity === 3 && "2.5 Meter (Jelas Tercium)"}
                  {sillageIntensity === 4 && "4.0 Meter (Kuat)"}
                  {sillageIntensity === 5 && "6.0+ Meter (Sangat Kuat)"}
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-zinc-800 leading-relaxed text-justify font-normal">
              <strong>Sillage</strong> adalah jejak aroma wangi yang tertinggal mengapung di udara setelah orang yang memakainya berjalan melewati suatu ruangan. Seperti jejak air yang ditinggalkan perahu yang melaju, sillage mengukur seberapa jauh aroma Anda dapat tercium oleh orang lain yang melangkah di belakang Anda.
            </p>

            {/* Slider that changes the picture */}
            <div className="p-5 rounded-xl bg-white border border-zinc-200 space-y-3">
              <div className="flex items-center justify-between text-sm font-mono">
                <span className="font-bold text-zinc-900">Geser Intensitas Jejak Wangi:</span>
                <span className="font-extrabold text-sky-700 text-base">
                  Level {sillageIntensity} dari 5
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={sillageIntensity}
                onChange={(e) => setSillageIntensity(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs font-mono text-zinc-500 font-semibold">
                <span>1 (Jejak Tipis / Dekat)</span>
                <span>3 (Sedang)</span>
                <span>5 (Jejak Pekat &amp; Sangat Jauh)</span>
              </div>
            </div>

            {/* Factors that affect Sillage */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold font-mono uppercase text-zinc-950">
                Apa Saja yang Memengaruhi Sillage?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-1.5">
                  <strong className="text-zinc-950 block font-semibold">1. Berat Molekul &amp; Difusivitas Bahan</strong>
                  <p className="text-zinc-600 leading-relaxed text-justify text-xs sm:text-sm">
                    Bahan-bahan sintetis berbobot molekul sedang seperti <em>Hedione</em> dan <em>Iso E Super</em> memiliki sifat sangat mudah melayang di udara, membuat jejak wangi Anda terbang luas tanpa terasa menyengat.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-1.5">
                  <strong className="text-zinc-950 block font-semibold">2. Kelembapan Udara &amp; Angin</strong>
                  <p className="text-zinc-600 leading-relaxed text-justify text-xs sm:text-sm">
                    Udara lembap tropis mengikat molekul aroma di udara lebih lama dibanding ruangan ber-AC yang kering. Gerakan tubuh saat berjalan menciptakan aliran turbulensi yang menebarkan aroma ke sekeliling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Metric 2: Projection */}
        {activeMetric === "projection" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 uppercase">
                Projection: Jarak Pancaran Tubuh Diam
              </h3>
              <div className="px-4 py-2 rounded-xl bg-rose-950 text-white font-mono font-extrabold text-sm shadow-xs self-start sm:self-auto">
                Radius Jangkauan: <span className="text-rose-300">
                  {projectionRadius === 1 && "± 0.3 Meter (Sangat Dekat / Skin Scent)"}
                  {projectionRadius === 2 && "± 1.0 Meter (Satu Lengan)"}
                  {projectionRadius === 3 && "± 1.8 Meter (Sosial Normal)"}
                  {projectionRadius === 4 && "± 3.5+ Meter (Memenuhi Ruangan)"}
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-zinc-800 leading-relaxed text-justify font-normal">
              <strong>Projection</strong> adalah radius jarak aroma memancar keluar dari tubuh ketika Anda dalam posisi <strong>diam berdiri atau duduk di tempat</strong>. Panas alami dari kulit menghangatkan cairan parfum, membuat molekul aromanya menguap dan membentuk lingkaran &quot;aura wangi&quot; di sekeliling tubuh Anda.
            </p>

            {/* Slider that changes the picture */}
            <div className="p-5 rounded-xl bg-white border border-zinc-200 space-y-3">
              <div className="flex items-center justify-between text-sm font-mono">
                <span className="font-bold text-zinc-900">Geser Luas Radius Pancaran:</span>
                <span className="font-extrabold text-rose-700 text-base">
                  Radius {projectionRadius === 1 ? "0.3m" : projectionRadius === 2 ? "1.0m" : projectionRadius === 3 ? "1.8m" : "3.5m+"}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={4}
                value={projectionRadius}
                onChange={(e) => setProjectionRadius(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs font-mono text-zinc-500 font-semibold">
                <span>0.3m (Skin Scent)</span>
                <span>1.0m (Satu Lengan)</span>
                <span>1.8m (Sosial)</span>
                <span>3.5m+ (Ruangan Penuh)</span>
              </div>
            </div>

            {/* Factors that affect Projection */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold font-mono uppercase text-zinc-950">
                Apa Saja yang Memengaruhi Projection?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-1.5">
                  <strong className="text-zinc-950 block font-semibold">1. Kadar Alkohol &amp; Kecepatan Penguapan</strong>
                  <p className="text-zinc-600 leading-relaxed text-justify text-xs sm:text-sm">
                    Parfum dengan kandungan alkohol tinggi (seperti Eau de Toilette) menguap dengan cepat (<em>flash-off</em>), bertindak melontarkan wangi jauh ke udara sehingga proyeksi awalnya sangat kuat.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-1.5">
                  <strong className="text-zinc-950 block font-semibold">2. Suhu Tubuh &amp; Titik Semprot</strong>
                  <p className="text-zinc-600 leading-relaxed text-justify text-xs sm:text-sm">
                    Menyemprotkan parfum pada titik-titik nadi yang hangat (leher, pergelangan tangan, dada) meningkatkan radiasi panas yang mendorong aroma memancar lebih jauh ke sekeliling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Metric 3: Longevity */}
        {activeMetric === "longevity" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 uppercase">
                Longevity: Daya Tahan di Kulit
              </h3>
              <div className="px-4 py-2 rounded-xl bg-emerald-950 text-white font-mono font-extrabold text-sm shadow-xs self-start sm:self-auto">
                Daya Tahan: <span className="text-emerald-300">{longevityHours} Jam</span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-zinc-800 leading-relaxed text-justify font-normal">
              <strong>Longevity</strong> adalah durasi total berapa lama wangi parfum dapat bertahan dan tercium di kulit Anda, dihitung sejak semprotan pertama sampai jejak wangi terakhir benar-benar habis menguap.
            </p>

            {/* Slider that changes the picture */}
            <div className="p-5 rounded-xl bg-white border border-zinc-200 space-y-3">
              <div className="flex items-center justify-between text-sm font-mono">
                <span className="font-bold text-zinc-900">Geser Durasi Waktu Jam:</span>
                <span className="font-extrabold text-emerald-700 text-base">
                  {longevityHours} Jam di Kulit
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={24}
                step={1}
                value={longevityHours}
                onChange={(e) => setLongevityHours(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs font-mono text-zinc-500 font-semibold">
                <span>2 Jam (Singkat)</span>
                <span>8 Jam (Standar Harian)</span>
                <span>16 Jam</span>
                <span>24+ Jam (Sangat Awet)</span>
              </div>
            </div>

            {/* Factors that affect Longevity */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold font-mono uppercase text-zinc-950">
                Apa Saja yang Memengaruhi Longevity?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-1.5">
                  <strong className="text-zinc-950 block font-semibold">1. Kelembapan Kulit</strong>
                  <p className="text-zinc-600 leading-relaxed text-justify text-xs sm:text-sm">
                    Kulit lembap dan berminyak mengikat minyak parfum jauh lebih lama. Kulit kering membuat parfum menguap dua kali lebih cepat.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-1.5">
                  <strong className="text-zinc-950 block font-semibold">2. Konsentrasi Minyak</strong>
                  <p className="text-zinc-600 leading-relaxed text-justify text-xs sm:text-sm">
                    Formula dengan persentase minyak tinggi (seperti Extrait 20–40%) bertahan 12–24 jam karena molekul minyaknya padat.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-1.5">
                  <strong className="text-zinc-950 block font-semibold">3. Kekuatan Fiksatif</strong>
                  <p className="text-zinc-600 leading-relaxed text-justify text-xs sm:text-sm">
                    Bahan dasar berat seperti <em>Ambroxan</em>, <em>Patchouli</em>, dan <em>Musk</em> bertindak sebagai perekat yang menahan wangi tidak cepat pudar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
