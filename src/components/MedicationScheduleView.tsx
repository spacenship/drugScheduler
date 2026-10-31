import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { UsualSlotList } from "@/components/UsualSlotList";
import { medicationToDrug } from "@/lib/schedule";
import { buildUsualSchedule } from "@/lib/usualSchedule";
import type { MedicationScheduleInput } from "@/types";

interface MedicationScheduleViewProps {
  input: MedicationScheduleInput;
  onBack: () => void;
}

/** 평소 복용약 시간표: 직접 입력한 약들의 복용 시각을 생활 시간 칸에 나누어 보여 준다 */
export function MedicationScheduleView({ input, onBack }: MedicationScheduleViewProps) {
  const drugs = input.medications.map(medicationToDrug);
  const schedule = buildUsualSchedule(drugs, input);

  const lifeTimes = [
    { label: "기상", time: input.wakeTime },
    { label: "아침", time: input.breakfast },
    { label: "점심", time: input.lunch },
    { label: "저녁", time: input.dinner },
    { label: "취침", time: input.sleepTime },
  ];

  return (
    <>
      <NavBar title="평소 복약 시간표" onBack={onBack} />
      <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <div className="flex flex-col gap-1">
          <p className="text-eyebrow text-ink-secondary tabular">
            기상 {input.wakeTime} · 취침 {input.sleepTime}
          </p>
          <h2 className="text-display">하루 복약 시간표</h2>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">생활 시간</h2>
          <div className="flex flex-wrap gap-2">
            {lifeTimes.map(({ label, time }) => (
              <span
                key={label}
                className="bg-surface-muted text-body-lg tabular flex h-12 items-center rounded-md px-4"
              >
                {label} {time}
              </span>
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
            약 다시 입력하기
          </button>
        </div>
      </div>
    </>
  );
}
