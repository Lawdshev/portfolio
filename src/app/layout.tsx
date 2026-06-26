import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import MagneticButtons from "@/components/animations/MagneticButtons";
import { getPortfolioData } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  return {
    title: data.profile.siteTitle,
    description: data.profile.siteDescription,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <SmoothScrollProvider>
          <MagneticButtons />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
