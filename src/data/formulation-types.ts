export interface FormulationRow {
  id: string;
  material: string;
  concPercent: number | ""; // Optional dilution % (e.g. 10, 40, or empty)
  grams: number | ""; // Weighed grams
  mods: Record<string, number | "">; // e.g. { "Mod 1": 0.100, "Mod 2": "" }
  totalGrams: number;
  percentOfTarget: number; // % relative to total target bottle volume (e.g. 5.00%)
  pureGrams?: number; // Active pure aromatic weight if concPercent is specified
}

export interface FormulationSheetData {
  id: string;
  name: string;
  targetVolumeMl: number; // e.g. 30, 50, 100
  createdAt: string;
  updatedAt: string;
  modColumns: string[]; // e.g. ["Mod 1", "Mod 2"] -> can add "Mod 3", "Mod 4", etc.
  notes?: string;
  rows: FormulationRow[];
  totalWeighedGrams: number;
  totalPercent: number; // Cumulative % of target volume (e.g. 17.00% out of 30ml)
}

export function createDefault6BlankRows(): FormulationRow[] {
  return Array.from({ length: 6 }, (_, idx) => ({
    id: `row-blank-${idx + 1}-${Date.now().toString(36)}`,
    material: "",
    concPercent: "",
    grams: "",
    mods: { "Mod 1": "", "Mod 2": "" },
    totalGrams: 0,
    percentOfTarget: 0,
  }));
}

// Default blank formulation sheet (6 ready blank rows as requested!)
export const BLANK_FORMULATION_SHEET: FormulationSheetData = {
  id: "sheet-draft",
  name: "Untitled Formula",
  targetVolumeMl: 30, // Default 30 ml bottle
  createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
  updatedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
  modColumns: ["Mod 1", "Mod 2"],
  notes: "",
  rows: createDefault6BlankRows(),
  totalWeighedGrams: 0,
  totalPercent: 0,
};

// Historical template archive (Summer Dreams from photo)
export const SUMMER_DREAMS_ARCHIVE: FormulationSheetData = {
  id: "sheet-summer-dreams",
  name: "Summer Dreams",
  targetVolumeMl: 30,
  createdAt: "2026-11-11 10:15",
  updatedAt: "2026-11-11 10:15",
  modColumns: ["Mod 1", "Mod 2", "Mod 3"],
  notes: "Formula pembuka aromatik woody tobacco dengan fiksasi Galaxolide.",
  rows: [
    {
      id: "row-1",
      material: "Coumarin",
      concPercent: 10,
      grams: 0.250,
      mods: { "Mod 1": "", "Mod 2": "", "Mod 3": "" },
      totalGrams: 0.250,
      percentOfTarget: 0.83,
    },
    {
      id: "row-2",
      material: "Virginian Cedarwood",
      concPercent: "",
      grams: 0.125,
      mods: { "Mod 1": "", "Mod 2": "", "Mod 3": "" },
      totalGrams: 0.125,
      percentOfTarget: 0.42,
    },
    {
      id: "row-3",
      material: "Clarysage",
      concPercent: "",
      grams: 0.125,
      mods: { "Mod 1": "", "Mod 2": "", "Mod 3": "" },
      totalGrams: 0.125,
      percentOfTarget: 0.42,
    },
    {
      id: "row-4",
      material: "Vetiver Acetate",
      concPercent: "",
      grams: 0.250,
      mods: { "Mod 1": "", "Mod 2": "", "Mod 3": "" },
      totalGrams: 0.250,
      percentOfTarget: 0.83,
    },
    {
      id: "row-5",
      material: "Tobacco Absolute",
      concPercent: 10,
      grams: 0.250,
      mods: { "Mod 1": "", "Mod 2": "", "Mod 3": "" },
      totalGrams: 0.250,
      percentOfTarget: 0.83,
    },
    {
      id: "row-6",
      material: "Galaxolide",
      concPercent: 50,
      grams: 0.250,
      mods: { "Mod 1": "", "Mod 2": "", "Mod 3": "" },
      totalGrams: 0.250,
      percentOfTarget: 0.83,
    },
  ],
  totalWeighedGrams: 1.250,
  totalPercent: 4.16,
};

// Categorized palette suggestions for animated selection slider/panel
export interface PaletteCategory {
  category: string;
  items: { name: string; defaultConc?: number; note: string }[];
}

export const CATEGORIZED_PALETTE: PaletteCategory[] = [
  {
    category: "Top Notes & Citrus",
    items: [
      { name: "Bergamot Oil Expressed (FCF)", note: "Segar zesty, bebas furocoumarin" },
      { name: "Lemon Sicily Oil", note: "Sparkling citrus segar" },
      { name: "Pink Grapefruit", note: "Pahit manis cerah" },
      { name: "Mandarin Red", note: "Manis juicy lembut" },
      { name: "Linalool", note: "Herbal lavender citrus" },
    ],
  },
  {
    category: "Heart & Florals",
    items: [
      { name: "Hedione (Methyl Jasmonate)", note: "Penyebar difusi & melati transparan" },
      { name: "Rose Damascena Absolute", defaultConc: 10, note: "Mawar mewah beludru" },
      { name: "Jasmine Sambac Absolute", defaultConc: 10, note: "Melati tropis sensual" },
      { name: "Neroli Tunisia", note: "Bunga jeruk segar cerah" },
      { name: "Lavender Maillette", note: "Aromatik herbal klasik" },
      { name: "Geranium Bourbon", note: "Rosy herbal hijau" },
    ],
  },
  {
    category: "Woody, Roots & Resins",
    items: [
      { name: "Iso E Super", note: "Kayu cedar beludru & fiksatif modern" },
      { name: "Virginian Cedarwood", note: "Kayu pensil kering bersih" },
      { name: "Sandalwood Spicatum", note: "Kayu cendana creamy hangat" },
      { name: "Patchouli Dark", note: "Aroma bumi hangat basah" },
      { name: "Vetiver Haiti", note: "Akar tanah smoky bersahaja" },
      { name: "Vetiver Acetate", note: "Vetiver bersih modern" },
      { name: "Labdanum Resinoid", defaultConc: 50, note: "Getah amber tembakau purba" },
      { name: "Benzoin Siam", defaultConc: 50, note: "Dupa manis balsamik" },
    ],
  },
  {
    category: "Molecules, Musks & Fixatives",
    items: [
      { name: "Ambroxan", defaultConc: 10, note: "Ambergris mineral radiasi kering" },
      { name: "Galaxolide (50% IPM)", defaultConc: 50, note: "Kebersihan kain bersih 24+ jam" },
      { name: "Ethylene Brassylate", note: "Musk makrosiklik lembut manis" },
      { name: "Helvetolide", note: "Musk modern bercahaya" },
      { name: "Coumarin", defaultConc: 10, note: "Kacang tonka almond hangat" },
      { name: "Vanillin", defaultConc: 10, note: "Manis balsamik krimi" },
      { name: "Oakmoss Absolute (Low-Atranol)", defaultConc: 10, note: "Lumut ek bersahaja khas chypre" },
    ],
  },
  {
    category: "Solvents & Dilution",
    items: [
      { name: "DPG (Dipropylene Glycol)", note: "Pelarut predilution non-volatil" },
      { name: "TEC (Triethyl Citrate)", note: "Pelarut fiksatif ramah alami" },
      { name: "Etanol 96% (Perfumer's Alcohol)", note: "Pelarut utama semprotan parfum" },
    ],
  },
];
