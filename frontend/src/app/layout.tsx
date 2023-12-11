import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Playfair_Display } from "next/font/google";
import MenuList from "@/components/MenuList/MenuList";
import BackgroundCanvas from "@/components/BackgroundCanvas/BackgroundCanvas";
import LayoutTransition from "@/components/LayoutTransition/LayoutTransition";
import PortfolioNav from "@/components/PortfolioNav/PortfolioNav";
import PrelineLoader from "@/components/PrelineLoader/PrelineLoader";
import DirectionRoute from "@/components/DirectionRoute/DirectionRoute";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const playFairDisplay = Playfair_Display({
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Corey Dunkin: Senior Software Engineer",
  description: "Senior Software Engineer based in Sydney, Australia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playFairDisplay.variable}`}>
      <body className={inter.className}>
        <MenuList />
        <DirectionRoute>
          <LayoutTransition>{children}</LayoutTransition>
        </DirectionRoute>
        <PortfolioNav />
        <BackgroundCanvas />
        <PrelineLoader />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
