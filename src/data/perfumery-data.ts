export interface GlossaryTerm {
  term: string;
  category: "Struktur" | "Performa" | "Bahan Baku" | "Teknik & Proses" | "Regulasi";
  definition: string;
  technicalDetails: string;
  example: string;
}

export const PERFUMERY_GLOSSARY: GlossaryTerm[] = [
  {
    term: "Parfum (Fragrance / Perfume)",
    category: "Struktur",
    definition: "Campuran homogen antara konsentrat minyak wangi (berasal dari ekstrak bahan alami dan/atau molekul aroma sintetis), bahan pengikat (fiksatif), dan cairan pelarut (umumnya etanol murni berkadar 96% atau minyak pembawa).",
    technicalDetails: "Formulasi parfum dirancang secara berjenjang untuk menghasilkan profil penguapan dinamis yang terbagi ke dalam piramida aroma (top, heart, dan base notes).",
    example: "Eau de Parfum dengan 18% konsentrat minyak dalam 82% alkohol etanol 96%."
  },
  {
    term: "Note (Nada Aroma)",
    category: "Struktur",
    definition: "Satuan elemen aroma individual yang menyusun sebuah komposisi parfum. Note dapat berupa aroma tunggal dari satu bahan alami atau deskripsi sensori dari senyawa sintetis.",
    technicalDetails: "Diklasifikasikan berdasarkan titik didih, bobot molekul (g/mol), dan laju penguapan menjadi Top Notes, Heart/Middle Notes, dan Base Notes.",
    example: "Note Bergamot pada pembukaan, note Rose pada bagian tengah, dan note Sandalwood pada bagian dasar."
  },
  {
    term: "Accord (Akord)",
    category: "Struktur",
    definition: "Kombinasi harmonis dari dua atau lebih bahan baku (notes) yang menyatu sehingga kehilangan identitas individual masing-masing dan menghasilkan karakter aroma baru yang unik.",
    technicalDetails: "Mirip dengan akord dalam harmoni musik. Sebuah akord dapat terdiri dari kombinasi bahan alami dan molekul sintetis yang saling melengkapi.",
    example: "Akord Amber tradisional dibentuk dari paduan getah Labdanum resinoid + Vanillin murni."
  },
  {
    term: "Scent Pyramid (Piramida Aroma)",
    category: "Struktur",
    definition: "Model visual konseptual yang memetakan evolusi aroma parfum dari awal disemprotkan hingga mengering sepenuhnya di kulit, dibagi menjadi Top, Heart, dan Base notes.",
    technicalDetails: "Bukan hierarki kualitas, melainkan representasi fisik perbedaan laju penguapan (evaporation rate) dan tekanan uap (vapor pressure) masing-masing molekul.",
    example: "Piramida klasik: Citrus di puncak (Top), Bunga di tengah (Heart), Kayu dan Musk di dasar (Base)."
  },
  {
    term: "Top Notes (Head Notes)",
    category: "Struktur",
    definition: "Fase aroma pembuka yang pertama kali tercium saat parfum disemprotkan ke kulit atau kertas uji (blotter).",
    technicalDetails: "Tersusun dari molekul berbobot ringan (100–150 g/mol) dengan tekanan uap tinggi. Menguap tuntas dalam rentang 15 hingga 45 menit pertama.",
    example: "Essential oil Bergamot, Lemon, Grapefruit, Pink Pepper, dan Aldehyde alifatik."
  },
  {
    term: "Heart Notes (Middle Notes)",
    category: "Struktur",
    definition: "Karakter inti atau kepribadian utama sebuah formula parfum yang muncul setelah top notes mulai memudar.",
    technicalDetails: "Tersusun dari molekul berbobot sedang (150–220 g/mol). Bertahan aktif di kulit selama 2 hingga 5 jam dan berfungsi sebagai jembatan harmonisasi antara top dan base notes.",
    example: "Rose Damascena absolute, Jasmine Sambac, Cardamom, Geranium, Lavender, dan Hedione."
  },
  {
    term: "Base Notes (Fond / Drydown)",
    category: "Struktur",
    definition: "Fondasi struktural parfum yang tersusun dari molekul-molekul terberat, bertindak sebagai penopang aroma dan fiksatif alami.",
    technicalDetails: "Tersusun dari molekul berbobot tinggi (>220 g/mol) dengan tekanan uap sangat rendah (<0.01 mmHg). Mengikat pada lipid kulit dan bertahan 6 hingga 24+ jam.",
    example: "Iso E Super, Ambroxan, Patchouli, Sandalwood, Vanillin, Oakmoss, dan Musk makrosiklik."
  },
  {
    term: "Drydown",
    category: "Performa",
    definition: "Fase akhir dari siklus hidup wewangian di kulit, terjadi setelah pelarut, top notes, dan sebagian besar heart notes menguap sepenuhnya.",
    technicalDetails: "Pada fase ini, base notes berinteraksi langsung dengan kimiawi alami permukaan kulit, sebum, dan suhu tubuh pemakai, menghasilkan aroma unik yang sangat personal.",
    example: "Aroma sisa jejak kayu hangat dan amber yang tertinggal di pergelangan tangan setelah 8 jam pemakaian."
  },
  {
    term: "Sillage",
    category: "Performa",
    definition: "Jejak atau ekor aroma yang tertinggal di udara saat orang yang mengenakan parfum berjalan melewati suatu ruangan (berasal dari istilah bahasa Prancis untuk jejak ombak kapal di air).",
    technicalDetails: "Sillage berbeda dengan projection. Sillage mengukur ketahanan partikel wewangian yang menggantung di udara (wake), bukan jarak pancaran saat pemakai diam.",
    example: "Seseorang meninggalkan ruangan, namun wangi parfumnya masih tercium samar di koridor selama beberapa menit."
  },
  {
    term: "Projection",
    category: "Performa",
    definition: "Jarak pancaran aroma dari permukaan kulit pemakai ke udara terbuka di sekitarnya dalam posisi diam.",
    technicalDetails: "Dipengaruhi oleh persentase alkohol yang menguap (flash-off), suhu tubuh pemakai, kelembapan udara, dan volatilitas bahan pembuka formula.",
    example: "Parfum dengan projection sedang dapat tercium hingga jarak 1 meter (setara panjang lengan)."
  },
  {
    term: "Longevity",
    category: "Performa",
    definition: "Durasi waktu total di mana aroma parfum masih dapat dideteksi secara jelas pada kulit pemakai sebelum menghilang sepenuhnya.",
    technicalDetails: "Diukur dalam satuan jam. Dipengaruhi oleh konsentrasi minyak wangi, jenis bahan baku (berat molekul base notes), jenis kulit (kulit kering vs berminyak), dan cuaca.",
    example: "Eau de Toilette umumnya memiliki longevity 4–6 jam, sedangkan Extrait de Parfum dapat mencapai 12–24 jam."
  },
  {
    term: "Flash-off",
    category: "Teknik & Proses",
    definition: "Proses penguapan cepat pelarut alkohol berenergi tinggi segera setelah cairan parfum disemprotkan ke permukaan kulit atau pakaian.",
    technicalDetails: "Etanol memiliki titik didih 78.37°C. Saat terpapar suhu kulit (33–37°C), etanol menguap dalam hitungan 10–30 detik, melontarkan molekul top notes ke udara.",
    example: "Alasan mengapa parfum tidak boleh langsung dihirup dekat nosel sprayer pada 5 detik pertama agar hidung tidak tersengat uap etanol pekat."
  },
  {
    term: "Raw Material (Bahan Baku): Natural vs Sintetis",
    category: "Bahan Baku",
    definition: "Bahan mentah yang digunakan untuk meracik formula wewangian, terbagi menjadi bahan alami (ekstrak tumbuhan/resin) dan molekul aroma sintetis hasil sintesis kimia.",
    technicalDetails: "Bahan alami memberikan kompleksitas biologis yang kaya (satu minyak mawar alami mengandung lebih dari 300 senyawa kimia mikro), sedangkan bahan sintetis memberikan stabilitas, kemurnian molekuler, dan ketahanan yang tidak dapat dihasilkan oleh alam.",
    example: "Natural: Essential oil Bergamot Italia. Sintetis: Iso E Super murni dari laboratorium."
  },
  {
    term: "Essential Oil vs Absolute",
    category: "Bahan Baku",
    definition: "Dua metode ekstraksi bahan alami utama. Essential oil diekstraksi melalui distilasi uap atau pengepresan dingin (cold-press), sedangkan Absolute diekstraksi menggunakan pelarut volatil.",
    technicalDetails: "Bunga-bunga sensitif seperti Melati (Jasmine) atau Sedap Malam (Tuberose) rusak jika terkena panas uap distilasi, sehingga harus diekstraksi dengan pelarut non-polar menghasilkan 'concrete', lalu dimurnikan dengan alkohol menjadi 'absolute'.",
    example: "Lavender oil diproduksi via steam distillation (essential oil); Jasmine diekstraksi via solvent extraction (absolute)."
  },
  {
    term: "Aroma Chemical",
    category: "Bahan Baku",
    definition: "Senyawa kimia tunggal dengan struktur molekul terdefinisi yang memiliki profil aroma spesifik, diproduksi melalui sintesis laboratorium atau isolasi fraksional.",
    technicalDetails: "Memungkinkan formulasi presisi tinggi dengan konsistensi antar-batch 100%, bebas dari fluktuasi panen iklim tanaman, dan memiliki CAS (Chemical Abstracts Service) number resmi.",
    example: "Hedione (Methyl dihydrojasmonate), Ambroxan, Galaxolide, Coumarin, Ethyl Maltol."
  },
  {
    term: "Fixative (Fiksatif)",
    category: "Teknik & Proses",
    definition: "Bahan baku dengan volatilitas sangat rendah yang ditambahkan ke dalam formula parfum untuk memperlambat laju penguapan komponen-komponen yang lebih ringan.",
    technicalDetails: "Bekerja melalui gaya tarik antarmolekul Van der Waals atau interaksi dipol, menurunkan tekanan uap campuran tanpa mengubah karakter aroma dasar secara drastis.",
    example: "Ambroxan, Musk sintetis (Ambrettolide, Exaltolide), Benzoin resinoid, dan Sandalwood."
  },
  {
    term: "Solvent (Pelarut)",
    category: "Teknik & Proses",
    definition: "Cairan pembawa netral yang digunakan untuk melarutkan konsentrat minyak wangi, memungkinkan parfum disemprotkan secara merata dalam bentuk partikel aerosol halus.",
    technicalDetails: "Standar industri wewangian alkoholik adalah Etanol berkadar 96% (SDA-40B). Pelarut non-alkohol mencakup Dipropylene Glycol (DPG), Isopropyl Myristate (IPM), dan Jojoba Oil.",
    example: "Ethanol 96% untuk parfum semprot; Jojoba oil untuk formulasi roll-on attar."
  },
  {
    term: "Maceration (Maserasi)",
    category: "Teknik & Proses",
    definition: "Proses pengistirahatan campuran antara konsentrat minyak wangi dengan pelarut alkohol di dalam wadah kaca gelap selama periode tertentu (biasanya 2 hingga 4 minggu).",
    technicalDetails: "Selama maserasi, terjadi solvasi menyeluruh pada tingkat nano serta reaksi mikro-esterifikasi lambat antara asam organik alami dan gugus etanol, menghasilkan kebulatan aroma (roundedness) dan menghilangkan bau alkohol mentah yang tajam.",
    example: "Formula yang baru dicampur disimpan di botol kaca amber pada suhu sejuk 18–20°C selama 30 hari sebelum disaring dan dikemas."
  },
  {
    term: "Maturation",
    category: "Teknik & Proses",
    definition: "Proses pengistirahatan konsentrat minyak wangi murni (raw material concentrate) sebelum ditambahkan pelarut alkohol.",
    technicalDetails: "Memberikan waktu bagi berbagai minyak esensial dan molekul aroma kimia untuk berinteraksi, berdifusi, dan saling menyeimbangkan karakter aroma alaminya terlebih dahulu.",
    example: "Konsentrat formula diistirahatkan selama 7–14 hari sebelum dituangkan ke dalam alkohol etanol."
  },
  {
    term: "Dilution (Pengenceran)",
    category: "Teknik & Proses",
    definition: "Proses melarutkan bahan baku murni berkonsentrasi tinggi ke dalam pelarut tertentu (seperti DPG atau Etanol) pada rasio persentase yang lebih rendah (misal: pengenceran 10%, 1%, atau 0.1%).",
    technicalDetails: "Sangat penting untuk bahan-bahan berkekuatan ekstrem (seperti Aldehida C-12, Birch Tar, atau Pyrazine) agar dapat ditimbang dan diracik secara akurat tanpa merusak seluruh formula.",
    example: "Pengenceran 1% Aldehyde C-12 dalam DPG untuk menghindari overdosis aroma sabun tajam."
  },
  {
    term: "IFRA (International Fragrance Association)",
    category: "Regulasi",
    definition: "Badan regulasi wewangian internasional yang menetapkan standar keselamatan dan batas maksimal penggunaan bahan baku parfum di seluruh dunia.",
    technicalDetails: "Menerbitkan 'IFRA Standards' berkala berdasarkan penelitian ilmiah dermatologis independen oleh RIFM (Research Institute for Fragrance Materials) untuk mencegah reaksi alergi kontak, fototoksisitas, dan efek karsinogenik.",
    example: "Standar IFRA Kategori 4 membatasi kadar senyawa Bergapten dalam produk akhir parfum semprot maksimal 0.0015% (15 ppm)."
  },
  {
    term: "Olfactory Fatigue (Kelelahan Hidung / Anosmia Sementara)",
    category: "Performa",
    definition: "Fenomena biologis adaptif di mana reseptor penciuman di hidung berhenti mendeteksi suatu aroma yang tercium secara terus-menerus.",
    technicalDetails: "Reseptor olfaktori mengirim sinyal jenuh ke otak. Otak mengabaikan stimulus aroma tersebut sebagai ancaman baru demi menjaga kepekaan hidung terhadap perubahan bau lingkungan lainnya.",
    example: "Pemakai parfum merasa wanginya sudah hilang setelah 1 jam, padahal orang di sekitarnya masih mencium aromanya dengan sangat jelas."
  }
];

