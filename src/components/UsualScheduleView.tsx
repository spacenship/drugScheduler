import { Moon, Sun, Utensils } from "lucide-react";
import { Chip } from "@/components/Chip";
import { DoseCard } from "@/components/DoseCard";
import { InfoNotice } from "@/components/InfoNotice";
import { LifeTimeFields } from "@/components/LifeTimeFields";
import { NavBar } from "@/components/NavBar";
import { listDrugsByGroup } from "@/lib/drugGroups";
import { findDrug } from "@/lib/drugs";
import { THEME_CLASSES } from "@/lib/theme";
import { buildUsualSchedule, type SlotKey } from "@/lib/usualSchedule";
import type { Drug, LifeTimes } from "@/types";

interface UsualScheduleViewProps {
  /** 고른 약 이름과 생활 시간. 홈으로 갔다 와도 남도록 위에서 들고 있는다 */
  selected: string[];
  onChange: (names: string[]) => void;
  times: LifeTimes;
  onTimesChange: (times: LifeTimes) => void;
  onBack: () => void;
}

const SLOT_ICONS = {
  wake: Sun,
  breakfast: Utensils,
  lunch: Utensils,
  dinner: Utensils,
  sleep: Moon,
} satisfies Record<SlotKey, typeof Sun>;

export function UsualScheduleView({
  selected,
  onChange,
  times,
  onTimesChange,
  onBack,
}: UsualScheduleViewProps) {
  const drugs = selected.map(findDrug).filter((drug): drug is Drug => drug !== null);
  // 시각 칸을 비워 두면 계산할 수 없다
  const ready = Object.values(times).every(Boolean);
  const schedule = ready ? buildUsualSchedule(drugs, times) : null;

  function toggle(name: string) {
    onChange(selected.includes(name) ? selected.filter((n) => n !== name) : [...selected, name]);
  }

  return (
    <>
      <NavBar title="평소 복약 시간표" onBack={onBack} />
      <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <div className="flex flex-col gap-1">
          <p className="text-eyebrow text-ink-secondary">평소 먹는 약</p>
          <h2 className="text-display">하루 복약 시간표</h2>
        </div>

        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-title-md">복용하는 약</h2>
              <span className="text-label text-ink-secondary tabular">
                {selected.length}개 선택
              </span>
            </div>
            <p className="text-body-md text-ink-secondary">먹는 약을 모두 눌러 주세요</p>
          </div>
          {listDrugsByGroup().map(({ group, names }) => (
            <div key={group.key} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`${THEME_CLASSES[group.theme].badge} text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5`}
                >
                  {group.label}
                </span>
                <span className="text-label text-ink-secondary">{names.length}종</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {names.map((name) => (
                  <Chip key={name} selected={selected.includes(name)} onClick={() => toggle(name)}>
                    {name}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-title-md">생활 시간</h2>
          <LifeTimeFields value={times} onChange={onTimesChange} />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-title-md">복용 시각</h2>
          {schedule ? (
            // 왼쪽 세로선으로 아침부터 밤까지 하루가 이어지는 것을 보여 준다
            <ol className="flex flex-col">
              {schedule.slots.map(({ key, label, time, doses }) => {
                const Icon = SLOT_ICONS[key];

                return (
                  <li key={key} className="group flex gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <span className="bg-surface-muted flex size-11 shrink-0 items-center justify-center rounded-md">
                        <Icon className="text-primary size-5" strokeWidth={2} aria-hidden />
                      </span>
                      <span className="bg-border w-px flex-1 group-last:hidden" aria-hidden />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-3 pb-6 group-last:pb-0">
                      <div className="flex h-11 items-baseline gap-3 self-start pt-2">
                        <h3 className="text-title-sm">{label}</h3>
                        <span className="text-label text-ink-secondary tabular">{time}</span>
                      </div>
                      {doses.length === 0 ? (
                        <p className="bg-surface-muted text-body-md text-ink-secondary rounded-lg px-5 py-4">
                          {drugs.length === 0 ? "등록한 약이 없습니다" : "복용하는 약이 없습니다"}
                        </p>
                      ) : (
                        doses.map(({ drug, dose }) => (
                          <DoseCard
                            key={`${drug.drugName}-${dose.minutes}`}
                            time={dose.time}
                            drugName={drug.drugName}
                            note={dose.note}
                          />
                        ))
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <InfoNotice>생활 시간을 모두 입력하면 복용 시각이 나옵니다</InfoNotice>
          )}
        </section>

        {schedule && schedule.unschedulable.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-title-md">시간을 정할 수 없는 약</h2>
            {schedule.unschedulable.map(({ drug, reason }) => (
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
