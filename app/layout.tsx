import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interiors by DeX — SEO Battleground & Performance Portal",
  description: "Executive SEO tracking, algorithm updates, and growth intelligence for Interiors by DeX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F5F0EB] text-[#111111] min-h-screen">
        {children}
      </body>
    </html>
  );
}
