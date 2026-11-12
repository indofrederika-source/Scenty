"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import {
  Plus,
  Trash2,
  CheckSquare,
  Square,
  List,
  FileText,
  Image as ImageIcon,
  X,
  Check,
  Upload,
  Coins,
  Calculator,
  Camera,
  RotateCcw,
  Crop,
} from "lucide-react";
import { useMaterialPrices, MaterialPriceItem } from "@/hooks/useMaterialPrices";

export type NoteFunctionMode = "text" | "checklist" | "bullet" | "photo" | "pricing";
export type NoteColorTheme = "yellow" | "blue" | "rose" | "kraft" | "white";
export type NoteSize = "sm" | "md" | "lg";

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface WallNoteItem {
  id: string;
  mode: NoteFunctionMode;
  theme: NoteColorTheme;
  size: NoteSize;
  title: string;
  content: string;
  checklist: ChecklistItem[];
  bullets: string[];
  photoUrl?: string; // Base64 data URL or empty
  photoCaption?: string;
  rotation: number;
  x: number;
  y: number;
}

interface WallNotesBoardProps {
  onOpenCalculator?: () => void;
  activeFormulaMaterials?: string[];
}

const STORAGE_KEY = "scenty_wall_notes_v6";

// Helper to create 6 default empty checklist items
export const createDefault6Checklist = (): ChecklistItem[] => [
  { id: "c-1", text: "", done: false },
  { id: "c-2", text: "", done: false },
  { id: "c-3", text: "", done: false },
  { id: "c-4", text: "", done: false },
  { id: "c-5", text: "", done: false },
  { id: "c-6", text: "", done: false },
];

// Helper to create 6 default empty bullet items
export const createDefault6Bullets = (): string[] => ["", "", "", "", "", ""];

// Initial default notes on wall (Clean and positioned stably)
const INITIAL_NOTES: WallNoteItem[] = [
  {
    id: "note-init-photo",
    mode: "photo",
    theme: "white",
    size: "md",
    title: "",
    content: "",
    checklist: [],
    bullets: [],
    photoUrl: undefined,
    photoCaption: "",
    rotation: -2,
    x: 40,
    y: 15,
  },
  {
    id: "note-init-checklist",
    mode: "checklist",
    theme: "yellow",
    size: "md",
    title: "",
    content: "",
    checklist: createDefault6Checklist(),
    bullets: [],
    rotation: 1.5,
    x: 320,
    y: 10,
  },
  {
    id: "note-init-pricing",
    mode: "pricing",
    theme: "blue",
    size: "md",
    title: "DAFTAR HARGA BAHAN",
    content: "",
    checklist: [],
    bullets: [],
    rotation: -1.2,
    x: 600,
    y: 15,
  },
];

// Helper to get color styles based on paper theme
export const getThemeStyles = (theme: NoteColorTheme) => {
  switch (theme) {
    case "yellow":
      return "bg-[#fef9c3] text-yellow-950 border-yellow-300 shadow-yellow-950/15";
    case "blue":
      return "bg-[#eff6ff] text-blue-950 border-blue-200 shadow-blue-950/15";
    case "rose":
      return "bg-[#fdf2f8] text-rose-950 border-rose-200 shadow-rose-950/15";
    case "kraft":
      return "bg-[#f5ebd7] text-[#3e2714] border-[#d8c3a5] shadow-amber-950/20";
    case "white":
    default:
      return "bg-[#faf8f5] text-zinc-900 border-zinc-300 shadow-black/15";
  }
};

// Helper to get sizing styles
export const getSizeStyles = (size: NoteSize) => {
  switch (size) {
    case "sm":
      return "w-48 text-[9px]";
    case "lg":
      return "w-72 text-xs";
    case "md":
    default:
      return "w-60 text-[10px]";
  }
};

