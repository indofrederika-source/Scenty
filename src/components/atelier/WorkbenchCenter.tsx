"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bookshelf } from "@/components/atelier/Bookshelf";
import { WallNotesBoard } from "@/components/atelier/WallNotesBoard";
import { CuttingMat, MatColorKey, MAT_PRESETS } from "@/components/atelier/CuttingMat";
import { FormulationSheetDesk } from "@/components/atelier/FormulationSheetDesk";
import { ArchiveFolderBadge } from "@/components/atelier/ArchiveFolderBadge";
import { FormulationWorkspaceModal } from "@/components/atelier/FormulationWorkspaceModal";
import { DesktopCalculatorModal } from "@/components/atelier/DesktopCalculatorModal";
import { useFormulationStore } from "@/hooks/useFormulationStore";
import { useWorkbenchItemsStore } from "@/hooks/useWorkbenchItemsStore";
import { AtelierBook } from "@/data/atelier-books";
import { Plus, Trash2, ArrowUpRight } from "lucide-react";

interface WorkbenchCenterProps {
  onSelectBook: (book: AtelierBook) => void;
  onPrepareWorkbench?: () => void;
}

export function WorkbenchCenter({ onSelectBook, onPrepareWorkbench }: WorkbenchCenterProps) {
  const [matColor, setMatColor] = useState<MatColorKey>("green");
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isArchiveFolderOpen, setIsArchiveFolderOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const formulation = useFormulationStore();
  const workbenchItems = useWorkbenchItemsStore();

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen flex flex-col justify-between px-4 sm:px-8 py-2 relative select-none">
      {/* VINTAGE RED ENAMEL STUDIO LAMP: FLUSH MOUNTED AT THE VERY TOP CEILING OF THE WEB */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
        {/* Ceiling Mount Bracket */}
        <div className="w-10 h-2 bg-zinc-900 rounded-b-xs border-b border-zinc-700 shadow-md" />
        {/* Short Neat Cord (Mentok ke atas plafon studio) */}
        <div className="w-1.5 h-2 bg-zinc-950 shadow-xs" />
        {/* Vintage Red Lampshade */}
        <div className="relative flex flex-col items-center">
          <div className="w-6 h-1.5 bg-zinc-900 rounded-t-xs border-t border-zinc-700" />
          <div
            className="w-24 h-11 rounded-t-full shadow-2xl relative"
            style={{
              backgroundColor: "#b91c1c", // Vintage Red Enamel
              boxShadow: "0 14px 28px rgba(0,0,0,0.85), inset 0 2px 4px rgba(255,255,255,0.45)",
            }}
          >
            {/* Lamp rim */}
            <div className="absolute -bottom-1 left-0 right-0 h-1.5 bg-red-950 rounded-full border-b border-amber-900/40" />
            {/* Bulb Glow */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-5 rounded-full blur-xs"
              style={{ backgroundColor: "#fef08a" }}
            />
          </div>
        </div>

        {/* Ambient Warm Light Cone: Completely Smooth Elliptical Gradient with ZERO Hard Lines */}
        <div
          className="w-[1400px] h-[900px] pointer-events-none absolute top-0 -translate-x-1/2 left-1/2"
          style={{
            background:
              "radial-gradient(ellipse 950px 650px at 50% 0%, rgba(254, 240, 138, 0.22) 0%, rgba(251, 191, 36, 0.08) 35%, rgba(245, 158, 11, 0.02) 65%, transparent 100%)",
          }}
        />
      </div>

      {/* 1. TOP WALL: Hanging Shelf with 8 Knowledge Books (Clearance lega di bawah lampu studio) */}
      <div className="w-full flex justify-center pt-28 pb-2 pointer-events-none">
        <Bookshelf onSelectBook={onSelectBook} />
      </div>

      {/* 2. MIDDLE WALL: Interactive, Draggable & Editable Notes System */}
      <div className="relative z-40 my-1 pointer-events-none">
        <WallNotesBoard
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          activeFormulaMaterials={formulation.currentSheet.rows
            .map((r) => r.material)
            .filter((m) => m && m.trim().length > 0)}
        />
      </div>

      {/* 3. BOTTOM: WORKBENCH WOODEN TABLE & TOOLS (Overflow-visible for free dragging across entire screen) */}
      <div className="relative w-full max-w-5xl mx-auto pb-4 overflow-visible">
        {/* Floating Color Palette: Di Pojok Kanan Meja dan Di Luar Meja (Diturunkan dan Diperkecil) */}
        <div className="absolute top-10 right-2 md:-right-10 z-40 flex md:flex-col items-center gap-1.5 p-1.5 rounded-full md:rounded-xl bg-black/90 backdrop-blur-md border border-white/25 shadow-2xl">
          {(Object.keys(MAT_PRESETS) as MatColorKey[]).map((key) => {
            const preset = MAT_PRESETS[key];
            const isActive = matColor === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setMatColor(key)}
                title={preset.name}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer border shrink-0 ${
                  isActive
                    ? "scale-125 ring-1.5 ring-amber-400 border-white shadow-md"
                    : "border-white/30 hover:scale-115 opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: preset.bg }}
              />
            );
          })}
        </div>

        {/* Table Wooden Base Bevel */}
        <div
          className="rounded-3xl p-3 sm:p-5 shadow-2xl border-t border-amber-900/50 relative overflow-visible"
          style={{
            backgroundColor: "#22130c", // Deep Rich Walnut Table
            backgroundImage: "linear-gradient(to bottom, #2b180f 0%, #1c0e07 100%)",
            boxShadow: "0 30px 60px -12px rgba(0,0,0,0.95), inset 0 2px 5px rgba(255,255,255,0.1)",
          }}
        >
          {/* Background Laboratory Reagents: Only appear if selected from Storage Cabinet, DRAGGABLE! */}
          <div className="absolute -top-20 right-10 hidden sm:flex items-end gap-4 z-40 overflow-visible pointer-events-none">
            {/* Etanol 96% 1000 mL Laboratory Solvent Bottle (Draggable anywhere) */}
            {workbenchItems.hasEthanol && (
              <motion.div
                key="workbench-item-ethanol"
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.15, zIndex: 9999, rotate: 2 }}
                whileHover={{ scale: 1.08, zIndex: 60 }}
                className="flex flex-col items-center cursor-grab active:cursor-grabbing select-none relative z-40 pointer-events-auto"
                title="Etanol 96% Perfumer's Grade (Drag untuk memindahkan ke mana saja)"
              >
                {/* Blue Ribbed Laboratory Screw Cap */}
                <div className="w-6 h-4 bg-sky-950 border border-sky-600 rounded-t-sm shadow-xs flex items-center justify-center">
                  <div className="w-4 h-1 bg-sky-700 rounded-full" />
                </div>
                {/* Molded Bottle Neck */}
                <div className="w-5 h-2.5 bg-zinc-200 border-x border-zinc-300" />
                {/* Bottle Body */}
                <div
                  className="w-16 h-28 rounded-t-2xl rounded-b-md border border-zinc-300 shadow-2xl relative flex flex-col justify-between p-1.5 overflow-hidden"
                  style={{
                    background: "linear-gradient(to right, #ffffff 0%, #edf2f7 50%, #e2e8f0 100%)",
                  }}
                >
                  {/* Liquid Level Meniscus */}
                  <div className="absolute bottom-0 left-0 right-0 h-[85%] bg-sky-100/40 pointer-events-none border-t border-sky-300/40" />

                  {/* Measurement Graduation Lines on Glass */}
                  <div className="absolute left-1 top-4 bottom-4 flex flex-col justify-between text-[5px] font-mono text-zinc-400 pointer-events-none">
                    <div className="flex items-center gap-0.5"><div className="w-2 h-0.5 bg-zinc-400" />1000</div>
                    <div className="flex items-center gap-0.5"><div className="w-1.5 h-0.5 bg-zinc-300" />800</div>
                    <div className="flex items-center gap-0.5"><div className="w-2 h-0.5 bg-zinc-400" />600</div>
                    <div className="flex items-center gap-0.5"><div className="w-1.5 h-0.5 bg-zinc-300" />400</div>
                  </div>

                  {/* Professional Laboratory GHS Safety Label */}
                  <div className="w-full bg-[#fcfbf9] border border-zinc-400/80 rounded-xs p-1 shadow-xs my-auto ml-1 text-center relative z-10">
                    <div className="bg-sky-900 text-white font-mono text-[6px] font-extrabold uppercase px-0.5 py-0.5 rounded-2xs leading-none">
                      ETANOL 96%
                    </div>
                    <span className="font-mono text-[5.5px] font-bold text-zinc-800 block mt-0.5 leading-none">
                      Perfumer&apos;s Grade
                    </span>
                    <span className="font-mono text-[5px] text-zinc-500 block leading-none mt-0.5">
                      Denat. Spec. B &bull; 1000 mL
                    </span>
                  </div>

                  {/* Bottom Volume Info */}
                  <div className="text-[5.5px] font-mono text-zinc-500 text-right pr-1 relative z-10">
                    CAS 64-17-5
                  </div>
                </div>
              </motion.div>
            )}

            {/* DPG (Dipropylene Glycol) 500 mL Heavy Amber Glass Reagent Bottle (Draggable anywhere) */}
            {workbenchItems.hasDPG && (
              <motion.div
                key="workbench-item-dpg"
                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.15, zIndex: 9999, rotate: -2 }}
                whileHover={{ scale: 1.08, zIndex: 60 }}
                className="flex flex-col items-center cursor-grab active:cursor-grabbing select-none relative z-40 pointer-events-auto"
                title="DPG Murni Predilution Medium (Drag untuk memindahkan ke mana saja)"
              >
                {/* Black Bakelite Phenolic Cap */}
                <div className="w-5.5 h-3.5 bg-zinc-950 border border-zinc-800 rounded-t-xs shadow-xs" />
                {/* Glass Neck */}
                <div className="w-4 h-2 bg-[#401905] border-x border-amber-950" />
                {/* Amber Glass Cylinder */}
                <div
                  className="w-14 h-24 rounded-t-2xl rounded-b-md border border-amber-950 shadow-2xl relative flex flex-col justify-between p-1 overflow-hidden"
                  style={{
                    background: "linear-gradient(to right, #331404 0%, #7a3a0e 50%, #290f02 100%)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.8), inset 1px 0 2px rgba(255,255,255,0.2)",
                  }}
                >
                  {/* Glass Light Reflection Strip */}
                  <div className="absolute top-1 left-2 w-1.5 h-16 bg-white/20 rounded-full blur-[0.5px] pointer-events-none" />

                  {/* Golden Apothecary Label */}
                  <div className="w-full bg-[#fefbf0] border border-amber-900/60 rounded-xs p-1 shadow-xs my-auto text-center relative z-10">
                    <span className="font-mono text-[6.5px] font-extrabold text-amber-950 uppercase block leading-none">
                      DPG MURNI
                    </span>
                    <span className="font-mono text-[5px] font-bold text-amber-900/80 block mt-0.5 leading-none">
                      Predilution Medium
                    </span>
                    <span className="font-mono text-[4.5px] text-zinc-600 block leading-none mt-0.5">
                      99.8% High Purity &bull; 500 mL
                    </span>
                  </div>

                  <div className="text-[5px] font-mono text-amber-300/60 text-right pr-1 relative z-10">
                    CAS 25265-71-8
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* THE CUTTING MAT WITH LAB ELEMENTS */}
          <CuttingMat activeColor={matColor} onColorChange={setMatColor}>
            {/* Wooden Organizer Box: Functional Workbench Preparation Tray */}
            <div className="w-full -mt-4 sm:-mt-6 mb-4 relative overflow-visible">
              <div
                className="w-full p-2 sm:p-2.5 rounded-xl border border-amber-950/70 shadow-xl relative overflow-visible"
                style={{
                  backgroundColor: "#2e1a10",
                  backgroundImage: "linear-gradient(to right, #241309, #381f12, #241309)",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.12)",
                }}
              >
                {workbenchItems.activeMaterials.length === 0 ? (
                  /* STATE 1: MEJA MASIH BERSIH / DEFAULT STATE */
                  <div className="w-full py-2.5 px-3 flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold uppercase text-amber-400 tracking-wider pl-1">
                      ORGANIZER
                    </span>

                    <button
                      type="button"
                      onClick={onPrepareWorkbench}
                      className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-black tracking-wider shadow-lg shadow-amber-900/40 transition-all hover:scale-103 active:scale-97 cursor-pointer shrink-0"
                    >
                      PREPARE
                    </button>
                  </div>
                ) : (
                  /* STATE 2: BAHAN-BAHAN TELAH DIAMBIL & TERSUSUN RAPI (SEMUA DRAGGABLE) */
                  <div className="w-full flex flex-col gap-2 overflow-visible">
                    <div className="flex items-center justify-between border-b border-amber-950/60 pb-1.5 px-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase font-black text-amber-400 tracking-wider">
                          ORGANIZER &bull; {workbenchItems.activeMaterials.length} BAHAN
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={onPrepareWorkbench}
                          className="px-3 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-mono text-[9px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>PREPARE</span>
                        </button>
                        <button
                          type="button"
                          onClick={workbenchItems.clearWorkbench}
                          className="px-3 py-1 rounded-md bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 font-mono text-[9px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          title="Kembalikan semua bahan ke lemari"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Bersihkan</span>
                        </button>
                      </div>
                    </div>

                    {/* Active Amber Dropper Bottles in Organizer Tray, freely draggable across entire screen */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 py-1 px-1 overflow-visible">
                      {workbenchItems.activeMaterials.map((bot) => (
                        <motion.div
                          key={bot.id}
                          drag
                          dragMomentum={false}
                          dragElastic={0}
                          whileDrag={{ scale: 1.2, zIndex: 9999, rotate: 3 }}
                          whileHover={{ scale: 1.08, zIndex: 60 }}
                          className="group/bot relative cursor-grab active:cursor-grabbing flex flex-col items-center shrink-0 select-none z-40 pointer-events-auto"
                          title={`${bot.name} (${bot.type}) - Drag untuk memindahkan ke mana saja`}
                        >
                          {/* Dropper Pipette Cap */}
                          <div className="w-2.5 h-3.5 rounded-t-sm bg-zinc-950 border border-zinc-700 shadow-xs" />
                          {/* Amber Bottle Glass */}
                          <div
                            className="w-10 h-16 rounded-b-md border border-amber-900 shadow-md relative flex flex-col justify-between py-1 px-0.5"
                            style={{
                              backgroundColor: "#6b3310",
                              backgroundImage: "linear-gradient(to right, #451f08 0%, #874418 50%, #451f08 100%)",
                              boxShadow: "0 4px 8px rgba(0,0,0,0.7), inset 1px 0 2px rgba(255,255,255,0.2)",
                            }}
                          >
                            {/* White Textured Label */}
                            <div className="w-full bg-[#fbf9f4] rounded-2xs py-0.5 px-0.5 text-center shadow-xs border border-zinc-300">
                              <span className="font-mono text-[6.5px] font-bold text-zinc-950 block truncate leading-none">
                                {bot.name}
                              </span>
                              <span className="font-mono text-[5px] text-amber-900 font-semibold block truncate leading-none mt-0.5">
                                {bot.code} &bull; {bot.vol}
                              </span>
                            </div>
                            <div className="text-[5px] font-mono text-amber-200/50 text-center leading-none">
                              {bot.type}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Middle & Bottom Table Surface: Formulation Sheet & Archive Folder, Scale, Glassware, Blotters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-2">
              {/* LEFT: Physical Formulation Sheet & Archive Folder (5 Cols) */}
              <div className="md:col-span-5 space-y-3">
                {/* Physical Formulation Sheet (Matching Photo 2) */}
                <FormulationSheetDesk
                  sheet={formulation.currentSheet}
                  onOpenWorkspace={() => setIsWorkspaceOpen(true)}
                  onOpenArchive={() => setIsArchiveFolderOpen(true)}
                  archiveCount={formulation.historySheets.length}
                />

                {/* Tempat Nyimpen Kertas: Archive with 3D Images-Badge Hover Animation */}
                <ArchiveFolderBadge
                  historySheets={formulation.historySheets}
                  onLoadSheet={formulation.loadSheetFromArchive}
                  onNewSheet={formulation.createNewSheet}
                  onDeleteSheet={formulation.deleteSavedSheet}
                  isFilingAnimation={formulation.isFilingAnimation}
                />
              </div>

              {/* CENTER: Scattered Amber Dropper Bottles & Pipette Beaker (3 Cols) - Draggable */}
              <div className="md:col-span-3 flex items-end justify-center gap-3 pb-1 min-h-[90px]">
                {/* Beaker Borosilikat & Pipet Ukur (Muncul jika dipilih, Draggable) */}
                {workbenchItems.hasBeaker && (
                  <motion.div
                    key="workbench-item-beaker"
                    drag
                    dragMomentum={false}
                    dragElastic={0}
                    whileDrag={{ scale: 1.15, zIndex: 9999, rotate: 2 }}
                    whileHover={{ scale: 1.08, zIndex: 60 }}
                    className="cursor-grab active:cursor-grabbing flex flex-col items-center select-none relative z-40 pointer-events-auto"
                    title="Beaker Borosilikat & Pipet Ukur (Drag untuk memindahkan ke mana saja)"
                  >
                    <div className="w-14 h-20 rounded-b-lg border-2 border-white/40 bg-white/10 backdrop-blur-xs shadow-lg relative flex items-center justify-center">
                      {/* Graduated markings on glass */}
                      <div className="absolute left-1 top-2 bottom-2 flex flex-col justify-between">
                        <div className="w-2 h-0.5 bg-white/60" />
                        <div className="w-3 h-0.5 bg-white/60" />
                        <div className="w-2 h-0.5 bg-white/60" />
                        <div className="w-3 h-0.5 bg-white/60" />
                      </div>
                      {/* Pipettes sticking out */}
                      <div className="w-1.5 h-24 bg-white/60 border border-white/40 rounded-full transform -rotate-12 absolute -top-4 shadow-sm" />
                      <div className="w-1.5 h-24 bg-white/60 border border-white/40 rounded-full transform rotate-6 absolute -top-4 shadow-sm" />
                      <div className="w-1.5 h-24 bg-white/60 border border-white/40 rounded-full transform rotate-18 absolute -top-4 shadow-sm" />
                    </div>
                    <span className="font-mono text-[7px] text-zinc-300 mt-1 font-semibold">Beaker Pipet</span>
                  </motion.div>
                )}

                {/* Dudukan Kayu & Kertas Blotter (Muncul jika dipilih, Draggable) */}
                {workbenchItems.hasBlotters && (
                  <motion.div
                    key="workbench-item-blotters"
                    drag
                    dragMomentum={false}
                    dragElastic={0}
                    whileDrag={{ scale: 1.15, zIndex: 9999, rotate: -2 }}
                    whileHover={{ scale: 1.08, zIndex: 60 }}
                    className="cursor-grab active:cursor-grabbing flex flex-col items-center select-none relative z-40 pointer-events-auto"
                    title="Dudukan Kayu & Kertas Blotter (Drag untuk memindahkan ke mana saja)"
                  >
                    <div className="relative w-12 h-14">
                      <div className="w-2 h-16 bg-white shadow-md rounded-t-xs absolute left-1 bottom-0 transform -rotate-25 origin-bottom border border-zinc-200" />
                      <div className="w-2 h-16 bg-white shadow-md rounded-t-xs absolute left-3 bottom-0 transform -rotate-10 origin-bottom border border-zinc-200" />
                      <div className="w-2 h-16 bg-white shadow-md rounded-t-xs absolute left-5 bottom-0 transform rotate-10 origin-bottom border border-zinc-200" />
                      <div className="w-2 h-16 bg-white shadow-md rounded-t-xs absolute left-7 bottom-0 transform rotate-25 origin-bottom border border-zinc-200" />
                    </div>
                    <div className="w-10 h-3 rounded-xs bg-[#452715] border border-amber-900 shadow-md" />
                    <span className="font-mono text-[7px] text-zinc-300 mt-1 font-semibold">Blotters</span>
                  </motion.div>
                )}

                {/* If neither beaker nor blotters, show clean desk zone hint */}
                {!workbenchItems.hasBeaker && !workbenchItems.hasBlotters && (
                  <div className="text-center py-4 px-2 opacity-35 pointer-events-none">
                    <div className="w-16 h-0.5 bg-white/20 mx-auto mb-1 rounded-full" />
                    <span className="font-mono text-[8px] text-zinc-400">Area Meja Bersih</span>
                  </div>
                )}
              </div>

              {/* RIGHT: Analytical Digital Precision Scale (0.001g) & Calculator (4 Cols) */}
              <div className="md:col-span-4 flex items-end justify-end gap-3">
                {/* Compact Desktop Calculator (Interaktif: Klik untuk buka Kalkulator Meja & HPP Formula) */}
                <div
                  onClick={() => setIsCalculatorOpen(true)}
                  className="w-20 p-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-400 shadow-xl space-y-1.5 hidden sm:block cursor-pointer hover:scale-105 transition-all group"
                  title="Klik untuk membuka Kalkulator Meja & Estimasi Biaya Formula"
                >
                  {/* Solar cell */}
                  <div className="w-8 h-2 bg-amber-950 border border-amber-800 rounded-2xs ml-auto" />
                  {/* LCD Display */}
                  <div className="w-full bg-[#cad2c5] p-1 rounded-xs text-right font-mono text-[9px] font-bold text-zinc-900 group-hover:bg-[#d8e2d4] transition-colors">
                    {formulation.currentSheet.totalWeighedGrams > 0
                      ? `${formulation.currentSheet.totalWeighedGrams.toFixed(2)}g`
                      : "0.000"}
                  </div>
                  {/* Button grid */}
                  <div className="grid grid-cols-3 gap-0.5 text-[6px] font-mono text-center text-zinc-300">
                    <div className="p-1 rounded-2xs bg-zinc-800 group-hover:bg-zinc-700">7</div>
                    <div className="p-1 rounded-2xs bg-zinc-800 group-hover:bg-zinc-700">8</div>
                    <div className="p-1 rounded-2xs bg-zinc-800 group-hover:bg-zinc-700">9</div>
                    <div className="p-1 rounded-2xs bg-zinc-800 group-hover:bg-zinc-700">4</div>
                    <div className="p-1 rounded-2xs bg-zinc-800 group-hover:bg-zinc-700">5</div>
                    <div className="p-1 rounded-2xs bg-zinc-800 group-hover:bg-zinc-700">6</div>
                    <div className="p-1 rounded-2xs bg-zinc-800 group-hover:bg-zinc-700">1</div>
                    <div className="p-1 rounded-2xs bg-zinc-800 group-hover:bg-zinc-700">2</div>
                    <div className="p-1 rounded-2xs bg-zinc-800 group-hover:bg-zinc-700">3</div>
                  </div>
                </div>

                {/* Analytical Digital Balance (0.001g) */}
                <div className="w-48 p-3 rounded-2xl bg-zinc-200 border-2 border-zinc-400 shadow-2xl space-y-2 relative">
                  {/* Stainless Steel Weighing Pan */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-zinc-300 via-zinc-100 to-zinc-400 border border-zinc-400 shadow-inner flex items-center justify-center relative">
                    {/* Beaker on Pan */}
                    <div className="w-10 h-14 rounded-b-md border-2 border-white/60 bg-white/20 backdrop-blur-xs flex items-center justify-center">
                      <div className="w-8 h-4 bg-amber-500/30 rounded-b-xs" />
                    </div>
                  </div>

                  {/* Illuminated Blue LCD Screen (0.000 g) */}
                  <div className="w-full bg-sky-950 p-2 rounded-lg border border-sky-600 shadow-inner flex items-center justify-between">
                    <span className="font-mono text-[8px] text-sky-400 font-bold uppercase tracking-wider">
                      PRECISION LAB
                    </span>
                    <span className="font-mono text-base font-extrabold text-sky-200 tracking-wider">
                      0.000 <span className="text-[10px] text-sky-400">g</span>
                    </span>
                  </div>

                  {/* Tactile Control Buttons */}
                  <div className="flex items-center justify-between pt-0.5 text-[8px] font-mono text-zinc-700">
                    <button className="px-2 py-0.5 rounded bg-zinc-300 border border-zinc-400 font-bold shadow-xs active:translate-y-0.5">
                      ON/OFF
                    </button>
                    <button className="px-2 py-0.5 rounded bg-zinc-300 border border-zinc-400 font-bold shadow-xs active:translate-y-0.5">
                      MODE
                    </button>
                    <button className="px-2.5 py-0.5 rounded bg-emerald-700 text-white font-bold shadow-xs active:translate-y-0.5">
                      TARE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CuttingMat>
        </div>
      </div>

      {/* FULLSCREEN INTERACTIVE FORMULATION WORKSPACE MODAL */}
      <FormulationWorkspaceModal
        isOpen={isWorkspaceOpen}
        onClose={() => setIsWorkspaceOpen(false)}
        sheet={formulation.currentSheet}
        onSetTargetVolume={formulation.setTargetVolume}
        onUpdateName={formulation.updateSheetName}
        onUpdateRow={formulation.updateRow}
        onAddRow={formulation.addRow}
        onDeleteRow={formulation.deleteRow}
        onAddModColumn={formulation.addModColumn}
        onRemoveModColumn={formulation.removeModColumn}
        onSaveToArchive={formulation.saveToArchive}
        onOpenArchive={() => {
          setIsWorkspaceOpen(false);
          // Trigger archive folder badge click
          setTimeout(() => {
            const archiveEl = document.querySelector("[title='Buka Archive'], [title='Buka Arsip'], .group.perspective-\\[1200px\\]") as HTMLElement;
            archiveEl?.click();
          }, 100);
        }}
        onNewSheet={formulation.createNewSheet}
      />

      {/* DESKTOP ATELIER CALCULATOR MODAL (2 FUNGSI: LAB MATH & ESTIMASI BIAYA HPP FORMULA) */}
      <DesktopCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        activeSheet={formulation.currentSheet}
        onAddNoteToWall={(title, content) => {
          window.dispatchEvent(
            new CustomEvent("scenty_add_wall_note", {
              detail: { title, content },
            })
          );
        }}
      />
    </div>
  );
}
