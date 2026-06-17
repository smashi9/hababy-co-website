import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "react-phone-number-input/style.css";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hababy & Co | Baby gear rental in Rabat",
  description:
    "Request clean, carefully prepared baby gear for your stay in Rabat. Hababy & Co confirms availability and delivery personally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteHeader />
        <div className="min-h-screen">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