/* ========================================================================= */
/* 1. FREE CROPPING TOOL COMPONENT (4-DIRECTION ADJUSTABLE DRAG CROPPER)     */
/* ========================================================================= */
interface InteractiveImageCropperProps {
  imageUrl: string;
  onApplyCrop: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

function InteractiveImageCropper({
  imageUrl,
  onApplyCrop,
  onCancel,
}: InteractiveImageCropperProps) {
  // Crop area in percentage (0 to 100)
  const [crop, setCrop] = useState({ x: 5, y: 5, width: 90, height: 90 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handlePointerDown = (
    type: "move" | "top" | "bottom" | "left" | "right" | "tl" | "tr" | "bl" | "br",
    e: React.PointerEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startCrop = { ...crop };
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaXPct = ((moveEvent.clientX - startX) / rect.width) * 100;
      const deltaYPct = ((moveEvent.clientY - startY) / rect.height) * 100;

      let nextX = startCrop.x;
      let nextY = startCrop.y;
      let nextW = startCrop.width;
      let nextH = startCrop.height;

      const MIN_SIZE = 8; // 8% minimum width/height

      if (type === "move") {
        nextX = Math.max(0, Math.min(100 - startCrop.width, startCrop.x + deltaXPct));
        nextY = Math.max(0, Math.min(100 - startCrop.height, startCrop.y + deltaYPct));
      } else {
        if (type.includes("left") || type === "tl" || type === "bl") {
          const maxLeft = startCrop.x + startCrop.width - MIN_SIZE;
          nextX = Math.max(0, Math.min(maxLeft, startCrop.x + deltaXPct));
          nextW = startCrop.x + startCrop.width - nextX;
        }
        if (type.includes("right") || type === "tr" || type === "br") {
          const maxWidth = 100 - startCrop.x;
          nextW = Math.max(MIN_SIZE, Math.min(maxWidth, startCrop.width + deltaXPct));
        }
        if (type.includes("top") || type === "tl" || type === "tr") {
          const maxTop = startCrop.y + startCrop.height - MIN_SIZE;
          nextY = Math.max(0, Math.min(maxTop, startCrop.y + deltaYPct));
          nextH = startCrop.y + startCrop.height - nextY;
        }
        if (type.includes("bottom") || type === "bl" || type === "br") {
          const maxHeight = 100 - startCrop.y;
          nextH = Math.max(MIN_SIZE, Math.min(maxHeight, startCrop.height + deltaYPct));
        }
      }

      setCrop({
        x: Math.round(nextX * 10) / 10,
        y: Math.round(nextY * 10) / 10,
        width: Math.round(nextW * 10) / 10,
        height: Math.round(nextH * 10) / 10,
      });
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const handleApply = () => {
    const img = imgRef.current;
    if (!img) return;

    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;
    if (!naturalW || !naturalH) return;

    const sx = (crop.x / 100) * naturalW;
    const sy = (crop.y / 100) * naturalH;
    const sWidth = (crop.width / 100) * naturalW;
    const sHeight = (crop.height / 100) * naturalH;

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(sWidth));
    canvas.height = Math.max(1, Math.round(sHeight));
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
    const croppedUrl = canvas.toDataURL("image/jpeg", 0.95);
    onApplyCrop(croppedUrl);
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full bg-zinc-950 p-4 rounded-xl border border-zinc-700 select-none">
      <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-300 pb-1 border-b border-zinc-800">
        <span className="font-bold text-amber-400">FITUR CROP FOTO BEBAS</span>
        <span className="text-[11px] text-zinc-400">Drag garis atau sudut untuk memotong bebas</span>
      </div>

      {/* Visual Cropping Workspace */}
      <div
        ref={containerRef}
        className="relative max-w-full max-h-[380px] select-none touch-none overflow-hidden rounded-lg bg-black flex items-center justify-center border border-zinc-700"
      >
        <img
          ref={imgRef}
          src={imageUrl}
          alt="Cropper Source"
          draggable={false}
          className="max-h-[360px] max-w-full object-contain pointer-events-none select-none block"
        />

        {/* Shading overlay outside crop rectangle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${crop.x + crop.width / 2}% ${
              crop.y + crop.height / 2
            }%, transparent ${Math.min(crop.width, crop.height) / 2}%, rgba(0,0,0,0.65) ${
              Math.max(crop.width, crop.height)
            }%)`,
          }}
        />

        {/* Crop Selection Rectangle Box */}
        <div
          className="absolute border-2 border-amber-400 shadow-2xl"
          style={{
            left: `${crop.x}%`,
            top: `${crop.y}%`,
            width: `${crop.width}%`,
            height: `${crop.height}%`,
            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.55)",
          }}
        >
          {/* Inside Draggable Move Area */}
          <div
            onPointerDown={(e) => handlePointerDown("move", e)}
            className="w-full h-full cursor-move grid grid-cols-3 grid-rows-3 divide-x divide-y divide-white/25 pointer-events-auto"
          >
            <div /> <div /> <div />
            <div /> <div /> <div />
            <div /> <div /> <div />
          </div>

          {/* 4 Corner Handles */}
          <div
            onPointerDown={(e) => handlePointerDown("tl", e)}
            className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-xs bg-amber-400 border-2 border-black cursor-nwse-resize shadow-md pointer-events-auto"
          />
          <div
            onPointerDown={(e) => handlePointerDown("tr", e)}
            className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-xs bg-amber-400 border-2 border-black cursor-nesw-resize shadow-md pointer-events-auto"
          />
          <div
            onPointerDown={(e) => handlePointerDown("bl", e)}
            className="absolute -bottom-2.5 -left-2.5 w-5 h-5 rounded-xs bg-amber-400 border-2 border-black cursor-nesw-resize shadow-md pointer-events-auto"
          />
          <div
            onPointerDown={(e) => handlePointerDown("br", e)}
            className="absolute -bottom-2.5 -right-2.5 w-5 h-5 rounded-xs bg-amber-400 border-2 border-black cursor-nwse-resize shadow-md pointer-events-auto"
          />

          {/* 4 Edge Handles */}
          <div
            onPointerDown={(e) => handlePointerDown("top", e)}
            className="absolute -top-1.5 left-4 right-4 h-3 cursor-ns-resize pointer-events-auto"
          />
          <div
            onPointerDown={(e) => handlePointerDown("bottom", e)}
            className="absolute -bottom-1.5 left-4 right-4 h-3 cursor-ns-resize pointer-events-auto"
          />
          <div
            onPointerDown={(e) => handlePointerDown("left", e)}
            className="absolute -left-1.5 top-4 bottom-4 w-3 cursor-ew-resize pointer-events-auto"
          />
          <div
            onPointerDown={(e) => handlePointerDown("right", e)}
            className="absolute -right-1.5 top-4 bottom-4 w-3 cursor-ew-resize pointer-events-auto"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between w-full pt-1">
        <button
          type="button"
          onClick={() => setCrop({ x: 0, y: 0, width: 100, height: 100 })}
          className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs font-bold cursor-pointer transition-colors"
        >
          Reset Crop
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs font-bold cursor-pointer transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md transition-transform hover:scale-102"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Terapkan Crop</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 2. DRAGGABLE WALL NOTE CARD (SMOOTH ZERO-JUMP MOTIONVALUE ARCHITECTURE)   */
/* ========================================================================= */
interface DraggableWallNoteCardProps {
  note: WallNoteItem;
  prices: MaterialPriceItem[];
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onSelect: (note: WallNoteItem) => void;
  onDelete: (id: string) => void;
  onOpenCalculator?: () => void;
  onToggleChecklist: (noteId: string, itemId: string, e: React.MouseEvent) => void;
}

function DraggableWallNoteCard({
  note,
  prices,
  onUpdatePosition,
  onSelect,
  onDelete,
  onOpenCalculator,
  onToggleChecklist,
}: DraggableWallNoteCardProps) {
  const x = useMotionValue(note.x);
  const y = useMotionValue(note.y);
  const isDraggingRef = useRef(false);

  // Sync motion values if external state changes
  useEffect(() => {
    x.set(note.x);
    y.set(note.y);
  }, [note.x, note.y]);

  const themeStyle = getThemeStyles(note.theme);
  const sizeStyle = getSizeStyles(note.size);

  const hasTitle = Boolean(note.title && note.title.trim().length > 0);
  const hasContent = Boolean(note.content && note.content.trim().length > 0);
  const hasPhoto = Boolean(note.photoUrl);

  return (
    <motion.div
      key={note.id} // STABLE KEY! Never remounts on drag!
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => {
        isDraggingRef.current = true;
      }}
      onDragEnd={() => {
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 80);
        const curX = Math.round(x.get());
        const curY = Math.round(y.get());
        onUpdatePosition(note.id, curX, curY);
      }}
      whileHover={{ scale: 1.02, zIndex: 60 }}
      whileDrag={{ scale: 1.05, zIndex: 100, boxShadow: "0 25px 45px rgba(0,0,0,0.85)" }}
      className={`cursor-grab active:cursor-grabbing group/note rounded-xs shadow-xl border p-3 ${themeStyle} ${sizeStyle} z-40 select-none pointer-events-auto`}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        x,
        y,
        rotate: `${note.rotation}deg`,
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onClick={() => {
        if (!isDraggingRef.current) {
          onSelect(note);
        }
      }}
    >
      {/* Top Pin / Tape Decoration */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none select-none">
        {note.theme === "blue" ? (
          <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 border border-indigo-400 shadow-md" />
        ) : note.theme === "rose" ? (
          <div className="w-3.5 h-3.5 rounded-full bg-rose-500 border border-rose-300 shadow-md" />
        ) : note.theme === "yellow" ? (
          <div className="w-10 h-3.5 bg-white/50 border border-white/60 backdrop-blur-xs -rotate-2" />
        ) : note.theme === "kraft" ? (
          <div className="w-10 h-3.5 bg-[#dfcfb6] border border-[#b89e7c] backdrop-blur-xs rotate-1" />
        ) : (
          <div className="w-10 h-3.5 bg-white/70 border border-zinc-300 backdrop-blur-xs -rotate-1" />
        )}
      </div>

      {/* Quick Delete button (visible on hover) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
        title="Hapus"
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover/note:opacity-100 transition-opacity z-50 shadow-md cursor-pointer"
      >
        <Trash2 className="w-2.5 h-2.5" />
      </button>

      {/* Title (Rendered ONLY if user entered text, otherwise clean blank!) */}
      {hasTitle && (
        <div className="font-mono font-extrabold uppercase truncate mb-1.5 border-b border-black/10 pb-0.5 text-inherit pointer-events-none select-none">
          {note.title}
        </div>
      )}

      {/* MODE 1: PHOTO ATTACHMENT (Natural Aspect Ratio & Ghost Drag Fix) */}
      {note.mode === "photo" && (
        <div className="w-full flex flex-col items-center pointer-events-none select-none">
          {hasPhoto ? (
            <div className="relative w-full rounded-xs overflow-hidden border border-black/10 shadow-inner bg-black/5 pointer-events-none select-none">
              <img
                src={note.photoUrl!}
                alt={note.photoCaption || "Lampiran Foto"}
                draggable={false}
                className="w-full h-auto max-h-[380px] object-contain rounded-xs pointer-events-none select-none block mx-auto"
                style={{ WebkitUserDrag: "none" } as React.CSSProperties}
              />
            </div>
          ) : (
            <div className="w-full h-28 rounded-xs border border-dashed border-zinc-400/70 bg-black/5 flex flex-col items-center justify-center p-2 text-center text-zinc-500 pointer-events-none select-none">
              <Camera className="w-5 h-5 mb-1 opacity-60" />
              <span className="text-[8px] font-mono">Foto Kosong</span>
            </div>
          )}

          {note.photoCaption && note.photoCaption.trim().length > 0 && (
            <div className="mt-1 text-center font-mono text-[8px] text-zinc-700 italic truncate w-full pointer-events-none select-none">
              {note.photoCaption}
            </div>
          )}
        </div>
      )}

      {/* MODE 2: CHECKLIST (6 BARIS DEFAULT) */}
      {note.mode === "checklist" && (
        <div className="space-y-1.5 w-full">
          {note.checklist.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={(e) => onToggleChecklist(note.id, item.id, e)}
              className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 pointer-events-auto"
            >
              {item.done ? (
                <CheckSquare className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              ) : (
                <Square className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              )}
              <div
                className={`font-mono text-[9px] leading-tight truncate flex-1 ${
                  item.done ? "line-through opacity-50" : "font-medium"
                }`}
              >
                {item.text && item.text.trim().length > 0 ? (
                  item.text
                ) : (
                  <div className="h-2.5 border-b border-black/10 opacity-30 w-full" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODE 3: BULLET LIST (6 POIN DEFAULT) */}
      {note.mode === "bullet" && (
        <div className="space-y-1 w-full pointer-events-none select-none">
          {note.bullets.slice(0, 6).map((b, idx) => (
            <div key={idx} className="flex items-center gap-1.5 font-mono text-[9px] leading-tight">
              <span className="text-zinc-600 select-none text-[11px]">&bull;</span>
              <div className="truncate flex-1">
                {b && b.trim().length > 0 ? (
                  b
                ) : (
                  <div className="h-2.5 border-b border-black/10 opacity-30 w-full" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODE 4: TEXT BIASA */}
      {note.mode === "text" && hasContent && (
        <div className="font-mono text-zinc-800 leading-relaxed whitespace-pre-wrap line-clamp-5 pointer-events-none select-none">
          {note.content}
        </div>
      )}

      {/* MODE 5: DAFTAR HARGA BAHAN */}
      {note.mode === "pricing" && (
        <div className="space-y-1 w-full pointer-events-auto">
          <div className="space-y-0.5 max-h-28 overflow-y-auto pr-0.5">
            {prices.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between text-[8px] font-mono leading-tight border-b border-black/5 pb-0.5"
              >
                <span className="truncate max-w-[100px] font-medium">{p.material}</span>
                <span className="font-bold text-emerald-800">
                  Rp {p.pricePerGram.toLocaleString("id-ID")}/g
                </span>
              </div>
            ))}
          </div>

          {onOpenCalculator && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCalculator();
              }}
              className="w-full mt-1.5 py-1 px-1.5 rounded bg-amber-500/80 hover:bg-amber-500 text-zinc-950 font-mono text-[8px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-xs pointer-events-auto"
            >
              <Calculator className="w-2.5 h-2.5" />
              <span>Buka di Kalkulator HPP</span>
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

/* ========================================================================= */
/* 3. MAIN WALL NOTES BOARD COMPONENT                                        */
/* ========================================================================= */
export function WallNotesBoard({
  onOpenCalculator,
  activeFormulaMaterials = [],
}: WallNotesBoardProps) {
  const [notes, setNotes] = useState<WallNoteItem[]>(INITIAL_NOTES);
  const [editingNote, setEditingNote] = useState<WallNoteItem | null>(null);
  const [croppingImageUrl, setCroppingImageUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // File upload input ref for photo mode
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Material Prices Store for pricing notes
  const { prices, savePrices, setPriceForMaterial } = useMaterialPrices();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = parsed.map((n, idx) => ({
            ...n,
            x: typeof n.x === "number" ? n.x : 40 + idx * 260,
            y: typeof n.y === "number" ? n.y : 15,
          }));
          setNotes(normalized);
        }
      }
    } catch (e) {
      console.warn("Could not load wall notes", e);
    }
  }, []);

  // Listen for external add note events (e.g. from Calculator "Simpan ke Catatan Dinding")
  useEffect(() => {
    const handleAddNoteEvent = (e: any) => {
      if (e.detail?.title || e.detail?.content) {
        const nextX = Math.min(760, 40 + (notes.length % 4) * 230);
        const nextY = 20 + (Math.floor(notes.length / 4) * 40) % 120;
        const newNote: WallNoteItem = {
          id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          mode: "text",
          theme: "yellow",
          size: "md",
          title: e.detail.title || "",
          content: e.detail.content || "",
          checklist: [],
          bullets: [],
          photoUrl: undefined,
          photoCaption: "",
          rotation: 1,
          x: nextX,
          y: nextY,
        };
        saveNotes([...notes, newNote]);
      }
    };

    window.addEventListener("scenty_add_wall_note", handleAddNoteEvent);
    return () => window.removeEventListener("scenty_add_wall_note", handleAddNoteEvent);
  }, [notes]);

  const saveNotes = (updated: WallNoteItem[]) => {
    setNotes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save wall notes", e);
    }
  };

  // Update note position after drag ends (Stable & without restrictive clamping)
  const handleUpdateNotePosition = (id: string, newX: number, newY: number) => {
    const updated = notes.map((n) => {
      if (n.id === id) {
        return { ...n, x: newX, y: newY };
      }
      return n;
    });
    saveNotes(updated);
  };

  // Add a new blank note
  const handleCreateNewNote = (mode: NoteFunctionMode = "text") => {
    const randomRotation = Number((Math.random() * 4 - 2).toFixed(1));

    const slotIndex = notes.length % 4;
    const nextX = Math.min(760, 40 + slotIndex * 230);
    const nextY = 20 + (Math.floor(notes.length / 4) * 40) % 120;

    const newNote: WallNoteItem = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      mode,
      theme:
        mode === "photo"
          ? "white"
          : mode === "checklist"
          ? "yellow"
          : mode === "pricing"
          ? "blue"
          : "yellow",
      size: "md",
      title: mode === "pricing" ? "DAFTAR HARGA BAHAN" : "",
      content: "",
      checklist: mode === "checklist" ? createDefault6Checklist() : [],
      bullets: mode === "bullet" ? createDefault6Bullets() : [],
      photoUrl: undefined,
      photoCaption: "",
      rotation: randomRotation,
      x: nextX,
      y: nextY,
    };

    saveNotes([...notes, newNote]);
    setEditingNote(newNote);
  };

  // Toggle checklist item directly on wall card
  const handleToggleChecklistWall = (noteId: string, itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notes.map((n) => {
      if (n.id === noteId) {
        const updatedChecklist = n.checklist.map((c) =>
          c.id === itemId ? { ...c, done: !c.done } : c
        );
        return { ...n, checklist: updatedChecklist };
      }
      return n;
    });
    saveNotes(updated);
  };

  // Delete note
  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    saveNotes(updated);
    if (editingNote?.id === id) {
      setEditingNote(null);
    }
  };

  // Save changes from Modal
  const handleSaveModal = (updatedNote: WallNoteItem) => {
    const exists = notes.some((n) => n.id === updatedNote.id);
    let updated: WallNoteItem[];
    if (exists) {
      updated = notes.map((n) => (n.id === updatedNote.id ? updatedNote : n));
    } else {
      updated = [...notes, updatedNote];
    }
    saveNotes(updated);
    setEditingNote(null);
  };

  // Handle Photo Upload from local file system
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result && editingNote) {
          setEditingNote({ ...editingNote, photoUrl: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const FUNCTION_MODES: { id: NoteFunctionMode; label: string; icon: any }[] = [
    { id: "text", label: "Teks Biasa", icon: FileText },
    { id: "checklist", label: "Checklist", icon: CheckSquare },
    { id: "bullet", label: "Bullet List", icon: List },
    { id: "photo", label: "Foto", icon: ImageIcon },
    { id: "pricing", label: "Harga Bahan", icon: Coins },
  ];

  const COLOR_THEMES: { id: NoteColorTheme; name: string; bg: string; border: string }[] = [
    { id: "yellow", name: "Yellow Pad", bg: "#fef9c3", border: "#fde047" },
    { id: "blue", name: "Blueprint", bg: "#eff6ff", border: "#bfdbfe" },
    { id: "rose", name: "Blush Rose", bg: "#fdf2f8", border: "#fbcfe8" },
    { id: "kraft", name: "Kraft Paper", bg: "#f5ebd7", border: "#d8c3a5" },
    { id: "white", name: "Clean Parchment", bg: "#faf8f5", border: "#e4e4e7" },
  ];

  const NOTE_SIZES: { id: NoteSize; label: string }[] = [
    { id: "sm", label: "SM" },
    { id: "md", label: "MD" },
    { id: "lg", label: "LG" },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto my-1 py-1 px-2 z-40 select-none pointer-events-none">
      {/* Top Bar: Clean Single + Tambah Catatan Button */}
      <div className="flex items-center justify-end mb-2 px-1 relative z-50 pointer-events-none">
        <button
          type="button"
          onClick={() => handleCreateNewNote("text")}
          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-extrabold flex items-center gap-1.5 shadow-xl hover:scale-102 transition-all cursor-pointer pointer-events-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Catatan</span>
        </button>
      </div>

      {/* Wall Notes Canvas Area (Pointer-events-none on backdrop, so space between notes is click-through!) */}
      <div className="relative h-[250px] sm:h-[270px] w-full overflow-visible z-40 pointer-events-none">
        {notes.map((note) => (
          <DraggableWallNoteCard
            key={note.id}
            note={note}
            prices={prices}
            onUpdatePosition={handleUpdateNotePosition}
            onSelect={(n) => setEditingNote(n)}
            onDelete={handleDeleteNote}
            onOpenCalculator={onOpenCalculator}
            onToggleChecklist={handleToggleChecklistWall}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* NOTION-STYLE NOTE EDITOR MODAL (Portal to document.body)                   */}
      {/* ========================================================================= */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {editingNote && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md pointer-events-auto">
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative rounded-2xl shadow-2xl border flex flex-col overflow-hidden transition-all duration-300 w-full ${
                editingNote.size === "sm"
                  ? "max-w-md"
                  : editingNote.size === "lg"
                  ? "max-w-2xl"
                  : "max-w-xl"
              }`}
              style={{
                backgroundColor:
                  editingNote.theme === "yellow"
                    ? "#fef9c3"
                    : editingNote.theme === "blue"
                    ? "#eff6ff"
                    : editingNote.theme === "rose"
                    ? "#fdf2f8"
                    : editingNote.theme === "kraft"
                    ? "#f5ebd7"
                    : "#faf8f5",
                borderColor:
                  editingNote.theme === "yellow"
                    ? "#fde047"
                    : editingNote.theme === "blue"
                    ? "#bfdbfe"
                    : editingNote.theme === "rose"
                    ? "#fbcfe8"
                    : editingNote.theme === "kraft"
                    ? "#d8c3a5"
                    : "#e4e4e7",
                color:
                  editingNote.theme === "yellow"
                    ? "#422006"
                    : editingNote.theme === "blue"
                    ? "#172554"
                    : editingNote.theme === "rose"
                    ? "#4c0519"
                    : editingNote.theme === "kraft"
                    ? "#3e2714"
                    : "#18181b",
              }}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between relative">
                <div>
                  <h3 className="font-mono text-xs font-extrabold uppercase tracking-widest opacity-80">
                    EDIT CATATAN
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="p-1.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
                {/* 1. SELECT FUNCTION MODE */}
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-1.5 opacity-70">
                    Tipe Catatan:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {FUNCTION_MODES.map((m) => {
                      const Icon = m.icon;
                      const isActive = editingNote.mode === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            let updatedChecklist = editingNote.checklist;
                            let updatedBullets = editingNote.bullets;

                            if (m.id === "checklist" && updatedChecklist.length === 0) {
                              updatedChecklist = createDefault6Checklist();
                            }
                            if (m.id === "bullet" && updatedBullets.length === 0) {
                              updatedBullets = createDefault6Bullets();
                            }

                            setEditingNote({
                              ...editingNote,
                              mode: m.id,
                              checklist: updatedChecklist,
                              bullets: updatedBullets,
                              title:
                                m.id === "pricing" && !editingNote.title
                                  ? "DAFTAR HARGA BAHAN"
                                  : editingNote.title,
                            });
                          }}
                          className={`p-2 rounded-lg font-mono text-xs font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                            isActive
                              ? "bg-amber-500 text-zinc-950 border-amber-600 shadow-md scale-102"
                              : "bg-black/5 hover:bg-black/10 border-black/10 opacity-80"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[10px] whitespace-nowrap">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. THEME COLOR & SIZE PALETTES */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-black/5 border border-black/10">
                  {/* Theme Colors */}
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-1.5 opacity-70">
                      Warna Kertas:
                    </span>
                    <div className="flex items-center gap-2">
                      {COLOR_THEMES.map((th) => (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => setEditingNote({ ...editingNote, theme: th.id })}
                          title={th.name}
                          className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                            editingNote.theme === th.id
                              ? "scale-125 ring-2 ring-amber-600 shadow-md"
                              : "border-black/20 hover:scale-110 opacity-70 hover:opacity-100"
                          }`}
                          style={{ backgroundColor: th.bg, borderColor: th.border }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Note Sizes */}
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-1.5 opacity-70">
                      Ukuran Catatan:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {NOTE_SIZES.map((sz) => (
                        <button
                          key={sz.id}
                          type="button"
                          onClick={() => setEditingNote({ ...editingNote, size: sz.id })}
                          className={`px-3 py-1 rounded font-mono text-xs font-bold border transition-all cursor-pointer ${
                            editingNote.size === sz.id
                              ? "bg-amber-500 text-zinc-950 border-amber-600 shadow-xs scale-105"
                              : "bg-black/5 hover:bg-black/10 border-black/10 opacity-70"
                          }`}
                        >
                          {sz.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. TITLE INPUT */}
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 opacity-70">
                    Judul Catatan (Opsional):
                  </label>
                  <input
                    type="text"
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                    placeholder="Ketik judul catatan..."
                    className="w-full px-3 py-2 rounded-lg bg-black/5 border border-black/15 font-mono text-xs font-bold focus:bg-white focus:border-amber-500 outline-none transition-colors"
                  />
                </div>

                {/* 4. MODE SPECIFIC INPUTS */}
                {/* MODE A: TEXT BIASA */}
                {editingNote.mode === "text" && (
                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 opacity-70">
                      Isi Catatan:
                    </label>
                    <textarea
                      rows={5}
                      value={editingNote.content}
                      onChange={(e) =>
                        setEditingNote({ ...editingNote, content: e.target.value })
                      }
                      placeholder="Tulis detail catatan..."
                      className="w-full px-3 py-2 rounded-lg bg-black/5 border border-black/15 font-mono text-xs leading-relaxed focus:bg-white focus:border-amber-500 outline-none transition-colors resize-none"
                    />
                  </div>
                )}

                {/* MODE B: CHECKLIST */}
                {editingNote.mode === "checklist" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-70">
                        Item Checklist:
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingNote({
                            ...editingNote,
                            checklist: [
                              ...editingNote.checklist,
                              { id: `c-${Date.now()}`, text: "", done: false },
                            ],
                          })
                        }
                        className="px-2 py-1 rounded bg-black/5 hover:bg-black/10 text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer border border-black/10"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Tambah Baris</span>
                      </button>
                    </div>

                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                      {editingNote.checklist.map((item, idx) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingNote.checklist.map((c) =>
                                c.id === item.id ? { ...c, done: !c.done } : c
                              );
                              setEditingNote({ ...editingNote, checklist: updated });
                            }}
                            className="cursor-pointer"
                          >
                            {item.done ? (
                              <CheckSquare className="w-4 h-4 text-emerald-700" />
                            ) : (
                              <Square className="w-4 h-4 text-zinc-600" />
                            )}
                          </button>
                          <input
                            type="text"
                            value={item.text}
                            onChange={(e) => {
                              const updated = editingNote.checklist.map((c) =>
                                c.id === item.id ? { ...c, text: e.target.value } : c
                              );
                              setEditingNote({ ...editingNote, checklist: updated });
                            }}
                            placeholder={`Item #${idx + 1}`}
                            className={`flex-1 px-2.5 py-1.5 rounded bg-black/5 border border-black/15 font-mono text-xs focus:bg-white focus:border-amber-500 outline-none ${
                              item.done ? "line-through opacity-50" : ""
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingNote.checklist.filter(
                                (c) => c.id !== item.id
                              );
                              setEditingNote({ ...editingNote, checklist: updated });
                            }}
                            className="p-1 text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MODE C: BULLET LIST */}
                {editingNote.mode === "bullet" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-70">
                        Item Poin-Poin:
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingNote({
                            ...editingNote,
                            bullets: [...editingNote.bullets, ""],
                          })
                        }
                        className="px-2 py-1 rounded bg-black/5 hover:bg-black/10 text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer border border-black/10"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Tambah Poin</span>
                      </button>
                    </div>

                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                      {editingNote.bullets.map((b, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="font-mono text-xs opacity-60">&bull;</span>
                          <input
                            type="text"
                            value={b}
                            onChange={(e) => {
                              const updated = [...editingNote.bullets];
                              updated[idx] = e.target.value;
                              setEditingNote({ ...editingNote, bullets: updated });
                            }}
                            placeholder={`Poin #${idx + 1}`}
                            className="flex-1 px-2.5 py-1.5 rounded bg-black/5 border border-black/15 font-mono text-xs focus:bg-white focus:border-amber-500 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingNote.bullets.filter((_, i) => i !== idx);
                              setEditingNote({ ...editingNote, bullets: updated });
                            }}
                            className="p-1 text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MODE D: PHOTO ATTACHMENT WITH LOCAL FILE UPLOAD & FREE CROP */}
                {editingNote.mode === "photo" && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider block opacity-70">
                      Lampirkan Foto dari Komputer:
                    </label>

                    {/* Hidden Native File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {croppingImageUrl ? (
                      /* Interactive Free Cropper View */
                      <InteractiveImageCropper
                        imageUrl={croppingImageUrl}
                        onApplyCrop={(croppedDataUrl) => {
                          setEditingNote({ ...editingNote, photoUrl: croppedDataUrl });
                          setCroppingImageUrl(null);
                        }}
                        onCancel={() => setCroppingImageUrl(null)}
                      />
                    ) : editingNote.photoUrl ? (
                      /* Preview & Controls (Natural resolution, no forced cropping) */
                      <div className="p-3 rounded-xl bg-black/5 border border-black/10 flex flex-col items-center gap-2">
                        <div className="relative max-w-full max-h-[260px] rounded-lg overflow-hidden border border-black/20 shadow-md bg-black/5">
                          <img
                            src={editingNote.photoUrl}
                            alt="Preview"
                            draggable={false}
                            className="max-h-[240px] max-w-full object-contain pointer-events-none select-none block mx-auto"
                          />
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => setCroppingImageUrl(editingNote.photoUrl!)}
                            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform hover:scale-102"
                          >
                            <Crop className="w-3.5 h-3.5" />
                            <span>Crop / Sesuaikan Foto</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg bg-black/10 hover:bg-black/15 text-zinc-800 font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-black/20"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Ganti Foto</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingNote({ ...editingNote, photoUrl: undefined })
                            }
                            className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-red-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus Foto</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Clean Blank Dropzone */
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="p-8 rounded-xl border-2 border-dashed border-black/25 bg-black/5 hover:bg-black/10 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center"
                      >
                        <Camera className="w-8 h-8 opacity-60" />
                        <span className="font-mono text-xs font-bold">
                          Klik untuk Unggah Foto dari Komputer
                        </span>
                        <span className="text-[10px] font-sans opacity-60">
                          Mendukung JPG, PNG, WebP (Resolusi asli tersimpan)
                        </span>
                      </div>
                    )}

                    {/* Caption Input */}
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 opacity-70">
                        Keterangan Foto:
                      </label>
                      <input
                        type="text"
                        value={editingNote.photoCaption || ""}
                        onChange={(e) =>
                          setEditingNote({ ...editingNote, photoCaption: e.target.value })
                        }
                        placeholder="Contoh: Bergamot harvest Calabria..."
                        className="w-full px-3 py-2 rounded-lg bg-black/5 border border-black/15 font-mono text-xs focus:bg-white focus:border-amber-500 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* MODE E: PRICING TABLE */}
                {editingNote.mode === "pricing" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-70">
                        Daftar Harga per Gram (Terhubung Kalkulator HPP):
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const newPrice: MaterialPriceItem = {
                            id: `pr-${Date.now()}`,
                            material: "Bahan Baru",
                            pricePerGram: 1000,
                          };
                          savePrices([...prices, newPrice]);
                        }}
                        className="px-2 py-1 rounded bg-black/5 hover:bg-black/10 text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer border border-black/10"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Bahan</span>
                      </button>
                    </div>

                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                      {prices.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-2 p-1.5 rounded bg-black/5 border border-black/10 text-xs"
                        >
                          <span className="font-mono font-medium truncate flex-1">{p.material}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-mono opacity-60">Rp</span>
                            <input
                              type="number"
                              min="0"
                              value={p.pricePerGram || ""}
                              onChange={(e) =>
                                setPriceForMaterial(p.material, parseFloat(e.target.value) || 0)
                              }
                              placeholder="0"
                              className="w-24 px-2 py-1 rounded bg-white border border-black/15 font-mono text-right text-xs focus:border-amber-500 outline-none"
                            />
                            <span className="text-[10px] font-mono opacity-60">/g</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = prices.filter((x) => x.id !== p.id);
                              savePrices(updated);
                            }}
                            className="p-1 text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Buttons */}
              <div className="p-4 bg-black/5 border-t border-black/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDeleteNote(editingNote.id)}
                  className="px-3.5 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-mono text-xs font-bold flex items-center gap-1.5 border border-red-300 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingNote(null)}
                    className="px-4 py-2 rounded-lg bg-black/5 hover:bg-black/10 text-inherit font-mono text-xs font-bold border border-black/15 cursor-pointer transition-colors"
                  >
                    Batal
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveModal(editingNote)}
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:scale-102 transition-transform cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-zinc-950 stroke-[3]" />
                    <span>Selesai &amp; Simpan</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
  );
}
