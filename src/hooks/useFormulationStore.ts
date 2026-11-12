"use client";

import { useState, useEffect } from "react";
import {
  FormulationSheetData,
  FormulationRow,
  BLANK_FORMULATION_SHEET,
  SUMMER_DREAMS_ARCHIVE,
  createDefault6BlankRows,
} from "@/data/formulation-types";

const STORAGE_KEY = "scenty_formulation_history_v2";
const ACTIVE_KEY = "scenty_active_sheet_v2";

// Helper to compute row total and percentage of target volume
function computeRow(
  row: FormulationRow,
  targetVolumeMl: number,
  modColumns: string[]
): FormulationRow {
  const baseGrams = typeof row.grams === "number" ? row.grams : 0;
  let modsSum = 0;

  for (const modCol of modColumns) {
    const val = row.mods?.[modCol];
    if (typeof val === "number") {
      modsSum += val;
    }
  }

  const totalGrams = Number((baseGrams + modsSum).toFixed(3));
  const safeTarget = targetVolumeMl > 0 ? targetVolumeMl : 30;
  const percentOfTarget = Number(((totalGrams / safeTarget) * 100).toFixed(2));

  // Optional pure active fraction if concPercent is specified
  let pureGrams: number | undefined = undefined;
  if (typeof row.concPercent === "number" && row.concPercent > 0) {
    pureGrams = Number(((totalGrams * row.concPercent) / 100).toFixed(3));
  }

  return {
    ...row,
    totalGrams,
    percentOfTarget,
    pureGrams,
  };
}

// Helper to compute overall sheet totals
function computeSheetTotals(rows: FormulationRow[]): {
  totalWeighedGrams: number;
  totalPercent: number;
} {
  let totalWeighedGrams = 0;
  let totalPercent = 0;

  for (const r of rows) {
    totalWeighedGrams += r.totalGrams || 0;
    totalPercent += r.percentOfTarget || 0;
  }

  return {
    totalWeighedGrams: Number(totalWeighedGrams.toFixed(3)),
    totalPercent: Number(totalPercent.toFixed(2)),
  };
}

