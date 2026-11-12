"use client";

import React, { useState } from "react";
import { PERFUMERY_GLOSSARY, GlossaryTerm } from "@/data/perfumery-data";
import { BookOpen, Search, Filter } from "lucide-react";

export function GlossarySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = ["Semua", "Struktur", "Performa", "Bahan Baku", "Teknik & Proses", "Regulasi"];

  const filteredTerms = PERFUMERY_GLOSSARY.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.technicalDetails.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="glossary" className="py-20 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-800 text-xs font-mono font-medium mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>01. GLOSARIUM TERMINOLOGI PARFUM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 uppercase mb-3">
            Istilah Fundamental Dunia Wewangian
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            Sebelum meracik atau membedah sebuah formula, pahami definisi baku setiap istilah teknis yang digunakan oleh perfumer, kimiawan, dan industri wewangian internasional.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-zinc-950 text-white font-semibold"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari istilah parfum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950"
            />
          </div>
        </div>

        {/* Glossary Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 transition-colors flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200 font-medium">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-950 mb-2">
                  {item.term}
                </h3>
                <p className="text-xs text-zinc-700 leading-relaxed font-normal mb-3">
                  {item.definition}
                </p>
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-100 mb-3">
                  <span className="text-[10px] font-mono font-semibold uppercase text-zinc-500 block mb-1">
                    Detail Teknis &amp; Kimia:
                  </span>
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                    {item.technicalDetails}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-500 font-normal">
                <span className="font-semibold text-zinc-700">Contoh: </span>
                {item.example}
              </div>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="p-12 text-center text-zinc-500 text-sm card-clean">
            Tidak ditemukan istilah dengan kata kunci &quot;{searchQuery}&quot;.
          </div>
        )}
      </div>
    </section>
  );
}
