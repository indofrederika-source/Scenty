# 🛠️ Tech Stack & Blueprint Arsitektur

Dokumentasi arsitektur teknologi dan integrasi library untuk aplikasi **ScentCraft**.

---

## 💻 Tech Stack Rekomendasi

| Lapisan | Pilihan Teknologi | Alasan |
| :--- | :--- | :--- |
| **Framework** | **Next.js (App Router, React, TypeScript)** | Modern, performa tinggi, SEO friendly untuk modul ensiklopedia, dan *type-safe* untuk hitungan matematis formulasi wangi. |
| **Styling** | **Tailwind CSS + Lucide Icons** | Cepat, responsif, konsisten, dan mudah membuat tema gelap (*dark luxury*) atau laboratorium bersih (*clean aesthetic*). |
| **3D & Shaders** | **React Three Fiber (R3F) + Drei + Three.js** | Visualisasi 3D botol parfum, simulasi cairan, dan pembiasan kaca cair. |
| **Aura & Mist Effects** | **ShaderGradient & WebGL GLSL** | Visualisasi gelombang aroma dinamis (*scent aura*) yang berubah warna sesuai racikan. |
| **UI Components** | **Aceternity UI (via Shadcn Registry)** | Terkoneksi dengan katalog di `/Users/indofrederika/Desktop/library`. |
| **State Management** | **Zustand** | Sangat ringan dan responsif untuk menyimpan state formula secara real-time (tetes, gram, persentase, piramida). |
| **Penyimpanan Data** | **Local-First (IndexedDB / LocalStorage)** | Pengguna bisa langsung bereksperimen dan menyimpan formula tanpa hambatan login. |

---

## 📐 Arsitektur Data Formula (TypeScript Interface)

```typescript
// Representasi Satu Bahan Mentah (Raw Material)
export interface RawMaterial {
  id: string;
  name: string;
  type: "natural" | "aroma-chemical";
  odorProfile: string[]; // e.g. ["woody", "warm", "amber"]
  pyramidTier: "top" | "heart" | "base";
  volatilityHours: number; // Ketahanan di blotter strip
  ifraMaxLimitPercent: number; // Batas aman IFRA
  colorHex: string; // Warna representasi untuk shader
}

// Representasi Item Racikan di Virtual Lab (Presisi Miligram 0.001g)
export interface FormulaItem {
  materialId: string;
  material: RawMaterial;
  drops: number;
  grams: number; // Presisi 3 desimal (0.001 gram / miligram)
  percentage: number;
}

// Resep Lengkap Satu Parfum
export interface PerfumeRecipe {
  id: string;
  title: string;
  targetVolumeMl: number; // e.g. 30ml, 50ml
  targetConcentration: "EDC" | "EDT" | "EDP" | "Extrait"; // e.g. EDP (20%)
  concentrateGrams: number;
  solventGrams: number; // Alkohol 96%
  items: FormulaItem[];
  notes: string; // Catatan peracik
  macerationStartDate: string;
  createdAt: string;
}
```

---

## 🎨 Integrasi dengan Library Vault

Platform ini memanfaatkan aset yang sudah disimpan di:
[`/Users/indofrederika/Desktop/library`](file:///Users/indofrederika/Desktop/library)

* **Hero & Layout:** Bento Grid, Floating Navbar, Timeline.
* **Lab View:** Liquid Glass Card, 3D Card, Gooey Input.
* **Aura Visualizer:** ShaderGradient, Background Ripple Effect.
