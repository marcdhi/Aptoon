import type { Metadata } from "next";
import { Public_Sans, Inter } from "next/font/google";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import ClientBody from "./ClientBody";
import { SolanaProvider } from "@/providers/SolanaProvider";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aptoon - Webtoon Creation Platform for Gamers",
  description: "Transform your gameplay moments into animated webtoons using AI on the Solana blockchain",
  icons: {
    icon: "/images/icons/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${publicSans.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <SolanaProvider>{children}</SolanaProvider>
        </ClientBody>
      </body>
    </html>
  );
}
