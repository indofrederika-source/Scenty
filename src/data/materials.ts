/**
 * Katalog aset bahan baku.
 * Nama bahan & istilah perfumery TIDAK diterjemahkan.
 * CAS number dan molecular weight mengikuti data referensi standar industri.
 * `image` bernilai null bila foto belum diproduksi.
 */

export type Tier = "top" | "heart" | "base" | "solvent";
export type MaterialType = "natural" | "aroma-chemical" | "solvent";

export interface MaterialAsset {
  slug: string;
  name: string;
  botanical?: string;
  type: MaterialType;
  tier: Tier;
  cas: string;
  formula?: string;
  mw?: number; // g/mol, hanya untuk molekul tunggal
  extraction?: string;
  odor: string[]; // descriptor olfaktori (istilah asli)
  keyConstituents?: string[];
  appearance: string;
  image: string | null;
}

const img = (slug: string, available: boolean) =>
  available ? `/assets/materials/${slug}.jpg` : null;

export const MATERIALS: MaterialAsset[] = [
  // ——— NATURALS · TOP ———
  {
    slug: "bergamot", name: "Bergamot Oil", botanical: "Citrus bergamia", type: "natural", tier: "top",
    cas: "8007-75-8", extraction: "Cold expression",
    odor: ["citrus", "fresh", "floral", "slightly bitter"],
    keyConstituents: ["Limonene", "Linalyl Acetate", "Linalool"],
    appearance: "Cairan encer, hijau kekuningan", image: img("bergamot", true),
  },
  {
    slug: "lemon", name: "Lemon Oil", botanical: "Citrus limon", type: "natural", tier: "top",
    cas: "8008-56-8", extraction: "Cold expression",
    odor: ["citrus", "zesty", "fresh"], keyConstituents: ["Limonene", "β-Pinene", "Citral"],
    appearance: "Cairan encer, kuning pucat", image: img("lemon", true),
  },
  {
    slug: "grapefruit", name: "Grapefruit Oil", botanical: "Citrus paradisi", type: "natural", tier: "top",
    cas: "8016-20-4", extraction: "Cold expression",
    odor: ["citrus", "bitter", "juicy"], keyConstituents: ["Limonene", "Nootkatone"],
    appearance: "Cairan encer, kuning hingga jingga", image: img("grapefruit", true),
  },
  {
    slug: "neroli", name: "Neroli Oil", botanical: "Citrus aurantium (flowers)", type: "natural", tier: "top",
    cas: "8016-38-4", extraction: "Steam distillation",
    odor: ["floral", "citrus", "green", "honeyed"], keyConstituents: ["Linalool", "Limonene", "Linalyl Acetate"],
    appearance: "Cairan encer, kuning pucat", image: img("neroli", false),
  },
  {
    slug: "pink-pepper", name: "Pink Pepper Oil", botanical: "Schinus molle", type: "natural", tier: "top",
    cas: "68917-52-2", extraction: "Steam distillation",
    odor: ["spicy", "fresh", "rosy", "dry"], keyConstituents: ["α-Phellandrene", "Limonene", "Myrcene"],
    appearance: "Cairan encer, kuning pucat", image: img("pink-pepper", false),
  },
  {
    slug: "cardamom", name: "Cardamom Oil", botanical: "Elettaria cardamomum", type: "natural", tier: "top",
    cas: "8000-66-6", extraction: "Steam distillation",
    odor: ["spicy", "aromatic", "camphoraceous"], keyConstituents: ["1,8-Cineole", "α-Terpinyl Acetate"],
    appearance: "Cairan encer, tidak berwarna hingga kuning pucat", image: img("cardamom", false),
  },
  {
    slug: "lavender", name: "Lavender Oil", botanical: "Lavandula angustifolia", type: "natural", tier: "top",
    cas: "8000-28-0", extraction: "Steam distillation",
    odor: ["aromatic", "floral", "herbal"], keyConstituents: ["Linalool", "Linalyl Acetate"],
    appearance: "Cairan encer, tidak berwarna hingga kuning pucat", image: img("lavender", false),
  },
  {
    slug: "frankincense", name: "Frankincense Oil (Olibanum)", botanical: "Boswellia carterii", type: "natural", tier: "top",
    cas: "8016-36-2", extraction: "Steam distillation",
    odor: ["resinous", "fresh", "incense", "lemony"], keyConstituents: ["α-Pinene", "Limonene"],
    appearance: "Cairan encer, tidak berwarna hingga kuning pucat", image: img("frankincense", false),
  },

  // ——— NATURALS · HEART ———
  {
    slug: "rose-damascena", name: "Rose Absolute", botanical: "Rosa damascena", type: "natural", tier: "heart",
    cas: "90106-38-0", extraction: "Solvent extraction",
    odor: ["floral", "rosy", "honeyed", "spicy"], keyConstituents: ["Phenylethyl Alcohol", "Citronellol", "Geraniol"],
    appearance: "Cairan kental, jingga kemerahan", image: img("rose-damascena", false),
  },
  {
    slug: "jasmine-sambac", name: "Jasmine Sambac Absolute", botanical: "Jasminum sambac", type: "natural", tier: "heart",
    cas: "91770-14-8", extraction: "Solvent extraction",
    odor: ["floral", "white floral", "indolic", "fruity"], keyConstituents: ["Benzyl Acetate", "Linalool", "Indole", "Methyl Anthranilate"],
    appearance: "Cairan kental, jingga kecokelatan", image: img("jasmine-sambac", false),
  },
  {
    slug: "tuberose", name: "Tuberose Absolute", botanical: "Polianthes tuberosa", type: "natural", tier: "heart",
    cas: "8024-05-3", extraction: "Solvent extraction",
    odor: ["white floral", "creamy", "narcotic"], keyConstituents: ["Methyl Benzoate", "Methyl Salicylate", "Benzyl Benzoate"],
    appearance: "Cairan kental, jingga tua hingga cokelat", image: img("tuberose", false),
  },
  {
    slug: "orris", name: "Orris Butter", botanical: "Iris pallida (rhizome)", type: "natural", tier: "heart",
    cas: "8002-73-1", extraction: "Steam distillation",
    odor: ["powdery", "violet", "woody", "carroty"], keyConstituents: ["Irone", "Myristic Acid"],
    appearance: "Padatan berlilin, krem", image: img("orris", false),
  },
  {
    slug: "geranium", name: "Geranium Bourbon Oil", botanical: "Pelargonium graveolens", type: "natural", tier: "heart",
    cas: "8000-46-2", extraction: "Steam distillation",
    odor: ["rosy", "green", "minty"], keyConstituents: ["Citronellol", "Geraniol", "Citronellyl Formate"],
    appearance: "Cairan encer, hijau zaitun hingga amber", image: img("geranium", false),
  },
  {
    slug: "ylang-ylang", name: "Ylang Ylang Oil", botanical: "Cananga odorata", type: "natural", tier: "heart",
    cas: "8006-81-3", extraction: "Steam distillation (fractional)",
    odor: ["floral", "creamy", "banana", "spicy"], keyConstituents: ["Linalool", "Benzyl Acetate", "p-Cresyl Methyl Ether", "Isoeugenol"],
    appearance: "Cairan encer, kuning pucat", image: img("ylang-ylang", false),
  },
  {
    slug: "clove-bud", name: "Clove Bud Oil", botanical: "Syzygium aromaticum", type: "natural", tier: "heart",
    cas: "8000-34-8", extraction: "Steam distillation",
    odor: ["spicy", "warm", "phenolic"], keyConstituents: ["Eugenol", "Eugenyl Acetate", "β-Caryophyllene"],
    appearance: "Cairan encer, kuning pucat", image: img("clove-bud", true),
  },

  // ——— NATURALS · BASE ———
  {
    slug: "patchouli", name: "Patchouli Oil", botanical: "Pogostemon cablin", type: "natural", tier: "base",
    cas: "8014-09-3", extraction: "Steam distillation",
    odor: ["earthy", "woody", "camphoraceous", "dark"], keyConstituents: ["Patchoulol", "α-Bulnesene", "α-Guaiene"],
    appearance: "Cairan kental, amber hingga cokelat kemerahan", image: img("patchouli", true),
  },
  {
    slug: "vetiver", name: "Vetiver Oil", botanical: "Chrysopogon zizanioides", type: "natural", tier: "base",
    cas: "8016-96-4", extraction: "Steam distillation",
    odor: ["woody", "earthy", "smoky", "rooty"], keyConstituents: ["Khusimol", "Vetiselinenol", "α-Vetivone"],
    appearance: "Cairan kental, amber kecokelatan", image: img("vetiver", true),
  },
  {
    slug: "sandalwood", name: "Sandalwood Oil", botanical: "Santalum album", type: "natural", tier: "base",
    cas: "8006-87-9", extraction: "Steam distillation",
    odor: ["woody", "creamy", "milky", "soft"], keyConstituents: ["α-Santalol", "β-Santalol"],
    appearance: "Cairan kental, kuning pucat", image: img("sandalwood", true),
  },
  {
    slug: "cedarwood-virginia", name: "Cedarwood Virginia Oil", botanical: "Juniperus virginiana", type: "natural", tier: "base",
    cas: "8000-27-9", extraction: "Steam distillation",
    odor: ["woody", "dry", "pencil shavings"], keyConstituents: ["α-Cedrene", "Thujopsene", "Cedrol"],
    appearance: "Cairan agak kental, kuning pucat", image: img("cedarwood-virginia", false),
  },
  {
    slug: "oud", name: "Oud Oil (Agarwood)", botanical: "Aquilaria spp.", type: "natural", tier: "base",
    cas: "94350-09-1", extraction: "Hydrodistillation",
    odor: ["woody", "animalic", "leathery", "resinous"], keyConstituents: ["Agarospirol", "Jinkoh-eremol", "2-(2-Phenylethyl)chromones"],
    appearance: "Cairan kental, cokelat sangat gelap", image: img("oud", false),
  },
  {
    slug: "labdanum", name: "Labdanum Resinoid", botanical: "Cistus ladanifer", type: "natural", tier: "base",
    cas: "8016-26-0", extraction: "Solvent extraction",
    odor: ["amber", "balsamic", "leathery", "ambergris-like"], keyConstituents: ["Labdane diterpenes"],
    appearance: "Pasta sangat lengket, cokelat gelap", image: img("labdanum", false),
  },
  {
    slug: "benzoin", name: "Benzoin Siam Resinoid", botanical: "Styrax tonkinensis", type: "natural", tier: "base",
    cas: "9000-72-0", extraction: "Solvent extraction",
    odor: ["balsamic", "vanilla", "sweet", "resinous"], keyConstituents: ["Coniferyl Benzoate", "Benzoic Acid", "Vanillin"],
    appearance: "Cairan kental, amber kecokelatan", image: img("benzoin", false),
  },
  {
    slug: "vanilla", name: "Vanilla Absolute", botanical: "Vanilla planifolia", type: "natural", tier: "base",
    cas: "8024-06-4", extraction: "Solvent extraction",
    odor: ["vanilla", "sweet", "balsamic", "boozy"], keyConstituents: ["Vanillin", "p-Hydroxybenzaldehyde"],
    appearance: "Cairan kental, cokelat gelap", image: img("vanilla", false),
  },
  {
    slug: "tonka-bean", name: "Tonka Bean Absolute", botanical: "Dipteryx odorata", type: "natural", tier: "base",
    cas: "8046-22-8", extraction: "Solvent extraction",
    odor: ["sweet", "hay", "almond", "tobacco"], keyConstituents: ["Coumarin"],
    appearance: "Cairan kental, amber kecokelatan", image: img("tonka-bean", false),
  },
  {
    slug: "oakmoss", name: "Oakmoss Absolute", botanical: "Evernia prunastri", type: "natural", tier: "base",
    cas: "90028-68-5", extraction: "Solvent extraction",
    odor: ["mossy", "earthy", "inky", "woody"], keyConstituents: ["Methyl β-Orcinolcarboxylate", "Atranol", "Chloroatranol"],
    appearance: "Pasta sangat kental, hijau gelap", image: img("oakmoss", false),
  },

  // ——— AROMA CHEMICALS ———
  {
    slug: "aldehyde-c12-mna", name: "Aldehyde C-12 MNA", type: "aroma-chemical", tier: "top",
    cas: "110-41-8", formula: "C12H24O", mw: 184.32,
    odor: ["aldehydic", "ambergris", "waxy", "clean"], appearance: "Cairan encer, tidak berwarna", image: img("aldehyde-c12-mna", false),
  },
  {
    slug: "dihydromyrcenol", name: "Dihydromyrcenol", type: "aroma-chemical", tier: "top",
    cas: "18479-58-8", formula: "C10H20O", mw: 156.27,
    odor: ["fresh", "citrus", "metallic", "lime"], appearance: "Cairan encer, tidak berwarna", image: img("dihydromyrcenol", false),
  },
  {
    slug: "calone", name: "Calone 1951", type: "aroma-chemical", tier: "heart",
    cas: "28940-11-6", formula: "C10H10O3", mw: 178.18,
    odor: ["marine", "watery", "melon", "ozonic"], appearance: "Kristal putih", image: img("calone", false),
  },
  {
    slug: "hedione", name: "Hedione", type: "aroma-chemical", tier: "heart",
    cas: "24851-98-7", formula: "C13H22O3", mw: 226.31,
    odor: ["jasmine", "transparent", "citrus", "airy"], appearance: "Cairan encer, tidak berwarna", image: img("hedione", true),
  },
  {
    slug: "indole", name: "Indole", type: "aroma-chemical", tier: "heart",
    cas: "120-72-9", formula: "C8H7N", mw: 117.15,
    odor: ["animalic", "indolic", "white floral (diluted)"], appearance: "Kristal serpih, putih keabu-abuan", image: img("indole", false),
  },
  {
    slug: "ethyl-maltol", name: "Ethyl Maltol", type: "aroma-chemical", tier: "heart",
    cas: "4940-11-8", formula: "C7H8O3", mw: 140.14,
    odor: ["sweet", "caramel", "cotton candy", "fruity"], appearance: "Serbuk kristal putih", image: img("ethyl-maltol", false),
  },
  {
    slug: "iso-e-super", name: "Iso E Super", type: "aroma-chemical", tier: "base",
    cas: "54464-57-2", formula: "C16H26O", mw: 234.38,
    odor: ["woody", "ambery", "velvety", "cedar"], appearance: "Cairan agak kental, tidak berwarna hingga kuning pucat", image: img("iso-e-super", true),
  },
  {
    slug: "ambroxan", name: "Ambroxan", type: "aroma-chemical", tier: "base",
    cas: "6790-58-5", formula: "C16H28O", mw: 236.39,
    odor: ["ambergris", "ambery", "woody", "mineral"], appearance: "Kristal putih", image: img("ambroxan", true),
  },
  {
    slug: "javanol", name: "Javanol", type: "aroma-chemical", tier: "base",
    cas: "198404-98-7", formula: "C15H26O", mw: 222.37,
    odor: ["sandalwood", "creamy", "woody"], appearance: "Cairan, tidak berwarna", image: img("javanol", false),
  },
  {
    slug: "galaxolide", name: "Galaxolide", type: "aroma-chemical", tier: "base",
    cas: "1222-05-5", formula: "C18H26O", mw: 258.4,
    odor: ["musk", "clean", "floral", "sweet"], appearance: "Cairan sangat kental, tidak berwarna", image: img("galaxolide", false),
  },
  {
    slug: "vanillin", name: "Vanillin", type: "aroma-chemical", tier: "base",
    cas: "121-33-5", formula: "C8H8O3", mw: 152.15,
    odor: ["vanilla", "sweet", "creamy"], appearance: "Kristal jarum, putih hingga krem", image: img("vanillin", false),
  },
  {
    slug: "coumarin", name: "Coumarin", type: "aroma-chemical", tier: "base",
    cas: "91-64-5", formula: "C9H6O2", mw: 146.14,
    odor: ["sweet", "hay", "tonka", "almond"], appearance: "Kristal serpih putih", image: img("coumarin", false),
  },

  // ——— SOLVENTS ———
  {
    slug: "perfumers-alcohol", name: "Perfumer's Alcohol (Ethanol 96%)", type: "solvent", tier: "solvent",
    cas: "64-17-5", formula: "C2H6O", mw: 46.07,
    odor: ["alcoholic (menguap cepat)"], appearance: "Cairan jernih seperti air", image: img("perfumers-alcohol", false),
  },
  {
    slug: "dpg", name: "DPG (Dipropylene Glycol)", type: "solvent", tier: "solvent",
    cas: "25265-71-8", formula: "C6H14O3", mw: 134.17,
    odor: ["hampir tidak berbau"], appearance: "Cairan kental seperti sirup, jernih", image: img("dpg", false),
  },
  {
    slug: "jojoba-oil", name: "Jojoba Oil", botanical: "Simmondsia chinensis", type: "solvent", tier: "solvent",
    cas: "61789-91-1", extraction: "Cold pressing",
    odor: ["hampir tidak berbau"], appearance: "Cairan jernih, kuning keemasan", image: img("jojoba-oil", false),
  },
];

