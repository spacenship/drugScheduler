import { Moon, Sun, Utensils } from "lucide-react";
import { DoseCard } from "@/components/DoseCard";
import type { SlotKey, UsualSchedule } from "@/lib/usualSchedule";

const SLOT_ICONS = {
  wake: Sun,
  breakfast: Utensils,
  lunch: Utensils,
  dinner: Utensils,
  sleep: Moon,
} satisfies Record<SlotKey, typeof Sun>;

interface UsualSlotListProps {
  schedule: UsualSchedule;
  /** 약을 하나도 넣지 않았는지. 빈 칸 안내 문구가 달라진다 */
  noDrugs: boolean;
}

/** 기상·아침·점심·저녁·취침 칸마다 그때 먹는 약을 보여 주고, 시간을 정할 수 없는 약은 따로 모은다 */
export function UsualSlotList({ schedule, noDrugs }: UsualSlotListProps) {
  const { slots, unschedulable } = schedule;

  return (
    <>
      <section className="flex flex-col gap-3">
        <h2 className="text-title-md">복용 시각</h2>
        <ul className="flex flex-col gap-3">
          {slots.map(({ key, label, time, doses }) => {
            const Icon = SLOT_ICONS[key];

            if (doses.length === 0) {
              return (
                <li
                  key={key}
                  className="bg-surface-muted flex items-end justify-between gap-3 rounded-lg p-5"
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-number-xl tabular text-ink-secondary"
                      aria-label="복용 시각 없음"
                    >
                      --:--
                    </span>
                    <span className="text-title-sm">{label}</span>
                    <span className="text-body-md text-ink-secondary">
                      {noDrugs ? "등록한 약이 없습니다" : "복용하는 약이 없습니다"}
                    </span>
                  </div>
                  <span className="bg-ink-secondary text-on-primary flex size-12 shrink-0 items-center justify-center rounded-md">
                    <Icon className="size-6" strokeWidth={2} aria-hidden />
                  </span>
                </li>
              );
            }

            return (
              <li key={key} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="bg-surface-muted flex size-11 items-center justify-center rounded-md">
                    <Icon className="text-primary size-5" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="text-title-sm">{label}</span>
                  <span className="text-label text-ink-secondary tabular">{time}</span>
                </div>
                {doses.map(({ drug, dose }) => (
                  <DoseCard
                    key={`${drug.drugName}-${dose.minutes}`}
                    time={dose.time}
                    drugName={drug.drugName}
                    note={dose.note}
                  />
                ))}
              </li>
            );
          })}
        </ul>
      </section>

      {unschedulable.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">시간을 정할 수 없는 약</h2>
          {unschedulable.map(({ drug, reason }) => (
            <div
              key={drug.drugName}
              className="bg-surface-muted flex flex-col items-start gap-2 rounded-lg p-5"
            >
              <span className="bg-ink-secondary text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5">
                시간을 정할 수 없음
              </span>
              <span className="text-title-sm">{drug.drugName}</span>
              <span className="text-body-lg">{reason}</span>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
