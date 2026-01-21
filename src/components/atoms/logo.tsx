import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal",
        className
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
        <span className="text-lg font-bold text-primary-foreground">✨</span>
      </div>
      <span className="font-medium text-foreground">Sparkle</span>
    </Link>
  );
};
