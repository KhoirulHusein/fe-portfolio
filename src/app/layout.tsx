import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://byirul-deck.vercel.app";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0C0C0B" },
    { media: "(prefers-color-scheme: light)", color: "#F5F4F0" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:  "Khoirul Husein — Frontend Developer",
    template: "%s | Khoirul Husein",
  },
  description:
    "Frontend developer based in Bekasi, Indonesia. Building enterprise dashboard systems at Universitas Pancasila — from architecture to delivery. Open to the right opportunity.",

  keywords: [
    "Khoirul Husein",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Bekasi",
    "Indonesia",
    "Universitas Pancasila",
    "Web Developer",
    "UI Developer",
    "Portfolio",
  ],

  authors:  [{ name: "Khoirul Husein", url: BASE_URL }],
  creator:  "Khoirul Husein",
  publisher:"Khoirul Husein",

  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         BASE_URL,
    siteName:    "Khoirul Husein — Portfolio",
    title:       "Khoirul Husein — Frontend Developer",
    description: "Frontend developer based in Bekasi, Indonesia. Building enterprise dashboard systems at Universitas Pancasila — from architecture to delivery.",
    images: [
      {
        url:    "/actionItem/irul.webp",
        width:  1200,
        height: 630,
        alt:    "Khoirul Husein — Frontend Developer",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Khoirul Husein — Frontend Developer",
    description: "Frontend developer based in Bekasi, Indonesia. Building enterprise dashboard systems — from architecture to delivery.",
    images:      ["/actionItem/irul.webp"],
    creator:     "@khoirulhusein",
  },

  icons: {
    icon:  "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Khoirul Husein",
              url: BASE_URL,
              image: `${BASE_URL}/actionItem/irul.webp`,
              jobTitle: "Frontend Developer",
              worksFor: {
                "@type": "Organization",
                name: "Universitas Pancasila",
                url: "https://univpancasila.ac.id",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bekasi",
                addressCountry: "ID",
              },
              sameAs: [
                "https://github.com/KhoirulHusein",
                "https://www.linkedin.com/in/khoirul-husein/",
              ],
              knowsAbout: [
                "React", "Next.js", "TypeScript", "Tailwind CSS",
                "Frontend Architecture", "Enterprise Dashboard", "UI/UX",
              ],
              email: "irul.career@gmail.com",
            }),
          }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
