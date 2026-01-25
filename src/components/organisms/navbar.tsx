"use client";

import { useState } from "react";
import {
  Navbar as NavbarBase,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { Logo } from "@/components/atoms/logo";
import { ThemeToggle } from "@/components/atoms/theme-toggle";

const navItems = [
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Project",
    link: "#project",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

export const PortfolioNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleClose();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300); // Wait for menu close animation
  };

  return (
    <NavbarBase>
      {/* Desktop Navbar */}
      <NavBody>
        <Logo />
        <NavItems items={navItems} onItemClick={handleNavClick} />
        <div className="relative z-20 flex items-center gap-3">
          <ThemeToggle />
          <NavbarButton href="/login" variant="primary">
            Login
          </NavbarButton>
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
              className="w-full text-left text-muted-foreground"
            >
              {item.name}
            </a>
          ))}
          <NavbarButton href="/login" variant="primary" className="w-full">
            Login
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </NavbarBase>
  );
};
