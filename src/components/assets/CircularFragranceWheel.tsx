"use client";

import React, { useState } from "react";
import { FRAGRANCE_FAMILIES, FragranceFamily } from "@/data/perfumery-data";
import { Disc, BookOpen, Key, History, Compass, ArrowRight } from "lucide-react";

export function CircularFragranceWheel() {
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>("citrus");
  const [hoveredFamilyId, setHoveredFamilyId] = useState<string | null>(null);

  const activeFamily =
    FRAGRANCE_FAMILIES.find((f) => f.id === (hoveredFamilyId || selectedFamilyId)) ||
    FRAGRANCE_FAMILIES[0];

  const totalSlices = FRAGRANCE_FAMILIES.length; // 8
  const sliceAngle = 360 / totalSlices; // 45 degrees each
  const radius = 170;
  const innerRadius = 55;
  const cx = 200;
  const cy = 200;

  // Polar to Cartesian coordinate helper
  const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  // Generate SVG donut wedge path
  const createWedgePath = (startAngle: number, endAngle: number, rOut: number, rIn: number) => {
    const startOuter = polarToCartesian(cx, cy, rOut, endAngle);
    const endOuter = polarToCartesian(cx, cy, rOut, startAngle);
    const startInner = polarToCartesian(cx, cy, rIn, endAngle);
    const endInner = polarToCartesian(cx, cy, rIn, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${rOut} ${rOut} 0 ${largeArcFlag} 0 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${rIn} ${rIn} 0 ${largeArcFlag} 1 ${startInner.x} ${startInner.y}`,
      "Z",
    ].join(" ");
  };

  const familyColors: Record<string, string> = {
    citrus: "#eab308",
    floral: "#f43f5e",
    amber: "#ea580c",
    woody: "#65a30d",
    fougère: "#0891b2",
    gourmand: "#9333ea",
    chypre: "#059669",
    aquatic: "#0284c7",
  };

  return (
    <div className="card-clean p-6 sm:p-10 bg-white border border-zinc-200 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: The Circular Radial Interactive Wheel (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex items-center justify-center select-none">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-md transition-transform duration-300"
            >
              {/* Outer boundary ring */}
              <circle
                cx={cx}
                cy={cy}
                r={radius + 4}
                fill="none"
                stroke="#e4e4e7"
                strokeWidth="1.5"
              />

              {/* 8 Radial Wedges */}
              {FRAGRANCE_FAMILIES.map((family, idx) => {
                const startAngle = idx * sliceAngle;
                const endAngle = (idx + 1) * sliceAngle;
                const isSelected = selectedFamilyId === family.id;
                const isHovered = hoveredFamilyId === family.id;
                const active = isSelected || isHovered;

                const currentRadius = active ? radius + 8 : radius;
                const currentInner = active ? innerRadius - 4 : innerRadius;
                const wedgePath = createWedgePath(startAngle, endAngle, currentRadius, currentInner);

                // Label position at the center of the wedge
                const midAngle = startAngle + sliceAngle / 2;
                const labelPos = polarToCartesian(cx, cy, (radius + innerRadius) / 2 + (active ? 4 : 0), midAngle);

                const color = familyColors[family.id] || "#71717a";

                return (
                  <g
                    key={family.id}
                    onClick={() => setSelectedFamilyId(family.id)}
                    onMouseEnter={() => setHoveredFamilyId(family.id)}
                    onMouseLeave={() => setHoveredFamilyId(null)}
                    className="cursor-pointer transition-all duration-200 group"
                  >
                    {/* Wedge Shape */}
                    <path
                      d={wedgePath}
                      fill={color}
                      fillOpacity={active ? 0.95 : 0.45}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="transition-all duration-200 group-hover:fill-opacity-90"
                    />

                    {/* Text Label on Wedge */}
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={active ? "#ffffff" : "#18181b"}
                      fontSize={active ? "12" : "10"}
                      fontWeight={active ? "800" : "600"}
                      fontFamily="var(--font-sans), sans-serif"
                      className="pointer-events-none select-none tracking-tight"
                    >
                      {family.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}

              {/* Center Hub */}
              <circle
                cx={cx}
                cy={cy}
                r={innerRadius - 6}
                fill="#ffffff"
                stroke="#d4d4d8"
                strokeWidth="2"
              />
              <text
                x={cx}
                y={cy - 6}
                textAnchor="middle"
                fontSize="11"
                fontWeight="800"
                fontFamily="var(--font-sans), sans-serif"
                fill="#09090b"
                className="select-none uppercase tracking-tight"
              >
                FRAGRANCE
              </text>
              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fontFamily="var(--font-mono), monospace"
                fill="#71717a"
                className="select-none uppercase"
              >
                WHEEL
              </text>
            </svg>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 mt-3 text-center">
            Klik atau arahkan mouse ke potongan roda untuk memunculkan profil wewangian
          </div>
        </div>

        {/* Right: Dynamic Dossier revealed when clicked (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="pb-3 border-b border-zinc-200">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: familyColors[activeFamily.id] || "#71717a" }}
              />
              <span className="text-xs font-mono uppercase text-zinc-500 font-bold">
                Taksonomi: {activeFamily.classificationSystem}
              </span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 uppercase tracking-tight">
              {activeFamily.name}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 font-normal italic mt-1">
              &quot;{activeFamily.moodDescription}&quot;
            </p>
          </div>

          {/* Characteristics */}
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <span className="text-xs font-mono uppercase font-bold text-zinc-800 block mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-zinc-700" />
              Karakteristik &amp; Sifat Kimiawi:
            </span>
            <ul className="space-y-1.5">
              {activeFamily.characteristics.map((char, i) => (
                <li key={i} className="text-xs text-zinc-600 flex items-start gap-2">
                  <span className="text-zinc-400 font-bold">•</span>
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Signature Accords & Hero Molecules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <span className="text-[11px] font-mono font-bold uppercase text-zinc-700 block mb-1.5">
                Akord Khas:
              </span>
              <div className="flex flex-wrap gap-1">
                {activeFamily.signatureAccords.map((accord, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-white text-[11px] text-zinc-800 border border-zinc-200 font-medium"
                  >
                    {accord}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <span className="text-[11px] font-mono font-bold uppercase text-zinc-700 block mb-1.5">
                Molekul Kunci:
              </span>
              <div className="flex flex-wrap gap-1">
                {activeFamily.heroMolecules.map((mol, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-zinc-900 text-[11px] text-white font-mono font-semibold"
                  >
                    {mol}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Historic Landmarks & Tip */}
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono font-bold uppercase text-zinc-700 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-zinc-700" />
                Karya Ikonik Bersejarah:
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-800">
              {activeFamily.famousIconicPerfumes.map((p, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-white border border-zinc-200">
                  {p.name} ({p.brand}, {p.year})
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-200 flex items-start gap-2.5">
            <Key className="w-4 h-4 text-zinc-800 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-700 leading-relaxed font-normal">
              <strong>Catatan Formulasi: </strong>
              {activeFamily.technicalFormulationTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
