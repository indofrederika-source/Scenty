"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AtelierBook, ATELIER_BOOKS } from "@/data/atelier-books";
import { X, ChevronLeft, ChevronRight, BookOpen, Bookmark } from "lucide-react";

// Import all 8 educational modules
import { ConcentrationSimulator } from "@/components/academy/ConcentrationSimulator";
import { FragranceWheelExplorer } from "@/components/academy/FragranceWheelExplorer";
import { PyramidTimeline } from "@/components/academy/PyramidTimeline";
import { ChapterAccordSection } from "@/components/academy/ChapterAccordSection";
import { ChapterSPLSection } from "@/components/academy/ChapterSPLSection";
import { ExtractionMaterialsSection } from "@/components/academy/ExtractionMaterialsSection";
import { FormulationScienceLab } from "@/components/academy/FormulationScienceLab";
import { IFRASafetySandbox } from "@/components/academy/IFRASafetySandbox";

interface OpenBookModalProps {
  selectedBook: AtelierBook | null;
  onClose: () => void;
  onSelectBook: (book: AtelierBook) => void;
}

export function OpenBookModal({ selectedBook, onClose, onSelectBook }: OpenBookModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to close book
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!selectedBook || !mounted || typeof document === "undefined") return null;

  const currentIndex = ATELIER_BOOKS.findIndex((b) => b.id === selectedBook.id);
  const prevBook = currentIndex > 0 ? ATELIER_BOOKS[currentIndex - 1] : null;
  const nextBook = currentIndex < ATELIER_BOOKS.length - 1 ? ATELIER_BOOKS[currentIndex + 1] : null;

  // Render the specific module component based on book ID
  const renderModuleContent = () => {
    switch (selectedBook.id) {
      case "book-concentration":
        return <ConcentrationSimulator />;
      case "book-fragrance-wheel":
        return <FragranceWheelExplorer />;
      case "book-scent-pyramid":
        return <PyramidTimeline />;
      case "book-accord":
        return <ChapterAccordSection />;
      case "book-spl":
        return <ChapterSPLSection />;
      case "book-extraction":
        return <ExtractionMaterialsSection />;
      case "book-formulation":
        return <FormulationScienceLab />;
      case "book-ifra":
        return <IFRASafetySandbox />;
      default:
        return null;
    }
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* 3D Pull-Out & Open Book Container */}
        <motion.div
          initial={{ scale: 0.6, y: -80, rotateX: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
          exit={{ scale: 0.7, y: -60, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 220 }}
          className="relative z-10 w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-amber-900/40"
          style={{
            perspective: 1600,
          }}
        >
          {/* Top Control Bar (Leather Spine Accent) */}
          <div
            className="px-4 py-2.5 flex items-center justify-between border-b border-black/40 text-xs font-mono select-none"
            style={{
              backgroundColor: selectedBook.coverColor,
              color: selectedBook.foilColor,
            }}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 opacity-80" />
              <span className="font-bold tracking-wider uppercase">
                PERFUMER&apos;S LIBRARY &bull; VOL {selectedBook.volumeNumber}: {selectedBook.spineTitle}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-white font-mono text-xs flex items-center gap-1.5 transition-colors border border-white/20 cursor-pointer"
            >
              <span>Kembalikan ke Rak (ESC)</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Book Double-Page Layout */}
          <div className="flex-1 bg-[#fbf9f4] text-zinc-900 overflow-y-auto relative flex flex-col">
            {/* Antique Book Paper Texture & Gutter */}
            <div className="relative p-6 sm:p-10 lg:p-12 space-y-8">
              {/* Classical Chapter Title Plate */}
              <div className="max-w-4xl mx-auto text-center border-b border-amber-900/15 pb-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-mono font-bold tracking-widest uppercase">
                  <Bookmark className="w-3.5 h-3.5 text-amber-800" />
                  <span>JILID {selectedBook.volumeNumber} &bull; ENSIKLOPEDIA FORMULASI</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 uppercase leading-tight">
                  {selectedBook.fullTitle}
                </h1>
                <p className="text-sm sm:text-base text-zinc-600 font-mono tracking-wide max-w-2xl mx-auto">
                  {selectedBook.subtitle}
                </p>
                <div className="pt-2 text-xs text-zinc-700 max-w-2xl mx-auto text-justify leading-relaxed font-serif italic">
                  &ldquo;{selectedBook.summary}&rdquo;
                </div>
              </div>

              {/* Injected Interactive Module Content */}
              <div className="w-full">
                {renderModuleContent()}
              </div>

              {/* Bottom Book Navigation Between Volumes */}
              <div className="max-w-4xl mx-auto pt-8 border-t border-amber-900/15 flex items-center justify-between text-xs font-mono">
                {prevBook ? (
                  <button
                    onClick={() => onSelectBook(prevBook)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-zinc-900 transition-colors font-bold cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Vol {prevBook.volumeNumber}: {prevBook.spineTitle}</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold transition-colors cursor-pointer"
                >
                  Tutup Buku &amp; Kembali ke Meja
                </button>

                {nextBook ? (
                  <button
                    onClick={() => onSelectBook(nextBook)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-zinc-900 transition-colors font-bold cursor-pointer"
                  >
                    <span>Vol {nextBook.volumeNumber}: {nextBook.spineTitle}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
