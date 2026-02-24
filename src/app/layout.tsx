import type { Metadata } from "next";

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
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
