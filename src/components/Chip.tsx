import { Check } from "lucide-react";
import { THEME_CLASSES, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface ChipProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  /**
   * 주면 흰 바탕 칩이 된다. 고르면 이 테마 색 테두리와 체크 표시가 붙는다.
   * 주지 않으면 회색 칩이고, 고르면 파란 바탕으로 바뀐다
   */
  theme?: Theme;
}

/** 고르는 칩. 글자가 길면 두 줄로 늘어난다 */
export function Chip({ selected, onClick, children, theme }: ChipProps) {
  if (theme) {
    const color = THEME_CLASSES[theme];

    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={cn(
          "bg-surface text-ink text-title-sm flex min-h-14 items-center justify-center gap-2 rounded-md border-2 px-3 py-2",
          selected ? color.border : "border-border",
        )}
      >
        {selected && (
          <Check className={cn("size-5 shrink-0", color.text)} strokeWidth={2} aria-hidden />
        )}
        {children}
      </button>
    );
  }

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
