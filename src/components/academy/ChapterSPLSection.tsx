"use client";

import React from "react";
import { SPLVisualizer } from "@/components/assets/SPLVisualizer";

export function ChapterSPLSection() {
  return (
    <section id="spl-performance" className="py-24 bg-gradient-to-b from-white via-zinc-50/40 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Centered Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 uppercase leading-tight">
            Sillage, Projection, Longevity
          </h2>
          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed max-w-2xl mx-auto text-justify font-normal">
            Bagaimana performa wewangian dievaluasi di dunia nyata? Tiga parameter utama yang menentukan kualitas daya sebar dan ketahanan parfum di kulit maupun udara adalah <strong>Sillage</strong> (jejak aroma di udara saat bergerak), <strong>Projection</strong> (radius pancaran wangi saat tubuh diam), dan <strong>Longevity</strong> (daya tahan retensi molekul aroma di kulit sebelum habis menguap).
          </p>
        </div>

        {/* Interactive SPL Visualizer Asset (Centered) */}
        <div>
          <SPLVisualizer />
        </div>
      </div>
    </section>
  );
}
