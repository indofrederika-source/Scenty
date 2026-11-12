"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIZED_PALETTE } from "@/data/formulation-types";
import { ChevronDown, Plus, Search, Tag } from "lucide-react";

interface AnimatedPaletteDrawerProps {
  onSelectMaterial: (name: string, defaultConc?: number) => void;
}

export function AnimatedPaletteDrawer({ onSelectMaterial }: AnimatedPaletteDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategory = CATEGORIZED_PALETTE[activeTab] || CATEGORIZED_PALETTE[0];

  const filteredItems = searchQuery.trim()
    ? CATEGORIZED_PALETTE.flatMap((cat) =>
        cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.note.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : currentCategory.items;

  return (
    <div className="w-full select-none">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
      >
        <Tag className="w-3.5 h-3.5" />
        <span>Pilih dari Palet Bahan Baku</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      {/* Slide-Down Animated Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="overflow-hidden mt-3 rounded-xl bg-zinc-900 border border-amber-900/40 shadow-2xl p-3 sm:p-4 text-zinc-100"
          >
            {/* Search Input & Category Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-3">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1">
                {CATEGORIZED_PALETTE.map((cat, idx) => {
                  const isActive = !searchQuery && activeTab === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveTab(idx);
                        setSearchQuery("");
                      }}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                        isActive
                          ? "bg-amber-400 text-zinc-950 font-bold shadow-xs"
                          : "bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300"
                      }`}
                    >
                      {cat.category}
                    </button>
                  );
                })}
              </div>

              {/* Quick Search Input */}
              <div className="relative w-44">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari bahan..."
                  className="w-full pl-7 pr-2 py-1 rounded-md bg-zinc-950 text-white font-mono text-[10px] border border-zinc-700 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Grid of Materials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
              {filteredItems.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    onSelectMaterial(item.name, item.defaultConc);
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-lg bg-zinc-950 hover:bg-amber-500/10 border border-zinc-800 hover:border-amber-500/50 transition-all cursor-pointer group flex items-start justify-between gap-1"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] font-bold text-white group-hover:text-amber-300 block truncate">
                      {item.name}
                    </span>
                    <span className="text-[9px] text-zinc-400 block line-clamp-1">
                      {item.note}
                    </span>
                  </div>
                  <div className="p-1 rounded bg-zinc-800 group-hover:bg-amber-500 group-hover:text-zinc-950 text-zinc-400 transition-colors shrink-0">
                    <Plus className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
