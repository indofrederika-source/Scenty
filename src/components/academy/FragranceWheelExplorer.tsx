"use client";

import React from "react";
import { CircularFragranceWheel } from "@/components/assets/CircularFragranceWheel";

export function FragranceWheelExplorer() {
  return (
    <section id="fragrance-wheel" className="py-24 bg-gradient-to-b from-white via-zinc-50/50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title & Fundamental Theory */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 uppercase leading-tight">
            Note &amp; Fragrance Wheel
          </h2>

          <div className="text-sm sm:text-base text-zinc-700 leading-relaxed space-y-4 text-justify font-normal pt-2">
            <p>
              Dalam terminologi wewangian, <strong>Note (Nada Aroma)</strong> adalah satuan deskriptor olfaktori terkecil yang menyusun struktur sebuah parfum. Istilah ini dipinjam dari dunia musik: seperti halnya tuts piano tunggal yang dapat dibunyikan sendiri atau digabungkan menjadi akord harmoni yang megah, note parfum adalah karakter aroma individual yang dipersepsikan oleh indra penciuman manusia.
            </p>
            <p>
              Sebuah note dapat berasal dari <strong>satu bahan alami tunggal</strong> (seperti aroma zesty dari <em>Bergamot Oil Expressed</em> atau aroma kayu creamy dari <em>Sandalwood Oil</em>), atau berupa <strong>karakter sensori senyawa aroma sintetis</strong> (seperti aroma melati transparan dari <em>Hedione</em> atau nuansa ozonik laut dari <em>Calone 1951</em>).
            </p>
            <p>
              Untuk mengorganisasi dan mengklasifikasikan ribuan bahan baku di dunia, industri internasional merujuk pada sistem <strong>Fragrance Wheel (Roda Wewangian)</strong>. Roda ini memetakan keluarga aroma secara melingkar, menunjukkan kedekatan karakter dan transisi olfaktori antar-rumpun aroma utama (Citrus, Floral, Amber, Woody, Fougère, Gourmand, Chypre, Aquatic).
            </p>
          </div>
        </div>

        {/* Real Circular Fragrance Wheel Asset */}
        <div>
          <div className="text-center mb-3">
            <span className="text-xs font-mono uppercase text-zinc-400 font-bold">
              Klik Sektor Roda untuk Membuka Detail Profil &amp; Isolat Aroma:
            </span>
          </div>

          <CircularFragranceWheel />
        </div>
      </div>
    </section>
  );
}
