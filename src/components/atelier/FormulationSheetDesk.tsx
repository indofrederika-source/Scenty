"use client";

import React from "react";
import { FormulationSheetData } from "@/data/formulation-types";
import { Edit3 } from "lucide-react";

interface FormulationSheetDeskProps {
  sheet: FormulationSheetData;
  onOpenWorkspace: () => void;
  onOpenArchive: () => void;
  archiveCount: number;
}

export function FormulationSheetDesk({
  sheet,
  onOpenWorkspace,
}: FormulationSheetDeskProps) {
  const targetMl = sheet.targetVolumeMl || 30;

  // Always display exactly 6 rows on the physical desk sheet
  const displayRows = Array.from({ length: 6 }, (_, idx) => {
    return sheet.rows[idx] || {
      id: `display-empty-${idx}`,
      material: "",
      concPercent: "",
      grams: "",
      mods: {},
      totalGrams: 0,
      percentOfTarget: 0,
    };
  });

  return (
    <div className="relative z-20 hover:z-30 group cursor-pointer select-none transition-all" onClick={onOpenWorkspace}>
      {/* Authentic Physical Formulation Sheet (Parchment Paper with tactile hover lift) */}
      <div
        className="w-full bg-[#fbf9f4] text-zinc-900 rounded-lg p-3 sm:p-4 border border-zinc-300/90 relative min-h-[240px] flex flex-col justify-between transition-all duration-300 ease-out transform group-hover:-translate-y-1.5 group-hover:scale-[1.015] group-hover:border-amber-400/80 group-hover:shadow-[0_18px_36px_-8px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.95),0_0_15px_rgba(251,191,36,0.15)]"
        style={{
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.95), 0 1px 3px rgba(0,0,0,0.12)",
        }}
      >
        {/* Paper Corner Fold or Subtle Parchment Texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-amber-900/5 rounded-lg pointer-events-none" />

        {/* Vintage Brass Clipboard Clamp at Top Center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
          <div className="w-12 h-3.5 rounded-t-sm bg-gradient-to-r from-amber-700 via-amber-400 to-amber-800 border-t border-x border-amber-300/60 shadow-md flex items-center justify-center">
            <div className="w-4 h-1 rounded-full bg-amber-950/70" />
          </div>
        </div>

        {/* SHEET HEADER (Serif Uppercase, Matching Photo) */}
        <div>
          <div className="text-center pb-2 mb-2 border-b border-zinc-900">
            <h3 className="font-serif tracking-widest text-xs sm:text-sm font-bold uppercase text-zinc-900">
              FORMULATION SHEET
            </h3>
            <div className="flex items-center justify-between mt-1 text-[8px] font-mono text-zinc-600">
              <div>
                <span className="font-bold text-zinc-800">Name: </span>
                <span className="font-serif italic text-zinc-950 font-bold border-b border-zinc-400 pb-0.5 px-1">
                  {sheet.name || "Untitled Formula"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 font-mono font-bold text-zinc-800">
                  Target: {targetMl} ml
                </span>
              </div>
            </div>
          </div>

          {/* TABLE REPRODUCTION (Matching Photo Structure with 6 rows) */}
          <div className="w-full text-[7.5px] sm:text-[8px] font-mono border border-zinc-800">
            {/* Header Row */}
            <div className="grid grid-cols-12 bg-zinc-100 border-b border-zinc-800 font-bold text-center divide-x divide-zinc-800 text-zinc-900">
              <div className="col-span-5 text-left pl-1.5 py-0.5">MATERIAL</div>
              <div className="col-span-2 py-0.5">Conc %</div>
              <div className="col-span-3 py-0.5">Timbang (g)</div>
              <div className="col-span-2 py-0.5">% Terisi</div>
            </div>

            {/* 6 Table Rows (Default Blank Lines) */}
            <div className="divide-y divide-zinc-300 bg-white">
              {displayRows.map((row, idx) => {
                const hasMaterial = Boolean(row.material && row.material.trim().length > 0);
                const hasGrams = typeof row.grams === "number" && row.grams > 0;

                return (
                  <div
                    key={row.id || idx}
                    className="grid grid-cols-12 text-center divide-x divide-zinc-300 py-0.5 text-zinc-800 hover:bg-amber-50/50 transition-colors"
                  >
                    <div className="col-span-5 text-left pl-1.5 font-medium truncate">
                      {hasMaterial ? (
                        row.material
                      ) : (
                        <span className="text-zinc-300 select-none">&mdash;&mdash;&mdash;&mdash;</span>
                      )}
                    </div>
                    <div className="col-span-2 text-zinc-500">
                      {typeof row.concPercent === "number" && row.concPercent > 0
                        ? `${row.concPercent}%`
                        : <span className="text-zinc-300">&mdash;</span>}
                    </div>
                    <div className="col-span-3 font-semibold text-zinc-900">
                      {hasGrams ? (
                        `${row.totalGrams.toFixed(3)} g`
                      ) : (
                        <span className="text-zinc-300">0.000 g</span>
                      )}
                    </div>
                    <div className="col-span-2 font-bold text-zinc-900">
                      {row.percentOfTarget > 0 ? (
                        `${row.percentOfTarget.toFixed(2)}%`
                      ) : (
                        <span className="text-zinc-300">0.00%</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totals Footer Row (Dynamic Running Sum!) */}
            <div className="grid grid-cols-12 bg-zinc-100 border-t border-zinc-800 font-bold text-center divide-x divide-zinc-800 py-1 text-zinc-900">
              <div className="col-span-5 text-left pl-1.5 uppercase font-mono">
                TOTAL TERISI ({targetMl} ML):
              </div>
              <div className="col-span-2 text-zinc-500">
                {sheet.rows.filter((r) => r.material.trim().length > 0).length} Bahan
              </div>
              <div className="col-span-3 font-extrabold text-zinc-950">
                {sheet.totalWeighedGrams.toFixed(3)} g
              </div>
              <div className="col-span-2 font-extrabold text-emerald-800">
                {sheet.totalPercent.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* LUXURY LABORATORY FOUNTAIN PEN (PULPEN MEWAH ATELIER) */}
        {/* Resting realistically on the bottom right of the paper */}
        <div
          className="absolute bottom-2 right-2 pointer-events-none z-30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-105"
          style={{ transform: "rotate(-14deg)" }}
        >
          {/* Subtle Pen Contact Shadow on Paper */}
          <div className="absolute top-2 left-2 w-32 h-1.5 rounded-full bg-black/20 blur-[1px]" />

          {/* Luxury Pen Body */}
          <div className="relative flex items-center h-4">
            {/* Nib (Gold & Iridium Pen Point) */}
            <div className="w-5 h-2.5 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 clip-triangle shadow-xs relative">
              <div className="absolute top-1/2 left-0 w-3 h-[0.5px] bg-zinc-900/60" />
            </div>

            {/* Front Metallic Section / Grip */}
            <div className="w-4 h-3 bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 border-y border-zinc-400 rounded-l-[1px]" />

            {/* Gold Ring Band */}
            <div className="w-1.5 h-3.5 bg-gradient-to-b from-amber-300 via-amber-200 to-amber-500 border border-amber-600/50" />

            {/* Main Pen Barrel (Deep Lacquered Obsidian / Dark British Racing Green) */}
            <div className="w-24 h-3.5 bg-gradient-to-b from-[#1b2b23] via-[#0d1611] to-[#1b2b23] border border-zinc-900 rounded-r-sm shadow-md relative">
              {/* Silver Pen Clip */}
              <div className="absolute top-0.5 right-2 w-14 h-[2px] bg-gradient-to-r from-zinc-400 via-white to-zinc-300 shadow-xs rounded-full">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-zinc-300 border border-zinc-500" />
              </div>
              {/* Highlight Glare on Barrel */}
              <div className="absolute top-0.5 left-2 right-2 h-[1px] bg-white/30 rounded-full" />
            </div>

            {/* Pen Cap End Finial */}
            <div className="w-2 h-2.5 bg-gradient-to-b from-amber-300 to-amber-600 rounded-r-xs border-r border-amber-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
