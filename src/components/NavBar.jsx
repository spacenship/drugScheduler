import Link from "next/link";
import { ChevronLeft } from "lucide-react";
const BACK_CLASS = "absolute left-0 flex size-11 items-center justify-center";
export function NavBar({ title, onBack, backHref }) {
  const icon = <ChevronLeft className="size-6" strokeWidth={2} aria-hidden />;
  return (
    <header className="text-title-sm relative flex h-14 items-center justify-center">
      {backHref !== undefined ? (
        <Link href={backHref} aria-label="뒤로 가기" className={BACK_CLASS}>
          {icon}
        </Link>
      ) : (
        <button type="button" onClick={onBack} aria-label="뒤로 가기" className={BACK_CLASS}>
          {icon}
        </button>
      )}
      <h1>{title}</h1>
    </header>
  );
}
