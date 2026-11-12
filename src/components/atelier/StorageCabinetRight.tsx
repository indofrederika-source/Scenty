"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplet,
  Beaker,
  Check,
  Plus,
  X,
  Search,
  Eye,
  FlaskConical,
  Wrench,
  Edit3,
  Trash2,
} from "lucide-react";
import { CabinetItem, useWorkbenchItemsStore } from "@/hooks/useWorkbenchItemsStore";
import { useFormulationStore } from "@/hooks/useFormulationStore";

interface StorageCabinetRightProps {
  isSelectionMode?: boolean;
  stagingItemIds?: string[];
  onToggleItem?: (id: string) => void;
  onStartPreparation?: () => void;
  onConfirmSelection?: () => void;
  onCancelSelection?: () => void;
}

// 15 Fragrance Families exactly as requested:
// aromatic, green/herbal, citrus, fruity, aquatic/marine, floral, spicy,
// gourmand/oriental, resinous/amber, woody, earthy, smoky, leather, animalic/musk, synthetic molecule
const FRAGRANCE_FAMILIES = [
  { name: "Aromatic", icon: "🌿" },
  { name: "Green / Herbal", icon: "🍃" },
  { name: "Citrus", icon: "🍋" },
  { name: "Fruity", icon: "🍎" },
  { name: "Aquatic / Marine", icon: "🌊" },
  { name: "Floral", icon: "🌸" },
  { name: "Spicy", icon: "🌶️" },
  { name: "Gourmand / Oriental", icon: "🍫" },
  { name: "Resinous / Amber", icon: "🍯" },
  { name: "Woody", icon: "🪵" },
  { name: "Earthy", icon: "🍄" },
  { name: "Smoky", icon: "💨" },
  { name: "Leather", icon: "👞" },
  { name: "Animalic / Musk", icon: "🐾" },
  { name: "Synthetic Molecule", icon: "⚗️" },
];

const ITEMS_PER_SHELF = 7;
const MIN_TOTAL_SHELVES = 10;

