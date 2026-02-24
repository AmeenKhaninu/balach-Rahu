import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balach Rahu — AI-Powered Fashion Platform",
  description:
    "Where traditional craftsmanship meets intelligent technology. A strategic blueprint for an AI-powered Pakistani fashion platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="pret">
      <body>
        <ThemeProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
