import { NavbarWrapper } from "@/components/organisms/navbar-wrapper"

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
