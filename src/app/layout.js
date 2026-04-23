import "@/app/globals.css";

export const metadata = {
  title: "Scaneda",
  description: "Scaneda ile restoran deneyimini QR odakli, hizli ve premium hale getirin."
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
