"use client";

import React, { useState } from "react";
import { AtelierBook, ATELIER_BOOKS } from "@/data/atelier-books";
import { BookOpen } from "lucide-react";

interface BookshelfProps {
  onSelectBook: (book: AtelierBook) => void;
}

export function Bookshelf({ onSelectBook }: BookshelfProps) {
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);

  return (
    <div className="relative w-full flex flex-col items-center select-none pt-4 pb-4 pointer-events-none">
      {/* Books Standing Row */}
      <div className="relative z-20 flex items-end justify-center gap-2 sm:gap-2.5 px-4 max-w-4xl mx-auto h-[270px] pointer-events-none">
        {ATELIER_BOOKS.map((book) => {
          const isHovered = hoveredBookId === book.id;

          return (
            <div
              key={book.id}
              onClick={() => onSelectBook(book)}
              onMouseEnter={() => setHoveredBookId(book.id)}
              onMouseLeave={() => setHoveredBookId(null)}
              className="relative cursor-pointer transition-all duration-300 group shrink-0 pointer-events-auto"
              style={{
                height: `${book.spineHeight}px`,
                width: `${book.spineWidth}px`,
                transform: isHovered
                  ? "translateY(-14px) scale(1.04)"
                  : `rotate(${book.tiltDeg}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              {/* Tooltip on Hover */}
              {isHovered && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 p-2 rounded-xl bg-zinc-950/95 text-white border border-amber-500/40 shadow-2xl text-center pointer-events-none z-40 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">
                    Jilid {book.volumeNumber}: {book.spineTitle}
                  </span>
                  <span className="text-[11px] font-medium leading-tight line-clamp-2 block text-zinc-200">
                    {book.fullTitle}
                  </span>
                </div>
              )}

              {/* Book Spine Texture */}
              <div
                className="w-full h-full rounded-t-sm rounded-b-xs shadow-xl relative overflow-hidden flex flex-col justify-between py-2.5 px-1 border-t border-r border-white/20"
                style={{
                  backgroundColor: book.coverColor,
                  boxShadow: isHovered
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.9), 0 0 20px rgba(251, 191, 36, 0.4)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.8), inset 2px 0 4px rgba(255,255,255,0.15), inset -2px 0 4px rgba(0,0,0,0.5)",
                }}
              >
                {/* Vintage Spine Ribs (Embossed horizontal bands) */}
                <div className="space-y-2">
                  <div className="h-1 bg-black/40 border-t border-white/20" />
                  {/* Volume Roman Numeral */}
                  <div
                    className="text-center font-mono font-bold text-[11px] tracking-wider py-0.5"
                    style={{ color: book.foilColor }}
                  >
                    {book.volumeNumber}
                  </div>
                  <div className="h-0.5 bg-black/30" />
                </div>

                {/* Vertical Spine Title (Gold / Silver Foil) - strictly bounded to avoid touching Roman numerals */}
                <div className="h-[135px] max-h-[140px] flex items-center justify-center my-auto overflow-hidden">
                  <span
                    className="font-mono text-[9px] sm:text-[9.5px] font-extrabold uppercase tracking-wider whitespace-nowrap rotate-90 select-none block"
                    style={{
                      color: book.foilColor,
                      textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                    }}
                  >
                    {book.spineTitle}
                  </span>
                </div>

                {/* Bottom Embossed Stamp */}
                <div className="space-y-1.5">
                  <div className="h-0.5 bg-black/30" />
                  <div className="text-center text-[7.5px] font-mono font-bold text-white/50 tracking-wider">
                    SCENTY
                  </div>
                  <div className="h-1 bg-black/40 border-b border-white/10" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hanging Wooden Shelf Plank (Aged Dark Walnut) */}
      <div
        className="relative z-10 w-full max-w-4xl h-7 rounded-sm shadow-2xl border-t border-amber-900/60"
        style={{
          backgroundColor: "#3a2113", // Aged Walnut
          backgroundImage: "linear-gradient(to right, #2a160b, #432616, #2a160b)",
          boxShadow: "0 15px 30px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.12)",
        }}
      >
        {/* Wood grain highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10" />

        {/* Shelf Thickness Shadow */}
        <div className="absolute -bottom-2 left-0 right-0 h-2 bg-[#1f1007]" />

        {/* Carved Wooden Brackets under the shelf */}
        <div className="absolute -bottom-10 left-8 w-6 h-10 bg-[#2c170c] rounded-bl-xl shadow-lg border-l border-amber-950/40" />
        <div className="absolute -bottom-10 right-8 w-6 h-10 bg-[#2c170c] rounded-br-xl shadow-lg border-r border-amber-950/40" />
      </div>
    </div>
  );
}
