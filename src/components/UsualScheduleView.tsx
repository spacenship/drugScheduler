import { ChoiceChip } from "@/components/ChoiceChip";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { UsualSlotList } from "@/components/UsualSlotList";
import { findDrug, listDrugs } from "@/lib/drugs";
import { DEFAULT_LIFE_TIMES } from "@/lib/time";
import { buildUsualSchedule } from "@/lib/usualSchedule";
import type { DrugInfo } from "@/types";

interface UsualScheduleViewProps {
  /** 고른 약 이름. 홈으로 갔다 와도 남도록 위에서 들고 있는다 */
  selected: string[];
  onChange: (names: string[]) => void;
  onBack: () => void;
}

export function UsualScheduleView({ selected, onChange, onBack }: UsualScheduleViewProps) {
  const times = DEFAULT_LIFE_TIMES;
  const drugs = selected.map(findDrug).filter((drug): drug is DrugInfo => drug !== null);
  const schedule = buildUsualSchedule(drugs, times);

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
              <ChoiceChip
                key={name}
                selected={selected.includes(name)}
                onClick={() => toggle(name)}
              >
                {name}
              </ChoiceChip>
            ))}
          </div>
        </section>

        <UsualSlotList schedule={schedule} noDrugs={drugs.length === 0} />

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
