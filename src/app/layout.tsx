import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { MainColorsProvider } from "@/app/context/MainColorsContext";
import { StateNotificationProvider } from "@/app/context/StateNotificationCopyColor";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Generador de paleta de colores.",
  description:
    "Genera y personaliza tus paletas de colores. Guarda tus favoritas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} antialiased bg-slate-100`}>
        <MainColorsProvider>
          <StateNotificationProvider>{children}</StateNotificationProvider>
        </MainColorsProvider>
      </body>
    </html>
  );
}
