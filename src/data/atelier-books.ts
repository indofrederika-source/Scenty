export interface AtelierBook {
  id: string;
  volumeNumber: string;
  spineTitle: string;
  fullTitle: string;
  subtitle: string;
  coverColor: string;
  accentColor: string;
  foilColor: string;
  spineHeight: number; // in pixels (e.g. 230 - 265)
  spineWidth: number; // in pixels (e.g. 32 - 44)
  tiltDeg: number; // slight natural angle on the shelf (-2 to 2)
  summary: string;
  topics: string[];
  shelfPosition: number;
}

export const ATELIER_BOOKS: AtelierBook[] = [
  {
    id: "book-concentration",
    volumeNumber: "I",
    spineTitle: "KONSEP & KONSENTRASI",
    fullTitle: "Apa itu Parfum & Konsentrasi Minyak",
    subtitle: "Anatomi Cairan Wewangian, Reseptor Silia Olfaktori & Rasio Pelarut Presisi",
    coverColor: "#5c1d1d", // Deep Burgundy Leather
    accentColor: "#991b1b",
    foilColor: "#fef08a", // Warm Gold Foil
    spineHeight: 245,
    spineWidth: 38,
    tiltDeg: -0.5,
    summary: "Membedah etimologi 'per fumum', sains interaksi panas tubuh dengan molekul parfum, serta standar rasio konsentrasi 1% hingga 40% (Eau Fraîche hingga Extrait de Parfum).",
    topics: ["Etimologi & Sains Penguapan", "3 Komponen Cairan Parfum", "Gelas Ukur Simulasi 1% - 40%"],
    shelfPosition: 1,
  },
  {
    id: "book-fragrance-wheel",
    volumeNumber: "II",
    spineTitle: "NOTE & FRAGRANCE WHEEL",
    fullTitle: "Note & Circular Fragrance Wheel",
    subtitle: "Taksonomi Nada Tunggal, Roda Aroma 360° & Klasifikasi 8 Rumpun Industri",
    coverColor: "#143a27", // Dark Forest Green
    accentColor: "#15803d",
    foilColor: "#fde047",
    spineHeight: 255,
    spineWidth: 42,
    tiltDeg: 1.0,
    summary: "Klasifikasi nada aroma (notes) tunggal dan pemetaan melingkar 8 keluarga wewangian utama: Citrus, Floral, Amber, Woody, Fougère, Gourmand, Chypre, dan Aquatic.",
    topics: ["Definisi Note & Nada Tunggal", "Roda Fragrance Wheel 360°", "Molekul Kunci & Parfum Ikonik"],
    shelfPosition: 2,
  },
  {
    id: "book-scent-pyramid",
    volumeNumber: "III",
    spineTitle: "SCENT PYRAMID & DRYDOWN",
    fullTitle: "Scent Pyramid & Kinetika Drydown",
    subtitle: "Dinamika Tekanan Uap Molekuler, Top-Heart-Base & Pengaruh Kimia Kulit",
    coverColor: "#713f12", // Antique Cognac / Amber
    accentColor: "#a16207",
    foilColor: "#fef08a",
    spineHeight: 260,
    spineWidth: 36,
    tiltDeg: -1.2,
    summary: "Memahami mengapa parfum berevolusi seiring waktu berdasarkan bobot molekul (MW g/mol), fiksasi base notes, serta fase drydown intim yang dipengaruhi sebum dan suhu tubuh.",
    topics: ["Piramida Kinetika Top-Heart-Base", "Bobot Molekul & Tekanan Uap", "Fase Drydown & Lipid Kulit"],
    shelfPosition: 3,
  },
  {
    id: "book-accord",
    volumeNumber: "IV",
    spineTitle: "ACCORD & HARMONI",
    fullTitle: "Accord: Fondasi Harmoni Formula",
    subtitle: "Efek Gestalt Olfaktori & Studi Kasus Classic Amber Accord",
    coverColor: "#1e1b4b", // Midnight Indigo
    accentColor: "#3730a3",
    foilColor: "#e2e8f0", // Silver Foil
    spineHeight: 240,
    spineWidth: 34,
    tiltDeg: 0,
    summary: "Konsep akord sebagai blok bangunan formula parfum di mana gabungan beberapa bahan baku melebur menjadi kesatuan identitas aroma baru yang bulat dan utuh.",
    topics: ["Konsep Gestalt Olfaktori", "Analogi Harmoni Musik", "Formula Classic Amber (Labdanum, Vanillin, Benzoin)"],
    shelfPosition: 4,
  },
  {
    id: "book-spl",
    volumeNumber: "V",
    spineTitle: "S, P, L",
    fullTitle: "Sillage, Projection, Longevity (S - P - L)",
    subtitle: "Metrik Kinerja Wewangian di Kulit dan Udara Secara Dinamis",
    coverColor: "#0f172a", // Deep Slate Obsidian
    accentColor: "#334155",
    foilColor: "#cbd5e1",
    spineHeight: 250,
    spineWidth: 40,
    tiltDeg: 0.4,
    summary: "Tiga pilar parameter evaluasi wewangian: jejak gerak di udara (Sillage), radius pancaran tubuh diam (Projection), dan daya tahan jam retensi molekul di kulit (Longevity).",
    topics: ["Simulator Jejak Gelombang Sillage", "Radius Aura Proyeksi Diam", "Jarum Jam Retensi Longevity"],
    shelfPosition: 5,
  },
  {
    id: "book-extraction",
    volumeNumber: "VI",
    spineTitle: "METODE EKSTRAKSI BAHAN",
    fullTitle: "Metode Ekstraksi Bahan Baku Alami",
    subtitle: "Distilasi Uap, Pengepresan Dingin, dan Ekstraksi Pelarut Concrete & Absolute",
    coverColor: "#78350f", // Burnt Sienna Leather
    accentColor: "#b45309",
    foilColor: "#fef08a",
    spineHeight: 248,
    spineWidth: 36,
    tiltDeg: -0.4,
    summary: "Teknologi pemisahan senyawa aromatik botani dari sel tanaman hidup tanpa merusak komponen fitokimia alaminya dengan empat metode fisika-kimia standar industri.",
    topics: ["Steam Distillation (Minyak Atsiri)", "Cold Expression (Citrus Segar)", "Solvent Extraction (Concrete & Absolute)"],
    shelfPosition: 6,
  },
  {
    id: "book-formulation",
    volumeNumber: "VII",
    spineTitle: "FORMULASI & MASERASI",
    fullTitle: "Teknik Formulasi & Sains Maserasi",
    subtitle: "Flash-Off, Fiksatif, Timbangan Presisi & Timeline Pematangan 30 Hari",
    coverColor: "#292524", // Aged Walnut Wood
    accentColor: "#44403c",
    foilColor: "#fde047",
    spineHeight: 252,
    spineWidth: 38,
    tiltDeg: -0.2, // Neutral slight tilt to avoid leaning into Book VIII!
    summary: "Proses fisika-kimia meracik: peranan penguapan kilat alkohol, fiksasi aroma, teknik dilution menggunakan timbangan analitik, serta tahapan esterifikasi maserasi selama 30 hari.",
    topics: ["Timeline 30 Hari Maserasi Kimiawi", "Matriks Pelarut & Fiksatif", "Standar Timbangan Presisi & Predilution"],
    shelfPosition: 7,
  },
  {
    id: "book-ifra",
    volumeNumber: "VIII",
    spineTitle: "REGULASI IFRA & OLFAKTORI",
    fullTitle: "Regulasi IFRA & Kesehatan Olfaktori",
    subtitle: "Standar Keselamatan Dermal Category 4, Toksisitas & Biologi Indra Penciuman",
    coverColor: "#312e81", // Deep Royal Navy
    accentColor: "#4338ca",
    foilColor: "#e0e7ff",
    spineHeight: 258,
    spineWidth: 44,
    tiltDeg: 0.3,
    summary: "Panduan etika dan hukum meracik parfum (DOs & DON'Ts), patologi klinis fototoksisitas dan alergi kontak, serta pembedahan ilmiah Olfactory Fatigue (mitos biji kopi) dan Anosmia Parsial Musk.",
    topics: ["IFRA Category 4 & Batas Maksimal", "Panduan Formulator: DOs & DON'Ts", "Olfactory Fatigue (Nose Blindness) & Mitos Kopi", "Anosmia Parsial Molekul Musk"],
    shelfPosition: 8,
  },
];
