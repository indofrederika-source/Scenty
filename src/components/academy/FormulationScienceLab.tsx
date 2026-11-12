"use client";

import React, { useState } from "react";
import { SOLVENTS_DATA, MACERATION_TIMELINE, MacerationStage } from "@/data/perfumery-data";
import { Calendar, Beaker, Gauge, CheckCircle2 } from "lucide-react";

export function FormulationScienceLab() {
  const [activeTab, setActiveTab] = useState<"maceration" | "solvents" | "dilution">("maceration");
  const [selectedMacerationStage, setSelectedMacerationStage] = useState<MacerationStage>(MACERATION_TIMELINE[2]); // Week 2 default

  return (
    <section id="formulation-science" className="py-24 bg-gradient-to-b from-white via-zinc-50/40 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Centered Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 uppercase leading-tight">
            Teknik Formulasi &amp; Maserasi
          </h2>
          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal max-w-2xl mx-auto text-justify">
            Meracik wewangian bukan sekadar mencampurkan minyak wangi ke alkohol lalu langsung disemprotkan. Di balik setiap botol parfum terdapat proses fisika-kimia presisi yang menentukan kejernihan aroma, stabilitas larutan, dan kehalusan transisi dari semprotan pertama hingga jejak akhir di kulit.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left pt-2">
            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
              <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1">
                1. Flash-off
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                Penguapan kilat alkohol pelarut dalam 15–30 detik pertama semprotan yang bertindak melontarkan partikel top notes ke udara.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
              <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1">
                2. Fiksatif
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                Senyawa berbobot molekul besar (&gt; 220 g/mol) yang menahan laju pelepasan molekul-molekul ringan agar tidak cepat habis.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
              <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1">
                3. Dilution (0.001g)
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                Pengenceran bahan mentah pekat ke 10% atau 1% sebelum ditimbang menggunakan timbangan analitik presisi 0.001 gram.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
              <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1">
                4. Maserasi
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                Reaksi esterifikasi kimiawi larutan selama 30–60 hari di wadah kaca gelap dan sejuk agar aroma membulat tanpa bau alkohol mentah.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Buttons (Centered) */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTab("maceration")}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 ${
              activeTab === "maceration"
                ? "bg-zinc-950 text-white shadow-xs"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>1. SAINS MASERASI (TIMELINE 30 HARI)</span>
          </button>
          <button
            onClick={() => setActiveTab("solvents")}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 ${
              activeTab === "solvents"
                ? "bg-zinc-950 text-white shadow-xs"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            <Beaker className="w-4 h-4" />
            <span>2. MATRIKS PELARUT &amp; FIKSATIF</span>
          </button>
          <button
            onClick={() => setActiveTab("dilution")}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 ${
              activeTab === "dilution"
                ? "bg-zinc-950 text-white shadow-xs"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>3. TEKNIK DILUTION (TIMBANGAN 0.001G)</span>
          </button>
        </div>

        {/* Tab 1: Maceration Timeline */}
        {activeTab === "maceration" && (
          <div className="space-y-6">
            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {MACERATION_TIMELINE.map((stage) => {
                const isSelected = selectedMacerationStage.week === stage.week;
                return (
                  <button
                    key={stage.week}
                    onClick={() => setSelectedMacerationStage(stage)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      isSelected
                        ? "bg-zinc-950 text-white border-zinc-950 shadow-sm"
                        : "bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-mono uppercase font-bold ${isSelected ? "text-zinc-400" : "text-zinc-500"}`}>
                        {stage.week === 0 ? "Hari ke-0" : `Minggu ke-${stage.week}`}
                      </span>
                      <span className={`text-[10px] font-mono ${isSelected ? "text-amber-400 font-bold" : "text-zinc-400"}`}>
                        {stage.clarityPercent}% Matang
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate">
                      {stage.stageName.split(": ")[1]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Stage Dossier */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-6">
              <div className="pb-4 border-b border-zinc-100">
                <span className="text-xs font-mono text-zinc-500 uppercase block mb-1">
                  Fase Pematangan Aktif:
                </span>
                <h3 className="text-2xl font-extrabold text-zinc-950 uppercase">
                  {selectedMacerationStage.stageName}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-xs font-mono uppercase font-bold text-zinc-900 block mb-2">
                    Proses Kimiawi:
                  </span>
                  <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                    {selectedMacerationStage.chemicalProcess}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-xs font-mono uppercase font-bold text-zinc-900 block mb-2">
                    Sensasi Olfaktori:
                  </span>
                  <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                    {selectedMacerationStage.olfactorySensation}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-xs font-mono uppercase font-bold text-zinc-900 block mb-2">
                    Protokol Peracik:
                  </span>
                  <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                    {selectedMacerationStage.perfumerAction}
                  </p>
                </div>
              </div>

              {/* Action Instruction */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-bold text-zinc-900 uppercase block mb-0.5">
                    Protokol Laboratorium:
                  </span>
                  <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                    {selectedMacerationStage.perfumerAction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Solvents & Fixatives Matrix */}
        {activeTab === "solvents" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SOLVENTS_DATA.map((solvent, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <h4 className="text-sm font-bold text-zinc-950 font-mono">{solvent.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-700 font-bold">
                    {solvent.purity}
                  </span>
                </div>
                <div className="text-xs text-zinc-600 leading-relaxed text-justify">
                  <strong className="text-zinc-900 block font-mono text-[11px] mb-1">Peran dalam Formulasi:</strong>
                  {solvent.role}
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 space-y-1">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-0.5">Rekomendasi Konsentrasi:</span>
                  <p className="font-semibold text-zinc-850">{solvent.recommendedConcentration}</p>
                  <p className="text-[11px] text-zinc-500 text-justify">{solvent.safetyNote}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Dilution Technique & 0.001g Precision */}
        {activeTab === "dilution" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-zinc-500 font-bold block mb-1">
                Standar Presisi Peracik Independen
              </span>
              <h3 className="text-2xl font-extrabold text-zinc-950 uppercase">
                Mengapa Peracik Parfum Menggunakan Timbangan 0.001g &amp; Teknik Dilution?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-xs font-mono font-bold text-zinc-900 uppercase block mb-2">
                  1. Masalah Ambang Deteksi Rendah
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Bahan seperti <em>Aldehyde C-12 MNA</em>, <em>Civet</em>, atau <em>Geosmin</em> memiliki kekuatan aroma yang luar biasa masif. Dalam batch 10 gram parfum, kebutuhan bahan tersebut mungkin hanya 0.002 gram (2 miligram). Menimbang 2 miligram bahan murni langsung sangat berisiko menghasilkan dosis berlebih.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-xs font-mono font-bold text-zinc-900 uppercase block mb-2">
                  2. Solusi: Predilution (Pengenceran Awal)
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Bahan murni dilarutkan terlebih dahulu dalam pelarut DPG atau Etanol 96% pada konsentrasi 10% (1:9) atau 1% (1:99). Dengan cara ini, 0.002g bahan aktif setara dengan 0.200g larutan, yang dapat ditimbang dengan toleransi presisi tinggi tanpa merusak formula.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-xs font-mono font-bold text-zinc-900 uppercase block mb-2">
                  3. Mengapa Menimbang (Gram), Bukan Tetes (Drops)?
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Viskositas dan massa jenis (density) setiap minyak wangi sangat berbeda. Satu tetes Bergamot ringan memiliki bobot yang jauh berbeda dengan satu tetes Labdanum yang pekat seperti tar. Formula profesional selalu dicatat dalam <strong>satuan gram dengan 3 desimal (0.001g)</strong>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
