"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FormulationSheetData } from "@/data/formulation-types";
import { Folder, FileText, ChevronRight, Clock, Plus, Trash2, CheckCircle2, X } from "lucide-react";

interface ArchiveFolderBadgeProps {
  historySheets: FormulationSheetData[];
  onLoadSheet: (sheet: FormulationSheetData) => void;
  onNewSheet: () => void;
  onDeleteSheet: (id: string) => void;
  isFilingAnimation: boolean;
}

export function ArchiveFolderBadge({
  historySheets,
  onLoadSheet,
  onNewSheet,
  onDeleteSheet,
  isFilingAnimation,
}: ArchiveFolderBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSheetId, setSelectedSheetId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeSelected =
    historySheets.find((s) => s.id === selectedSheetId) || historySheets[0];

  // Up to 3 teaser mini-sheets that pop out on hover
  const teaserSheets = [0, 1, 2];

  return (
    <>
      {/* TACTILE 3D FOLDER BADGE (Based on @aceternity/images-badge) */}
      <div
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative group cursor-pointer select-none perspective-[1200px] transition-all ${
          isHovered ? "z-[80]" : "z-10"
        }`}
      >
        {/* Paper Filing Animation Toast (When User Saves Sheet) */}
        <AnimatePresence>
          {isFilingAnimation && (
            <motion.div
              initial={{ y: 50, scale: 0.9, opacity: 0 }}
              animate={{ y: -8, scale: 1, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 z-40 px-3 py-1.5 rounded-lg bg-amber-400 text-zinc-950 font-mono text-[9px] font-extrabold shadow-2xl flex items-center gap-1.5 border border-amber-300 whitespace-nowrap"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-950" />
              <span>Tersimpan ke Archive!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outer Pill Container */}
        <div
          className="w-full px-4 py-3 rounded-xl border border-amber-900/60 shadow-xl flex items-center justify-between transition-all duration-300 group-hover:shadow-2xl group-hover:border-amber-600/60"
          style={{
            backgroundColor: "#20120a",
            backgroundImage: "linear-gradient(to right, #1f1008, #2e180d, #1f1008)",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.85), inset 0 1px 2px rgba(255,255,255,0.1)",
          }}
        >
          {/* Left: 3D Folder Graphic with popping paper sheets */}
          <div className="flex items-center gap-3.5">
            <div
              className="relative w-10 h-7 transform-3d"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Folder Back Wall with Tab */}
              <div className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-[#8c5627] to-[#5c3417] shadow-md border border-amber-700/40">
                {/* Folder Top Tab */}
                <div className="absolute -top-1.5 left-0.5 w-4 h-2 rounded-t-[2px] bg-[#8c5627] border-t border-l border-r border-amber-600/50" />
              </div>

              {/* Fanned-out Miniature Paper Formulation Sheets on Hover */}
              {teaserSheets.map((index) => {
                const total = teaserSheets.length;
                const baseRotation = (index - 1) * 14;
                const hoverX = (index - 1) * 14;
                const hoverY = -22 - (total - 1 - index) * 3;
                const teaseY = -4 - (total - 1 - index) * 1;
                const teaseRotation = (index - 1) * 3;

                return (
                  <motion.div
                    key={index}
                    className="absolute top-0.5 left-1/2 origin-bottom overflow-hidden rounded-[2px] bg-[#faf8f5] shadow-md border border-zinc-400"
                    animate={{
                      x: `calc(-50% + ${isHovered ? hoverX : 0}px)`,
                      y: isHovered ? hoverY : teaseY,
                      rotate: isHovered ? baseRotation : teaseRotation,
                      width: isHovered ? 26 : 18,
                      height: isHovered ? 28 : 18,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 24,
                      delay: index * 0.02,
                    }}
                    style={{
                      zIndex: isHovered ? 85 + index : 10 + index,
                    }}
                  >
                    {/* Miniature Printed Formulation Sheet Graphic */}
                    <div className="w-full h-full p-0.5 flex flex-col justify-between">
                      <div className="h-0.5 bg-zinc-800 rounded-full w-3/4 mx-auto" />
                      <div className="space-y-0.5">
                        <div className="h-0.2 bg-zinc-400 w-full" />
                        <div className="h-0.2 bg-zinc-300 w-full" />
                        <div className="h-0.2 bg-zinc-400 w-4/5" />
                      </div>
                      <div className="h-0.5 bg-amber-600 rounded-full w-1/2" />
                    </div>
                  </motion.div>
                );
              })}

              {/* Folder Front Flap (Flattens open on hover with 3D perspective!) */}
              <motion.div
                className="absolute inset-x-0 bottom-0 h-[85%] origin-bottom rounded-[4px] bg-gradient-to-b from-[#a06b3a] to-[#78471e] shadow-md border-t border-amber-400/40"
                animate={{
                  rotateX: isHovered ? -50 : -20,
                  scaleY: isHovered ? 0.75 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 24,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: 25,
                }}
              >
                {/* Brass Rivet / Clasp Detail */}
                <div className="w-1.5 h-1.5 rounded-full bg-amber-300 border border-amber-600 shadow-xs mx-auto mt-1" />
              </motion.div>
            </div>

            {/* Label: Strictly "Archive" */}
            <div>
              <span className="font-mono text-xs font-extrabold text-white tracking-widest uppercase block leading-none">
                Archive
              </span>
              <span className="font-mono text-[8px] text-amber-300/80 block mt-1">
                {historySheets.length} Formula Tersimpan
              </span>
            </div>
          </div>

          {/* Right Badge Count Pill */}
          <div className="px-2.5 py-1 rounded-full bg-black/50 text-amber-300 border border-amber-600/30 font-mono text-[9px] font-bold">
            {historySheets.length} Files
          </div>
        </div>
      </div>

      {/* FULLSCREEN ARSIP HISTORY MODAL / VAULT */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
              />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative z-10 w-full max-w-4xl max-h-[88vh] bg-[#1a1c1e] text-zinc-100 rounded-2xl shadow-2xl border border-amber-900/40 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="px-5 py-3.5 bg-[#25170d] border-b border-amber-900/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-zinc-950 flex items-center justify-center font-bold">
                    <Folder className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-sm uppercase text-white tracking-wider">
                      Archive Vault &bull; Riwayat Formula
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onNewSheet();
                      setIsModalOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Formula Baru</span>
                  </button>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Two Column Layout: List (Left) & Sheet Preview (Right) */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-800 overflow-y-auto">
                {/* Left List */}
                <div className="md:col-span-5 p-4 space-y-2 overflow-y-auto max-h-[480px]">
                  <span className="font-mono text-[9px] uppercase font-bold text-zinc-400 block pb-1 border-b border-zinc-800">
                    DOKUMEN DI DALAM ARCHIVE ({historySheets.length})
                  </span>

                  {historySheets.map((item) => {
                    const isSelected = (activeSelected?.id || "") === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedSheetId(item.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-amber-500/15 border-amber-500/60 shadow-md"
                            : "bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-sm text-white">
                              {item.name || "Untitled Formula"}
                            </span>
                            <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                              {item.targetVolumeMl} ml
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-zinc-500" />
                              {item.updatedAt || item.createdAt}
                            </span>
                            <span>&bull; {item.rows.length} Bahan</span>
                          </div>
                        </div>

                        <ChevronRight className={`w-4 h-4 ${isSelected ? "text-amber-400" : "text-zinc-600"}`} />
                      </div>
                    );
                  })}
                </div>

                {/* Right: Selected Sheet Detail */}
                <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4 overflow-y-auto max-h-[480px]">
                  {activeSelected ? (
                    <div className="space-y-4">
                      {/* Paper Preview */}
                      <div className="p-4 rounded-xl bg-[#fbf9f4] text-zinc-900 border border-zinc-300 shadow-lg space-y-3 font-mono">
                        <div className="text-center border-b border-zinc-800 pb-2">
                          <h4 className="font-serif font-bold text-base uppercase tracking-widest text-zinc-950">
                            FORMULATION SHEET
                          </h4>
                          <div className="flex items-center justify-between text-[9px] text-zinc-700 mt-1">
                            <span>Name: <strong className="font-serif italic text-zinc-950 text-xs">{activeSelected.name}</strong></span>
                            <span>Target: <strong className="text-zinc-950 font-bold">{activeSelected.targetVolumeMl} ml</strong></span>
                          </div>
                        </div>

                        {/* Ingredients Table */}
                        <div className="w-full text-[8.5px] border border-zinc-800 divide-y divide-zinc-300">
                          <div className="grid grid-cols-12 bg-zinc-200/80 font-bold p-1 divide-x divide-zinc-800 text-center">
                            <div className="col-span-5 text-left pl-1">MATERIAL</div>
                            <div className="col-span-2">CONC %</div>
                            <div className="col-span-3">TOTAL (G)</div>
                            <div className="col-span-2">% TERISI</div>
                          </div>

                          {activeSelected.rows.map((row) => (
                            <div key={row.id} className="grid grid-cols-12 p-1 divide-x divide-zinc-300 text-center text-zinc-800">
                              <div className="col-span-5 text-left pl-1 font-semibold truncate">{row.material}</div>
                              <div className="col-span-2 text-zinc-500">
                                {typeof row.concPercent === "number" && row.concPercent > 0 ? `${row.concPercent}%` : "—"}
                              </div>
                              <div className="col-span-3 font-bold">{row.totalGrams.toFixed(3)} g</div>
                              <div className="col-span-2 font-bold text-zinc-950">{row.percentOfTarget.toFixed(2)}%</div>
                            </div>
                          ))}

                          <div className="grid grid-cols-12 bg-zinc-100 font-bold p-1 divide-x divide-zinc-800 text-center text-zinc-950">
                            <div className="col-span-7 text-left pl-1">TOTAL FORMULA</div>
                            <div className="col-span-3">{activeSelected.totalWeighedGrams.toFixed(3)} g</div>
                            <div className="col-span-2 text-emerald-800 font-extrabold">{activeSelected.totalPercent.toFixed(2)}%</div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                        {historySheets.length > 1 ? (
                          <button
                            onClick={() => onDeleteSheet(activeSelected.id)}
                            className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus Dokumen</span>
                          </button>
                        ) : <div />}

                        <button
                          onClick={() => {
                            onLoadSheet(activeSelected);
                            setIsModalOpen(false);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold transition-all shadow-lg hover:scale-102 flex items-center gap-2 cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Buka di Meja Kerja &amp; Racik</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-zinc-500 font-mono text-xs">
                      Pilih salah satu formula dari daftar sebelah kiri
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}
