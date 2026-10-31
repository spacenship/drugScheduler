import { Pill } from "lucide-react";
import { groupOf } from "@/lib/drugGroups";
import { DEFAULT_THEME, THEME_CLASSES } from "@/lib/theme";

/** 복용 시각 한 번을 보여 주는 약 카드. 색은 약 계열(진통제·항암제 …)을 따르고, 계열을 모르면 초록이다 */
export function DoseCard({ time, drugName, note }) {
  const group = groupOf(drugName);
  const color = THEME_CLASSES[group?.theme ?? DEFAULT_THEME];

  return (
    <div className={`${color.card} flex items-end justify-between gap-3 rounded-lg p-5`}>
      <div className="flex flex-col gap-1">
        <span className="text-number-xl tabular">{time}</span>
        <span className="text-title-sm">{drugName}</span>
        {/* 색만으로 구분하지 않도록 계열 이름을 함께 적는다 */}
        <span className="text-body-md text-ink-secondary">
          {group ? `${group.label} · ${note}` : note}
        </span>
      </div>
      <span
        className={`${color.tile} text-on-primary flex size-12 shrink-0 items-center justify-center rounded-md`}
      >
        <Pill className="size-6" strokeWidth={2} aria-hidden />
      </span>
    </div>
  );
}