export function StorageCabinetRight({
  isSelectionMode: propIsSelectionMode,
  stagingItemIds: propStagingItemIds,
  onToggleItem: propOnToggleItem,
  onStartPreparation: propOnStartPreparation,
  onConfirmSelection: propOnConfirmSelection,
  onCancelSelection: propOnCancelSelection,
}: StorageCabinetRightProps) {
  const store = useWorkbenchItemsStore();
  const formulation = useFormulationStore();

  const isSelectionMode = propIsSelectionMode ?? store.isSelectionMode;
  const stagingItemIds = propStagingItemIds ?? store.stagingItemIds;
  const onToggleItem = propOnToggleItem ?? store.toggleStagingItem;
  const onStartPreparation = propOnStartPreparation ?? store.startPreparation;
  const onConfirmSelection = propOnConfirmSelection ?? store.confirmSelection;
  const onCancelSelection = propOnCancelSelection ?? store.cancelSelection;

  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectItem, setInspectItem] = useState<CabinetItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modal Category Choice: null (default empty, nothing selected) | "material" | "tool_or_solvent"
  const [addCategory, setAddCategory] = useState<"material" | "tool_or_solvent" | null>(null);
  const [addToolSubtype, setAddToolSubtype] = useState<"solvent" | "tool" | null>(null);

  // Form State: Bahan (Aroma Material) - completely empty by default
  const [matName, setMatName] = useState("");
  const [matCode, setMatCode] = useState("");
  const [matFamily, setMatFamily] = useState(""); // EMPTY by default
  const [matInitialStock, setMatInitialStock] = useState(""); // EMPTY by default
  const [matUnit, setMatUnit] = useState<"g" | "ml">("g");
  const [matDescription, setMatDescription] = useState("");
  const [matOdor, setMatOdor] = useState("");
  const [matTaste, setMatTaste] = useState("");
  const [matUseLevel, setMatUseLevel] = useState(""); // EMPTY by default
  const [matCas, setMatCas] = useState("");
  const [matFema, setMatFema] = useState("");
  const [matBottleStyle, setMatBottleStyle] = useState<CabinetItem["bottleStyle"]>("amber-dropper");

  // Form State: Pelarut (Solvent) - completely empty by default
  const [solvName, setSolvName] = useState("");
  const [solvCode, setSolvCode] = useState("");
  const [solvInitialStock, setSolvInitialStock] = useState(""); // EMPTY
  const [solvUnit, setSolvUnit] = useState<"ml" | "g">("ml");
  const [solvGrade, setSolvGrade] = useState("");
  const [solvDescription, setSolvDescription] = useState("");
  const [solvBottleStyle, setSolvBottleStyle] = useState<CabinetItem["bottleStyle"]>("solvent-jug");

  // Form State: Alat Lab (Tool) - completely empty by default
  const [toolName, setToolName] = useState("");
  const [toolCode, setToolCode] = useState("");
  const [toolInitialStock, setToolInitialStock] = useState(""); // EMPTY
  const [toolUnit, setToolUnit] = useState<"set" | "pcs">("set");
  const [toolDescription, setToolDescription] = useState("");
  const [toolStyle, setToolStyle] = useState<CabinetItem["bottleStyle"]>("beaker");

  // Inspect Dossier Edit & Delete State
  const [isEditingInspect, setIsEditingInspect] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editFamily, setEditFamily] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editUnit, setEditUnit] = useState<"g" | "ml" | "set" | "pcs">("g");
  const [editBottleStyle, setEditBottleStyle] = useState<CabinetItem["bottleStyle"]>("amber-dropper");
  const [editDescription, setEditDescription] = useState("");
  const [editOdor, setEditOdor] = useState("");
  const [editTaste, setEditTaste] = useState("");
  const [editUseLevel, setEditUseLevel] = useState("");
  const [editCas, setEditCas] = useState("");
  const [editFema, setEditFema] = useState("");
  const [editGrade, setEditGrade] = useState("");

  const handleStartEdit = () => {
    if (!inspectItem) return;
    setEditName(inspectItem.name);
    setEditCode(inspectItem.code);
    setEditFamily(inspectItem.fragranceFamily === "-" ? "" : inspectItem.fragranceFamily);
    setEditStock(inspectItem.initialStock > 0 ? inspectItem.initialStock.toString() : "");
    setEditUnit(inspectItem.unit as any);
    setEditBottleStyle(inspectItem.bottleStyle || "amber-dropper");
    setEditDescription(inspectItem.description === "-" ? "" : inspectItem.description);
    setEditOdor(inspectItem.odorDescription === "-" ? "" : inspectItem.odorDescription);
    setEditTaste(inspectItem.tasteDescription === "-" ? "" : inspectItem.tasteDescription || "");
    setEditUseLevel(inspectItem.useLevel === "-" ? "" : inspectItem.useLevel);
    setEditCas(inspectItem.casNumber === "-" ? "" : inspectItem.casNumber);
    setEditFema(inspectItem.femaNumber || "");
    setEditGrade(
      inspectItem.odorDescription?.startsWith("Purity Grade: ")
        ? inspectItem.odorDescription.replace("Purity Grade: ", "")
        : ""
    );
    setShowDeleteConfirm(false);
    setIsEditingInspect(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectItem || !editName.trim()) return;

    const stockVal = parseFloat(editStock) || inspectItem.initialStock || 0;
    const updates: Partial<CabinetItem> = {
      name: editName.trim(),
      code: editCode.trim() || inspectItem.code,
      fragranceFamily: editFamily || "-",
      description: editDescription.trim() || "-",
      odorDescription:
        inspectItem.category === "solvent"
          ? editGrade.trim() ? `Purity Grade: ${editGrade.trim()}` : "-"
          : editOdor.trim() || "-",
      tasteDescription: editTaste.trim() || "-",
      useLevel: editUseLevel.trim() || "-",
      casNumber: editCas.trim() || "-",
      femaNumber: editFema.trim() || undefined,
      initialStock: stockVal,
      currentStock: stockVal,
      unit: editUnit as any,
      vol: `${stockVal} ${editUnit}`,
      bottleStyle: editBottleStyle,
    };

    store.updateCabinetItem(inspectItem.id, updates);
    setInspectItem({ ...inspectItem, ...updates });
    setIsEditingInspect(false);
  };

  const handleDeleteItem = () => {
    if (!inspectItem) return;
    store.deleteCabinetItem(inspectItem.id);
    setInspectItem(null);
    setShowDeleteConfirm(false);
    setIsEditingInspect(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter items across all attributes
  const filteredCabinetItems = store.cabinetItems.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.fragranceFamily.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.odorDescription.toLowerCase().includes(q) ||
      (item.tasteDescription && item.tasteDescription.toLowerCase().includes(q)) ||
      item.useLevel.toLowerCase().includes(q) ||
      item.casNumber.toLowerCase().includes(q) ||
      (item.femaNumber && item.femaNumber.toLowerCase().includes(q)) ||
      item.type.toLowerCase().includes(q) ||
      (item.category === "material" && "bahan".includes(q)) ||
      (item.category !== "material" && "alat pelarut solvent".includes(q))
    );
  });

  // Group items
  const solventAndToolItems = filteredCabinetItems.filter(
    (i) => i.tier === 1 || i.category === "solvent" || i.category === "tool"
  );
  const materialItems = filteredCabinetItems.filter(
    (i) => i.tier === 2 && i.category === "material"
  );

  // Multi-tier Shelving calculations:
  const solventShelvesCount = Math.max(1, Math.ceil(solventAndToolItems.length / ITEMS_PER_SHELF));
  const materialShelvesCount = Math.ceil(materialItems.length / ITEMS_PER_SHELF);
  const totalShelvesCount = Math.max(MIN_TOTAL_SHELVES, solventShelvesCount + Math.max(materialShelvesCount, 9));

  // Chunk material items into shelves
  const materialShelves: CabinetItem[][] = [];
  for (let i = 0; i < Math.max(materialShelvesCount, totalShelvesCount - solventShelvesCount); i++) {
    const start = i * ITEMS_PER_SHELF;
    materialShelves.push(materialItems.slice(start, start + ITEMS_PER_SHELF));
  }

  // Reset all add modal states
  const resetAddForm = () => {
    setAddCategory(null);
    setAddToolSubtype(null);
    setMatName("");
    setMatCode("");
    setMatFamily("");
    setMatInitialStock("");
    setMatUnit("g");
    setMatDescription("");
    setMatOdor("");
    setMatTaste("");
    setMatUseLevel("");
    setMatCas("");
    setMatFema("");
    setMatBottleStyle("amber-dropper");

    setSolvName("");
    setSolvCode("");
    setSolvInitialStock("");
    setSolvUnit("ml");
    setSolvGrade("");
    setSolvDescription("");
    setSolvBottleStyle("solvent-jug");

    setToolName("");
    setToolCode("");
    setToolInitialStock("");
    setToolUnit("set");
    setToolDescription("");
    setToolStyle("beaker");
  };

  // Submit Handler for Bahan (Aroma Material) - Only Nama is required
  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matName.trim()) return;

    const code = matCode.trim() || matName.substring(0, 3).toUpperCase() + "-01";
    const stockVal = parseFloat(matInitialStock) || 0;

    store.addCabinetItem({
      name: matName.trim(),
      code,
      category: "material",
      type: matFamily || "Aroma Material",
      fragranceFamily: matFamily || "-",
      description: matDescription.trim() || `${matName} adalah bahan aroma olfaktori untuk komposisi racikan parfum.`,
      odorDescription: matOdor.trim() || "-",
      tasteDescription: matTaste.trim() || "-",
      useLevel: matUseLevel.trim() || "-",
      casNumber: matCas.trim() || "-",
      femaNumber: matFema.trim() || undefined,
      initialStock: stockVal,
      currentStock: stockVal,
      unit: matUnit,
      vol: `${stockVal} ${matUnit}`,
      tier: 2,
      bottleStyle: matBottleStyle,
    });

    resetAddForm();
    setIsAddModalOpen(false);
  };

  // Submit Handler for Pelarut (Solvent) - Only Nama is required
  const handleAddSolvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!solvName.trim()) return;

    const code = solvCode.trim() || solvName.substring(0, 3).toUpperCase() + "-01";
    const stockVal = parseFloat(solvInitialStock) || 0;

    store.addCabinetItem({
      name: solvName.trim(),
      code,
      category: "solvent",
      type: "Solvent",
      fragranceFamily: "Solvent Carrier",
      description: solvDescription.trim() || `${solvName} adalah pelarut carrier untuk racikan parfum.`,
      odorDescription: solvGrade.trim() ? `Purity Grade: ${solvGrade.trim()}` : "-",
      tasteDescription: "-",
      useLevel: "-",
      casNumber: "-",
      initialStock: stockVal,
      currentStock: stockVal,
      unit: solvUnit,
      vol: `${stockVal} ${solvUnit}`,
      tier: 1,
      bottleStyle: solvBottleStyle,
    });

    resetAddForm();
    setIsAddModalOpen(false);
  };

  // Submit Handler for Alat Lab (Equipment) - Only Nama is required
  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolName.trim()) return;

    const code = toolCode.trim() || toolName.substring(0, 3).toUpperCase() + "-01";
    const stockVal = parseFloat(toolInitialStock) || 1;

    store.addCabinetItem({
      name: toolName.trim(),
      code,
      category: "tool",
      type: "Equipment",
      fragranceFamily: "Glassware & Tools",
      description: toolDescription.trim() || `${toolName} adalah instrumen laboratorium untuk meracik formula parfum.`,
      odorDescription: "Peralatan Laboratorium Steril",
      tasteDescription: "-",
      useLevel: "-",
      casNumber: "-",
      initialStock: stockVal,
      currentStock: stockVal,
      unit: toolUnit,
      vol: `${stockVal} ${toolUnit}`,
      tier: 1,
      bottleStyle: toolStyle,
    });

    resetAddForm();
    setIsAddModalOpen(false);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen px-4 sm:px-10 py-4 flex flex-col justify-start relative select-none pb-28">
      {/* ========================================================================= */}
      {/* TOP BAR: SEARCH, PREPARE & ADD ITEM ACTIONS                               */}
      {/* ========================================================================= */}
      <div className="max-w-[1440px] mx-auto w-full mb-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-3">
        {/* Left: STORAGE Title */}
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black text-white tracking-widest uppercase font-mono">
            STORAGE
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            {store.cabinetItems.length} ITEM TERSEDIA
          </span>
        </div>

        {/* Center: Rock-Solid Clean Search Bar (NO Placeholder, Smooth Amber Outline) */}
        <div className="flex-1 max-w-md w-full relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-amber-400/70 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=""
              className="w-full pl-9 pr-8 py-2 rounded-full bg-[#18120c] border border-amber-900/60 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 text-amber-100 font-mono text-xs outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 p-1 rounded-full text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions (+ Tambah Bahan & Prepare) */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              resetAddForm();
              setIsAddModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 transition-all shadow-md hover:scale-102 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Tambah Bahan / Alat</span>
          </button>

          {!isSelectionMode && onStartPreparation && (
            <button
              type="button"
              onClick={onStartPreparation}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-black tracking-wider shadow-lg shadow-amber-950/40 transition-transform hover:scale-103 cursor-pointer"
            >
              PREPARE
            </button>
          )}
        </div>
      </div>

      {/* SELECTION MODE BANNER (If Active) */}
      {isSelectionMode && (
        <div className="max-w-[1440px] mx-auto w-full mb-3 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500/25 via-amber-500/15 to-transparent border border-amber-500/60 flex items-center justify-between shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <div>
            <h3 className="font-mono text-xs font-extrabold uppercase text-amber-400 tracking-wider">
              MODE PERSIAPAN MEJA RACIK
            </h3>
            <span className="text-[10px] font-mono text-zinc-300">
              Klik botol atau peralatan di rak untuk dipilih dan dibawa ke meja kerja
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancelSelection}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono font-bold cursor-pointer transition-colors border border-zinc-700"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onConfirmSelection}
              className="px-5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-extrabold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-102 cursor-pointer"
            >
              <Check className="w-4 h-4 text-zinc-950 stroke-[3]" />
              <span>Selesai ({stagingItemIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10+ TIERED APOTHECARY STORAGE CABINET                                     */}
      {/* ========================================================================= */}
      <div
        className="max-w-[1440px] mx-auto w-full rounded-3xl border-4 border-[#241308] shadow-2xl overflow-hidden relative flex flex-col"
        style={{
          backgroundColor: "#1c0f06",
          backgroundImage: "linear-gradient(to bottom, #29150b 0%, #150a04 100%)",
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.98), inset 0 4px 12px rgba(0,0,0,0.85)",
        }}
      >
        {/* Top Decorative Wooden Crown Molding with Brass Trim */}
        <div className="h-7 w-full bg-[#351b0d] border-b-2 border-[#120803] flex items-center px-6 justify-between shadow-md">
          <div className="h-1 w-full bg-white/10 rounded-full" />
        </div>

        {/* ========================================================================= */}
        {/* RAK 01: PELARUT & ALAT LAB                                                */}
        {/* ========================================================================= */}
        <div className="relative px-6 pt-3 pb-0 border-b-4 border-[#120803] min-h-[175px] flex flex-col justify-between bg-black/30">
          {/* Shelf Plaque Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-amber-950/60">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-700/50 font-mono text-[9px] font-black text-amber-300">
                RAK 01
              </span>
              <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">
                PELARUT &amp; ALAT
              </span>
              <span className="text-[9px] font-mono text-zinc-400">
                ({solventAndToolItems.length} Item)
              </span>
            </div>
            {isSelectionMode && (
              <button
                type="button"
                onClick={() => store.selectAllCategory("solvent")}
                className="text-[9px] font-mono text-amber-300 hover:text-amber-200 underline cursor-pointer"
              >
                Pilih Semua Pelarut
              </button>
            )}
          </div>

          {/* Items Row on Shelf */}
          {solventAndToolItems.length === 0 ? (
            <div className="py-6 text-center text-zinc-500 font-mono text-xs">
              Tidak ada pelarut atau alat yang cocok dengan pencarian
            </div>
          ) : (
            <div className="flex flex-wrap items-end justify-start gap-8 pt-3 pb-2 px-2">
              {solventAndToolItems.map((item) => (
                <ShelfItemVisual
                  key={item.id}
                  item={item}
                  isSelected={isSelectionMode && stagingItemIds.includes(item.id)}
                  onSelect={() => {
                    if (isSelectionMode) onToggleItem?.(item.id);
                    else setInspectItem(item);
                  }}
                  onInspect={() => setInspectItem(item)}
                  stockInfo={store.getRemainingStock(item, formulation.currentSheet.rows)}
                />
              ))}
            </div>
          )}

          {/* Wooden Shelf Base Plank with Brass Trim */}
          <div className="h-4 w-full -mx-6 px-6 bg-[#381d0f] border-t border-amber-700/40 border-b-2 border-black/80 shadow-md flex items-center">
            <div className="h-0.5 w-full bg-amber-500/20 rounded-full" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RAK 02 - RAK 10+: BAHAN AROMA (AROMA MATERIALS)                          */}
        {/* ========================================================================= */}
        <div className="flex flex-col">
          {materialShelves.map((shelfItems, shelfIdx) => {
            const shelfNumber = shelfIdx + 2; // RAK 02 onward
            const formattedShelfNum = shelfNumber < 10 ? `0${shelfNumber}` : `${shelfNumber}`;

            return (
              <div
                key={`shelf-${shelfNumber}`}
                className="relative px-6 pt-3 pb-0 border-b-4 border-[#120803] min-h-[175px] flex flex-col justify-between bg-black/15"
              >
                {/* Shelf Plaque Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-amber-950/60">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-700/50 font-mono text-[9px] font-black text-amber-300">
                      RAK {formattedShelfNum}
                    </span>
                    <span className="text-xs font-mono font-black uppercase text-amber-400 tracking-wider">
                      BAHAN
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">
                      ({shelfItems.length} Bahan)
                    </span>
                  </div>

                  {shelfIdx === 0 && isSelectionMode && (
                    <button
                      type="button"
                      onClick={() => store.selectAllCategory("material")}
                      className="text-[9px] font-mono text-amber-300 hover:text-amber-200 underline cursor-pointer"
                    >
                      Pilih Semua Bahan
                    </button>
                  )}
                </div>

                {/* Items Row on This Shelf */}
                {shelfItems.length === 0 ? (
                  <div className="py-7 flex items-center justify-center gap-3 text-amber-800/60 font-mono text-xs">
                    <div className="w-12 h-0.5 bg-amber-900/40" />
                    <span>[ Slot Rak Siap Digunakan ]</span>
                    <div className="w-12 h-0.5 bg-amber-900/40" />
                  </div>
                ) : (
                  <div className="flex flex-wrap items-end justify-start gap-8 pt-3 pb-2 px-2">
                    {shelfItems.map((item) => (
                      <ShelfItemVisual
                        key={item.id}
                        item={item}
                        isSelected={isSelectionMode && stagingItemIds.includes(item.id)}
                        onSelect={() => {
                          if (isSelectionMode) onToggleItem?.(item.id);
                          else setInspectItem(item);
                        }}
                        onInspect={() => setInspectItem(item)}
                        stockInfo={store.getRemainingStock(item, formulation.currentSheet.rows)}
                      />
                    ))}
                  </div>
                )}

                {/* Wooden Shelf Base Plank with Brass Trim */}
                <div className="h-4 w-full -mx-6 px-6 bg-[#381d0f] border-t border-amber-700/40 border-b-2 border-black/80 shadow-md flex items-center">
                  <div className="h-0.5 w-full bg-amber-500/20 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACETERNITY EXPANDABLE CARD MODAL (FULL SPEC DOSSIER + EDIT & HAPUS)       */}
      {/* ========================================================================= */}
      {mounted &&
        inspectItem &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setInspectItem(null);
                setIsEditingInspect(false);
                setShowDeleteConfirm(false);
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-xl bg-[#1b2b3a] text-zinc-100 rounded-3xl border border-sky-600/30 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Dossier Header */}
              <div className="px-6 pt-5 pb-4 border-b border-white/10 flex items-start justify-between bg-black/25">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-950/80 border border-sky-400/40 flex items-center justify-center shadow-inner">
                    <FlaskConical className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                      {isEditingInspect ? `EDIT DATA: ${inspectItem.name}` : inspectItem.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs font-mono text-sky-300/80">
                      <span>{inspectItem.code}</span>
                      <span>&bull;</span>
                      <span className="capitalize">{inspectItem.fragranceFamily}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {!isEditingInspect && (
                    <>
                      <button
                        type="button"
                        onClick={handleStartEdit}
                        title="Edit Data Item"
                        className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 cursor-pointer transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        title="Hapus Item dari Lemari"
                        className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-red-400 hover:text-red-300 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setInspectItem(null);
                      setIsEditingInspect(false);
                      setShowDeleteConfirm(false);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dossier Body: Viewing Mode vs Editing Mode */}
              <div className="px-6 py-5 overflow-y-auto space-y-5 text-sm">
                {isEditingInspect ? (
                  /* ================= EDITING FORM IN DOSSIER ================= */
                  <form id="edit-dossier-form" onSubmit={handleSaveEdit} className="space-y-4 font-mono text-xs">
                    {/* Nama (Wajib) & Kode */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                          Nama Item *
                        </label>
                        <input
                          type="text"
                          required
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                          Kode Lab
                        </label>
                        <input
                          type="text"
                          value={editCode}
                          onChange={(e) => setEditCode(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* If Material: Edit Fragrance Family */}
                    {inspectItem.category === "material" && (
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1.5 flex items-center justify-between">
                          <span>Fragrance Family</span>
                          {editFamily ? (
                            <span className="text-amber-400 font-bold">Terpilih: {editFamily}</span>
                          ) : (
                            <span className="text-zinc-500">Pilih profil aroma</span>
                          )}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {FRAGRANCE_FAMILIES.map((fam) => {
                            const isChosen = editFamily === fam.name;
                            return (
                              <button
                                key={fam.name}
                                type="button"
                                onClick={() =>
                                  setEditFamily((prev) => (prev === fam.name ? "" : fam.name))
                                }
                                className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                                  isChosen
                                    ? "bg-amber-500/25 border-amber-400 text-amber-200 font-bold shadow-md ring-1 ring-amber-400"
                                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                                }`}
                              >
                                <span>{fam.icon}</span>
                                <span className="text-[10.5px] truncate flex-1">{fam.name}</span>
                                {isChosen && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Stock & Unit Toggle */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                      <div className="sm:col-span-5">
                        <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                          Stok Awal
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={editStock}
                          onChange={(e) => setEditStock(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                          Satuan
                        </label>
                        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-700 w-full justify-center">
                          {inspectItem.category === "tool" ? (
                            <>
                              <button
                                type="button"
                                onClick={() => setEditUnit("set")}
                                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                                  editUnit === "set"
                                    ? "bg-amber-500 text-zinc-950 font-black shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-200"
                                }`}
                              >
                                set
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditUnit("pcs")}
                                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                                  editUnit === "pcs"
                                    ? "bg-amber-500 text-zinc-950 font-black shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-200"
                                }`}
                              >
                                pcs
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => setEditUnit("g")}
                                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                                  editUnit === "g"
                                    ? "bg-amber-500 text-zinc-950 font-black shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-200"
                                }`}
                              >
                                gram (g)
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditUnit("ml")}
                                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                                  editUnit === "ml"
                                    ? "bg-amber-500 text-zinc-950 font-black shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-200"
                                }`}
                              >
                                mili (ml)
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                          Visual Kemasan
                        </label>
                        <select
                          value={editBottleStyle}
                          onChange={(e) => setEditBottleStyle(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs cursor-pointer"
                        >
                          {inspectItem.category === "material" ? (
                            <>
                              <option value="amber-dropper">Botol Dropper Amber</option>
                              <option value="clear-bottle">Botol Dropper Bening</option>
                              <option value="amber-jar">Botol Kaca Cokelat</option>
                            </>
                          ) : inspectItem.category === "solvent" ? (
                            <>
                              <option value="solvent-jug">Botol Putih Lab (Etanol)</option>
                              <option value="amber-jar">Botol Kaca Tebal (DPG)</option>
                            </>
                          ) : (
                            <>
                              <option value="beaker">Gelas Beaker &amp; Pipet</option>
                              <option value="blotter">Dudukan Kayu Blotters</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Deskripsi */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                        Deskripsi Karakter / Keterangan
                      </label>
                      <textarea
                        rows={2}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs font-sans"
                      />
                    </div>

                    {/* Material-only specifications */}
                    {inspectItem.category === "material" && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                              Odor Description
                            </label>
                            <input
                              type="text"
                              value={editOdor}
                              onChange={(e) => setEditOdor(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                              Taste Description
                            </label>
                            <input
                              type="text"
                              value={editTaste}
                              onChange={(e) => setEditTaste(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                              Use Level (IFRA)
                            </label>
                            <input
                              type="text"
                              value={editUseLevel}
                              onChange={(e) => setEditUseLevel(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                              CAS #
                            </label>
                            <input
                              type="text"
                              value={editCas}
                              onChange={(e) => setEditCas(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                              FEMA #
                            </label>
                            <input
                              type="text"
                              value={editFema}
                              onChange={(e) => setEditFema(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Solvent-only Grade */}
                    {inspectItem.category === "solvent" && (
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-300 block mb-1">
                          Grade / Kemurnian
                        </label>
                        <input
                          type="text"
                          value={editGrade}
                          onChange={(e) => setEditGrade(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>
                    )}
                  </form>
                ) : (
                  /* ================= NORMAL DOSSIER VIEW ================= */
                  <>
                    {/* Narrative Description */}
                    <div>
                      <p className="font-serif text-base text-zinc-200 leading-relaxed italic">
                        <span className="font-bold not-italic text-white">{inspectItem.name}</span>{" "}
                        {inspectItem.description}
                      </p>
                    </div>

                    {/* Structured Attributes */}
                    <div className="space-y-2.5 pt-2 border-t border-white/10 font-serif">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                        <span className="font-bold text-white min-w-[140px] text-base">
                          Odor Description:
                        </span>
                        <span className="text-zinc-200 text-sm">
                          {inspectItem.odorDescription || "-"}
                        </span>
                      </div>

                      {inspectItem.tasteDescription && inspectItem.tasteDescription !== "-" && (
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                          <span className="font-bold text-white min-w-[140px] text-base">
                            Taste Description:
                          </span>
                          <span className="text-zinc-200 text-sm">
                            {inspectItem.tasteDescription}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                        <span className="font-bold text-white min-w-[140px] text-base">
                          Use Level:
                        </span>
                        <span className="text-zinc-200 text-sm">
                          {inspectItem.useLevel || "-"}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                        <span className="font-bold text-white min-w-[140px] text-base">
                          CAS #:
                        </span>
                        <span className="text-zinc-200 font-mono text-sm">
                          {inspectItem.casNumber || "-"}
                        </span>
                      </div>

                      {inspectItem.femaNumber && (
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                          <span className="font-bold text-white min-w-[140px] text-base">
                            FEMA #:
                          </span>
                          <span className="text-zinc-200 font-mono text-sm">
                            {inspectItem.femaNumber}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stock Progress & Formulation Usage */}
                    {(() => {
                      const stock = store.getRemainingStock(inspectItem, formulation.currentSheet.rows);
                      return (
                        <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2">
                          <div className="flex items-center justify-between font-mono text-xs">
                            <span className="text-zinc-300">Sisa Stok di Lemari:</span>
                            <span className="font-bold text-amber-400">
                              {stock.remaining} / {inspectItem.initialStock} {inspectItem.unit}
                            </span>
                          </div>
                          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full transition-all duration-300"
                              style={{ width: `${stock.percentLeft}%` }}
                            />
                          </div>
                          {stock.used > 0 && (
                            <span className="block text-[11px] font-mono text-amber-300/80">
                              &bull; Terpakai di Formula Racik Aktif: {stock.used} {inspectItem.unit}
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>

              {/* Dossier Footer with Edit & Hapus Buttons */}
              <div className="px-6 py-4 bg-black/35 border-t border-white/10 flex items-center justify-between gap-3">
                {isEditingInspect ? (
                  /* Edit Mode Footer Buttons */
                  <div className="w-full flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditingInspect(false)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs font-bold cursor-pointer transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      form="edit-dossier-form"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-black flex items-center gap-1.5 shadow-lg cursor-pointer"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Simpan Perubahan</span>
                    </button>
                  </div>
                ) : (
                  /* Normal View Footer Buttons (Hapus on Left, Edit & Tutup on Right) */
                  <>
                    {/* Left: Delete Action (with inline confirm) */}
                    <div>
                      {showDeleteConfirm ? (
                        <div className="flex items-center gap-2 animate-in fade-in duration-200">
                          <span className="text-[11px] font-mono text-red-300 font-bold">
                            Yakin hapus?
                          </span>
                          <button
                            type="button"
                            onClick={handleDeleteItem}
                            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
                          >
                            Ya, Hapus
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(false)}
                            className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(true)}
                          className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5 font-mono text-xs font-bold transition-all hover:scale-102 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      )}
                    </div>

                    {/* Right: Edit & Close */}
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handleStartEdit}
                        className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 font-mono text-xs font-bold transition-all hover:scale-102 cursor-pointer shadow-md"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setInspectItem(null);
                          setShowDeleteConfirm(false);
                          setIsEditingInspect(false);
                        }}
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold transition-colors cursor-pointer"
                      >
                        Tutup
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>,
          document.body
        )}

      {/* ========================================================================= */}
      {/* MODAL TAMBAH BAHAN / ALAT (SEPARATE FORMS & ANIMATED FAMILY SELECTION)    */}
      {/* ========================================================================= */}
      {mounted &&
        isAddModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-2xl bg-[#141518] text-zinc-100 rounded-3xl border border-amber-600/30 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
            >
              {/* Modal Header: Strictly TAMBAH BAHAN / ALAT KE LEMARI (No Subtitle) */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-amber-400" />
                  </div>
                  <h3 className="font-mono text-sm font-black text-amber-400 uppercase tracking-widest">
                    TAMBAH BAHAN / ALAT KE LEMARI
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Segmented Switcher for Forms (Bahan vs Pelarut & Alat) */}
              <div className="px-6 pt-4 pb-2 border-b border-white/5 bg-zinc-900/40 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setAddCategory("material")}
                  className={`flex-1 py-2 px-3 rounded-xl border font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addCategory === "material"
                      ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-md scale-102"
                      : "bg-zinc-800/60 text-zinc-400 border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  <Droplet className="w-3.5 h-3.5" />
                  <span>Bahan (Aroma Material)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAddCategory("tool_or_solvent");
                    if (!addToolSubtype) setAddToolSubtype("solvent");
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl border font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addCategory === "tool_or_solvent"
                      ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-md scale-102"
                      : "bg-zinc-800/60 text-zinc-400 border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  <Beaker className="w-3.5 h-3.5" />
                  <span>Pelarut &amp; Alat Lab</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4 font-mono text-xs">
                {/* 1. INITIAL UNSELECTED STATE (User picks category) */}
                {addCategory === null && (
                  <div className="py-8 space-y-4">
                    <p className="text-center text-zinc-400 text-xs mb-6">
                      Pilih jenis item yang ingin Anda tambahkan ke lemari penyimpanan:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setAddCategory("material")}
                        className="p-5 rounded-2xl bg-zinc-900/80 border-2 border-zinc-700 hover:border-amber-400 hover:bg-zinc-800/80 flex flex-col items-center text-center gap-3 transition-all cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Droplet className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                          <strong className="block text-sm text-white font-bold group-hover:text-amber-300">
                            Bahan (Aroma Material)
                          </strong>
                          <span className="text-[11px] text-zinc-400 mt-1 block">
                            Minyak atsiri, aroma chemical, absolut, kristal, tingtur
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setAddCategory("tool_or_solvent");
                          setAddToolSubtype("solvent");
                        }}
                        className="p-5 rounded-2xl bg-zinc-900/80 border-2 border-zinc-700 hover:border-sky-400 hover:bg-zinc-800/80 flex flex-col items-center text-center gap-3 transition-all cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Beaker className="w-6 h-6 text-sky-400" />
                        </div>
                        <div>
                          <strong className="block text-sm text-white font-bold group-hover:text-sky-300">
                            Pelarut &amp; Alat Lab
                          </strong>
                          <span className="text-[11px] text-zinc-400 mt-1 block">
                            Etanol 96%, DPG, gelas beker, timbangan, kertas uji
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. FORM: BAHAN (AROMA MATERIAL) */}
                {addCategory === "material" && (
                  <form onSubmit={handleAddMaterial} className="space-y-4">
                    {/* Nama (Wajib) & Kode */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          Nama Bahan *
                        </label>
                        <input
                          type="text"
                          required
                          value={matName}
                          onChange={(e) => setMatName(e.target.value)}
                          placeholder=""
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          Kode Lab
                        </label>
                        <input
                          type="text"
                          value={matCode}
                          onChange={(e) => setMatCode(e.target.value)}
                          placeholder=""
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Animated Fragrance Family Selector with Deselect Toggle */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1.5 flex items-center justify-between">
                        <span>Fragrance Family</span>
                        {matFamily ? (
                          <span className="text-amber-400 font-bold">Terpilih: {matFamily} (Klik untuk unselect)</span>
                        ) : (
                          <span className="text-zinc-500 font-normal">Pilih profil aroma</span>
                        )}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {FRAGRANCE_FAMILIES.map((fam) => {
                          const isChosen = matFamily === fam.name;
                          return (
                            <motion.button
                              key={fam.name}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                setMatFamily((prev) => (prev === fam.name ? "" : fam.name))
                              }
                              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer relative ${
                                isChosen
                                  ? "bg-amber-500/25 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400 font-bold"
                                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                              }`}
                            >
                              <span className="text-base shrink-0">{fam.icon}</span>
                              <span className="text-[11px] truncate flex-1 leading-tight">{fam.name}</span>
                              {isChosen && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stok Awal, Satuan & Visual Kemasan (12-col Grid for Generous Space) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                      <div className="sm:col-span-4">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          Stok Awal
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={matInitialStock}
                          onChange={(e) => setMatInitialStock(e.target.value)}
                          placeholder=""
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          Satuan
                        </label>
                        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-700 w-full justify-center">
                          <button
                            type="button"
                            onClick={() => setMatUnit("g")}
                            className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                              matUnit === "g"
                                ? "bg-amber-500 text-zinc-950 font-black shadow-sm"
                                : "text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            gram (g)
                          </button>
                          <button
                            type="button"
                            onClick={() => setMatUnit("ml")}
                            className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                              matUnit === "ml"
                                ? "bg-amber-500 text-zinc-950 font-black shadow-sm"
                                : "text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            mili (ml)
                          </button>
                        </div>
                      </div>

                      <div className="sm:col-span-5">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          Visual Kemasan
                        </label>
                        <select
                          value={matBottleStyle}
                          onChange={(e) => setMatBottleStyle(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs cursor-pointer"
                        >
                          <option value="amber-dropper">Botol Dropper Amber (Standar Lab)</option>
                          <option value="clear-bottle">Botol Dropper Bening</option>
                          <option value="amber-jar">Botol Kaca Cokelat Gelap</option>
                        </select>
                      </div>
                    </div>

                    {/* Deskripsi Karakter Bahan */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                        Deskripsi Karakter Bahan
                      </label>
                      <textarea
                        rows={2}
                        value={matDescription}
                        onChange={(e) => setMatDescription(e.target.value)}
                        placeholder=""
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs font-sans"
                      />
                    </div>

                    {/* Odor & Taste */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          Odor Description
                        </label>
                        <input
                          type="text"
                          value={matOdor}
                          onChange={(e) => setMatOdor(e.target.value)}
                          placeholder=""
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          Taste Description
                        </label>
                        <input
                          type="text"
                          value={matTaste}
                          onChange={(e) => setMatTaste(e.target.value)}
                          placeholder=""
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Use Level, CAS, FEMA */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          Use Level (IFRA)
                        </label>
                        <input
                          type="text"
                          value={matUseLevel}
                          onChange={(e) => setMatUseLevel(e.target.value)}
                          placeholder=""
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          CAS #
                        </label>
                        <input
                          type="text"
                          value={matCas}
                          onChange={(e) => setMatCas(e.target.value)}
                          placeholder=""
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                          FEMA #
                        </label>
                        <input
                          type="text"
                          value={matFema}
                          onChange={(e) => setMatFema(e.target.value)}
                          placeholder=""
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black flex items-center gap-1.5 shadow-lg cursor-pointer"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Simpan ke Lemari</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* 3. FORM: PELARUT & ALAT LAB */}
                {addCategory === "tool_or_solvent" && (
                  <div className="space-y-4">
                    {/* Subtype Picker: Pelarut vs Alat Lab */}
                    <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                      <button
                        type="button"
                        onClick={() => setAddToolSubtype("solvent")}
                        className={`flex-1 py-1.5 rounded-lg border font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                          addToolSubtype === "solvent"
                            ? "bg-amber-500 text-zinc-950 border-amber-400"
                            : "bg-zinc-900 text-zinc-400 border-zinc-700"
                        }`}
                      >
                        <Droplet className="w-3.5 h-3.5" />
                        <span>Pelarut (Solvent)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddToolSubtype("tool")}
                        className={`flex-1 py-1.5 rounded-lg border font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                          addToolSubtype === "tool"
                            ? "bg-amber-500 text-zinc-950 border-amber-400"
                            : "bg-zinc-900 text-zinc-400 border-zinc-700"
                        }`}
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Alat Lab (Equipment)</span>
                      </button>
                    </div>

                    {/* Subform: Pelarut */}
                    {addToolSubtype === "solvent" && (
                      <form onSubmit={handleAddSolvent} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Nama Pelarut *
                            </label>
                            <input
                              type="text"
                              required
                              value={solvName}
                              onChange={(e) => setSolvName(e.target.value)}
                              placeholder=""
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Kode Pelarut
                            </label>
                            <input
                              type="text"
                              value={solvCode}
                              onChange={(e) => setSolvCode(e.target.value)}
                              placeholder=""
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                          <div className="sm:col-span-5">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Volume / Stok Awal
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={solvInitialStock}
                              onChange={(e) => setSolvInitialStock(e.target.value)}
                              placeholder=""
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Satuan
                            </label>
                            <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-700 w-full justify-center">
                              <button
                                type="button"
                                onClick={() => setSolvUnit("ml")}
                                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                                  solvUnit === "ml"
                                    ? "bg-amber-500 text-zinc-950 font-black shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-200"
                                }`}
                              >
                                mili (ml)
                              </button>
                              <button
                                type="button"
                                onClick={() => setSolvUnit("g")}
                                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                                  solvUnit === "g"
                                    ? "bg-amber-500 text-zinc-950 font-black shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-200"
                                }`}
                              >
                                gram (g)
                              </button>
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Grade / Kemurnian
                            </label>
                            <input
                              type="text"
                              value={solvGrade}
                              onChange={(e) => setSolvGrade(e.target.value)}
                              placeholder=""
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                            Model Kemasan Pelarut
                          </label>
                          <select
                            value={solvBottleStyle}
                            onChange={(e) => setSolvBottleStyle(e.target.value as any)}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs cursor-pointer"
                          >
                            <option value="solvent-jug">Botol Putih Lab (Etanol Style)</option>
                            <option value="amber-jar">Botol Kaca Tebal Cokelat (DPG Style)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                            Keterangan / Fungsi Pelarut
                          </label>
                          <textarea
                            rows={2}
                            value={solvDescription}
                            onChange={(e) => setSolvDescription(e.target.value)}
                            placeholder=""
                            className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs font-sans"
                          />
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black flex items-center gap-1.5 shadow-lg cursor-pointer"
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Simpan Pelarut</span>
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Subform: Alat Lab */}
                    {addToolSubtype === "tool" && (
                      <form onSubmit={handleAddTool} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Nama Alat Lab *
                            </label>
                            <input
                              type="text"
                              required
                              value={toolName}
                              onChange={(e) => setToolName(e.target.value)}
                              placeholder=""
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Kode Alat
                            </label>
                            <input
                              type="text"
                              value={toolCode}
                              onChange={(e) => setToolCode(e.target.value)}
                              placeholder=""
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                          <div className="sm:col-span-4">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Jumlah Unit
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={toolInitialStock}
                              onChange={(e) => setToolInitialStock(e.target.value)}
                              placeholder=""
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Satuan
                            </label>
                            <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-700 w-full justify-center">
                              <button
                                type="button"
                                onClick={() => setToolUnit("set")}
                                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                                  toolUnit === "set"
                                    ? "bg-amber-500 text-zinc-950 font-black shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-200"
                                }`}
                              >
                                set
                              </button>
                              <button
                                type="button"
                                onClick={() => setToolUnit("pcs")}
                                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                                  toolUnit === "pcs"
                                    ? "bg-amber-500 text-zinc-950 font-black shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-200"
                                }`}
                              >
                                pcs
                              </button>
                            </div>
                          </div>

                          <div className="sm:col-span-5">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                              Visual Alat
                            </label>
                            <select
                              value={toolStyle}
                              onChange={(e) => setToolStyle(e.target.value as any)}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs cursor-pointer"
                            >
                              <option value="beaker">Gelas Beaker &amp; Pipet</option>
                              <option value="blotter">Dudukan Kayu Blotters</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                            Fungsi / Keterangan Alat
                          </label>
                          <textarea
                            rows={2}
                            value={toolDescription}
                            onChange={(e) => setToolDescription(e.target.value)}
                            placeholder=""
                            className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-xs font-sans"
                          />
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black flex items-center gap-1.5 shadow-lg cursor-pointer"
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Simpan Alat Lab</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SHELF ITEM VISUAL COMPONENT (100% STATIC BOUNDARY, ZERO JITTER / BOUNCING)
// ---------------------------------------------------------------------------
interface ShelfItemVisualProps {
  item: CabinetItem;
  isSelected?: boolean;
  onSelect: () => void;
  onInspect: () => void;
  stockInfo: { remaining: number; used: number; percentLeft: number };
}

function ShelfItemVisual({
  item,
  isSelected,
  onSelect,
  onInspect,
  stockInfo,
}: ShelfItemVisualProps) {
  return (
    <div
      onClick={onSelect}
      className="flex flex-col items-center group cursor-pointer relative select-none"
    >
      {/* Selection Checkmark Badge */}
      {isSelected && (
        <div className="absolute -top-3.5 right-0 w-4 h-4 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center font-bold text-[9px] shadow-lg border border-amber-200 z-30">
          <Check className="w-3 h-3 stroke-[3]" />
        </div>
      )}

      {/* Quick Inspect Hover Button (Stays inside boundary, perfectly stable) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onInspect();
        }}
        title="Inspect detail bahan"
        className="absolute -top-3 left-0 w-5 h-5 rounded-full bg-zinc-900 border border-amber-500/40 text-amber-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-md cursor-pointer hover:bg-zinc-800 hover:text-white"
      >
        <Eye className="w-2.5 h-2.5" />
      </button>

      {/* Inner Graphic Container: Smooth visual scaling without affecting layout boundary */}
      <div className={`transition-transform duration-200 group-hover:scale-105 ${isSelected ? "scale-105" : ""}`}>
        {item.bottleStyle === "solvent-jug" ? (
          /* White Lab Jug (Ethanol) */
          <div className="flex flex-col items-center">
            <div className="w-5 h-3 bg-sky-950 border border-sky-600 rounded-t-xs flex items-center justify-center">
              <div className="w-3 h-0.5 bg-sky-700 rounded-full" />
            </div>
            <div className="w-4 h-1.5 bg-zinc-200 border-x border-zinc-300" />
            <div
              className={`w-14 h-24 rounded-t-xl rounded-b-sm border shadow-xl relative flex flex-col justify-between p-1 overflow-hidden transition-all ${
                isSelected ? "ring-2 ring-amber-400 border-amber-300 shadow-amber-500/40" : "border-zinc-300"
              }`}
              style={{
                background: "linear-gradient(to right, #ffffff 0%, #edf2f7 50%, #e2e8f0 100%)",
              }}
            >
              <div className="w-full bg-[#fcfbf9] border border-zinc-400/80 rounded-2xs p-1 shadow-xs my-auto text-center">
                <span className="font-mono text-[6px] font-black text-sky-950 uppercase block truncate">
                  {item.name}
                </span>
                <span className="font-mono text-[5px] text-zinc-500 block">
                  Sisa: {stockInfo.remaining.toFixed(0)} {item.unit}
                </span>
              </div>
            </div>
          </div>
        ) : item.bottleStyle === "beaker" ? (
          /* Beaker Borosilikat */
          <div className="flex flex-col items-center">
            <div className="w-13 h-20 rounded-b-md border-2 border-white/40 bg-white/10 backdrop-blur-xs shadow-md relative flex items-center justify-center">
              <div className="w-1.5 h-22 bg-white/60 border border-white/40 rounded-full transform -rotate-12 absolute -top-3 shadow-xs" />
              <div className="w-1.5 h-22 bg-white/60 border border-white/40 rounded-full transform rotate-12 absolute -top-3 shadow-xs" />
              <div className="w-full bg-black/40 py-0.5 text-center my-auto rounded-2xs">
                <span className="font-mono text-[5.5px] font-bold text-zinc-200 block truncate px-0.5">
                  {item.name}
                </span>
              </div>
            </div>
          </div>
        ) : item.bottleStyle === "blotter" ? (
          /* Blotter Stand */
          <div className="flex flex-col items-center">
            <div className="relative w-11 h-12">
              <div className="w-1.5 h-14 bg-white shadow-md rounded-t-2xs absolute left-1 bottom-0 transform -rotate-20 origin-bottom border border-zinc-200" />
              <div className="w-1.5 h-14 bg-white shadow-md rounded-t-2xs absolute left-4 bottom-0 transform rotate-15 origin-bottom border border-zinc-200" />
            </div>
            <div className="w-11 h-2.5 rounded-2xs bg-[#452715] border border-amber-900 shadow-sm text-center">
              <span className="font-mono text-[4.5px] text-amber-200 truncate block">Blotters</span>
            </div>
          </div>
        ) : item.bottleStyle === "amber-jar" ? (
          /* Amber Jar (DPG / Fixative) */
          <div className="flex flex-col items-center">
            <div className="w-5 h-2.5 bg-zinc-950 border border-zinc-800 rounded-t-2xs" />
            <div className="w-3.5 h-1 bg-[#401905]" />
            <div
              className={`w-13 h-22 rounded-t-lg rounded-b-sm border shadow-xl relative flex flex-col justify-between p-1 overflow-hidden transition-all ${
                isSelected ? "ring-2 ring-amber-400 border-amber-300 shadow-amber-500/40" : "border-amber-950"
              }`}
              style={{
                background: "linear-gradient(to right, #331404 0%, #7a3a0e 50%, #290f02 100%)",
              }}
            >
              <div className="w-full bg-[#fefbf0] border border-amber-900/60 rounded-2xs p-1 shadow-xs my-auto text-center">
                <span className="font-mono text-[5.5px] font-black text-amber-950 uppercase block truncate">
                  {item.name}
                </span>
                <span className="font-mono text-[4.5px] text-amber-900 block">
                  Sisa: {stockInfo.remaining.toFixed(0)} {item.unit}
                </span>
              </div>
            </div>
          </div>
        ) : item.bottleStyle === "clear-bottle" ? (
          /* Clear Dropper Bottle */
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-3.5 bg-zinc-900 border border-zinc-600 rounded-t-2xs shadow-xs" />
            <div className="w-2 h-1 bg-zinc-400" />
            <div
              className={`w-11 h-18 rounded-b-md border shadow-lg relative flex flex-col justify-between p-1 text-center transition-all ${
                isSelected ? "ring-2 ring-amber-400 border-amber-300 shadow-amber-500/40" : "border-white/30"
              }`}
              style={{
                background: "linear-gradient(to right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.3) 100%)",
              }}
            >
              <div className="w-full bg-[#fbf9f4] rounded-2xs py-0.5 px-0.5 border border-zinc-300 shadow-xs my-auto">
                <span className="font-mono text-[6px] font-black text-zinc-950 block truncate leading-none">
                  {item.name}
                </span>
                <span className="font-mono text-[4.5px] text-amber-900 font-bold block truncate leading-none mt-0.5">
                  {item.code}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Amber Dropper Bottle */
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-3.5 bg-zinc-950 border border-zinc-700 rounded-t-2xs shadow-xs" />
            <div className="w-2 h-1 bg-[#451f08]" />
            <div
              className={`w-11 h-18 rounded-b-md border shadow-xl relative flex flex-col justify-between p-1 text-center transition-all ${
                isSelected ? "ring-2 ring-amber-400 border-amber-300 shadow-amber-500/40" : "border-amber-950"
              }`}
              style={{
                backgroundColor: "#6b3310",
                backgroundImage: "linear-gradient(to right, #451f08 0%, #874418 50%, #451f08 100%)",
                boxShadow: "0 6px 14px rgba(0,0,0,0.8), inset 1px 0 2px rgba(255,255,255,0.2)",
              }}
            >
              <div className="w-full bg-[#fbf9f4] rounded-2xs py-0.5 px-0.5 border border-zinc-300 shadow-xs my-auto">
                <span className="font-mono text-[6px] font-black text-zinc-950 block truncate leading-none">
                  {item.name}
                </span>
                <span className="font-mono text-[4.5px] text-amber-900 font-bold block truncate leading-none mt-0.5">
                  {item.code}
                </span>
                <span className="font-mono text-[4px] text-zinc-500 block truncate mt-0.5 leading-none">
                  {stockInfo.remaining} {item.unit}
                </span>
              </div>
              <div className="text-[4.5px] font-mono text-amber-200/60 truncate leading-none">
                {item.fragranceFamily}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Item Label & Real-Time Stock Bar */}
      <div className="mt-1 text-center w-full max-w-[100px]">
        <span className="font-mono text-[8px] font-bold text-zinc-200 block truncate">
          {item.name}
        </span>
        <div className="flex items-center justify-center gap-1 text-[6.5px] font-mono text-zinc-400 mt-0.5">
          <span className="text-amber-400 font-semibold">{item.code}</span>
          <span>&bull;</span>
          <span className={stockInfo.remaining <= 0 ? "text-red-400 font-bold" : "text-emerald-400"}>
            {stockInfo.remaining <= 0 ? "Habis" : `${stockInfo.remaining} ${item.unit}`}
          </span>
        </div>
        {/* Mini Stock Progress Bar */}
        <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden mt-0.5 border border-white/5">
          <div
            className={`h-full transition-all duration-300 ${
              stockInfo.percentLeft > 40
                ? "bg-emerald-500"
                : stockInfo.percentLeft > 15
                ? "bg-amber-500"
                : "bg-red-500"
            }`}
            style={{ width: `${stockInfo.percentLeft}%` }}
          />
        </div>
      </div>
    </div>
  );
}