export interface ConcentrationTier {
  id: string;
  name: string;
  shortName: string;
  oilMin: number;
  oilMax: number;
  oilDefault: number;
  alcoholPercent: number;
  longevityHours: string;
  sillageRating: "Intimate (Dekat di Kulit)" | "Moderate (Sedang)" | "Strong (Kuat)" | "Heavy / Beast (Sangat Pekat)";
  sillageRadiusMeters: number;
  bestFor: string;
  description: string;
  technicalDetails: string;
}

export const CONCENTRATION_TIERS: ConcentrationTier[] = [
  {
    id: "eau-fraiche",
    name: "Eau Fraîche",
    shortName: "EF",
    oilMin: 1,
    oilMax: 3,
    oilDefault: 2,
    alcoholPercent: 80,
    longevityHours: "1 – 2 Jam",
    sillageRating: "Intimate (Dekat di Kulit)",
    sillageRadiusMeters: 0.5,
    bestFor: "Penyegar badan kilat pasca olahraga atau iklim tropis sangat lembap",
    description: "Format wewangian paling ringan dengan kadar minyak wangi 1% hingga 3%. Memiliki kandungan air suling (purified water) yang lebih tinggi dibanding alkohol murni, memberikan sensasi dingin seketika tanpa meninggalkan lapisan minyak.",
    technicalDetails: "Konsentrasi: 1–3% fragrance oil, 70–80% etanol, 17–27% air suling. Evaporasi terjadi sangat cepat tanpa sisa drydown berat."
  },
  {
    id: "eau-de-cologne",
    name: "Eau de Cologne",
    shortName: "EDC",
    oilMin: 3,
    oilMax: 5,
    oilDefault: 4,
    alcoholPercent: 90,
    longevityHours: "2 – 3 Jam",
    sillageRating: "Moderate (Sedang)",
    sillageRadiusMeters: 1.0,
    bestFor: "Aplikasi pagi hari, relaksasi santai, atau penyegar harian",
    description: "Format klasik yang berakar dari formula orisinal Cologne abad ke-18. Didominasi oleh minyak atsiri citrus segar (lemon, neroli, bergamot) dan herba ringan yang dirancang untuk menguap segar dalam 2–3 jam.",
    technicalDetails: "Konsentrasi: 3–5% fragrance oil, 85–90% etanol 96%, 5–10% air suling. Laju penguapan didominasi oleh monoterpene volatil."
  },
  {
    id: "eau-de-toilette",
    name: "Eau de Toilette",
    shortName: "EDT",
    oilMin: 5,
    oilMax: 15,
    oilDefault: 10,
    alcoholPercent: 85,
    longevityHours: "4 – 6 Jam",
    sillageRating: "Moderate (Sedang)",
    sillageRadiusMeters: 1.8,
    bestFor: "Penggunaan harian ke kantor, kampus, atau aktivitas siang hari",
    description: "Kategori paling populer di industri wewangian komersial. Memiliki keseimbangan optimal antara ledakan proyeksi awal (radiance) dan daya tahan yang cukup untuk aktivitas kerja setengah hari.",
    technicalDetails: "Konsentrasi: 5–15% fragrance oil, 80–85% etanol 96%. Rasio alkohol yang memadai memberikan efek flash-off kuat yang melontarkan top notes."
  },
  {
    id: "eau-de-parfum",
    name: "Eau de Parfum",
    shortName: "EDP",
    oilMin: 15,
    oilMax: 20,
    oilDefault: 18,
    alcoholPercent: 80,
    longevityHours: "6 – 9 Jam",
    sillageRating: "Strong (Kuat)",
    sillageRadiusMeters: 2.5,
    bestFor: "Acara formal, kencan malam, atau ruangan ber-AC",
    description: "Standar industri wewangian modern. Mengandung persentase heart dan base notes yang lebih padat, menghasilkan jejak aroma (sillage) yang bertahan hingga seharian penuh.",
    technicalDetails: "Konsentrasi: 15–20% fragrance oil, 78–82% etanol 96%. Struktur formula berfokus pada kestabilan molekul menengah dan fiksatif."
  },
  {
    id: "extrait-de-parfum",
    name: "Extrait de Parfum",
    shortName: "Extrait",
    oilMin: 20,
    oilMax: 40,
    oilDefault: 30,
    alcoholPercent: 70,
    longevityHours: "12 – 24+ Jam",
    sillageRating: "Heavy / Beast (Sangat Pekat)",
    sillageRadiusMeters: 3.5,
    bestFor: "Koleksi wewangian formal tinggi, cuaca dingin, atau daya tahan maksimal",
    description: "Tingkatan konsentrasi murni tertinggi dalam perfumery tradisional. Memiliki tekstur agak kental dan meninggalkan lapisan minyak tipis saat menyentuh kulit. Aromanya menempel sangat lekat hingga keesokan harinya.",
    technicalDetails: "Konsentrasi: 20–40% fragrance oil, 60–75% etanol 96%. Menggunakan bahan base notes dan fiksatif berbobot molekul besar yang mengikat kuat pada pori-pori kulit."
  }
];

