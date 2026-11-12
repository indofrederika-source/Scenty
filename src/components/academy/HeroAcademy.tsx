"use client";

import React from "react";
import { ArrowDown } from "lucide-react";

export function HeroAcademy() {
  const scrollToStart = () => {
    const el = document.getElementById("parfum-intro");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-white via-zinc-50/50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-zinc-950 uppercase leading-[1.04] mb-8">
          ENSIKLOPEDIA &amp; DASAR FORMULASI PARFUM
        </h1>

        <p className="text-base sm:text-lg text-zinc-700 leading-relaxed max-w-3xl mx-auto font-normal text-justify mb-10">
          Wewangian adalah perkawinan antara kimia organik presisi dan seni keindahan sensori. Panduan ini dirancang untuk membedah seluruh prinsip parfum dari fondasi paling mendasar: anatomi cairan aroma, rasio konsentrasi pelarut, taksonomi roda wewangian, struktur piramida, keharmonisan akord, dinamika sillage dan proyeksi, teknik ekstraksi bahan, hingga regulasi keselamatan dermal internasional.
        </p>

        <div className="flex items-center justify-center">
          <button
            onClick={scrollToStart}
            className="px-6 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-sm transition-all flex items-center gap-2 shadow-sm hover:gap-3"
          >
            <span>Pelajari dari Dasar</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
