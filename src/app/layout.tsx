import { ThemeProvider } from "@/components/theme-provider"
import { NavbarWrapper } from "@/components/organisms/navbar-wrapper"
import { SmoothScroll } from "@/components/atoms/smooth-scroll"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - My Work & Projects",
  description: "Explore my portfolio showcasing projects, skills, and experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NavbarWrapper />
          <SmoothScroll smooth={1.5} effects={true}>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
