"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator as CalcIcon,
  X,
  Coins,
  TrendingUp,
  Percent,
  Copy,
  Check,
  Plus,
  RefreshCw,
  FileSpreadsheet,
  Layers,
} from "lucide-react";
import { FormulationSheetData } from "@/data/formulation-types";
import { useMaterialPrices, MaterialPriceItem } from "@/hooks/useMaterialPrices";

interface DesktopCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSheet: FormulationSheetData;
  onAddNoteToWall?: (title: string, content: string) => void;
}

export function DesktopCalculatorModal({
  isOpen,
  onClose,
  activeSheet,
  onAddNoteToWall,
}: DesktopCalculatorModalProps) {
  const [activeTab, setActiveTab] = useState<"standard" | "costing">("costing");
  const { prices, getPriceForMaterial, setPriceForMaterial } = useMaterialPrices();

  // STANDARD CALCULATOR STATE
  const [displayValue, setDisplayValue] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calcHistory, setCalcHistory] = useState<string[]>([]);

  // COSTING STATE
  const [bottlePackagingCost, setBottlePackagingCost] = useState(15000); // Rp 15.000 per packaging
  const [profitMarginPercent, setProfitMarginPercent] = useState(65); // 65% target margin
  const [isCopied, setIsCopied] = useState(false);
  const [isNotePasted, setIsNotePasted] = useState(false);

  // Standard Calc Handlers
  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue("0.");
      setWaitingForOperand(false);
    } else if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const handleClear = () => {
    setDisplayValue("0");
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleDelete = () => {
    if (waitingForOperand) return;
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue("0");
    }
  };

  const handleToggleSign = () => {
    const val = parseFloat(displayValue);
    if (!isNaN(val)) {
      setDisplayValue(String(-val));
    }
  };

  const handlePercentage = () => {
    const val = parseFloat(displayValue);
    if (!isNaN(val)) {
      setDisplayValue(String(val / 100));
    }
  };

  const performOperation = (nextOp: string) => {
    const inputValue = parseFloat(displayValue);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const current = prevValue;
      let result = 0;

      switch (operation) {
        case "+":
          result = current + inputValue;
          break;
        case "-":
          result = current - inputValue;
          break;
        case "×":
        case "*":
          result = current * inputValue;
          break;
        case "÷":
        case "/":
          result = inputValue !== 0 ? current / inputValue : 0;
          break;
        default:
          result = inputValue;
      }

      const formatted = Number(result.toFixed(4));
      setPrevValue(formatted);
      setDisplayValue(String(formatted));
      setCalcHistory((prev) => [
        `${current} ${operation} ${inputValue} = ${formatted}`,
        ...prev.slice(0, 4),
      ]);
    }

    setWaitingForOperand(true);
    setOperation(nextOp === "=" ? null : nextOp);
  };

  // Quick preset ratios
  const applyQuickMultiplier = (multiplier: number, label: string) => {
    const val = parseFloat(displayValue);
    if (!isNaN(val)) {
      const result = Number((val * multiplier).toFixed(4));
      setCalcHistory((prev) => [`${val} × ${multiplier} (${label}) = ${result}`, ...prev.slice(0, 4)]);
      setDisplayValue(String(result));
      setWaitingForOperand(true);
    }
  };

  // Keyboard support for standard calc
  useEffect(() => {
    if (!isOpen || activeTab !== "standard") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleDigit(e.key);
      } else if (e.key === ".") {
        handleDecimal();
      } else if (e.key === "+" || e.key === "-") {
        performOperation(e.key);
      } else if (e.key === "*") {
        performOperation("×");
      } else if (e.key === "/") {
        performOperation("÷");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        performOperation("=");
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (e.key === "Escape") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeTab, displayValue, prevValue, operation, waitingForOperand]);

  // COSTING CALCULATIONS
  const targetVolume = activeSheet.targetVolumeMl || 30;
  const activeRows = activeSheet.rows.filter(
    (r) => r.material.trim().length > 0 && (r.totalGrams || 0) > 0
  );

  // 1. Concentrate cost (Total biaya bibit / konsentrat)
  let totalConcentrateCost = 0;
  const rowCostDetails = activeRows.map((r) => {
    const grams = r.totalGrams || 0;
    const pricePerG = getPriceForMaterial(r.material);
    const subtotal = grams * pricePerG;
    totalConcentrateCost += subtotal;
    return {
      material: r.material,
      grams,
      pricePerG,
      subtotal,
    };
  });

  // 2. Solvent Cost (Alkohol 96% / DPG)
  const totalGramsUsed = activeSheet.totalWeighedGrams || 0;
  const solventGramsNeeded = Math.max(0, targetVolume - totalGramsUsed);
  const ethanolPricePerG = getPriceForMaterial("Etanol 96%") || 80;
  const solventCost = solventGramsNeeded * ethanolPricePerG;

  // 3. Packaging & Bottling
  const packagingCost = bottlePackagingCost;

  // 4. Total COGS / HPP
  const totalHPP = Math.round(totalConcentrateCost + solventCost + packagingCost);
  const costPerMl = targetVolume > 0 ? Math.round(totalHPP / targetVolume) : 0;

  // 5. Selling Price & Margin Recommendation
  // MSRP = HPP / (1 - margin)
  const marginDecimal = profitMarginPercent / 100;
  const suggestedRetailPrice =
    marginDecimal < 1
      ? Math.round(totalHPP / (1 - marginDecimal) / 1000) * 1000 // rounded to nearest Rp 1.000
      : totalHPP * 2;
  const grossProfit = suggestedRetailPrice - totalHPP;

  const handleCopySummary = () => {
    const text = `
=== RINGKASAN HPP & BIAYA FORMULA SCENTY ===
Formula: ${activeSheet.name || "Untitled Formula"} (${targetVolume} mL)
Konsentrasi Bibit: ${activeSheet.totalPercent.toFixed(1)}% (${totalGramsUsed.toFixed(3)} g)

Rincian Bahan Baku:
${rowCostDetails
  .map(
    (r) =>
      `- ${r.material} (${r.grams.toFixed(3)}g @ Rp ${r.pricePerG.toLocaleString("id-ID")}/g) = Rp ${Math.round(
        r.subtotal
      ).toLocaleString("id-ID")}`
  )
  .join("\n")}

Biaya Pelarut (Etanol 96%): Rp ${Math.round(solventCost).toLocaleString("id-ID")} (${solventGramsNeeded.toFixed(3)} g)
Biaya Kemasan & Botol: Rp ${packagingCost.toLocaleString("id-ID")}
--------------------------------------------------
TOTAL HPP PER BOTOL: Rp ${totalHPP.toLocaleString("id-ID")}
Biaya Produksi per mL: Rp ${costPerMl.toLocaleString("id-ID")} / mL

Target Margin: ${profitMarginPercent}%
Saran Harga Jual (Retail MSRP): Rp ${suggestedRetailPrice.toLocaleString("id-ID")}
Estimasi Laba Kotor per Botol: Rp ${grossProfit.toLocaleString("id-ID")}
==================================================
`.trim();

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveToWallNote = () => {
    if (!onAddNoteToWall) return;

    const title = `HPP: ${activeSheet.name || "Formula"} (${targetVolume}ml)`;
    const content = `Total HPP: Rp ${totalHPP.toLocaleString("id-ID")}\nBibit: Rp ${Math.round(totalConcentrateCost).toLocaleString("id-ID")}\nPelarut: Rp ${Math.round(solventCost).toLocaleString("id-ID")}\nKemasan: Rp ${packagingCost.toLocaleString("id-ID")}\nSaran Jual (${profitMarginPercent}%): Rp ${suggestedRetailPrice.toLocaleString("id-ID")}\nLaba/btl: Rp ${grossProfit.toLocaleString("id-ID")}`;

    onAddNoteToWall(title, content);
    setIsNotePasted(true);
    setTimeout(() => setIsNotePasted(false), 2200);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#1c1d22] border border-amber-900/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-zinc-100"
          style={{
            boxShadow: "0 25px 60px -15px rgba(0,0,0,0.95), inset 0 1px 2px rgba(255,255,255,0.15)",
          }}
        >
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-zinc-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <CalcIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                  KALKULATOR ATELIER &amp; BIAYA FORMULA
                </h3>
                <p className="text-[10px] text-zinc-400 font-sans">
                  Lab Presisi &bull; Terhubung dengan Lembar Formula &amp; Harga Bahan
                </p>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 bg-zinc-900 rounded-lg border border-zinc-700">
              <button
                type="button"
                onClick={() => setActiveTab("costing")}
                className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "costing"
                    ? "bg-amber-500 text-zinc-950 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>HPP &amp; Biaya Formula</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("standard")}
                className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "standard"
                    ? "bg-amber-500 text-zinc-950 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <CalcIcon className="w-3.5 h-3.5" />
                <span>Kalkulator Lab</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* TAB 1: KALKULATOR LABORATORIUM (STANDAR MATEMATIKA) */}
          {activeTab === "standard" && (
            <div className="p-5 space-y-4">
              {/* LCD Display */}
              <div className="w-full bg-[#c2ceb9] p-4 rounded-xl border border-[#9fae94] shadow-inner text-right">
                <div className="text-[10px] font-mono font-semibold text-zinc-700 h-4 truncate">
                  {prevValue !== null && operation
                    ? `${prevValue} ${operation}`
                    : calcHistory[0] || ""}
                </div>
                <div className="text-3xl font-mono font-extrabold tracking-wider text-zinc-950 truncate mt-1">
                  {displayValue}
                </div>
              </div>

              {/* Calculator Keypad Grid */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-3 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700 text-red-200 font-mono font-bold text-sm cursor-pointer"
                >
                  C
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-mono font-bold text-sm cursor-pointer"
                >
                  DEL
                </button>
                <button
                  type="button"
                  onClick={handleToggleSign}
                  className="p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-mono font-bold text-sm cursor-pointer"
                >
                  +/-
                </button>
                <button
                  type="button"
                  onClick={() => performOperation("÷")}
                  className="p-3 rounded-lg bg-amber-600 hover:bg-amber-500 border border-amber-500 text-zinc-950 font-mono font-bold text-base cursor-pointer"
                >
                  ÷
                </button>

                {["7", "8", "9"].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => handleDigit(n)}
                    className="p-3 rounded-lg bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 text-white font-mono font-bold text-base cursor-pointer"
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => performOperation("×")}
                  className="p-3 rounded-lg bg-amber-600 hover:bg-amber-500 border border-amber-500 text-zinc-950 font-mono font-bold text-base cursor-pointer"
                >
                  ×
                </button>

                {["4", "5", "6"].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => handleDigit(n)}
                    className="p-3 rounded-lg bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 text-white font-mono font-bold text-base cursor-pointer"
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => performOperation("-")}
                  className="p-3 rounded-lg bg-amber-600 hover:bg-amber-500 border border-amber-500 text-zinc-950 font-mono font-bold text-base cursor-pointer"
                >
                  -
                </button>

                {["1", "2", "3"].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => handleDigit(n)}
                    className="p-3 rounded-lg bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 text-white font-mono font-bold text-base cursor-pointer"
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => performOperation("+")}
                  className="p-3 rounded-lg bg-amber-600 hover:bg-amber-500 border border-amber-500 text-zinc-950 font-mono font-bold text-base cursor-pointer"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => handleDigit("0")}
                  className="p-3 rounded-lg bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 text-white font-mono font-bold text-base cursor-pointer"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleDecimal}
                  className="p-3 rounded-lg bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 text-white font-mono font-bold text-base cursor-pointer"
                >
                  .
                </button>
                <button
                  type="button"
                  onClick={handlePercentage}
                  className="p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-mono font-bold text-base cursor-pointer"
                >
                  %
                </button>
                <button
                  type="button"
                  onClick={() => performOperation("=")}
                  className="p-3 rounded-lg bg-amber-500 hover:bg-amber-400 border border-amber-400 text-zinc-950 font-mono font-extrabold text-base cursor-pointer shadow-lg"
                >
                  =
                </button>
              </div>

              {/* Quick Perfumery Ratios Bar */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Rasio Cepat Parfum:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyQuickMultiplier(0.15, "15% EDP")}
                    className="px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-[10px] font-mono text-zinc-200 cursor-pointer text-center"
                  >
                    &times; 0.15 (EDP 15%)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyQuickMultiplier(0.2, "20% Extrait")}
                    className="px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-[10px] font-mono text-zinc-200 cursor-pointer text-center"
                  >
                    &times; 0.20 (Extrait 20%)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyQuickMultiplier(0.1, "10% Dilution")}
                    className="px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-[10px] font-mono text-zinc-200 cursor-pointer text-center"
                  >
                    &times; 0.10 (DPG 10%)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyQuickMultiplier(0.85, "85% Pelarut")}
                    className="px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-[10px] font-mono text-zinc-200 cursor-pointer text-center"
                  >
                    &times; 0.85 (Pelarut 85%)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HPP & BIAYA FORMULA PRODUKSI */}
          {activeTab === "costing" && (
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
              {/* Active Formula Snapshot Card */}
              <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                    Formula Terpilih:
                  </div>
                  <div className="text-sm font-bold text-white">
                    {activeSheet.name || "Untitled Formula"}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 block text-[9px]">TARGET VOLUME</span>
                    <span className="font-extrabold text-amber-300">{targetVolume} mL</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px]">KONSENTRAT BIBIT</span>
                    <span className="font-extrabold text-emerald-400">
                      {totalGramsUsed.toFixed(3)} g ({activeSheet.totalPercent.toFixed(1)}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px]">PELARUT ETANOL</span>
                    <span className="font-extrabold text-sky-400">
                      {solventGramsNeeded.toFixed(3)} g (
                      {Math.max(0, 100 - activeSheet.totalPercent).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Table of Formula Ingredients with Real-time Prices */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-1">
                  <span>Rincian Biaya Bahan Baku Formula</span>
                  <span>Harga / Gram &bull; Subtotal</span>
                </div>

                {rowCostDetails.length === 0 ? (
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-dashed border-zinc-700 text-center text-xs text-zinc-400">
                    Belum ada bahan dengan gramasi di lembar formula aktif. Tambahkan bahan di meja kerja atau buka workspace formula.
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {rowCostDetails.map((r, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0">
                          <div className="font-medium text-zinc-100 truncate">{r.material}</div>
                          <div className="text-[10px] font-mono text-zinc-400">
                            {r.grams.toFixed(3)} g
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-mono text-zinc-500">Rp</span>
                            <input
                              type="number"
                              min="0"
                              value={r.pricePerG || ""}
                              placeholder="0"
                              onChange={(e) =>
                                setPriceForMaterial(r.material, parseFloat(e.target.value) || 0)
                              }
                              className="w-20 px-2 py-1 rounded bg-black/60 border border-zinc-700 text-right font-mono text-xs text-amber-300 focus:border-amber-400 outline-none"
                            />
                            <span className="text-[10px] font-mono text-zinc-500">/g</span>
                          </div>

                          <div className="w-24 text-right font-mono font-bold text-white">
                            Rp {Math.round(r.subtotal).toLocaleString("id-ID")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Components: Solvent & Packaging */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Solvent Cost */}
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">Pelarut (Etanol 96%)</span>
                    <span className="font-mono font-bold text-sky-400">
                      Rp {Math.round(solventCost).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    {solventGramsNeeded.toFixed(3)} g &times; Rp {ethanolPricePerG}/g
                  </div>
                </div>

                {/* Packaging & Bottle Cost */}
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">Kemasan, Botol &amp; Box</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono text-zinc-500">Rp</span>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={bottlePackagingCost}
                        onChange={(e) => setBottlePackagingCost(parseFloat(e.target.value) || 0)}
                        className="w-24 px-2 py-0.5 rounded bg-black/60 border border-zinc-700 text-right font-mono text-xs text-amber-300 focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    Estimasi botol spray, atomizer, dan packaging
                  </div>
                </div>
              </div>

              {/* Total HPP Summary Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-950 border border-amber-600/40 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                    TOTAL MODAL HPP PER BOTOL ({targetVolume} mL)
                  </span>
                  <div className="text-2xl font-mono font-extrabold text-white mt-0.5">
                    Rp {totalHPP.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-zinc-400 block">Biaya Produksi / mL</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">
                    Rp {costPerMl.toLocaleString("id-ID")} / mL
                  </span>
                </div>
              </div>

              {/* Profit Margin & Suggested Retail Price */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-200 font-bold">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Simulasi Margin Keuntungan Retail</span>
                  </div>
                  <div className="font-mono font-extrabold text-amber-400 text-sm">
                    {profitMarginPercent}%
                  </div>
                </div>

                {/* Margin Slider */}
                <input
                  type="range"
                  min="30"
                  max="90"
                  step="5"
                  value={profitMarginPercent}
                  onChange={(e) => setProfitMarginPercent(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500 cursor-pointer"
                />

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">
                      Rekomendasi Harga Jual (MSRP)
                    </span>
                    <span className="text-lg font-mono font-extrabold text-amber-400">
                      Rp {suggestedRetailPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-zinc-400 block">
                      Estimasi Laba Kotor / Botol
                    </span>
                    <span className="text-lg font-mono font-extrabold text-emerald-400">
                      Rp {grossProfit.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold flex items-center gap-1.5 border border-zinc-700 transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Rincian</span>
                    </>
                  )}
                </button>

                {onAddNoteToWall && (
                  <button
                    type="button"
                    onClick={handleSaveToWallNote}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-extrabold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-102 cursor-pointer"
                  >
                    {isNotePasted ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-zinc-950" />
                        <span>Tertempel di Dinding!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Simpan ke Catatan Dinding</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
