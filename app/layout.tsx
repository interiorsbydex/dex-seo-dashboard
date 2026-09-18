import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interiors by DeX — SEO Performance Portal",
  description: "Executive SEO tracking and growth insights for Interiors by DeX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#090d16] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
