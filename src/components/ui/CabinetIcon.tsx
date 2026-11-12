import React from "react";

export function CabinetIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Top crown molding */}
      <path d="M3 4h18v2H3z" />
      {/* Cabinet frame */}
      <rect x="4" y="6" width="16" height="15" rx="1" />
      {/* Center divider between 2 doors */}
      <line x1="12" y1="6" x2="12" y2="21" />
      {/* Left door handle */}
      <line x1="9.5" y1="12" x2="9.5" y2="15" strokeWidth="2.5" />
      {/* Right door handle */}
      <line x1="14.5" y1="12" x2="14.5" y2="15" strokeWidth="2.5" />
      {/* Bottom feet */}
      <path d="M6 21v2M18 21v2" />
    </svg>
  );
}
