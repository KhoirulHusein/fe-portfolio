"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Navbar as NavbarBase,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { Logo } from "@/components/atoms/logo";
import { ThemeToggle } from "@/components/atoms/theme-toggle";

const navItems = [
  { name: "About",   link: "#about"   },
  { name: "Project", link: "#project" },
  { name: "Contact", link: "#contact" },
];

export const PortfolioNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose  = () => setIsOpen(false);

  const scrollToHash = (hash: string) => {
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (pathname === "/") {
      scrollToHash(href);
    } else {
      router.push(`/${href}`);
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleClose();
    if (pathname === "/") {
      setTimeout(() => scrollToHash(href), 300);
    } else {
      setTimeout(() => router.push(`/${href}`), 300);
    }
  };

  return (
    <NavbarBase>
      {/* Desktop Navbar */}
      <NavBody>
        <Logo />
        <NavItems items={navItems} onItemClick={handleNavClick} />
        <div className="relative z-20 flex items-center gap-3">
          <ThemeToggle />
        </div>
      </NavBody>

      {/* Mobile Navbar */}
      <MobileNav>
        <MobileNavHeader>
          <Logo />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MobileNavToggle isOpen={isOpen} onClick={handleToggle} />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={handleClose}>
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={(e) => handleMobileNavClick(e, item.link)}
              className="w-full text-left text-muted-foreground tracking-widest uppercase text-xs"
              style={{ fontFamily: "var(--font-instrument-sans)" }}
            >
              {item.name}
            </a>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </NavbarBase>
  );
};
