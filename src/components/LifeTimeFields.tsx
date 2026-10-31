import { Moon, Sun, Utensils } from "lucide-react";
import type { LifeTimes } from "@/types";

interface LifeTimeFieldsProps {
  value: LifeTimes;
  onChange: (next: LifeTimes) => void;
}

const TIME_FIELDS = [
  { key: "wakeTime", label: "기상", icon: Sun },
  { key: "sleepTime", label: "취침", icon: Moon },
  { key: "breakfast", label: "아침 식사", icon: Utensils },
  { key: "lunch", label: "점심 식사", icon: Utensils },
  { key: "dinner", label: "저녁 식사", icon: Utensils },
] as const satisfies ReadonlyArray<{ key: keyof LifeTimes; label: string; icon: typeof Sun }>;

/** 기상·취침·세 끼 식사 시각을 입력하는 칸. 입력 화면과 평소 복약 화면이 함께 쓴다 */
export function LifeTimeFields({ value, onChange }: LifeTimeFieldsProps) {
  return (
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
            value={value[key]}
            onChange={(e) => onChange({ ...value, [key]: e.target.value })}
            className="bg-surface-muted text-number-lg tabular h-14 rounded-md px-4"
          />
        </label>
      ))}
    </div>
  );
}
