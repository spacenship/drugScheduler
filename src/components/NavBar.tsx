import Link from "next/link";
import { ChevronLeft } from "lucide-react";

/** 뒤로 가기는 onBack(같은 화면 안 단계 이동) 또는 backHref(다른 페이지로 이동) 중 하나로 정한다 */
type NavBarProps = { title: string } & (
  { onBack: () => void; backHref?: never } | { backHref: string; onBack?: never }
);

const BACK_CLASS = "absolute left-0 flex size-11 items-center justify-center";

export function NavBar({ title, onBack, backHref }: NavBarProps) {
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
