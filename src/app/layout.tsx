import type { Metadata } from "next";
import { Nav } from "@/components/foundry/nav";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Foundry - AI execution system for building and growing startups",
    template: "%s | Foundry",
  },
  description: "Foundry is an AI-powered founder copilot for startup validation, MVP prompts, SEO, growth content, and execution plans.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Foundry - Your AI execution system for building and growing startups",
    description: "Validate startup ideas, plan MVPs, generate growth assets, and execute with clarity.",
    url: siteUrl("/"),
    siteName: "Foundry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foundry - AI founder copilot",
    description: "Your AI execution system for building and growing startups.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <Nav />
        {children}
      </body>
    </html>
  );
}
