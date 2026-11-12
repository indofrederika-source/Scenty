"use client";

import React, { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export interface SliderMark {
  value: number;
  label: string;
}

export interface SliderBand {
  from: number;
  to: number;
  color: string;
  label?: string;
}

interface PrecisionSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  marks?: SliderMark[];
  bands?: SliderBand[];
  formatValue?: (v: number) => string;
  ariaLabel: string;
  className?: string;
}

export function PrecisionSlider({
  min,
  max,
  step,
  value,
  onChange,
  marks = [],
  bands = [],
  formatValue = (v) => String(v),
  ariaLabel,
  className,
}: PrecisionSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const toPct = (v: number) => Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100));

  const decimals = (step.toString().split(".")[1] || "").length;
  const snap = useCallback(
    (raw: number) => {
      const clamped = Math.min(max, Math.max(min, raw));
      const snapped = Math.round((clamped - min) / step) * step + min;
      return Number(snapped.toFixed(decimals));
    },
    [min, max, step, decimals]
  );

  const valueFromPointer = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return value;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return snap(min + ratio * (max - min));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    onChange(valueFromPointer(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    onChange(valueFromPointer(e.clientX));
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const big = step * 10;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") onChange(snap(value + step));
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") onChange(snap(value - step));
    else if (e.key === "PageUp") onChange(snap(value + big));
    else if (e.key === "PageDown") onChange(snap(value - big));
    else if (e.key === "Home") onChange(min);
    else if (e.key === "End") onChange(max);
    else return;
    e.preventDefault();
  };

  const pct = toPct(value);

  return (
    <div className={cn("select-none w-full", className)}>
      <div className="relative px-2">
        {/* Hit area */}
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label={ariaLabel}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={formatValue(value)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onKeyDown={onKeyDown}
          className="relative h-10 cursor-pointer touch-none outline-none focus-visible:[&>.thumb]:ring-4 focus-visible:[&>.thumb]:ring-zinc-900/15"
        >
          {/* Base track */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-3 rounded-full bg-zinc-200 overflow-hidden shadow-inner">
            {bands.map((b, i) => {
              const start = toPct(b.from);
              const width = toPct(b.to) - start;
              return (
                <div
                  key={i}
                  className="absolute top-0 h-full border-r border-white/40 last:border-0"
                  style={{
                    left: `${start}%`,
                    width: `${width}%`,
                    backgroundColor: b.color,
                  }}
                  title={b.label}
                />
              );
            })}
          </div>

          {/* Simple fill if no bands */}
          {bands.length === 0 && (
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-3 rounded-full bg-zinc-900"
              style={{ width: `${pct}%` }}
            />
          )}

          {/* Mark ticks on track */}
          {marks.map((m) => (
            <div
              key={m.value}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-4 bg-zinc-700/60 pointer-events-none"
              style={{ left: `${toPct(m.value)}%` }}
            />
          ))}

          {/* Thumb */}
          <div
            className="thumb absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-zinc-950 shadow-md transition-shadow z-10 flex items-center justify-center"
            style={{ left: `${pct}%` }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
          </div>
        </div>

        {/* Boundary marks labels: neatly aligned with no overlap */}
        {marks.length > 0 && (
          <div className="relative h-5 mt-1">
            {marks.map((m) => {
              const p = toPct(m.value);
              const align =
                p <= 4 ? "translate-x-0" : p >= 96 ? "-translate-x-full" : "-translate-x-1/2";
              return (
                <span
                  key={m.value}
                  className={cn(
                    "absolute top-0 whitespace-nowrap text-[11px] font-mono font-medium text-zinc-500",
                    align
                  )}
                  style={{ left: `${p}%` }}
                >
                  {m.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
