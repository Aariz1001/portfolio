import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Aariz Waqas — AI Engineer",
  description:
    "Portfolio of Mohammad Aariz Waqas — AI Engineer building production LLM systems, agent pipelines, and shipped mobile apps. Glasgow, UK.",
  icons: {
    icon: "/generated/aw_logo.png",
    apple: "/generated/aw_logo.png",
  },
  openGraph: {
    title: "Aariz Waqas — AI Engineer",
    description: "Production AI systems, agent orchestration, and shipped products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
