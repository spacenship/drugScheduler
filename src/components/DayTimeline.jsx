"use client";

import { useSyncExternalStore } from "react";
import { Moon, Pill, Sun, Utensils } from "lucide-react";
import { groupOf } from "@/lib/drugGroups";
import { DEFAULT_THEME, THEME_CLASSES } from "@/lib/theme";
import { formatDuration } from "@/lib/time";
import { cn } from "@/lib/utils";
import { layoutTimeline } from "@/lib/timeline";

const LIFE_ICONS = { wake: Sun, meal: Utensils, sleep: Moon };

/** 지금 시각(하루 0시부터의 분)을 30초마다 다시 읽는다. 서버에서 그릴 때는 모르므로 null */
function subscribe(onChange) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}
function nowMinutes() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

/** 지금 이후 가장 먼저 먹을 약의 key. 오늘 남은 약이 없으면 내일 첫 약 */
function findNextDose(items, now) {
  if (now === null) return { key: null, tomorrow: false };
  const doses = items.filter((item) => item.kind === "dose");
  const next = doses.find((item) => item.minutes >= now);
  if (next) return { key: next.key, tomorrow: false };
  return { key: doses[0]?.key ?? null, tomorrow: true };
}

/** 식사 묶음은 회색 바탕 하나로 감싼다. 위치에 따라 모서리와 위아래 여백이 달라진다 */
const GROUP_BOX = {
  first: "bg-surface-muted rounded-t-lg px-2 pt-2",
  middle: "bg-surface-muted px-2",
  last: "bg-surface-muted rounded-b-lg px-2 pb-2",
};
/** 묶음의 첫 줄·끝 줄은 바탕 여백만큼 시각과 점도 같이 내린다 */
const GROUP_PAD = { first: "pt-2", middle: "", last: "pb-2" };

/**
 * 기상·식사·복용·취침을 세로선 하나로 이은 하루 시간표.
 * - 일정 사이에는 빈 시간("4시간 30분 뒤")을 적고, 빈 시간이 길수록 사이를 조금 더 띄운다.
 * - 약 먹는 시각은 크고 진하게, 기상·식사·취침 시각은 작은 회색으로 쓴다.
 * - 식후·공복 약은 맞추는 식사와 한 묶음(회색 바탕)으로 보여 준다.
 * - 지금 이후 가장 먼저 먹을 약에 '다음 복용' 배지를 붙인다.
 * - 앞 줄과 시각이 같으면 시각을 다시 쓰지 않는다.
 * @param {{ items: import("@/types").TimelineItem[] }} props
 */
export function DayTimeline({ items }) {
  const now = useSyncExternalStore(subscribe, nowMinutes, () => null);
  const next = findNextDose(items, now);
  const rows = layoutTimeline(items);

  return (
    <ol className="flex flex-col">
      {rows.map((row, index) => {
        const isFirst = index === 0;
        const isLast = index === rows.length - 1;
        const spine = (
          <span
            aria-hidden
            className={cn(
              "bg-border absolute left-1/2 w-0.5 -translate-x-1/2",
              isFirst ? "top-6" : "top-0",
              isLast ? "h-6" : "bottom-0",
            )}
          />
        );

        if (row.type === "gap") {
          return (
            <li
              key={row.key}
              className="grid grid-cols-[3.75rem_1.5rem_1fr] gap-x-2"
              style={{ height: row.height }}
            >
              <span />
              <span className="relative">{spine}</span>
              <span
                className={cn(
                  "text-label text-ink-secondary flex items-center",
                  row.group ? GROUP_BOX.middle : "px-1",
                )}
              >
                {formatDuration(row.minutes)} 뒤
              </span>
            </li>
          );
        }

        const { item, showTime, group } = row;
        const isDose = item.kind === "dose";
        // 빈 시간 줄 없이 바로 이어지는 줄(같은 시각)은 카드끼리 붙지 않게 조금 띄운다
        const stacked = index > 0 && rows[index - 1].type === "item";
        const pad = cn(group ? GROUP_PAD[group] : "", stacked && "pt-2");
        const color = isDose ? THEME_CLASSES[groupOf(item.title)?.theme ?? DEFAULT_THEME] : null;

        return (
          <li key={row.key} className="grid grid-cols-[3.75rem_1.5rem_1fr] gap-x-2">
            <span className={pad}>
              <time
                className={cn(
                  "tabular flex",
                  isDose ? "text-title-sm pt-4" : "text-label text-ink-secondary h-11 items-center",
                  !showTime && "sr-only",
                )}
              >
                {item.time}
              </time>
            </span>
            <span className={cn("relative", pad)}>
              {spine}
              <span
                aria-hidden
                className={cn(
                  "relative block rounded-full",
                  isDose
                    ? `${color.tile} mx-auto mt-6 size-3`
                    : "bg-surface border-ink-secondary mx-auto mt-[17px] size-2.5 border-2",
                )}
              />
            </span>
            <div className={cn(group ? GROUP_BOX[group] : "", stacked && "pt-2")}>
              {isDose ? (
                <DoseRow
                  item={item}
                  color={color}
                  isNext={next.key === item.key}
                  tomorrow={next.tomorrow}
                />
              ) : (
                <LifeRow item={item} />
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function LifeRow({ item }) {
  const Icon = LIFE_ICONS[item.kind];
  return (
    <div className="text-body-lg text-ink-secondary flex h-11 items-center gap-2 px-1">
      <Icon className="text-primary size-5 shrink-0" strokeWidth={2} aria-hidden />
      {item.title}
    </div>
  );
}

function DoseRow({ item, color, isNext, tomorrow }) {
  const group = groupOf(item.title);
  return (
    <div className={`${color.card} flex items-center justify-between gap-3 rounded-md p-4`}>
      <div className="flex flex-col items-start gap-1">
        <span className="text-title-sm">{item.title}</span>
        {/* 색만으로 구분하지 않도록 계열 이름을 함께 적는다 */}
        <span className="text-body-md text-ink-secondary">
          {group ? `${group.label} · ${item.note}` : item.note}
        </span>
        {isNext && (
          <span
            className={`${color.badge} text-on-primary text-badge mt-1 flex h-7 items-center rounded-sm px-2.5`}
          >
            {tomorrow ? "다음 복용 · 내일" : "다음 복용"}
          </span>
        )}
      </div>
      <span
        className={`${color.tile} text-on-primary flex size-12 shrink-0 items-center justify-center rounded-md`}
      >
        <Pill className="size-6" strokeWidth={2} aria-hidden />
      </span>
    </div>
  );
}
