"use client";

import React, { useState } from "react";

export type MatColorKey = "green" | "black" | "navy" | "amber" | "purple" | "pink" | "red";

export interface MatPreset {
  key: MatColorKey;
  name: string;
  bg: string;
  gridColor: string;
  subGridColor: string;
  borderColor: string;
  labelColor: string;
  accentPill: string;
}

export const MAT_PRESETS: Record<MatColorKey, MatPreset> = {
  green: {
    key: "green",
    name: "Crafter Green",
    bg: "#1b4332",
    gridColor: "rgba(255, 255, 255, 0.45)",
    subGridColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "#2d6a4f",
    labelColor: "rgba(255, 255, 255, 0.75)",
    accentPill: "bg-emerald-900 border-emerald-500 text-emerald-100",
  },
  black: {
    key: "black",
    name: "Obsidian Black",
    bg: "#18191d",
    gridColor: "rgba(255, 255, 255, 0.40)",
    subGridColor: "rgba(255, 255, 255, 0.12)",
    borderColor: "#2d2f36",
    labelColor: "rgba(255, 255, 255, 0.70)",
    accentPill: "bg-zinc-900 border-zinc-600 text-zinc-100",
  },
  navy: {
    key: "navy",
    name: "Blueprint Navy",
    bg: "#1d3557",
    gridColor: "rgba(255, 255, 255, 0.45)",
    subGridColor: "rgba(255, 255, 255, 0.16)",
    borderColor: "#457b9d",
    labelColor: "rgba(255, 255, 255, 0.80)",
    accentPill: "bg-sky-950 border-sky-500 text-sky-100",
  },
  amber: {
    key: "amber",
    name: "Warm Kraft",
    bg: "#6b4226",
    gridColor: "rgba(255, 245, 230, 0.50)",
    subGridColor: "rgba(255, 245, 230, 0.18)",
    borderColor: "#8c5630",
    labelColor: "rgba(255, 245, 230, 0.80)",
    accentPill: "bg-amber-950 border-amber-600 text-amber-100",
  },
  purple: {
    key: "purple",
    name: "Atelier Violet",
    bg: "#3f1b40", // Deep Elegant Violet matching reference photo
    gridColor: "rgba(255, 255, 255, 0.50)",
    subGridColor: "rgba(255, 255, 255, 0.18)",
    borderColor: "#5e2660",
    labelColor: "rgba(255, 255, 255, 0.85)",
    accentPill: "bg-purple-950 border-purple-500 text-purple-100",
  },
  pink: {
    key: "pink",
    name: "Pastel Rose",
    bg: "#d6638f", // Craft Bubblegum Pink matching reference photo
    gridColor: "rgba(255, 255, 255, 0.65)",
    subGridColor: "rgba(255, 255, 255, 0.28)",
    borderColor: "#b64874",
    labelColor: "rgba(255, 255, 255, 0.95)",
    accentPill: "bg-pink-950 border-pink-400 text-pink-100",
  },
  red: {
    key: "red",
    name: "Studio Crimson",
    bg: "#7d1d1d", // Classic Laboratory Crafter Red
    gridColor: "rgba(255, 255, 255, 0.48)",
    subGridColor: "rgba(255, 255, 255, 0.18)",
    borderColor: "#991b1b",
    labelColor: "rgba(255, 255, 255, 0.85)",
    accentPill: "bg-red-950 border-red-500 text-red-100",
  },
};

interface CuttingMatProps {
  children?: React.ReactNode;
  activeColor: MatColorKey;
  onColorChange: (color: MatColorKey) => void;
}

export function CuttingMat({ children, activeColor, onColorChange }: CuttingMatProps) {
  const current = MAT_PRESETS[activeColor] || MAT_PRESETS.green;

  return (
    <div
      className="relative rounded-2xl shadow-2xl transition-colors duration-500 border-4 select-none overflow-visible"
      style={{
        backgroundColor: current.bg,
        borderColor: current.borderColor,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.85), inset 0 2px 4px rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Clipped background grid overlay */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
          xmlns="http://www.w3.org/2000/svg"
        >
        <defs>
          {/* 10mm Subgrid Pattern */}
          <pattern id={`subgrid-${activeColor}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path
              d="M 16 0 L 0 0 0 16"
              fill="none"
              stroke={current.subGridColor}
              strokeWidth="0.75"
            />
          </pattern>
          {/* 50mm Major Grid Pattern */}
          <pattern id={`majorgrid-${activeColor}`} width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill={`url(#subgrid-${activeColor})`} />
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke={current.gridColor}
              strokeWidth="1.5"
            />
          </pattern>
        </defs>

        {/* Fill with grid pattern */}
        <rect width="100%" height="100%" fill={`url(#majorgrid-${activeColor})`} />

        {/* Diagonal 45° and 60° Angle Guidelines */}
        <line x1="0" y1="100%" x2="100%" y2="0" stroke={current.subGridColor} strokeWidth="1.2" strokeDasharray="6,4" />
        <line x1="15%" y1="100%" x2="85%" y2="0" stroke={current.subGridColor} strokeWidth="0.8" strokeDasharray="4,4" />
        <line x1="100%" y1="100%" x2="0" y2="0" stroke={current.subGridColor} strokeWidth="1.2" strokeDasharray="6,4" />

        {/* Protractor Radial Circles in Center Bottom */}
        <circle cx="50%" cy="100%" r="80" fill="none" stroke={current.subGridColor} strokeWidth="1" strokeDasharray="4,4" />
        <circle cx="50%" cy="100%" r="140" fill="none" stroke={current.subGridColor} strokeWidth="1" strokeDasharray="4,4" />
        <circle cx="50%" cy="100%" r="200" fill="none" stroke={current.subGridColor} strokeWidth="1.2" />

        {/* Ruler tick marks along top & left */}
        {Array.from({ length: 24 }).map((_, i) => (
          <g key={`top-tick-${i}`}>
            <line
              x1={40 + i * 40}
              y1="4"
              x2={40 + i * 40}
              y2={i % 2 === 0 ? "16" : "10"}
              stroke={current.gridColor}
              strokeWidth={i % 2 === 0 ? "1.5" : "1"}
            />
            {i % 2 === 0 && (
              <text
                x={40 + i * 40}
                y="26"
                fill={current.labelColor}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                {i * 2}
              </text>
            )}
          </g>
        ))}

        {Array.from({ length: 14 }).map((_, i) => (
          <g key={`left-tick-${i}`}>
            <line
              x1="4"
              y1={40 + i * 40}
              x2={i % 2 === 0 ? "16" : "10"}
              y2={40 + i * 40}
              stroke={current.gridColor}
              strokeWidth={i % 2 === 0 ? "1.5" : "1"}
            />
            {i % 2 === 0 && (
              <text
                x="22"
                y={43 + i * 40}
                fill={current.labelColor}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="start"
              >
                {i * 2}
              </text>
            )}
          </g>
        ))}
      </svg>
      </div>

      {/* Top Bar on Mat: Brand Stamping */}
      <div className="relative z-10 px-5 pt-3.5 pb-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-white/70">
            A1 WORKBENCH CUTTING MAT &bull; SCENTY LAB
          </span>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/40 text-white/60 border border-white/10">
            METRIC CM/MM
          </span>
        </div>
      </div>

      {/* Inner Content on the Mat (Bottles, Scale, Notebook, Tools - overflow-visible for free dragging) */}
      <div className="relative z-10 p-4 sm:p-6 min-h-[460px] flex flex-col justify-between overflow-visible">
        {children}
      </div>
    </div>
  );
}