export interface PyramidTier {
  id: "top" | "heart" | "base";
  title: string;
  subtitle: string;
  timeframe: string;
  molecularWeight: string;
  vaporPressure: string;
  role: string;
  keyMaterials: {
    name: string;
    origin: string;
    profile: string;
    volatilityHours: number;
    mw: string;
  }[];
  scientificInsight: string;
}

export const SCENT_PYRAMID: PyramidTier[] = [
  {
    id: "top",
    title: "Top Notes (Head Notes)",
    subtitle: "Fase Pembuka",
    timeframe: "15 – 45 Menit Pertama",
    molecularWeight: "100 – 150 g/mol (Molekul Ringan)",
    vaporPressure: "Tinggi (> 0.5 mmHg pada 20°C)",
    role: "Memberikan impresi pertama wewangian, menutupi penguapan awal alkohol, dan mengantarkan hidung ke fase berikutnya.",
    keyMaterials: [
      { name: "Bergamot FCF", origin: "Calabria, Italia", profile: "Citrus segar, zesty, aroma teh Earl Grey", volatilityHours: 0.5, mw: "136.2 g/mol (Limonene)" },
      { name: "Pink Pepper", origin: "Madagaskar", profile: "Spicy segar, kering, berkilau, ada sentuhan buah", volatilityHours: 1.0, mw: "136.2 g/mol (Pinene)" },
      { name: "Aldehyde C-12 MNA", origin: "Sintetik", profile: "Aroma bersih, udara dingin pegunungan", volatilityHours: 2.0, mw: "184.3 g/mol" },
      { name: "Grapefruit", origin: "Florida, AS", profile: "Pahit asam menyegarkan, crisp citrus", volatilityHours: 0.7, mw: "136.2 g/mol" }
    ],
    scientificInsight: "Molekul top notes memiliki rantai karbon pendek yang sangat mudah berpindah fase dari cair ke gas. Begitu terkena panas kulit manusia (33°C–37°C), energi kinetiknya meningkat dan menguap seketika."
  },
  {
    id: "heart",
    title: "Heart Notes (Middle Notes)",
    subtitle: "Tubuh & Jiwa Formula",
    timeframe: "2 – 5 Jam Pasca Semprot",
    molecularWeight: "150 – 220 g/mol (Molekul Sedang)",
    vaporPressure: "Sedang (0.01 – 0.5 mmHg)",
    role: "Menjadi kepribadian utama dan tema sentral parfum, menyatukan transisi dari kesegaran pembuka menuju kehangatan dasar.",
    keyMaterials: [
      { name: "Rose Damascena Absolute", origin: "Turki / Bulgaria", profile: "Floral mewah, aroma madu hangat, kelopak mawar", volatilityHours: 4.5, mw: "154.2 g/mol (Citronellol)" },
      { name: "Hedione", origin: "Firmenich (Sintetis)", profile: "Melati transparan, berembun, memperluas radiasi aroma", volatilityHours: 6.0, mw: "226.3 g/mol" },
      { name: "Cardamom Guatemala", origin: "Guatemala", profile: "Rempah aromatik hangat dengan nuansa segar", volatilityHours: 3.5, mw: "154.2 g/mol (Cineole)" },
      { name: "Jasmine Sambac", origin: "India", profile: "Floral putih sensual, sedikit indolic", volatilityHours: 5.0, mw: "198.3 g/mol (Linalyl acetate)" }
    ],
    scientificInsight: "Heart notes adalah jembatan harmonisasi. Tanpa heart notes yang terstruktur seimbang, formula parfum akan terasa kosong di tengah saat top notes habis menguap."
  },
  {
    id: "base",
    title: "Base Notes (Fond / Drydown)",
    subtitle: "Fondasi & Penahan Aroma",
    timeframe: "6 – 24+ Jam di Kulit",
    molecularWeight: "220 – 350+ g/mol (Molekul Berat)",
    vaporPressure: "Sangat Rendah (< 0.01 mmHg)",
    role: "Mengikat seluruh formula sebagai fiksatif alami, menentukan daya tahan akhir, dan menciptakan jejak sillage intim.",
    keyMaterials: [
      { name: "Iso E Super", origin: "IFF (Sintetis)", profile: "Kayu cedar lembut, sentuhan amber beludru", volatilityHours: 24.0, mw: "234.3 g/mol" },
      { name: "Ambroxan", origin: "Sintetis", profile: "Ambergris bersih, hangat, mineral asin modern", volatilityHours: 36.0, mw: "236.4 g/mol" },
      { name: "Patchouli Aceh Heart", origin: "Indonesia", profile: "Earthy basah, herbal gelap, nuansa kayu kakao", volatilityHours: 48.0, mw: "222.3 g/mol (Patchoulol)" },
      { name: "Bourbon Vanilla Co2", origin: "Madagaskar", profile: "Manis alami, balsamik, hangat menenangkan", volatilityHours: 30.0, mw: "152.1 g/mol (Vanillin)" }
    ],
    scientificInsight: "Molekul base notes bersifat lipofilik (menyukai lipid dan lemak kulit manusia). Molekul ini terperangkap di pori-pori stratum korneum kulit dan dilepaskan secara sangat perlahan seiring denyut nadi tubuh."
  }
];

