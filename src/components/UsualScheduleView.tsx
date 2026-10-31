import { Moon, Sun, Utensils } from "lucide-react";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";

interface UsualScheduleViewProps {
  onBack: () => void;
}

/** 하루를 나누는 복용 시점. 약을 등록하는 기능이 생기면 시각과 약 카드가 여기에 채워진다 */
const SLOTS = [
  { key: "wake", label: "기상 후", icon: Sun },
  { key: "breakfast", label: "아침 식사", icon: Utensils },
  { key: "lunch", label: "점심 식사", icon: Utensils },
  { key: "dinner", label: "저녁 식사", icon: Utensils },
  { key: "sleep", label: "취침 전", icon: Moon },
] as const;

export function UsualScheduleView({ onBack }: UsualScheduleViewProps) {
  return (
    <>
      <NavBar title="평소 복약 시간표" onBack={onBack} />
      <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <div className="flex flex-col gap-1">
          <p className="text-eyebrow text-ink-secondary">평소 먹는 약</p>
          <h2 className="text-display">하루 복약 시간표</h2>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">복용 시각</h2>
          <ul className="flex flex-col gap-3">
            {SLOTS.map(({ key, label, icon: Icon }) => (
              <li
                key={key}
                className="bg-surface-muted flex items-end justify-between gap-3 rounded-lg p-5"
              >
                <div className="flex flex-col gap-1">
                  <span
                    className="text-number-xl tabular text-ink-secondary"
                    aria-label="시각 미정"
                  >
                    --:--
                  </span>
                  <span className="text-title-sm">{label}</span>
                  <span className="text-body-md text-ink-secondary">등록한 약이 없습니다</span>
                </div>
                <span className="bg-ink-secondary text-on-primary flex size-12 shrink-0 items-center justify-center rounded-md">
                  <Icon className="size-6" strokeWidth={2} aria-hidden />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-auto flex flex-col gap-4">
          <InfoNotice>약을 등록하는 기능은 준비 중입니다</InfoNotice>
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