export function useFormulationStore() {
  const [currentSheet, setCurrentSheet] = useState<FormulationSheetData>(BLANK_FORMULATION_SHEET);
  const [historySheets, setHistorySheets] = useState<FormulationSheetData[]>([SUMMER_DREAMS_ARCHIVE]);
  const [isFilingAnimation, setIsFilingAnimation] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(STORAGE_KEY);
      if (storedHistory) {
        const parsed = JSON.parse(storedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistorySheets(parsed);
        }
      }

      const storedActive = localStorage.getItem(ACTIVE_KEY);
      if (storedActive) {
        const parsedActive = JSON.parse(storedActive);
        if (parsedActive && Array.isArray(parsedActive.rows)) {
          let rows = parsedActive.rows;
          if (rows.length < 6) {
            const padCount = 6 - rows.length;
            const extraBlankRows = Array.from({ length: padCount }, (_, i) => ({
              id: `row-blank-pad-${i + 1}-${Date.now().toString(36)}`,
              material: "",
              concPercent: "" as const,
              grams: "" as const,
              mods: { "Mod 1": "", "Mod 2": "" },
              totalGrams: 0,
              percentOfTarget: 0,
            }));
            rows = [...rows, ...extraBlankRows];
          }
          setCurrentSheet({ ...parsedActive, rows });
        }
      }
    } catch (e) {
      console.warn("Could not load formulation history", e);
    }
  }, []);

  const saveActiveDraft = (sheet: FormulationSheetData) => {
    setCurrentSheet(sheet);
    try {
      localStorage.setItem(ACTIVE_KEY, JSON.stringify(sheet));
    } catch (e) {
      // ignore
    }
  };

  // Change Target Bottle Volume (10, 30, 50, 100 ml)
  const setTargetVolume = (volumeMl: number) => {
    const updatedRows = currentSheet.rows.map((r) =>
      computeRow(r, volumeMl, currentSheet.modColumns)
    );
    const totals = computeSheetTotals(updatedRows);
    saveActiveDraft({
      ...currentSheet,
      targetVolumeMl: volumeMl,
      rows: updatedRows,
      totalWeighedGrams: totals.totalWeighedGrams,
      totalPercent: totals.totalPercent,
      updatedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    });
  };

  // Update Formula Name
  const updateSheetName = (name: string) => {
    saveActiveDraft({
      ...currentSheet,
      name,
      updatedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    });
  };

  // Update individual Row values
  const updateRow = (rowId: string, updates: Partial<FormulationRow>) => {
    const updatedRows = currentSheet.rows.map((r) => {
      if (r.id === rowId) {
        const merged = { ...r, ...updates };
        return computeRow(merged, currentSheet.targetVolumeMl, currentSheet.modColumns);
      }
      return r;
    });

    const totals = computeSheetTotals(updatedRows);
    saveActiveDraft({
      ...currentSheet,
      rows: updatedRows,
      totalWeighedGrams: totals.totalWeighedGrams,
      totalPercent: totals.totalPercent,
      updatedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    });
  };

  // Add new empty row or with material name
  const addRow = (materialName = "", defaultConc: number | "" = "") => {
    const initialMods: Record<string, number | ""> = {};
    for (const m of currentSheet.modColumns) {
      initialMods[m] = "";
    }

    const newRow: FormulationRow = {
      id: `row-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      material: materialName,
      concPercent: defaultConc,
      grams: "",
      mods: initialMods,
      totalGrams: 0,
      percentOfTarget: 0,
    };

    const updatedRows = [...currentSheet.rows, newRow];
    const totals = computeSheetTotals(updatedRows);
    saveActiveDraft({
      ...currentSheet,
      rows: updatedRows,
      totalWeighedGrams: totals.totalWeighedGrams,
      totalPercent: totals.totalPercent,
    });
  };

  // Delete row
  const deleteRow = (rowId: string) => {
    const updatedRows = currentSheet.rows.filter((r) => r.id !== rowId);
    const totals = computeSheetTotals(updatedRows);
    saveActiveDraft({
      ...currentSheet,
      rows: updatedRows,
      totalWeighedGrams: totals.totalWeighedGrams,
      totalPercent: totals.totalPercent,
    });
  };

  // Add dynamic Modification column (Mod 1, Mod 2, Mod 3, Mod 4...)
  const addModColumn = () => {
    const currentCount = currentSheet.modColumns.length;
    const newModName = `Mod ${currentCount + 1}`;
    const nextModColumns = [...currentSheet.modColumns, newModName];

    const updatedRows = currentSheet.rows.map((r) => {
      const updatedMods: Record<string, number | ""> = { ...(r.mods || {}), [newModName]: "" };
      return computeRow({ ...r, mods: updatedMods }, currentSheet.targetVolumeMl, nextModColumns);
    });

    const totals = computeSheetTotals(updatedRows);
    saveActiveDraft({
      ...currentSheet,
      modColumns: nextModColumns,
      rows: updatedRows,
      totalWeighedGrams: totals.totalWeighedGrams,
      totalPercent: totals.totalPercent,
    });
  };

  // Remove last Modification column
  const removeModColumn = (modName: string) => {
    const nextModColumns = currentSheet.modColumns.filter((m) => m !== modName);
    const updatedRows = currentSheet.rows.map((r) => {
      const updatedMods: Record<string, number | ""> = { ...(r.mods || {}) };
      delete updatedMods[modName];
      return computeRow({ ...r, mods: updatedMods }, currentSheet.targetVolumeMl, nextModColumns);
    });

    const totals = computeSheetTotals(updatedRows);
    saveActiveDraft({
      ...currentSheet,
      modColumns: nextModColumns,
      rows: updatedRows,
      totalWeighedGrams: totals.totalWeighedGrams,
      totalPercent: totals.totalPercent,
    });
  };

  // Save current sheet to History Archive (triggers filing animation)
  const saveToArchive = () => {
    setIsFilingAnimation(true);
    const now = new Date().toISOString().replace("T", " ").substring(0, 16);
    const sheetToSave: FormulationSheetData = {
      ...currentSheet,
      updatedAt: now,
    };

    setHistorySheets((prev) => {
      const existingIdx = prev.findIndex((s) => s.id === sheetToSave.id);
      let updatedList: FormulationSheetData[];
      if (existingIdx >= 0) {
        updatedList = [...prev];
        updatedList[existingIdx] = sheetToSave;
      } else {
        updatedList = [sheetToSave, ...prev];
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      } catch (e) {
        // ignore
      }
      return updatedList;
    });

    setTimeout(() => {
      setIsFilingAnimation(false);
    }, 1200);
  };

  // Load a sheet from History Archive
  const loadSheetFromArchive = (sheet: FormulationSheetData) => {
    // Recompute to ensure percentages match current formula rules
    const updatedRows = sheet.rows.map((r) =>
      computeRow(r, sheet.targetVolumeMl || 30, sheet.modColumns || ["Mod 1", "Mod 2"])
    );
    const totals = computeSheetTotals(updatedRows);
    saveActiveDraft({
      ...sheet,
      rows: updatedRows,
      totalWeighedGrams: totals.totalWeighedGrams,
      totalPercent: totals.totalPercent,
    });
  };

  // Create a brand new blank empty sheet
  const createNewSheet = () => {
    const freshSheet: FormulationSheetData = {
      id: `sheet-${Date.now()}`,
      name: "Formula Baru",
      targetVolumeMl: currentSheet.targetVolumeMl || 30,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      updatedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      modColumns: ["Mod 1", "Mod 2"],
      notes: "",
      rows: createDefault6BlankRows(), // 6 ready blank rows
      totalWeighedGrams: 0,
      totalPercent: 0,
    };

    saveActiveDraft(freshSheet);
  };

  // Delete saved sheet from History
  const deleteSavedSheet = (id: string) => {
    setHistorySheets((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      } catch (e) {
        // ignore
      }
      return filtered;
    });
  };

  return {
    currentSheet,
    historySheets,
    isFilingAnimation,
    setTargetVolume,
    updateSheetName,
    updateRow,
    addRow,
    deleteRow,
    addModColumn,
    removeModColumn,
    saveToArchive,
    loadSheetFromArchive,
    createNewSheet,
    deleteSavedSheet,
  };
}
