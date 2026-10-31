import { cn } from "@/lib/utils";
/** 여러 선택지 중 하나를 고르는 칩. 고르면 파란 바탕으로 바뀐다 */
export function ChoiceChip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "text-title-sm h-14 rounded-md px-3",
        selected ? "bg-primary text-on-primary" : "bg-surface-muted text-ink",
      )}
    >
      {children}
    </button>
  );
}
