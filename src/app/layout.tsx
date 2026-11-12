import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scenty — Digital Perfume Atelier & Lab",
  description: "Studio formulasi wewangian dan ensiklopedia sains parfum: meja racik interaktif Scenty, lembar formulasi, dan standar IFRA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={cn("h-full", "antialiased", geistMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-[#141517] text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