export const PROCESS_IMAGES: { slug: string; name: string; image: string | null }[] = [
  { slug: "steam-distillation", name: "Steam Distillation", image: "/assets/process/steam-distillation.jpg" },
  { slug: "cold-expression", name: "Cold Expression", image: "/assets/process/cold-expression.jpg" },
  { slug: "solvent-extraction", name: "Solvent Extraction (Concrete → Absolute)", image: "/assets/process/solvent-extraction.jpg" },
  { slug: "co2-extraction", name: "Supercritical CO2 Extraction", image: null },
  { slug: "enfleurage", name: "Enfleurage", image: null },
  { slug: "tincture", name: "Tincture", image: null },
  { slug: "maceration", name: "Maceration", image: null },
  { slug: "blotters", name: "Blotter (Mouillette)", image: null },
  { slug: "perfumers-organ", name: "Perfumer's Organ", image: null },
  { slug: "milligram-scale", name: "Timbangan 0.001 g", image: null },
  { slug: "lab-tools", name: "Peralatan Formulasi", image: null },
  { slug: "filtration", name: "Chilling & Filtration", image: null },
];

export const TIER_META: Record<Tier, { label: string; color: string; soft: string }> = {
  top: { label: "Top Notes", color: "#E0A526", soft: "#FBF1D9" },
  heart: { label: "Heart Notes", color: "#D16B86", soft: "#F9E3E9" },
  base: { label: "Base Notes", color: "#7A5A43", soft: "#EFE6DE" },
  solvent: { label: "Solvent", color: "#5B8DB8", soft: "#E3EDF6" },
};
