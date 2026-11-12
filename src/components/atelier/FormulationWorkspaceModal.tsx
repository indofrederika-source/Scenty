"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FormulationSheetData, FormulationRow } from "@/data/formulation-types";
import { AnimatedPaletteDrawer } from "@/components/atelier/AnimatedPaletteDrawer";
import {
  X,
  Plus,
  Trash2,
  Folder,
  Save,
  CheckCircle2,
  FilePlus,
  Scale,
  SlidersHorizontal,
  MinusCircle,
} from "lucide-react";

interface FormulationWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  sheet: FormulationSheetData;
  onSetTargetVolume: (volumeMl: number) => void;
  onUpdateName: (name: string) => void;
  onUpdateRow: (rowId: string, updates: Partial<FormulationRow>) => void;
  onAddRow: (materialName?: string, defaultConc?: number | "") => void;
  onDeleteRow: (rowId: string) => void;
  onAddModColumn: () => void;
  onRemoveModColumn: (modName: string) => void;
  onSaveToArchive: () => void;
  onOpenArchive: () => void;
  onNewSheet: () => void;
}

export function FormulationWorkspaceModal({
  isOpen,
  onClose,
  sheet,
  onSetTargetVolume,
  onUpdateName,
  onUpdateRow,
  onAddRow,
  onDeleteRow,
  onAddModColumn,
  onRemoveModColumn,
  onSaveToArchive,
  onOpenArchive,
  onNewSheet,
}: FormulationWorkspaceModalProps) {
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);
  const targetMl = sheet.targetVolumeMl || 30;
  const modColumns = sheet.modColumns || ["Mod 1", "Mod 2"];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted || typeof document === "undefined") return null;

  const handleSave = () => {
    onSaveToArchive();
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  const volumeOptions = [10, 30, 50, 100];

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Dark Studio Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.92, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 260 }}
          className="relative z-10 w-full max-w-5xl max-h-[94vh] flex flex-col rounded-2xl bg-[#1c1d21] text-zinc-100 shadow-2xl border border-amber-900/40 overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="px-5 py-3.5 bg-[#20120a] border-b border-amber-900/40 flex items-center justify-between gap-3 select-none">
            {/* Title & Brand */}
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs uppercase font-extrabold text-amber-300 tracking-wider">
                MEJA RACIK FORMULA &bull; SCENTY
              </span>
            </div>

            {/* Target Volume Selector Quick Pills */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-zinc-400 hidden sm:inline">
                Target Botol:
              </span>
              <div className="flex items-center p-0.5 rounded-lg bg-black/60 border border-white/10">
                {volumeOptions.map((vol) => (
                  <button
                    key={vol}
                    type="button"
                    onClick={() => onSetTargetVolume(vol)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      targetMl === vol
                        ? "bg-amber-500 text-zinc-950 shadow-xs"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {vol} ml
                  </button>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Tutup</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Paper Drafting Board Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#161719] flex flex-col items-center">
            {/* Save Notice Toast */}
            <AnimatePresence>
              {saveSuccessNotice && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="mb-4 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-mono text-xs font-bold shadow-lg flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-zinc-950" />
                  <span>Lembar formula berhasil diarsipkan ke Archive!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* THE FORMULATION SHEET (Authentic Printed Paper Look - Exact Photo Replica) */}
            <div
              className="w-full max-w-4xl bg-[#fbf9f4] text-zinc-900 rounded-xl p-6 sm:p-10 shadow-2xl border border-zinc-300 relative select-text"
              style={{
                boxShadow: "0 25px 60px -15px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.9)",
              }}
            >
              {/* SHEET TITLE (Classical Serif, Matching Photo) */}
              <div className="text-center border-b border-zinc-900 pb-4 mb-4">
                <h2 className="font-serif tracking-widest text-xl sm:text-2xl font-bold uppercase text-zinc-900">
                  FORMULATION SHEET
                </h2>

                {/* Name & Metadata Fields */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  {/* Name Input Field */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-800">Name:</span>
                    <input
                      type="text"
                      value={sheet.name}
                      onChange={(e) => onUpdateName(e.target.value)}
                      placeholder="e.g. Summer Dreams"
                      className="font-serif italic text-base sm:text-lg font-bold text-zinc-950 bg-amber-50/50 border-b-2 border-zinc-800 px-2 py-0.5 focus:bg-amber-100/70 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Bottle Target Volume Selection inside Sheet Header */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-zinc-800">Volume Target:</span>
                    <div className="flex items-center gap-1">
                      {volumeOptions.map((vol) => (
                        <button
                          key={vol}
                          type="button"
                          onClick={() => onSetTargetVolume(vol)}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer border ${
                            targetMl === vol
                              ? "bg-zinc-900 text-white border-zinc-900 shadow-xs"
                              : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100"
                          }`}
                        >
                          {vol} ml
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-[10px] text-zinc-500 font-mono">
                    Diperbarui: {sheet.updatedAt}
                  </div>
                </div>
              </div>

              {/* MAIN FORMULATION TABLE */}
              <div className="w-full border-2 border-zinc-900 font-mono text-[10px] sm:text-xs overflow-x-auto">
                <table className="w-full border-collapse">
                  {/* Table Header Row 1 */}
                  <thead>
                    <tr className="bg-zinc-100 border-b border-zinc-900 font-bold text-center text-zinc-900">
                      <th className="py-2 px-3 text-left uppercase border-r border-zinc-900 min-w-[200px]">
                        MATERIAL
                      </th>
                      <th className="py-2 px-2 border-r border-zinc-900 w-20">Conc %</th>
                      <th className="py-2 px-2 border-r border-zinc-900 w-28">Timbang (g)</th>
                      {modColumns.map((modName) => (
                        <th
                          key={modName}
                          className="py-2 px-2 border-r border-zinc-900 w-24 text-zinc-800"
                        >
                          {modName}
                        </th>
                      ))}
                      <th className="py-2 px-2 border-r border-zinc-900 w-28 bg-zinc-200/70">
                        Total (g)
                      </th>
                      <th className="py-2 px-2 border-r border-zinc-900 w-24 bg-amber-100/60 text-zinc-950">
                        % Terisi
                      </th>
                      <th className="py-2 px-1 w-8"></th>
                    </tr>
                  </thead>

                  {/* Editable Table Rows */}
                  <tbody className="divide-y divide-zinc-300 bg-white">
                    {sheet.rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5 + modColumns.length + 1}
                          className="py-8 text-center text-zinc-400 font-mono text-xs italic"
                        >
                          Lembar formula kosong. Tambahkan baris baru atau pilih bahan dari Palet Laboratorium di bawah.
                        </td>
                      </tr>
                    ) : (
                      sheet.rows.map((row) => (
                        <tr
                          key={row.id}
                          className="hover:bg-amber-50/50 transition-colors group/row"
                        >
                          {/* Material Name Cell */}
                          <td className="p-1.5 border-r border-zinc-300">
                            <input
                              type="text"
                              value={row.material}
                              onChange={(e) => onUpdateRow(row.id, { material: e.target.value })}
                              placeholder="Nama bahan baku..."
                              className="w-full bg-transparent font-medium text-zinc-900 focus:outline-none focus:bg-amber-50 px-1 py-0.5 rounded text-xs"
                            />
                          </td>

                          {/* Conc % Cell (Blank by default, optional dilution) */}
                          <td className="p-1 border-r border-zinc-300 text-center">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={row.concPercent === "" ? "" : row.concPercent}
                              onChange={(e) =>
                                onUpdateRow(row.id, {
                                  concPercent: e.target.value === "" ? "" : Number(e.target.value),
                                })
                              }
                              placeholder="-"
                              className="w-full text-center bg-transparent focus:outline-none focus:bg-amber-50 rounded text-xs text-zinc-600"
                            />
                          </td>

                          {/* Base Weighed Grams Cell */}
                          <td className="p-1 border-r border-zinc-300 text-center">
                            <input
                              type="number"
                              step="0.001"
                              min="0"
                              value={row.grams === "" ? "" : row.grams}
                              onChange={(e) =>
                                onUpdateRow(row.id, {
                                  grams: e.target.value === "" ? "" : Number(e.target.value),
                                })
                              }
                              placeholder="0.000"
                              className="w-full text-center font-semibold bg-transparent focus:outline-none focus:bg-amber-50 rounded text-xs text-zinc-950"
                            />
                          </td>

                          {/* Dynamic Mod Columns */}
                          {modColumns.map((modName) => (
                            <td key={modName} className="p-1 border-r border-zinc-300 text-center">
                              <input
                                type="number"
                                step="0.001"
                                min="0"
                                value={row.mods?.[modName] ?? ""}
                                onChange={(e) => {
                                  const val = e.target.value === "" ? "" : Number(e.target.value);
                                  onUpdateRow(row.id, {
                                    mods: {
                                      ...row.mods,
                                      [modName]: val,
                                    },
                                  });
                                }}
                                placeholder="-"
                                className="w-full text-center bg-transparent text-zinc-600 focus:outline-none focus:bg-amber-50 rounded text-xs"
                              />
                            </td>
                          ))}

                          {/* Total Weighed Grams for this Row */}
                          <td className="p-1.5 border-r border-zinc-300 text-center font-bold font-mono bg-zinc-50 text-zinc-950">
                            {row.totalGrams.toFixed(3)} g
                          </td>

                          {/* % Terisi relative to Target Volume (e.g. 5.00% / 12.00%) */}
                          <td className="p-1.5 border-r border-zinc-300 text-center font-extrabold font-mono bg-amber-50/60 text-zinc-950">
                            {row.percentOfTarget.toFixed(2)}%
                          </td>

                          {/* Delete Row Button */}
                          <td className="p-1 text-center">
                            <button
                              type="button"
                              onClick={() => onDeleteRow(row.id)}
                              title="Hapus baris"
                              className="opacity-0 group-hover/row:opacity-100 p-1 text-zinc-400 hover:text-red-600 transition-opacity cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>

                  {/* Table Totals Row (Dynamic Running Cumulative Sum!) */}
                  <tfoot>
                    <tr className="bg-zinc-100 border-t-2 border-zinc-900 font-extrabold text-zinc-950 text-center">
                      <td className="py-2.5 px-3 text-left uppercase border-r border-zinc-900">
                        TOTAL FORMULA TERISI ({targetMl} ML):
                      </td>
                      <td className="py-2 px-2 border-r border-zinc-900 text-zinc-500 font-normal text-[10px]">
                        {sheet.rows.length} Bahan
                      </td>
                      <td className="py-2 px-2 border-r border-zinc-900 font-mono text-zinc-700">
                        {sheet.rows
                          .reduce(
                            (acc, r) => acc + (typeof r.grams === "number" ? r.grams : 0),
                            0
                          )
                          .toFixed(3)}{" "}
                        g
                      </td>
                      {modColumns.map((modName) => {
                        const sumMod = sheet.rows.reduce((acc, r) => {
                          const val = r.mods?.[modName];
                          return acc + (typeof val === "number" ? val : 0);
                        }, 0);
                        return (
                          <td
                            key={modName}
                            className="py-2 px-2 border-r border-zinc-900 font-mono text-zinc-600 text-[10px]"
                          >
                            {sumMod > 0 ? `${sumMod.toFixed(3)} g` : "-"}
                          </td>
                        );
                      })}
                      <td className="py-2.5 px-2 border-r border-zinc-900 font-mono text-sm font-extrabold bg-zinc-200 text-zinc-950">
                        {sheet.totalWeighedGrams.toFixed(3)} g
                      </td>
                      <td className="py-2.5 px-2 border-r border-zinc-900 font-mono text-sm font-extrabold bg-amber-200/80 text-zinc-950">
                        {sheet.totalPercent.toFixed(2)}%
                      </td>
                      <td className="py-2 px-1"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Progress bar showing formula filled status towards 100% */}
              <div className="mt-3 w-full bg-zinc-200 h-2 rounded-full overflow-hidden border border-zinc-300">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-600 transition-all duration-300"
                  style={{ width: `${Math.min(100, sheet.totalPercent)}%` }}
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>
                  {sheet.totalWeighedGrams.toFixed(3)} g dari {targetMl}.000 g kapasitas botol
                </span>
                <span>
                  {sheet.totalPercent > 100
                    ? `Melebihi target volume (+${(sheet.totalPercent - 100).toFixed(2)}%)`
                    : `Sisa ruang: ${(100 - sheet.totalPercent).toFixed(2)}%`}
                </span>
              </div>

              {/* Row Management Controls */}
              <div className="mt-5 pt-4 border-t border-zinc-300 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Clean Single + Tambah Baris Kosong Button */}
                  <button
                    type="button"
                    onClick={() => onAddRow("")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Baris Kosong</span>
                  </button>

                  {/* Tambah Mod Column Button */}
                  <button
                    type="button"
                    onClick={onAddModColumn}
                    className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 border border-amber-400 text-amber-950 font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-800" />
                    <span>Tambah Mod ({`Mod ${modColumns.length + 1}`})</span>
                  </button>

                  {/* Remove Last Mod Column if more than 1 */}
                  {modColumns.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveModColumn(modColumns[modColumns.length - 1])}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-700 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Hapus kolom mod terakhir"
                    >
                      <MinusCircle className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Hapus {modColumns[modColumns.length - 1]}</span>
                    </button>
                  )}
                </div>

                <div className="text-[10px] text-zinc-500 italic">
                  *Kalkulasi persentase: (Gram Terisi / Target {targetMl} ml) &times; 100%
                </div>
              </div>

              {/* Animated Slide-Down Palette Drawer */}
              <div className="mt-4">
                <AnimatedPaletteDrawer
                  onSelectMaterial={(name, defaultConc) => {
                    onAddRow(name, defaultConc);
                  }}
                />
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="w-full max-w-4xl mt-6 flex flex-wrap items-center justify-between gap-3 select-none">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onNewSheet}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FilePlus className="w-4 h-4 text-amber-400" />
                  <span>Lembar Formula Baru</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenArchive}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Folder className="w-4 h-4 text-amber-400" />
                  <span>Archive</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-extrabold transition-all shadow-xl hover:scale-102 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan ke Archive</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
