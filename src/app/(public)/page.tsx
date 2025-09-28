import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Portfolio</h1>
      <p className="text-muted-foreground">
        This is the landing page. Full portfolio coming soon!
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </div>
  )
}