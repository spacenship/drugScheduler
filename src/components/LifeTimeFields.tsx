import { Moon, Sun, Utensils } from "lucide-react";
import type { LifeTimes } from "@/types";

const TIME_FIELDS = [
  { key: "wakeTime", label: "기상", icon: Sun },
  { key: "sleepTime", label: "취침", icon: Moon },
  { key: "breakfast", label: "아침 식사", icon: Utensils },
  { key: "lunch", label: "점심 식사", icon: Utensils },
  { key: "dinner", label: "저녁 식사", icon: Utensils },
] as const satisfies ReadonlyArray<{ key: keyof LifeTimes; label: string; icon: unknown }>;

interface LifeTimeFieldsProps {
  times: LifeTimes;
  onChange: (key: keyof LifeTimes, value: string) => void;
}

/** 기상·취침·식사 시각을 받는 입력 구역 */
export function LifeTimeFields({ times, onChange }: LifeTimeFieldsProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-title-md">생활 시간</h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {TIME_FIELDS.map(({ key, label, icon: Icon }) => (
          <label key={key} className="flex flex-col gap-2">
            <span className="text-label text-ink-secondary flex items-center gap-2">
              <span className="bg-surface-muted flex size-11 items-center justify-center rounded-md">
                <Icon className="text-primary size-5" strokeWidth={2} aria-hidden />
              </span>
              {label}
            </span>
            <input
              type="time"
              required
              value={times[key]}
              onChange={(e) => onChange(key, e.target.value)}
              className="bg-surface-muted text-number-lg tabular h-14 w-full min-w-0 rounded-md px-3 [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </label>
        ))}
      </div>
    </section>
  );
}