export interface FragranceFamily {
  id: string;
  name: string;
  classificationSystem: string;
  moodDescription: string;
  characteristics: string[];
  signatureAccords: string[];
  heroMolecules: string[];
  famousIconicPerfumes: { name: string; brand: string; year: number }[];
  technicalFormulationTip: string;
}

export const FRAGRANCE_FAMILIES: FragranceFamily[] = [
  {
    id: "citrus",
    name: "Citrus (Hesperidic)",
    classificationSystem: "Fresh Family",
    moodDescription: "Karakter segar, energetik, bersih, didominasi minyak kulit buah citrus Mediterania.",
    characteristics: [
      "Kaya kandungan senyawa monoterpene (Limonene, Terpinene)",
      "Laju penguapan sangat cepat (volatilitas tinggi)",
      "Wajib didukung fiksatif kayu atau musk agar tidak hilang dalam 30 menit"
    ],
    signatureAccords: ["Bergamot zest", "Bitter Orange (Neroli)", "Mandarin manis", "Grapefruit asam"],
    heroMolecules: ["Limonene", "Citral", "Linalool", "Sinensal"],
    famousIconicPerfumes: [
      { name: "Acqua di Parma Colonia", brand: "Acqua di Parma", year: 1916 },
      { name: "Eau Sauvage", brand: "Dior", year: 1966 },
      { name: "Neroli Portofino", brand: "Tom Ford", year: 2011 }
    ],
    technicalFormulationTip: "Penambahan 1–2% Hedione ke dalam akord citrus akan memperluas radiasi dan difusi aroma tanpa mengubah karakter aslinya."
  },
  {
    id: "floral",
    name: "Floral (Soliflore & Bouquet)",
    classificationSystem: "Floral Family",
    moodDescription: "Karakter bunga alami, mulai dari kesegaran kelopak mawar berembun hingga kepekatan melati malam.",
    characteristics: [
      "Rumpun terbesar dalam sejarah industri wewangian dunia",
      "Dapat berformat Soliflore (fokus satu bunga) atau Floral Bouquet (paduan banyak bunga)",
      "Mengandung molekul alami berharga tinggi seperti Rose Otto dan Jasmine Sambac Absolute"
    ],
    signatureAccords: ["Rose Damask", "Jasmine Sambac", "Tuberose (Sedap Malam)", "Iris / Orris"],
    heroMolecules: ["Geraniol", "Citronellol", "Phenylethyl Alcohol", "Indole", "Alpha-Isomethyl Ionone"],
    famousIconicPerfumes: [
      { name: "Chanel No. 5", brand: "Chanel", year: 1921 },
      { name: "J'adore", brand: "Dior", year: 1999 },
      { name: "Carnal Flower", brand: "Frederic Malle", year: 2005 }
    ],
    technicalFormulationTip: "Senyawa Indole murni dalam takaran mikroskopis memberikan kedalaman realistis pada akord bunga putih seperti melati dan sedap malam."
  },
  {
    id: "amber",
    name: "Amber / Oriental",
    classificationSystem: "Amber Family",
    moodDescription: "Karakter hangat, kaya resin, vanila balsamik, dan dupa dupa aromatik.",
    characteristics: [
      "Struktur wewangian klasik tertua yang terinspirasi dari tradisi Timur Tengah",
      "Memiliki substantivity dan daya tahan paling kuat di antara semua keluarga",
      "Sangat stabil pada fase drydown di cuaca sejuk"
    ],
    signatureAccords: ["Benzoin Siam", "Labdanum Cistus", "Vanilla Bourbon", "Frankincense / Olibanum"],
    heroMolecules: ["Vanillin", "Ethylvanillin", "Ambrox DL", "Cistus resinoid"],
    famousIconicPerfumes: [
      { name: "Shalimar", brand: "Guerlain", year: 1925 },
      { name: "Opium", brand: "Yves Saint Laurent", year: 1977 },
      { name: "Grand Soir", brand: "Maison Francis Kurkdjian", year: 2016 }
    ],
    technicalFormulationTip: "Akord Amber tradisional dibentuk dari paduan getah Labdanum resinoid (balsamik pekat) ditambah Vanillin murni."
  },
  {
    id: "woody",
    name: "Woody (Kayu-Kayuan)",
    classificationSystem: "Woody Family",
    moodDescription: "Karakter kering, tenang, kokoh, mulai dari serutan pensil cedarwood hingga kelembutan kayu cendana.",
    characteristics: [
      "Menjadi tulang punggung formulasi parfum pria dan unisex modern",
      "Bervariasi dari kering (Cedar), creamy (Sandalwood), hingga berasap (Vetiver / Birch Tar)",
      "Paling mudah menyatu secara harmonis dengan lipid alami kulit"
    ],
    signatureAccords: ["Virginia Cedarwood", "Mysore Sandalwood", "Haitian Vetiver", "Oud / Gaharu"],
    heroMolecules: ["Iso E Super", "Cedrol", "Javanol", "Vertofix", "Santalol"],
    famousIconicPerfumes: [
      { name: "Terre d'Hermès", brand: "Hermès", year: 2006 },
      { name: "Santal 33", brand: "Le Labo", year: 2011 },
      { name: "Wonderwood", brand: "Comme des Garçons", year: 2010 }
    ],
    technicalFormulationTip: "Javanol adalah molekul cendana sintetis modern berkekuatan ekstrem; dosis di bawah 0.1% sudah cukup memberikan efek kayu creamy yang bertahan lama."
  },
  {
    id: "fougère",
    name: "Aromatic / Fougère",
    classificationSystem: "Aromatic Family",
    moodDescription: "Karakter bersih, aromatik herbal, aroma sabun cukur klasik dengan paduan lavender dan lumut.",
    characteristics: [
      "Dipelopori oleh 'Fougère Royale' tahun 1882 oleh Paul Parquet (Houbigant)",
      "Struktur baku: Kontras antara Lavender atas + Coumarin tengah + Oakmoss bawah",
      "Memberikan kesan higienis, teratur, dan maskulin klasik"
    ],
    signatureAccords: ["French Lavender", "Coumarin (Tonka Bean)", "Oakmoss", "Geranium Bourbon"],
    heroMolecules: ["Linalyl Acetate", "Coumarin", "Evernyl", "Dihydromyrcenol"],
    famousIconicPerfumes: [
      { name: "Fougère Royale", brand: "Houbigant", year: 1882 },
      { name: "Cool Water", brand: "Davidoff", year: 1988 },
      { name: "Beau de Jour", brand: "Tom Ford", year: 2020 }
    ],
    technicalFormulationTip: "Dihydromyrcenol memberikan kesegaran metalik bersih khas dekade 80-an yang menjadi penanda utama genre fresh-aromatic modern."
  },
  {
    id: "gourmand",
    name: "Gourmand (Manis Edible)",
    classificationSystem: "Modern Sub-family",
    moodDescription: "Karakter manis bernuansa makanan penutup: karamel, vanila bakar, cokelat praline, dan kopi sangrai.",
    characteristics: [
      "Keluarga wangi termuda, dipelopori oleh Thierry Mugler 'Angel' tahun 1992",
      "Membangkitkan memori rasa nyaman dan nostalgia makanan manis",
      "Harus diimbangi dengan bahan pahit seperti patchouli atau rempah agar tidak terlalu memuakkan"
    ],
    signatureAccords: ["Karamel bakar", "Roasted Coffee bean", "Praline Hazelnut", "Tonka Vanilla"],
    heroMolecules: ["Ethyl Maltol (gula kapas)", "Vanillin", "Furaneol", "Sotolon"],
    famousIconicPerfumes: [
      { name: "Angel", brand: "Mugler", year: 1992 },
      { name: "Black Opium", brand: "Yves Saint Laurent", year: 2014 },
      { name: "Baccarat Rouge 540", brand: "Maison Francis Kurkdjian", year: 2015 }
    ],
    technicalFormulationTip: "Baccarat Rouge 540 memadukan Ethyl Maltol dosis tinggi dengan Ambroxan dan Evernyl (lumut), menciptakan nuansa manis bertekstur transparan."
  },
  {
    id: "chypre",
    name: "Chypre (Kontras Lumut & Citrus)",
    classificationSystem: "Classic Family",
    moodDescription: "Karakter bangsawan, kontras tajam: pembukaan bergamot cerah yang jatuh di atas hamparan patchouli dan lumut hutan basah.",
    characteristics: [
      "Dinamai dari pulau Siprus oleh François Coty pada tahun 1917",
      "Struktur kontras arketipal: Kesegaran Bergamot di puncak vs Kedalaman Patchouli dan Oakmoss di dasar",
      "Dianggap sebagai salah satu struktur wewangian paling kompleks dalam sejarah"
    ],
    signatureAccords: ["Calabrian Bergamot", "Oakmoss / Evernyl", "Patchouli", "Labdanum"],
    heroMolecules: ["Atranol-free Oakmoss", "Clearwood", "Isobutyl Quinoline"],
    famousIconicPerfumes: [
      { name: "Chypre de Coty", brand: "Coty", year: 1917 },
      { name: "Mitsouko", brand: "Guerlain", year: 1919 },
      { name: "Aventus", brand: "Creed", year: 2010 }
    ],
    technicalFormulationTip: "Creed Aventus adalah interpretasi fruity-chypre modern yang mengganti akord bunga tradisional dengan nanas dan birch tar di atas basis lumut-patchouli."
  },
  {
    id: "aquatic",
    name: "Aquatic / Marine (Laut & Ozon)",
    classificationSystem: "Fresh Sub-family",
    moodDescription: "Karakter deburan ombak laut, angin pesisir bergaram, dan ozon segar udara sehabis hujan.",
    characteristics: [
      "Lahir di era 1990-an berkat isolasi molekul Calone 1951 oleh Pfizer",
      "Memberikan sensasi udara basah, segar, dan transparan",
      "Sangat dominan pada rilisan parfum iklim tropis dan musim panas"
    ],
    signatureAccords: ["Sea salt spray", "Melon laut", "Driftwood", "Mineral karang basah"],
    heroMolecules: ["Calone 1951", "Floralozone", "Ultrazur", "Helional"],
    famousIconicPerfumes: [
      { name: "Acqua Di Giò", brand: "Giorgio Armani", year: 1996 },
      { name: "Kenzo pour Homme", brand: "Kenzo", year: 1991 },
      { name: "Sel Marin", brand: "Heeley", year: 2008 }
    ],
    technicalFormulationTip: "Calone harus digunakan dalam dosis sangat kecil (di bawah 0.5%); dosis berlebih akan menghasilkan aroma amis seperti telur mentah, namun dalam takaran tepat menghasilkan ilusi deburan air laut segar."
  }
];

