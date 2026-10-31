import { ChevronLeft } from "lucide-react";

interface NavBarProps {
  title: string;
  onBack: () => void;
}

export function NavBar({ title, onBack }: NavBarProps) {
  return (
    <header className="text-title-sm relative flex h-14 items-center justify-center">
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로 가기"
        className="absolute left-0 flex size-11 items-center justify-center"
      >
        <ChevronLeft className="size-6" strokeWidth={2} aria-hidden />
      </button>
      <h1>{title}</h1>
    </header>
  );
}
