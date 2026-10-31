import { Moon, Sun, Utensils } from "lucide-react";
import { Chip } from "@/components/Chip";
import { DoseCard } from "@/components/DoseCard";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { findDrug, listDrugs } from "@/lib/drugs";
import { DEFAULT_LIFE_TIMES } from "@/lib/time";
import { buildUsualSchedule, type SlotKey } from "@/lib/usualSchedule";
import type { Drug } from "@/types";

interface UsualScheduleViewProps {
  /** 고른 약 이름. 홈으로 갔다 와도 남도록 위에서 들고 있는다 */
  selected: string[];
  onChange: (names: string[]) => void;
  onBack: () => void;
}

const SLOT_ICONS = {
  wake: Sun,
  breakfast: Utensils,
  lunch: Utensils,
  dinner: Utensils,
  sleep: Moon,
} satisfies Record<SlotKey, typeof Sun>;

export function UsualScheduleView({ selected, onChange, onBack }: UsualScheduleViewProps) {
  const times = DEFAULT_LIFE_TIMES;
  const drugs = selected.map(findDrug).filter((drug): drug is Drug => drug !== null);
  const { slots, unschedulable } = buildUsualSchedule(drugs, times);

  function toggle(name: string) {
    onChange(selected.includes(name) ? selected.filter((n) => n !== name) : [...selected, name]);
  }

  return (
    <>
      <NavBar title="평소 복약 시간표" onBack={onBack} />
      <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <div className="flex flex-col gap-1">
          <p className="text-eyebrow text-ink-secondary tabular">
            기상 {times.wakeTime} · 취침 {times.sleepTime}
          </p>
          <h2 className="text-display">하루 복약 시간표</h2>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">복용하는 약</h2>
          <p className="text-body-md text-ink-secondary">먹는 약을 모두 눌러 주세요</p>
          <div className="grid grid-cols-2 gap-3">
            {listDrugs().map((name) => (
              <Chip key={name} selected={selected.includes(name)} onClick={() => toggle(name)}>
                {name}
              </Chip>
            ))}
          </div>
        </section>

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
                        {drugs.length === 0 ? "등록한 약이 없습니다" : "복용하는 약이 없습니다"}
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

        <div className="mt-auto flex flex-col gap-4">
          <InfoNotice>실제 복용 시간은 의료진 지시를 따릅니다</InfoNotice>
          <button
            type="button"
            onClick={onBack}
            className="bg-primary text-on-primary text-button active:bg-primary-pressed h-14 w-full rounded-md"
          >
            홈으로
          </button>
        </div>
      </div>
    </>
  );
}
