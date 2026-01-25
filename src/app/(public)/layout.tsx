import { NavbarWrapper } from "@/components/organisms/navbar-wrapper"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start - Khoirul Husein | Portfolio",
  description: "Explore my portfolio showcasing projects, skills, and experience",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavbarWrapper />
      {children}
    </>
  )
}
