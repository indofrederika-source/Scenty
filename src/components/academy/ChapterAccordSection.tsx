"use client";

import React from "react";
import { Music, Layers, CheckCircle2 } from "lucide-react";

export function ChapterAccordSection() {
  return (
    <section id="accord" className="py-24 bg-gradient-to-b from-white via-zinc-50/40 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title & Fundamental Theory */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 uppercase leading-tight">
            Accord (Akord Aroma)
          </h2>

          <div className="text-sm sm:text-base text-zinc-700 leading-relaxed space-y-4 text-justify font-normal pt-2">
            <p>
              Jika <em>Note</em> diibaratkan sebagai satu tuts nada tunggal pada piano (seperti nada Do atau Mi), maka <strong>Accord (Akord)</strong> adalah bunyi harmoni yang lahir ketika beberapa nada ditekan secara bersamaan dalam rasio yang pas. Dalam wewangian, akord adalah perpaduan sinergis dari dua, tiga, atau lebih bahan baku individual yang melebur sedemikian rupa sehingga menghasilkan <strong>kesatuan karakter wangi baru yang bulat dan utuh</strong>, di mana hidung manusia tidak lagi dapat memisahkan atau mengenali masing-masing komponen pembentuknya.
            </p>
            <p>
              Fenomena ini dikenal di dunia sains sebagai efek <strong>Gestalt Olfaktori</strong>: keseluruhan wangi yang tercipta jauh melampaui penjumlahan sederhana bahan-bahannya. Bagi seorang peracik parfum, akord adalah <strong>blok bangunan utama (building blocks)</strong>. Sebelum merancang formula parfum lengkap dengan puluhan bahan baku yang rumit, seorang peracik akan menyusun dan menguji akord-akord fondasi terlebih dahulu.
            </p>
          </div>
        </div>

        {/* 1 Concrete In-Depth Example: The Classic Amber Accord */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
            <div>
              <span className="text-xs font-mono uppercase text-amber-700 font-bold block mb-0.5">
                Studi Kasus Akord Legendaris
              </span>
              <h3 className="text-2xl font-extrabold text-zinc-950 uppercase tracking-tight">
                Classic Amber Accord
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 font-bold self-start sm:self-auto">
              Harmoni 3 Komponen
            </span>
          </div>

          <p className="text-sm text-zinc-700 leading-relaxed text-justify font-normal">
            Di alam semesta nyata, <strong>tidak ada pohon, bunga, atau buah yang menghasilkan aroma bernama &quot;Amber&quot;</strong>. Batu amber (amber fosil) adalah getah purba padat yang sama sekali tidak memiliki wangi. Aroma &quot;Amber&quot; yang hangat, manis, keemasan, dan berbau getah mewah yang sering kita cium dalam parfum mewah adalah murni akord buatan manusia yang diciptakan melalui sinergi tiga bahan:
          </p>

          {/* 3 Ingredient Roles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-950 uppercase">Labdanum Resinoid</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 font-bold">45%</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                Getah pekat dari semak <em>Cistus ladanifer</em>. Berperan sebagai tulang punggung yang memberikan kedalaman aroma tanah hangat, tembakau, dan nuansa kulit purba.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-950 uppercase">Vanillin</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 font-bold">35%</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                Molekul kristal manis balsamik. Berperan melembutkan sudut-sudut tajam dan menutupi rasa pahit mentah dari getah labdanum, menghasilkan kehangatan krimi.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-950 uppercase">Benzoin Siam</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 font-bold">20%</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                Getah resin pohon Styrax. Berperan sebagai jembatan perekat (*bridge*) yang menyatukan vanillin dan labdanum dengan nuansa wangi dupa manis dan aroma almond halus.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed text-justify">
            <strong>Hasil Sinergi Olfaktori:</strong> Ketika ketiga bahan ini dicampur dalam perbandingan di atas, hidung Anda tidak lagi mencium bau getah labdanum atau vanila secara terpisah. Yang tercium adalah satu aroma baru yang kaya, mewah, dan berwibawa yang dikenal di seluruh dunia sebagai <em>Amber</em>.
          </div>
        </div>
      </div>
    </section>
  );
}
