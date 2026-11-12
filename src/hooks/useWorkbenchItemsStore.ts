"use client";

import { useState, useEffect } from "react";

export interface CabinetItem {
  id: string;
  name: string;
  code: string;
  category: "solvent" | "material" | "tool"; // "solvent" & "tool" are in Pelarut & Alat, "material" is in Bahan
  type: string;
  fragranceFamily: string;
  description: string;
  odorDescription: string;
  tasteDescription?: string;
  useLevel: string;
  casNumber: string;
  femaNumber?: string;
  initialStock: number;
  currentStock: number;
  unit: "g" | "ml" | "set" | "pcs" | "unit" | "L";
  vol: string;
  tier: 1 | 2; // 1: Pelarut & Alat, 2: Bahan
  bottleStyle?: "amber-dropper" | "amber-jar" | "clear-bottle" | "solvent-jug" | "beaker" | "blotter";
  color?: string;
  isCustom?: boolean;
}

export const DEFAULT_DEMO_CABINET_ITEMS: CabinetItem[] = [
  // ---------------------------------------------------------------------------
  // TIER 1: PELARUT & ALAT (Solvents & Lab Equipment)
  // ---------------------------------------------------------------------------
  {
    id: "sol-etanol",
    name: "Etanol 96% Lab Grade",
    code: "ET-96",
    category: "solvent",
    type: "Solvent",
    fragranceFamily: "Solvent Carrier",
    description: "Alkohol perfumer's grade 96% murni kualitas laboratorium tanpa bau residu distilasi, formula denaturasi standar IFRA sebagai carrier pelarut konsentrat wewangian.",
    odorDescription: "Netral, Aromatic Clean, Sangat Volatil",
    tasteDescription: "Pungent, Alcoholic (Tidak untuk konsumsi)",
    useLevel: "60% - 90% (Sebagai Carrier Pelarut EDP/EDT)",
    casNumber: "64-17-5",
    femaNumber: "2419",
    initialStock: 1000,
    currentStock: 1000,
    unit: "ml",
    vol: "1000 ml",
    tier: 1,
    bottleStyle: "solvent-jug",
  },
  {
    id: "sol-dpg",
    name: "DPG Murni Predilution",
    code: "DPG-50",
    category: "solvent",
    type: "Solvent",
    fragranceFamily: "Solvent & Fixative",
    description: "Dipropylene Glycol berderajat kemurnian 99.8%. Pelarut odorless bebas aroma yang berfungsi sebagai media predilusi kristal/resin kental serta agen penahan penguapan (fixative carrier).",
    odorDescription: "Hampir tidak berbau (Odorless), Lembut, Netral",
    tasteDescription: "Pahit ringan, Sirup netral",
    useLevel: "5% - 50% (Media Predilusi Bahan Padat)",
    casNumber: "25265-71-8",
    initialStock: 500,
    currentStock: 500,
    unit: "ml",
    vol: "500 ml",
    tier: 1,
    bottleStyle: "amber-jar",
  },
  {
    id: "tool-beaker",
    name: "Beaker Borosilikat & Pipet Ukur",
    code: "BKR-01",
    category: "tool",
    type: "Glassware",
    fragranceFamily: "Glassware Lab",
    description: "Set gelas beaker laboratorium kaca borosilikat tahan pelarut kimia beserta pipet transfer ukur presisi untuk pencampuran formula dan akord aromatik meja racik.",
    odorDescription: "Non-porous inert laboratory glass",
    tasteDescription: "N/A",
    useLevel: "Peralatan Formulasi Meja",
    casNumber: "N/A",
    initialStock: 1,
    currentStock: 1,
    unit: "set",
    vol: "Set 100 ml",
    tier: 1,
    bottleStyle: "beaker",
  },
  {
    id: "tool-blotters",
    name: "Dudukan Kayu & Kertas Blotter",
    code: "BLT-01",
    category: "tool",
    type: "Blotters",
    fragranceFamily: "Olfactive Testing",
    description: "Dudukan kayu solid untuk strip kertas smelling blotter bebas pemutih klorin untuk evaluasi evaporasi drydown aroma fase top, heart, dan base.",
    odorDescription: "Odorless virgin absorbent paper",
    tasteDescription: "N/A",
    useLevel: "Evaluasi Olfaktori",
    casNumber: "N/A",
    initialStock: 1,
    currentStock: 1,
    unit: "set",
    vol: "Set 50 Strip",
    tier: 1,
    bottleStyle: "blotter",
  },

  // ---------------------------------------------------------------------------
  // TIER 2: BAHAN (3 Demo Bahan Lengkap Sesuai Permintaan User)
  // ---------------------------------------------------------------------------
  {
    id: "mat-acetic-acid",
    name: "Acetic Acid",
    code: "ACA-01",
    category: "material",
    type: "Synthetic Molecule",
    fragranceFamily: "Synthetic Molecule",
    description: "Acetic Acid is a food additive that adds a sour kind of flavor and can also be used in perfume to add a sharp dimension to certain fragrance profiles.",
    odorDescription: "Acidic, Pungent, Sour, Vinegar",
    tasteDescription: "Sour, Pungent, Overripe Fruit",
    useLevel: "1 - 300 ppm",
    casNumber: "64-19-7",
    femaNumber: "2006",
    initialStock: 100,
    currentStock: 100,
    unit: "g",
    vol: "100 g",
    tier: 2,
    bottleStyle: "amber-dropper",
  },
  {
    id: "mat-isoe",
    name: "Iso E Super",
    code: "IES-99",
    category: "material",
    type: "Synthetic",
    fragranceFamily: "Woody / Amber",
    description: "Iso E Super is an iconic synthetic woody-amber aroma chemical known for its transparent, velvet cedarwood aroma, skin-like aura, and powerful fixing and blooming qualities in modern perfumery.",
    odorDescription: "Woody, Cedar, Ambergris, Dry, Velvet, Floral-undertone",
    tasteDescription: "Woody, Cedar, Clean",
    useLevel: "1 - 25% (IFRA Kategori 4 max 21.4%)",
    casNumber: "54464-57-2",
    femaNumber: "4578",
    initialStock: 250,
    currentStock: 250,
    unit: "g",
    vol: "250 g",
    tier: 2,
    bottleStyle: "amber-dropper",
  },
  {
    id: "mat-bergamot",
    name: "Bergamot Oil Expressed (FCF)",
    code: "BER-01",
    category: "material",
    type: "Citrus",
    fragranceFamily: "Citrus",
    description: "Cold-pressed peel oil treated to remove phototoxic bergapten/furocoumarins. Essential sparkling top note of classic Chypres, Colognes, and modern citrus bouquets with bright zest and Earl Grey nuances.",
    odorDescription: "Fresh, Sparkling, Bitter-Sweet, Citrus, Herbal-tea Earl Grey",
    tasteDescription: "Bitter-Sweet Orange Peel, Tart, Astringent",
    useLevel: "0.5 - 5% (IFRA Phototoxicity Safe)",
    casNumber: "8007-75-8 / 68648-33-9",
    femaNumber: "2153",
    initialStock: 100,
    currentStock: 100,
    unit: "g",
    vol: "100 g",
    tier: 2,
    bottleStyle: "amber-dropper",
  },
];