export interface SolventData {
  name: string;
  chemicalName: string;
  purity: string;
  role: string;
  pros: string[];
  cons: string[];
  recommendedConcentration: string;
  safetyNote: string;
}

export const SOLVENTS_DATA: SolventData[] = [
  {
    name: "Perfumer's Alcohol (SDA-40B)",
    chemicalName: "Ethanol 96% + Denatonium Benzoate",
    purity: "96.0% – 99.5% ABV",
    role: "Pelarut standar industri wewangian untuk parfum semprot (spray atomizer)",
    pros: [
      "Menguap cepat (flash-off kilat) tanpa meninggalkan noda minyak pada pakaian",
      "Daya larut tinggi terhadap resin pekat dan aroma chemical sintetis",
      "Bebas dari residu bau ragi atau tape seperti alkohol teknis"
    ],
    cons: [
      "Dapat mengeringkan kulit jika digunakan berlebihan tanpa humektan",
      "Cairan mudah terbakar (flammable), membutuhkan standar penyimpanan khusus"
    ],
    recommendedConcentration: "65% – 85% dari total formula parfum semprot",
    safetyNote: "Denaturan ditambahkan agar alkohol tidak dapat dikonsumsi sebagai minuman keras."
  },
  {
    name: "DPG (Dipropylene Glycol)",
    chemicalName: "Dipropylene Glycol (Fragrance Grade)",
    purity: "99.8% Kemurnian",
    role: "Pelarut non-alkohol, peredam penguapan, dan pengencer bahan kristal padat",
    pros: [
      "Hampir tidak berbau sama sekali (near zero odor)",
      "Mampu melarutkan kristal padat seperti Vanillin, Menthol, dan Oakmoss",
      "Titik penguapan sangat lambat, menjaga aroma stabil"
    ],
    cons: [
      "Viskositas kental, dapat menyumbat nosel spray jika dipakai sebagai pelarut utama",
      "Meredam proyeksi aroma jika digunakan dalam persentase berlebih"
    ],
    recommendedConcentration: "5% – 20% sebagai ko-solven atau 80% untuk reed diffuser",
    safetyNote: "Lembut di kulit dan umum digunakan dalam produk perawatan tubuh."
  },
  {
    name: "Jojoba Oil",
    chemicalName: "Simmondsia Chinensis Seed Oil (Liquid Wax Ester)",
    purity: "Cold-Pressed Cosmetic Grade",
    role: "Pelarut pembawa alami untuk formulasi roll-on attar non-alkohol",
    pros: [
      "Struktur molekulnya menyerupai sebum alami kulit manusia",
      "Sangat stabil terhadap oksidasi dan tidak mudah berbau tengik",
      "Melembapkan kulit dan menahan aroma base notes sangat lama"
    ],
    cons: [
      "Tidak dapat disemprotkan (hanya dapat diaplikasikan dengan cara dioles)",
      "Proyeksi aroma lebih intim dan tidak menyebar jauh ke udara"
    ],
    recommendedConcentration: "70% – 85% untuk formula roll-on oil perfume",
    safetyNote: "Pilihan utama bagi pengguna dengan sensitivitas tinggi terhadap alkohol."
  }
];

