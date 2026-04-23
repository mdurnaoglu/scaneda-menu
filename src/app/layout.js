import "@fontsource-variable/inter";
import "@/app/globals.css";

export const metadata = {
  title: "QR Menu Platform",
  description: "Phase 1 foundation for a premium QR menu platform."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
