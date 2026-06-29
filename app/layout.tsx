import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Molie Code Learn",
  description: "Aprende a crear apps con IA construyendo proyectos reales paso a paso.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
