"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ArchiveLeft } from "@/components/atelier/ArchiveLeft";
import { WorkbenchCenter } from "@/components/atelier/WorkbenchCenter";
import { StorageCabinetRight } from "@/components/atelier/StorageCabinetRight";
import { OpenBookModal } from "@/components/atelier/OpenBookModal";
import { AtelierBook } from "@/data/atelier-books";
import { ScentyLogo } from "@/components/ui/ScentyLogo";
import { FloatingDock } from "@/components/ui/floating-dock";
import { CabinetIcon } from "@/components/ui/CabinetIcon";
import { useWorkbenchItemsStore } from "@/hooks/useWorkbenchItemsStore";
import { ChevronLeft, ChevronRight, Compass, Wrench } from "lucide-react";

export type ZoneIndex = 0 | 1 | 2; // 0: Left (Archive), 1: Center (Workbench), 2: Right (Storage)

export function SpatialAtelier() {
  // Default view: Center Zone (Workbench)
  const [activeZone, setActiveZone] = useState<ZoneIndex>(1);
  const [selectedBook, setSelectedBook] = useState<AtelierBook | null>(null);

  // Workbench items store for preparing materials & tools from cabinet
  const workbenchStore = useWorkbenchItemsStore();

  // Support direct zone switching via query param
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const zoneParam = params.get("zone");
      if (zoneParam === "0") setActiveZone(0);
      else if (zoneParam === "1") setActiveZone(1);
      else if (zoneParam === "2") setActiveZone(2);
    }
  }, []);

  // Keyboard navigation (ArrowLeft & ArrowRight to pan zones)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't pan zones if a book is currently open
      if (selectedBook) return;

      // CRITICAL FIX: Never pan zones if user is typing in ANY input, textarea, or contentEditable element!
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        setActiveZone((prev) => (Math.max(0, prev - 1) as ZoneIndex));
      } else if (e.key === "ArrowRight") {
        setActiveZone((prev) => (Math.min(2, prev + 1) as ZoneIndex));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBook]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#141517] text-zinc-100 select-none">
      {/* Background Matte Studio Charcoal Wall with Radial Lamp Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "#131416",
          backgroundImage: `
            radial-gradient(circle at 50% 18%, rgba(255, 214, 120, 0.15) 0%, rgba(255, 180, 70, 0.05) 40%, transparent 70%),
            radial-gradient(circle at 18% 70%, rgba(16, 185, 129, 0.04) 0%, transparent 40%),
            radial-gradient(circle at 82% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* TOP BRAND BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto select-none">
          <ScentyLogo size={36} />
          <span className="font-extrabold tracking-tight text-2xl text-white leading-none">
            Scenty
          </span>
        </div>
      </header>

      {/* SPATIAL 3-ZONE HORIZONTAL CANVAS (300vw) */}
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: `-${activeZone * 100}vw` }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="flex h-full w-[300vw] pointer-events-auto"
      >
        {/* ZONE 0: THE PERFUMER'S ARCHIVE (LEFT) */}
        <div className="w-screen shrink-0 h-full overflow-y-auto overflow-x-hidden no-scrollbar pt-16 pb-20">
          <ArchiveLeft />
        </div>

        {/* ZONE 1: ACTIVE WORKBENCH (CENTER - DEFAULT) */}
        <div className="w-screen shrink-0 h-full overflow-y-auto overflow-x-hidden no-scrollbar pb-20 relative">
          <WorkbenchCenter
            onSelectBook={(book) => setSelectedBook(book)}
            onPrepareWorkbench={() => {
              workbenchStore.startPreparation();
              setActiveZone(2);
            }}
          />
        </div>

        {/* ZONE 2: STORAGE CABINET (RIGHT) */}
        <div className="w-screen shrink-0 h-full overflow-y-auto overflow-x-hidden no-scrollbar pt-16 pb-20">
          <StorageCabinetRight
            isSelectionMode={workbenchStore.isSelectionMode}
            stagingItemIds={workbenchStore.stagingItemIds}
            onToggleItem={workbenchStore.toggleStagingItem}
            onStartPreparation={workbenchStore.startPreparation}
            onConfirmSelection={() => {
              workbenchStore.confirmSelection();
              setActiveZone(1); // Return to workbench after selection
            }}
            onCancelSelection={() => {
              workbenchStore.cancelSelection();
              setActiveZone(1);
            }}
          />
        </div>
      </motion.div>

      {/* LEFT & RIGHT QUICK EDGE CHEVRONS */}
      {activeZone > 0 && (
        <button
          onClick={() => setActiveZone((prev) => (prev - 1) as ZoneIndex)}
          className="fixed left-3 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 shadow-2xl backdrop-blur-md transition-all hover:scale-110 cursor-pointer hidden sm:flex items-center justify-center group"
          title="Geser ke Zona Kiri"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}

      {activeZone < 2 && (
        <button
          onClick={() => setActiveZone((prev) => (prev + 1) as ZoneIndex)}
          className="fixed right-3 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 shadow-2xl backdrop-blur-md transition-all hover:scale-110 cursor-pointer hidden sm:flex items-center justify-center group"
          title="Geser ke Zona Kanan"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* BOTTOM FLOATING DOCK (ACETERNITY MAGNIFYING DOCK - SIMBOL SAJA DENGAN LEMARI) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <FloatingDock
          items={[
            {
              title: "Arsip & Roda Aroma",
              icon: <Compass className="w-full h-full text-inherit" />,
              onClick: () => setActiveZone(0),
              active: activeZone === 0,
            },
            {
              title: "Meja Kerja Utama",
              icon: <Wrench className="w-full h-full text-inherit" />,
              onClick: () => setActiveZone(1),
              active: activeZone === 1,
            },
            {
              title: "Lemari Bahan",
              icon: <CabinetIcon className="w-full h-full text-inherit" />,
              onClick: () => {
                workbenchStore.cancelSelection();
                setActiveZone(2);
              },
              active: activeZone === 2,
            },
          ]}
        />
      </div>

      {/* FULLSCREEN 3D BOOK READING MODAL */}
      <OpenBookModal
        selectedBook={selectedBook}
        onClose={() => setSelectedBook(null)}
        onSelectBook={(book) => setSelectedBook(book)}
      />
    </div>
  );
}