// Backwards-compatible export
export const ALL_CABINET_ITEMS = DEFAULT_DEMO_CABINET_ITEMS;

const ACTIVE_STORAGE_KEY = "scenty_workbench_active_items_v3";
const CABINET_ITEMS_KEY = "scenty_cabinet_items_v4";

export function useWorkbenchItemsStore() {
  const [cabinetItems, setCabinetItems] = useState<CabinetItem[]>(DEFAULT_DEMO_CABINET_ITEMS);
  const [activeItemIds, setActiveItemIds] = useState<string[]>([]);
  const [stagingItemIds, setStagingItemIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Load cabinet items and active items from localStorage on mount
  useEffect(() => {
    try {
      // 1. Cabinet items
      const storedCabinet = localStorage.getItem(CABINET_ITEMS_KEY);
      if (storedCabinet) {
        const parsed = JSON.parse(storedCabinet);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCabinetItems(parsed);
        }
      }

      // 2. Active workbench items
      const storedActive = localStorage.getItem(ACTIVE_STORAGE_KEY);
      if (storedActive) {
        const parsed = JSON.parse(storedActive);
        if (Array.isArray(parsed)) {
          setActiveItemIds(parsed);
          setStagingItemIds(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load workbench / cabinet items", e);
    }
  }, []);

  const saveCabinetItems = (items: CabinetItem[]) => {
    setCabinetItems(items);
    try {
      localStorage.setItem(CABINET_ITEMS_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event("scenty_cabinet_items_updated"));
    } catch (e) {
      console.warn("Could not save cabinet items", e);
    }
  };

  const saveActiveItems = (ids: string[]) => {
    setActiveItemIds(ids);
    try {
      localStorage.setItem(ACTIVE_STORAGE_KEY, JSON.stringify(ids));
      window.dispatchEvent(new Event("scenty_workbench_items_updated"));
    } catch (e) {
      console.warn("Could not save active workbench items", e);
    }
  };

  // Sync across tabs & components
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const storedActive = localStorage.getItem(ACTIVE_STORAGE_KEY);
        if (storedActive) {
          const parsed = JSON.parse(storedActive);
          if (Array.isArray(parsed)) {
            setActiveItemIds(parsed);
          }
        }
        const storedCabinet = localStorage.getItem(CABINET_ITEMS_KEY);
        if (storedCabinet) {
          const parsed = JSON.parse(storedCabinet);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCabinetItems(parsed);
          }
        }
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener("scenty_workbench_items_updated", handleUpdate);
    window.addEventListener("scenty_cabinet_items_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("scenty_workbench_items_updated", handleUpdate);
      window.removeEventListener("scenty_cabinet_items_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Add new item to storage cabinet
  const addCabinetItem = (newItem: Omit<CabinetItem, "id"> & { id?: string }) => {
    const id = newItem.id || `custom-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const completeItem: CabinetItem = {
      ...newItem,
      id,
      isCustom: true,
      initialStock: Number(newItem.initialStock) || 50,
      currentStock: Number(newItem.currentStock) || Number(newItem.initialStock) || 50,
      vol: `${newItem.initialStock} ${newItem.unit}`,
    };
    const updated = [...cabinetItems, completeItem];
    saveCabinetItems(updated);
    return completeItem;
  };

  // Delete item from storage cabinet
  const deleteCabinetItem = (id: string) => {
    const updated = cabinetItems.filter((i) => i.id !== id);
    saveCabinetItems(updated);
    if (activeItemIds.includes(id)) {
      saveActiveItems(activeItemIds.filter((x) => x !== id));
    }
    if (stagingItemIds.includes(id)) {
      setStagingItemIds((prev) => prev.filter((x) => x !== id));
    }
  };

  // Update item details or stock
  const updateCabinetItem = (id: string, updates: Partial<CabinetItem>) => {
    const updated = cabinetItems.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    saveCabinetItems(updated);
  };

  // Compute remaining stock taking into account formulation sheet usage
  const getRemainingStock = (
    item: CabinetItem,
    formulaRows?: { material: string; totalGrams?: number }[]
  ): { remaining: number; used: number; percentLeft: number } => {
    if (!formulaRows || formulaRows.length === 0) {
      return {
        remaining: item.currentStock,
        used: 0,
        percentLeft: 100,
      };
    }

    const itemNameLower = item.name.toLowerCase().trim();
    const itemCodeLower = item.code.toLowerCase().trim();

    let usedGrams = 0;
    for (const r of formulaRows) {
      if (!r.material) continue;
      const matLower = r.material.toLowerCase().trim();
      if (
        matLower === itemNameLower ||
        matLower.includes(itemNameLower) ||
        itemNameLower.includes(matLower) ||
        (itemCodeLower && matLower.includes(itemCodeLower))
      ) {
        usedGrams += Number(r.totalGrams) || 0;
      }
    }

    const remaining = Math.max(0, Number((item.currentStock - usedGrams).toFixed(3)));
    const percentLeft = item.initialStock > 0 ? Math.min(100, Math.max(0, (remaining / item.initialStock) * 100)) : 100;

    return {
      remaining,
      used: Number(usedGrams.toFixed(3)),
      percentLeft: Number(percentLeft.toFixed(1)),
    };
  };

  // Enter selection mode in cabinet
  const startPreparation = () => {
    setStagingItemIds([...activeItemIds]);
    setIsSelectionMode(true);
  };

  // Toggle selection while in cabinet
  const toggleStagingItem = (id: string) => {
    setStagingItemIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Select all items in a tier or category
  const selectAllCategory = (category: "material" | "solvent" | "tool") => {
    const ids = cabinetItems.filter((i) => i.category === category).map((i) => i.id);
    setStagingItemIds((prev) => Array.from(new Set([...prev, ...ids])));
  };

  // Confirm selection and bring to workbench
  const confirmSelection = () => {
    saveActiveItems(stagingItemIds);
    setIsSelectionMode(false);
  };

  // Cancel selection
  const cancelSelection = () => {
    setStagingItemIds([...activeItemIds]);
    setIsSelectionMode(false);
  };

  // Clear all items from workbench
  const clearWorkbench = () => {
    saveActiveItems([]);
    setStagingItemIds([]);
  };

  const activeItems = cabinetItems.filter((i) => activeItemIds.includes(i.id));
  const activeMaterials = activeItems.filter((i) => i.category === "material");
  const hasEthanol = activeItemIds.includes("sol-etanol");
  const hasDPG = activeItemIds.includes("sol-dpg");
  const hasBeaker = activeItemIds.includes("tool-beaker");
  const hasBlotters = activeItemIds.includes("tool-blotters");

  return {
    cabinetItems,
    activeItemIds,
    stagingItemIds,
    isSelectionMode,
    addCabinetItem,
    deleteCabinetItem,
    updateCabinetItem,
    getRemainingStock,
    startPreparation,
    toggleStagingItem,
    selectAllCategory,
    confirmSelection,
    cancelSelection,
    clearWorkbench,
    activeItems,
    activeMaterials,
    hasEthanol,
    hasDPG,
    hasBeaker,
    hasBlotters,
  };
}
