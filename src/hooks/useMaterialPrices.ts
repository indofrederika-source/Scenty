"use client";

import { useState, useEffect } from "react";

export interface MaterialPriceItem {
  id: string;
  material: string;
  pricePerGram: number; // Harga dalam Rupiah per gram (IDR/g)
}

export const DEFAULT_MATERIAL_PRICES: MaterialPriceItem[] = [
  { id: "p-1", material: "Bergamot Oil Expressed (FCF)", pricePerGram: 4500 },
  { id: "p-2", material: "Iso E Super", pricePerGram: 1200 },
  { id: "p-3", material: "Ambroxan", pricePerGram: 15000 },
  { id: "p-4", material: "Hedione (Methyl Jasmonate)", pricePerGram: 1800 },
  { id: "p-5", material: "Vanillin Murni", pricePerGram: 2500 },
  { id: "p-6", material: "Damascenone Total", pricePerGram: 28000 },
  { id: "p-7", material: "Labdanum Resinoid", pricePerGram: 6000 },
  { id: "p-8", material: "Oakmoss Low Atranol", pricePerGram: 9500 },
  { id: "p-9", material: "Etanol 96% (Perfumer's Alcohol)", pricePerGram: 80 },
  { id: "p-10", material: "DPG (Dipropylene Glycol)", pricePerGram: 150 },
];

const STORAGE_KEY = "scenty_material_prices_v1";

export function useMaterialPrices() {
  const [prices, setPrices] = useState<MaterialPriceItem[]>(DEFAULT_MATERIAL_PRICES);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPrices(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load material prices from localStorage", e);
    }
  }, []);

  const savePrices = (updated: MaterialPriceItem[]) => {
    setPrices(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      // Dispatch custom event so other components listening on same tab update instantly
      window.dispatchEvent(new Event("scenty_prices_updated"));
    } catch (e) {
      console.warn("Could not save material prices to localStorage", e);
    }
  };

  // Sync across tabs or components
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setPrices(parsed);
          }
        }
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener("scenty_prices_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("scenty_prices_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const getPriceForMaterial = (materialName: string): number => {
    if (!materialName || !materialName.trim()) return 0;
    const cleanQuery = materialName.toLowerCase().trim();

    // Direct match or partial match
    const found = prices.find((p) => {
      const cleanP = p.material.toLowerCase().trim();
      return cleanP === cleanQuery || cleanQuery.includes(cleanP) || cleanP.includes(cleanQuery);
    });

    return found ? found.pricePerGram : 0;
  };

  const setPriceForMaterial = (materialName: string, pricePerGram: number) => {
    const cleanName = materialName.trim();
    if (!cleanName) return;

    const existingIdx = prices.findIndex(
      (p) => p.material.toLowerCase() === cleanName.toLowerCase()
    );

    let updated: MaterialPriceItem[];
    if (existingIdx >= 0) {
      updated = [...prices];
      updated[existingIdx] = { ...updated[existingIdx], pricePerGram };
    } else {
      updated = [
        ...prices,
        {
          id: `p-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          material: cleanName,
          pricePerGram,
        },
      ];
    }

    savePrices(updated);
  };

  return {
    prices,
    savePrices,
    getPriceForMaterial,
    setPriceForMaterial,
  };
}
