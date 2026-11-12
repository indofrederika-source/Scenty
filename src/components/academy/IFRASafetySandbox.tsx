"use client";

import React from "react";
import { ShieldCheck, AlertTriangle, Scale, CheckCircle2, XCircle, Wind, HelpCircle } from "lucide-react";

export function IFRASafetySandbox() {
  return (
    <section id="ifra-and-olfactory-health" className="py-24 bg-gradient-to-b from-white via-zinc-50/40 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 uppercase leading-tight">
            Regulasi IFRA &amp; Kesehatan Olfaktori
          </h2>
          <div className="text-sm sm:text-base text-zinc-700 leading-relaxed space-y-3 text-justify font-normal">
            <p>
              Meracik wewangian bukan sekadar mengejar keindahan estetika aroma, melainkan sebuah tanggung jawab sains dermatologis dan toksikologi yang ketat. <strong>IFRA (International Fragrance Association)</strong> adalah badan pengawas global independen yang menyusun standar keamanan wewangian berdasarkan uji klinis saintifik dari <em>Research Institute for Fragrance Materials (RIFM)</em>.
            </p>
            <p>
              Setiap formula parfum yang disemprotkan ke tubuh tergolong dalam <strong>IFRA Category 4 (Products applied to unshaved skin / Fine Fragrances)</strong>. Kategori ini menetapkan batasan kuantitatif ketat bagi setiap bahan aktif demi melindungi kulit manusia dari fototoksisitas, sensitisasi alergi permanen, dan gangguan sistem saraf.
            </p>
          </div>
        </div>

        {/* 1. DOS & DON'TS DALAM FORMULASI PARFUM */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase text-zinc-500 font-bold block mb-1">
              Etika &amp; Hukum Meracik Wewangian
            </span>
            <h3 className="text-2xl font-extrabold text-zinc-950 uppercase tracking-tight">
              Panduan Formulator: Hal yang Boleh &amp; Tidak Boleh Dilakukan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The DOs */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="text-lg font-bold text-zinc-950 uppercase font-mono">
                  Yang Harus Dilakukan (DOs)
                </h4>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-zinc-700 text-justify">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>
                    <strong>Patuhi Batas IFRA Category 4:</strong> Selalu periksa sertifikat IFRA dan <em>Safety Data Sheet (SDS)</em> dari setiap pemasok sebelum menentukan persentase bahan pada produk semprot akhir.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>
                    <strong>Gunakan Versi Terfraksinasi:</strong> Pilih minyak botani yang telah diproses khusus, seperti <em>Bergamot Oil FCF</em> (Furocoumarin-Free) untuk mencegah risiko reaksi fototoksik saat terkena sinar matahari.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>
                    <strong>Gunakan Timbangan Analitik 0.001g:</strong> Timbang seluruh bahan aktif dan alergen dalam satuan gram presisi tiga desimal, jangan pernah menggunakan perkiraan tetes (*drops*).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>
                    <strong>Hitung Beban Kumulatif Alergen:</strong> Jika formula menggunakan beberapa minyak alami yang sama-sama mengandung <em>Linalool</em>, <em>Limonene</em>, atau <em>Eugenol</em>, jumlah total kandungan senyawa tersebut harus diakumulasikan terhadap ambang batas aman.
                  </span>
                </li>
              </ul>
            </div>

            {/* The DON'Ts */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-red-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-red-100">
                <XCircle className="w-5 h-5 text-red-600" />
                <h4 className="text-lg font-bold text-zinc-950 uppercase font-mono">
                  Yang Dilarang Keras (DON&apos;Ts)
                </h4>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-zinc-700 text-justify">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                  <span>
                    <strong>Dilarang Memakai Citrus Dingin Mentah Berlebih:</strong> Menggunakan <em>Bergamot Oil Expressed</em> (mentah cold-pressed) tanpa batasan dosis akan menyebabkan luka bakar radiasi saat kulit terpapar sinar ultraviolet matahari.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                  <span>
                    <strong>Dilarang Menggunakan Bahan Terlarang Total:</strong> Jangan menggunakan molekul yang telah dilarang sepenuhnya oleh IFRA dan badan regulasi global, seperti <em>Lilial</em> (Lilial/butylphenyl methylpropional dilarang karena risiko reproduksi) atau <em>Lyral</em>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                  <span>
                    <strong>Jangan Mengasumsikan Alami Pasti Aman:</strong> Mitos terbesar dalam wewangian adalah menganggap bahan alami selalu aman. Faktanya, sebagian besar pembatasan paling ketat IFRA justru diberlakukan pada ekstrak alami tanaman murni.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                  <span>
                    <strong>Dilarang Melampaui Batas Sensitizer Kontak:</strong> Dosis berlebih pada molekul fenolik seperti <em>Isoeugenol</em> dapat memicu alergi seumur hidup yang membuat kulit pengguna selalu meradang setiap kali terpapar parfum.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. STUDI KASUS RISIKO KESEHATAN KULIT & ZAT TOKSIK */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase text-zinc-500 font-bold block mb-1">
              Patologi &amp; Toksikologi Dermal
            </span>
            <h3 className="text-2xl font-extrabold text-zinc-950 uppercase tracking-tight">
              Tiga Ancaman Klinis Utama pada Kulit Manusia
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-3">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase block">
                1. Fototoksisitas (Phototoxicity)
              </span>
              <h4 className="text-base font-bold text-zinc-950">
                Bergapten (5-MOP / Furocoumarins)
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                Senyawa yang terdapat dalam <em>Bergamot Oil Expressed</em> (perasan kulit jeruk mentah). Ketika cairan disemprotkan ke kulit dan terpapar sinar matahari (sinar UVA), molekul furokoumarin bereaksi secara fotokimia dengan DNA sel kulit, memicu luka bakar lepuh mirip disengat api dan meninggalkan noda hiperpigmentasi hitam pekat yang bersifat permanen (*Berloque dermatitis*). Batas IFRA Cat 4 untuk Bergapten murni sangat ketat: maksimal <strong>0.0015% (15 ppm)</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-3">
              <span className="text-xs font-mono font-bold text-red-700 uppercase block">
                2. Dermatitis Kontak Alergi
              </span>
              <h4 className="text-base font-bold text-zinc-950">
                Atranol &amp; Chloroatranol
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                Senyawa alergen alami berdaya rekat tinggi yang terdapat dalam lumut pohon ek <em>Oakmoss Absolute (Evernia prunastri)</em>. Molekul ini bertindak sebagai hapten kuat yang mengikat protein seluler kulit, memicu sistem kekebalan tubuh memproduksi antibodi alergi. Begitu seseorang tersensitisasi, ia akan mengalami ruam merah kronis, bengkak, dan gatal menyengat setiap kali bersentuhan dengan lumut ek. IFRA mewajibkan batas Oakmoss murni maksimal <strong>0.1%</strong>, atau beralih ke varian sintetis <em>Evernyl</em>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-3">
              <span className="text-xs font-mono font-bold text-zinc-900 uppercase block">
                3. Sensitisasi Dermal Akut
              </span>
              <h4 className="text-base font-bold text-zinc-950">
                Isoeugenol &amp; Cinnamal
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                Senyawa fenolik pedas yang secara alami mendominasi <em>Clove Bud Oil (Minyak Cengkeh)</em> dan bunga <em>Ylang Ylang</em>. Isoeugenol memiliki potensi reaktivitas seluler tinggi yang dapat menembus stratum korneum kulit dan menyebabkan eritema akut serta dermatitis kontak tipe lambat. Batas IFRA Kategori 4 menetapkan konsentrasi maksimal Isoeugenol dalam produk akhir tidak boleh melebihi <strong>0.11%</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* 3. BIOLOGI SISTEM SENSORIK: OLFACTORY FATIGUE & ANOSMIA */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-zinc-500 font-bold block">
              Biologi Indra Penciuman Manusia
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 uppercase tracking-tight">
              Olfactory Fatigue &amp; Anosmia
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              Memahami batasan fisiologis dan adaptasi sistem saraf reseptor hidung terhadap wewangian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Olfactory Fatigue (Nose Blindness) */}
            <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-200">
                <Wind className="w-5 h-5 text-sky-700" />
                <h4 className="text-lg font-bold text-zinc-950 uppercase font-mono">
                  1. Olfactory Fatigue (Nose Blindness)
                </h4>
              </div>
              <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-3 text-justify">
                <p>
                  Pernahkah Anda menyemprotkan parfum favorit di pagi hari, lalu merasa baunya sudah hilang total hanya dalam 2 jam, padahal orang di sekitar Anda masih menciumnya dengan sangat jelas? Fenomena ini disebut <strong>Olfactory Fatigue</strong> (kelelahan indra penciuman) atau adaptasi sensorik.
                </p>
                <p>
                  Ketika molekul wangi yang sama terus-menerus menempel pada reseptor silia di rongga hidung atas (*olfactory epithelium*), otak menerima stimulus konstan. Demi efisiensi saraf dan keselamatan evolusioner, otak secara otomatis mengabaikan aroma tersebut (*neural down-regulation*). Hal ini dilakukan agar hidung tetap waspada mendeteksi bau-bau baru yang berpotensi bahaya (seperti bau asap kebakaran atau gas beracun).
                </p>
                <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-2">
                  <strong className="text-zinc-950 block text-xs font-bold font-mono uppercase">
                    Mitos Biji Kopi vs Solusi Sains Terbukti:
                  </strong>
                  <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                    Banyak gerai toko parfum menyediakan toples biji kopi untuk dihirup di antara pengujian wewangian. <strong>Sains membuktikan bahwa menghirup biji kopi adalah mitos</strong>: kopi memiliki ratusan molekul volatil kompleks yang justru memperparah beban sensorik hidung.
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                    Cara ilmiah terbaik untuk mereset reseptor hidung adalah:
                  </p>
                  <ul className="text-xs text-zinc-600 list-disc list-inside space-y-1">
                    <li>Menghirup udara segar netral di luar ruangan selama 1–2 menit.</li>
                    <li>Menghirup bagian dalam lekukan siku atau pakaian katun bersih yang tidak disemprot parfum (aroma alami kulit sendiri berfungsi sebagai titik nol referensi otak).</li>
                    <li>Minum air putih hangat untuk melembapkan membran mukosa penciuman.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Anosmia & Partial Anosmia */}
            <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-200">
                <HelpCircle className="w-5 h-5 text-indigo-700" />
                <h4 className="text-lg font-bold text-zinc-950 uppercase font-mono">
                  2. Anosmia Parsial Molekuler
                </h4>
              </div>
              <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-3 text-justify">
                <p>
                  Sementara anosmia total adalah hilangnya seluruh fungsi indra penciuman, dunia formulasi parfum mengenal konsep yang jauh lebih umum: <strong>Anosmia Parsial / Selektif</strong>.
                </p>
                <p>
                  Setiap manusia dilahirkan dengan variasi kode genetik reseptor olfaktori yang unik. Secara alami, sekitar <strong>20% hingga 30% populasi manusia tidak dapat mencium molekul musk makrosiklik tertentu</strong> (seperti <em>Ethylene Brassylate</em>, <em>Galaxolide</em>, atau <em>Ambrettolide</em>) karena mereka tidak memiliki protein reseptor yang cocok untuk mengunci molekul berukuran raksasa (&gt; 250 g/mol) tersebut.
                </p>
                <p>
                  Orang yang memiliki anosmia parsial terhadap musk tetap dapat mencium aroma bunga, jeruk, atau kayu dengan ketajaman sempurna, tetapi saat mencium botol larutan musk murni, mereka hanya akan mencium bau alkohol pelarut hampa.
                </p>
                <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-2">
                  <strong className="text-zinc-950 block text-xs font-bold font-mono uppercase">
                    Strategi Formulasi Multi-Musk:
                  </strong>
                  <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                    Menghadapi variasi genetik ini, seorang formulator profesional tidak pernah mengandalkan satu jenis molekul musk saja. Formula modern selalu menggunakan kombinasi multi-musk (misalnya memadukan musk makrosiklik, polisiklik, dan alisiklik seperti <em>Helvetolide</em> bersama <em>Ambroxan</em>) sehingga siapapun yang mencium parfum tersebut dijamin dapat menikmati kehangatan dan kelembutan fase drydown secara utuh tanpa ada celah anosmik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}