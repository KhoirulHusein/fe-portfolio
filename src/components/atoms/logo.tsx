import Link from "next/link";
import { cn } from "@/lib/utils";
import { Diamond } from "@/components/atoms/diamond";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "relative z-20 flex items-center gap-2 px-2 py-1",
        className
      )}
    >
      <Diamond size={12} className="text-foreground" />
      <span
        className="text-sm font-black tracking-tight text-foreground uppercase"
        style={{ fontFamily: "var(--font-fraunces)" }}
      >
        Irul
      </span>
    </Link>
  );
};
