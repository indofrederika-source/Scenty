"use client";

import React from "react";
import { ScentPyramidVisual } from "@/components/assets/ScentPyramidVisual";
import { Activity, Thermometer, UserCheck } from "lucide-react";

export function PyramidTimeline() {
  return (
    <section id="scent-pyramid" className="py-24 bg-gradient-to-b from-white via-zinc-50/50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title: strictly "Scent Pyramid" */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 uppercase leading-tight">
            Scent Pyramid
          </h2>

          <div className="text-sm sm:text-base text-zinc-700 leading-relaxed space-y-4 text-justify font-normal pt-2">
            <p>
              Mengapa aroma parfum yang Anda semprotkan pada pagi hari tercium sangat berbeda pada siang dan malam harinya? Hal ini disebabkan oleh konsep <strong>Scent Pyramid (Piramida Aroma)</strong>, yaitu arsitektur penyusunan formula berdasarkan laju penguapan (evaporasi) molekuler. Setiap bahan baku wewangian memiliki bobot molekul (<em>molecular weight</em>) dan tekanan uap yang menentukan kapan partikel aroma tersebut lepas dari kulit ke udara.
            </p>
            <p>
              Piramida wewangian tersusun dari tiga lapisan berjenjang yang saling menyambung:
            </p>
          </div>

          {/* 3 Pillars Deep-Dive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-left">
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 shadow-2xs">
              <span className="text-xs font-mono font-bold text-amber-950 uppercase block mb-1">
                1. Top Notes (Nada Pembuka)
              </span>
              <p className="text-xs text-zinc-700 leading-relaxed text-justify">
                Merupakan molekul wangi teringan (&lt; 150 g/mol) yang langsung lepas ke udara begitu alkohol menguap. Bertanggung jawab atas kesan pertama (*first impression*) wewangian selama 15–45 menit pertama. Contoh: Citrus (Bergamot, Lemon), Herbal aromatik (Lavender), dan Aldehydes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 shadow-2xs">
              <span className="text-xs font-mono font-bold text-rose-950 uppercase block mb-1">
                2. Middle Notes / Heart Notes (Nada Jantung)
              </span>
              <p className="text-xs text-zinc-700 leading-relaxed text-justify">
                Merupakan identitas dan kepribadian inti parfum yang mulai tercium saat top notes mulai memudar, bertahan 2–5 jam di kulit. Berbobot molekul menengah (150–220 g/mol) yang mengharmonisasikan kesegaran awal dengan kedalaman dasar. Contoh: Floral (Rose, Jasmine), Spices (Clove, Cardamom), dan Fruity notes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-100 border border-zinc-300 shadow-2xs">
              <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1">
                3. Base Notes (Nada Dasar)
              </span>
              <p className="text-xs text-zinc-700 leading-relaxed text-justify">
                Fondasi struktural parfum yang tersusun dari molekul berat (&gt; 220 g/mol) dengan titik didih tinggi. Bertindak sebagai fiksatif alami yang menahan formula agar bertahan 6 hingga 24 jam lebih di kulit. Contoh: Woods (Sandalwood, Cedar), Resins (Benzoin, Labdanum), Vetiver, Patchouli, dan Musks.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Architectural Scent Pyramid Visual Asset */}
        <div>
          <div className="text-center mb-3">
            <span className="text-xs font-mono uppercase text-zinc-400 font-bold">
              Arsitektur Piramida Aroma (Arahkan Kursor / Hover pada Lapisan untuk Membuka Detail):
            </span>
          </div>
          <ScentPyramidVisual />
        </div>

        {/* Drydown Explanation: Pure Detailed Text Explanation (NO interactive slider) */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
            <div className="w-8 h-8 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-bold text-xs">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 uppercase tracking-tight">
                Drydown: Fase Akhir Parfum &amp; Kimia Kulit
              </h3>
              <p className="text-xs font-mono text-zinc-500">
                Evolusi Tahap Akhir Setelah 4–8+ Jam Pasca Penyemprotan
              </p>
            </div>
          </div>

          <div className="text-sm text-zinc-700 leading-relaxed space-y-3 text-justify font-normal">
            <p>
              <strong>Drydown</strong> adalah fase paling intim dan personal dalam siklus hidup sebuah parfum. Fase ini terjadi setelah 4 hingga 8+ jam, ketika seluruh top notes yang mudah menguap dan sebagian besar heart notes telah habis meninggalkan permukaan kulit. Yang tersisa hanyalah jejak molekul base notes terberat bersama fiksatif alami dan sintetis (seperti <em>Iso E Super</em>, <em>Ambroxan</em>, atau molekul <em>Musk</em>).
            </p>
            <p>
              Mengapa parfum yang sama dapat tercium sangat berbeda pada kulit orang yang berbeda? Jawabannya terletak pada <strong>biokimia permukaan kulit manusia</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-left">
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-zinc-700" />
                  Suhu Tubuh &amp; Keringat
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Suhu basal kulit yang lebih hangat mempercepat pelepasan molekul resin, sementara garam dan mineral dalam keringat dapat mengubah proyeksi aroma manis atau asam.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-xs font-mono font-bold text-zinc-950 uppercase block mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-zinc-700" />
                  Sebum, Lipid &amp; pH Kulit
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed text-justify">
                  Molekul base notes bersifat lipofilik (larut dalam minyak). Asam lemak alami sebum pada kulit mengikat molekul wangi tersebut; kulit yang kaya lipid akan mempertahankan aroma jauh lebih lama dibanding kulit kering.
                </p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 pt-1">
              Oleh karena itu, para ahli wewangian selalu menyarankan untuk tidak menilai parfum hanya dari semprotan 10 detik pertama di kertas blotter, melainkan mengujinya langsung di kulit pergelangan tangan dan menunggu hingga fase drydown terungkap sepenuhnya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
