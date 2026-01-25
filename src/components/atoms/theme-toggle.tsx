"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("h-9 w-9", className)} />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(currentTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full",
        "bg-muted hover:bg-muted/80",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        className
      )}
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? (
        <IconMoon className="h-5 w-5 text-muted-foreground" />
      ) : (
        <IconSun className="h-5 w-5 text-muted-foreground" />
      )}
    </button>
  );
};