export interface MacerationStage {
  week: number;
  stageName: string;
  chemicalProcess: string;
  olfactorySensation: string;
  perfumerAction: string;
  clarityPercent: number;
}

export const MACERATION_TIMELINE: MacerationStage[] = [
  {
    week: 0,
    stageName: "Hari ke-0: Physical Mixing",
    chemicalProcess: "Molekul alkohol dan molekul konsentrat minyak wangi baru bercampur secara mekanik. Terjadi gaya tolak-menolak parsial antar senyawa polar dan nonpolar.",
    olfactorySensation: "Aroma alkohol mentah mendominasi secara tajam saat dihirup, top notes terasa menyengat terpisah, dan base notes belum keluar.",
    perfumerAction: "Aduk atau kocok botol kaca amber perlahan selama 60 detik. Simpan di ruangan bersuhu sejuk (18–20°C), kering, dan terhindar dari paparan sinar UV matahari langsung.",
    clarityPercent: 70
  },
  {
    week: 1,
    stageName: "Minggu ke-1: Solvation & Quenching",
    chemicalProcess: "Alkohol mulai memecah gumpalan molekul aroma chemicals pekat. Solvasi menyeluruh mulai terbentuk pada tingkat nano.",
    olfactorySensation: "Bau alkohol yang menusuk mulai melunak sekitar 30%. Heart notes bunga dan rempah mulai berpadu dengan citrus pembuka.",
    perfumerAction: "Lakukan 'burping' (membuka tutup botol selama 5 detik) untuk melepaskan gas volatil yang terperangkap, lalu tutup rapat kembali.",
    clarityPercent: 82
  },
  {
    week: 2,
    stageName: "Minggu ke-2: Micro-Esterification",
    chemicalProcess: "Terjadi reaksi esterifikasi lambat antara asam organik alami dengan gugus etanol, membentuk ester baru yang lebih wangi dan membulat.",
    olfactorySensation: "Sudut-sudut tajam aroma mulai membulat (rounded). Formula tidak lagi berbau seperti bahan-bahan terpisah, melainkan mulai menjadi satu kesatuan harmonis.",
    perfumerAction: "Celupkan kertas uji (blotter) pertama untuk mencatat evaluasi perkembangan aroma di jurnal formula.",
    clarityPercent: 92
  },
  {
    week: 4,
    stageName: "Minggu ke-4+: Equilibrium & Maturation",
    chemicalProcess: "Keseimbangan kimia termodinamika (equilibrium) tercapai penuh. Ikatan hidrogen stabil menahan penguapan teratur dari top hingga base.",
    olfactorySensation: "Aroma berada pada performa puncak: sillage halus merekah, transisi piramida mulus, dan bau alkohol mentah sepenuhnya hilang.",
    perfumerAction: "Lakukan penyaringan dingin (chilling & filtration pada suhu 0°C) bila terdapat endapan lilin alami tanaman, lalu kemas ke dalam botol spray akhir.",
    clarityPercent: 100
  }
];

