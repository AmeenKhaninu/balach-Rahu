export const metadata = {
  title: "Balach Rahu — AI-Powered Fashion Platform Blueprint",
  description:
    "A strategic roadmap where traditional Pakistani craftsmanship meets intelligent technology. Six-phase plan covering brand DNA, smart catalog, custom tailoring engine, AI design studio, client operations, and launch.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0A0A0A" }}>
        {children}
      </body>
    </html>
  );
}
