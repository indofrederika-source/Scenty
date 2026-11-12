"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MATERIALS, MaterialAsset, TIER_META } from "@/data/materials";
import { Search, Eye, Atom, Droplets } from "lucide-react";

export function MaterialTextureVault() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeMaterial, setActiveMaterial] = useState<MaterialAsset | null>(MATERIALS[0]);

  const filtered = MATERIALS.filter((m) => {
    const matchesType = selectedType === "all" || m.type === selectedType;
    const matchesTier = selectedTier === "all" || m.tier === selectedTier;
    const matchesQuery =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.botanical && m.botanical.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.cas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.odor.some((o) => o.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesTier && matchesQuery;
  });

  return (
    <div className="card-clean p-6 sm:p-8 bg-white border border-zinc-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-zinc-200">
        <div>
          <span className="text-xs font-mono uppercase text-zinc-500 font-bold block mb-1">
            Katalog Aset &amp; Tekstur Bahan Baku Nyata
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 uppercase">
            Perpustakaan Bahan Alami &amp; Molekul Sintetis
          </h3>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari bahan, CAS, aroma..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "Semua Kategori" },
            { id: "natural", label: "Natural Botanicals" },
            { id: "aroma-chemical", label: "Aroma Chemicals" },
            { id: "solvent", label: "Solvents" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedType === tab.id
                  ? "bg-zinc-950 text-white font-bold"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "All Tiers" },
            { id: "top", label: "Top Notes" },
            { id: "heart", label: "Heart Notes" },
            { id: "base", label: "Base Notes" },
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                selectedTier === tier.id
                  ? "bg-zinc-800 text-white font-bold"
                  : "bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>

      {/* Material Grid & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Grid List (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[560px] overflow-y-auto pr-1">
          {filtered.map((mat) => {
            const isSelected = activeMaterial?.slug === mat.slug;
            return (
              <div
                key={mat.slug}
                onClick={() => setActiveMaterial(mat)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-zinc-900 text-white border-zinc-950 shadow-sm -translate-y-0.5"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 hover:border-zinc-300 hover:bg-white"
                }`}
              >
                <div>
                  <div className="w-full aspect-square rounded-lg bg-zinc-200/60 overflow-hidden relative mb-2 border border-zinc-200/50">
                    {mat.image ? (
                      <Image
                        src={mat.image}
                        alt={mat.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-[9px] text-zinc-400 p-2 text-center">
                        {mat.type === "aroma-chemical" ? "Molekul Sintetik" : "Ekstrak Alami"}
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-bold truncate mb-0.5">{mat.name}</div>
                  <div className={`text-[10px] font-mono truncate ${isSelected ? "text-zinc-400" : "text-zinc-500"}`}>
                    CAS: {mat.cas}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-zinc-200/30 flex items-center justify-between text-[9px] font-mono">
                  <span
                    className="px-1.5 py-0.2 rounded font-semibold uppercase"
                    style={{
                      backgroundColor: isSelected ? "#3f3f46" : TIER_META[mat.tier].soft,
                      color: isSelected ? "#f4f4f5" : TIER_META[mat.tier].color,
                    }}
                  >
                    {mat.tier}
                  </span>
                  <span className={isSelected ? "text-zinc-300" : "text-zinc-500"}>Detail →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Dossier Panel (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
          {activeMaterial ? (
            <div className="space-y-4">
              <div className="w-full aspect-[4/3] rounded-xl bg-zinc-200/70 overflow-hidden relative border border-zinc-200">
                {activeMaterial.image ? (
                  <Image
                    src={activeMaterial.image}
                    alt={activeMaterial.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-zinc-400 font-mono text-xs">
                    <Droplets className="w-8 h-8 mb-2 text-zinc-300" />
                    <span>Dokumentasi Studio Foto: Menunggu Jadwal Batch Berikutnya</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-white/90 border border-zinc-200 text-zinc-800 text-[10px] font-mono font-bold uppercase shadow-xs">
                  {activeMaterial.tier} Note
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">
                  {activeMaterial.type === "natural"
                    ? `Botanical Species: ${activeMaterial.botanical || "Natural"}`
                    : "Pure Synthetic Molecule"}
                </span>
                <h4 className="text-xl font-extrabold text-zinc-950 uppercase">
                  {activeMaterial.name}
                </h4>
              </div>

              {/* Chemical Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                  <span className="text-[10px] text-zinc-400 block">CAS Number</span>
                  <span className="font-bold text-zinc-800">{activeMaterial.cas}</span>
                </div>
                {activeMaterial.mw ? (
                  <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                    <span className="text-[10px] text-zinc-400 block">Molecular Weight</span>
                    <span className="font-bold text-zinc-800">{activeMaterial.mw} g/mol</span>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                    <span className="text-[10px] text-zinc-400 block">Metode Ekstraksi</span>
                    <span className="font-bold text-zinc-800 truncate block">
                      {activeMaterial.extraction || "Distillation"}
                    </span>
                  </div>
                )}
              </div>

              {/* Physical Appearance */}
              <div className="p-3 rounded-lg bg-white border border-zinc-200">
                <span className="text-[10px] font-mono uppercase font-bold text-zinc-500 block mb-1">
                  Bentuk Fisik &amp; Warna Asli:
                </span>
                <div className="text-xs text-zinc-800">{activeMaterial.appearance}</div>
              </div>

              {/* Odor Descriptors */}
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-zinc-500 block mb-1.5">
                  Profil Olfaktori (Odor Descriptors):
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeMaterial.odor.map((od, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 text-[11px] font-mono font-medium"
                    >
                      {od}
                    </span>
                  ))}
                </div>
              </div>

              {/* Constituents */}
              {activeMaterial.keyConstituents && (
                <div className="p-3 rounded-lg bg-white border border-zinc-200">
                  <span className="text-[10px] font-mono uppercase font-bold text-zinc-500 block mb-1">
                    Senyawa Kimia Utama:
                  </span>
                  <div className="text-xs text-zinc-700 font-mono">
                    {activeMaterial.keyConstituents.join(", ")}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-zinc-400 text-xs font-mono">
              Pilih salah satu bahan baku di sebelah kiri untuk melihat rincian spesifikasi teknis
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
