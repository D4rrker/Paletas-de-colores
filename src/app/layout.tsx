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
  description: "Genera y personaliza una paleta de colores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} antialiased`}>
        <MainColorsProvider>
          <StateNotificationProvider>{children}</StateNotificationProvider>
        </MainColorsProvider>
      </body>
    </html>
  );
}
