import { Moon, Sun, Utensils } from "lucide-react";
import { DEFAULT_LIFE_TIMES, MEALS } from "@/lib/time";

const TIME_FIELDS = [
  { key: "wakeTime", label: "기상", icon: Sun },
  { key: "sleepTime", label: "취침", icon: Moon },
  { key: "breakfast", label: "아침 식사", icon: Utensils },
  { key: "lunch", label: "점심 식사", icon: Utensils },
  { key: "dinner", label: "저녁 식사", icon: Utensils },
];

const MEAL_KEYS = MEALS.map(({ key }) => key);

/**
 * 기상·취침·식사 시각을 받는 입력 구역
 * @param {object} props
 * @param {Record<string, string | null>} props.times 거른 끼니는 null
 * @param {(key: string, value: string | null) => void} props.onChange
 * @param {boolean} [props.skippableMeals] true면 끼니마다 '안 먹어요'를 고를 수 있다(고르면 null)
 */
export function LifeTimeFields({ times, onChange, skippableMeals = false }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-title-md">생활 시간</h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {TIME_FIELDS.map(({ key, label, icon: Icon }) => {
          const skipped = times[key] === null;
          return (
            <div key={key} className="flex flex-col gap-2">
              <label className="flex flex-col gap-2">
                <span className="text-label text-ink-secondary flex items-center gap-2">
                  <span className="bg-surface-muted flex size-11 items-center justify-center rounded-md">
                    <Icon className="text-primary size-5" strokeWidth={2} aria-hidden />
                  </span>
                  {label}
                </span>
                <input
                  type="time"
                  required
                  disabled={skipped}
                  value={times[key] ?? ""}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="bg-surface-muted text-number-lg tabular disabled:text-ink-secondary h-14 w-full min-w-0 rounded-md px-2.5 tracking-tight [&::-webkit-calendar-picker-indicator]:hidden"
                />
              </label>
              {skippableMeals && MEAL_KEYS.includes(key) && (
                <label className="text-body-md flex min-h-11 items-center gap-2">
                  <input
                    type="checkbox"
                    checked={skipped}
                    onChange={(e) =>
                      onChange(key, e.target.checked ? null : DEFAULT_LIFE_TIMES[key])
                    }
                    className="accent-primary size-5"
                  />
                  안 먹어요
                </label>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
