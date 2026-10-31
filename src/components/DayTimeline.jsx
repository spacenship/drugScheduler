import { Moon, Pill, Sun, Utensils } from "lucide-react";
import { groupOf } from "@/lib/drugGroups";
import { DEFAULT_THEME, THEME_CLASSES } from "@/lib/theme";

const LIFE_ICONS = { wake: Sun, meal: Utensils, sleep: Moon };

/**
 * 기상·식사·복용·취침을 한 줄의 시간표로 보여 준다. 왼쪽은 시각, 오른쪽은 그때 할 일.
 * 생활 시간은 회색 줄, 복용은 약 계열 색 카드(계열을 모르면 초록)다.
 * @param {{ items: import("@/types").TimelineItem[] }} props
 */
export function DayTimeline({ items }) {
  return (
    <ol className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.key} className="flex items-stretch gap-3">
          <time className="text-title-sm tabular flex w-16 shrink-0 items-center">{item.time}</time>
          {item.kind === "dose" ? <DoseRow item={item} /> : <LifeRow item={item} />}
        </li>
      ))}
    </ol>
  );
}

function LifeRow({ item }) {
  const Icon = LIFE_ICONS[item.kind];
  return (
    <div className="bg-surface-muted flex min-h-14 flex-1 items-center gap-3 rounded-md px-4">
      <Icon className="text-primary size-5 shrink-0" strokeWidth={2} aria-hidden />
      <span className="text-body-lg">{item.title}</span>
    </div>
  );
}

function DoseRow({ item }) {
  const group = groupOf(item.title);
  const color = THEME_CLASSES[group?.theme ?? DEFAULT_THEME];
  return (
    <div className={`${color.card} flex flex-1 items-center justify-between gap-3 rounded-md p-4`}>
      <div className="flex flex-col gap-1">
        <span className="text-title-sm">{item.title}</span>
        {/* 색만으로 구분하지 않도록 계열 이름을 함께 적는다 */}
        <span className="text-body-md text-ink-secondary">
          {group ? `${group.label} · ${item.note}` : item.note}
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
