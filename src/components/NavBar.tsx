import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface NavBarProps {
  title: string;
  backHref: string;
}

export function NavBar({ title, backHref }: NavBarProps) {
  return (
    <header className="text-title-sm relative flex h-14 items-center justify-center">
      <Link
        href={backHref}
        aria-label="뒤로 가기"
        className="absolute left-0 flex size-11 items-center justify-center"
      >
        <ChevronLeft className="size-6" strokeWidth={2} aria-hidden />
      </Link>
      <h1>{title}</h1>
    </header>
  );
}
