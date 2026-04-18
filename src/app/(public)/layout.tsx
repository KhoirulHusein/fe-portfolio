import { NavbarWrapper } from "@/components/organisms/navbar-wrapper"
import { CustomCursor } from "@/components/atoms/cursor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khoirul Husein — Frontend Developer",
  description:
    "Portfolio of Khoirul Husein, a frontend developer based in Bekasi, Indonesia. Specializing in enterprise dashboard systems, React, Next.js, and TypeScript.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CustomCursor />
      <NavbarWrapper />
      {children}
    </>
  )
}
