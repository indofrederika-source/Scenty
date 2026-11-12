"use client";

import React from "react";
import Image from "next/image";

interface ScentyLogoProps {
  className?: string;
  size?: number;
}

export function ScentyLogo({ className = "", size = 38 }: ScentyLogoProps) {
  return (
    <div
      className={`relative shrink-0 select-none flex items-center justify-center ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Image
        src="/assets/scenty-logo.png"
        alt="Scenty Logo"
        width={size}
        height={size}
        className="object-contain w-full h-full drop-shadow-md brightness-125 contrast-105 transition-transform hover:scale-105"
        priority
      />
    </div>
  );
}
