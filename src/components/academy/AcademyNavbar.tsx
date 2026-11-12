"use client";

import React, { useState, useEffect } from "react";

export function AcademyNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStart = () => {
    const el = document.getElementById("parfum-intro");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-zinc-200/60 shadow-xs py-3.5"
          : "bg-white/50 backdrop-blur-xs py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand: Just "SCENT" */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer flex items-center gap-2 select-none"
        >
          <span className="font-extrabold tracking-tighter text-2xl text-zinc-950 uppercase">
            SCENT
          </span>
        </div>

        {/* Minimal Action */}
        <button
          onClick={scrollToStart}
          className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold tracking-tight transition-colors shadow-xs"
        >
          Mulai Membaca &darr;
        </button>
      </div>
    </header>
  );
}
