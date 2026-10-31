import { cn } from "@/lib/utils";

interface ChipProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

/** 고르면 파란 바탕으로 바뀌는 칩. 글자가 길면 두 줄로 늘어난다 */
export function Chip({ selected, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "text-title-sm min-h-14 rounded-md px-3 py-2",
        selected ? "bg-primary text-on-primary" : "bg-surface-muted text-ink",
      )}
    >
      {children}
    </button>
  );
}