export interface IFRACheckItem {
  moleculeName: string;
  sourceIngredient: string;
  category4Limit: number;
  riskFactor: string;
  dangerExplanation: string;
  safeFormulaExample: string;
}

export const IFRA_DATABASE: IFRACheckItem[] = [
  {
    moleculeName: "Bergapten (5-MOP / Furocoumarins)",
    sourceIngredient: "Bergamot Oil Expressed (Cold-Pressed)",
    category4Limit: 0.4,
    riskFactor: "Phototoxicity (Fitofotodermatitis Kulit Melepuh)",
    dangerExplanation: "Ketika bersentuhan dengan sinar ultraviolet (UV) matahari di kulit, molekul furocoumarins memicu reaksi fitofotodermatitis yang menyebabkan kulit melepuh dan hiperpigmentasi kehitaman permanen.",
    safeFormulaExample: "Gunakan varian 'Bergamot FCF' (Furocoumarin-Free) yang telah didestilasi molekuler ulang untuk menghilangkan bergapten."
  },
  {
    moleculeName: "Atranol & Chloroatranol",
    sourceIngredient: "Oakmoss Absolute (Evernia Prunastri)",
    category4Limit: 0.1,
    riskFactor: "Sensitizer Kontak Alergi Dermal",
    dangerExplanation: "Merupakan senyawa alergen kuat yang memicu dermatitis kontak alergi parah pada kulit. Standar IFRA Amandemen ke-43 ke atas membatasi penggunaannya sangat ketat.",
    safeFormulaExample: "Industri modern menggantikannya dengan molekul sintetis 'Evernyl / Veramoss' yang aman atau menggunakan ekstrak Oakmoss berkadar atranol rendah."
  },
  {
    moleculeName: "Isoeugenol",
    sourceIngredient: "Clove Bud Oil & Ylang Ylang Oil",
    category4Limit: 0.11,
    riskFactor: "Sensitizer Alergi Akut",
    dangerExplanation: "Senyawa rempah yang sangat reaktif terhadap sel kekebalan kulit, dapat memicu ruam merah dan rasa panas menyengat jika melebihi 0.11% dari berat total produk akhir.",
    safeFormulaExample: "Gunakan senyawa turunan seperti Methyl Diantilis atau Eugenol murni dalam batas takaran mikro untuk mendapatkan nuansa rempah anyelir tanpa iritasi."
  }
];
