"use client";

import { usePathname } from "next/navigation";
import { PortfolioNavbar } from "@/components/organisms/navbar";

interface NavbarWrapperProps {
  children?: React.ReactNode;
}

export const NavbarWrapper = ({ children }: NavbarWrapperProps) => {
  const pathname = usePathname();
  
  // Hide navbar on auth routes
  const isAuthRoute = pathname?.startsWith("/auth");

  if (isAuthRoute) {
    return null;
  }

  return (
    <>
      <PortfolioNavbar />
      {children}
    </>
  );
};
