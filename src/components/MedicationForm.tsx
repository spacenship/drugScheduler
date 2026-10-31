"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ChoiceChip } from "@/components/ChoiceChip";
import { LifeTimeFields } from "@/components/LifeTimeFields";
import { DEFAULT_LIFE_TIMES } from "@/lib/time";
import type { LifeTimes, Meal, Medication, MedicationScheduleInput } from "@/types";

interface MedicationFormProps {
  onSubmit: (input: MedicationScheduleInput) => void;
}

/** 입력 중인 약. 복용 횟수와 식사 관계는 고르기 전까지 null */
interface MedicationDraft {
  id: number;
  name: string;
  timesPerDay: number | null;
  meal: Meal | null;
}

const TIMES_PER_DAY_OPTIONS = [1, 2, 3, 4];

const MEAL_OPTIONS: Array<{ value: Meal; label: string }> = [
  { value: "after", label: "식후" },
  { value: "empty", label: "공복" },
  { value: "any", label: "상관없음" },
];

function emptyDraft(id: number): MedicationDraft {
  return { id, name: "", timesPerDay: null, meal: null };
}

/** 모두 채워졌을 때만 약 정보로 바꾼다 */
function toMedication({ name, timesPerDay, meal }: MedicationDraft): Medication | null {
  const trimmed = name.trim();
  if (!trimmed || timesPerDay === null || meal === null) return null;
  return { name: trimmed, timesPerDay, meal };
}

export function MedicationForm({ onSubmit }: MedicationFormProps) {
  const [drafts, setDrafts] = useState<MedicationDraft[]>([emptyDraft(0)]);
  const [times, setTimes] = useState<LifeTimes>(DEFAULT_LIFE_TIMES);

  const canSubmit = drafts.every((draft) => toMedication(draft) !== null);

  function updateDraft(id: number, patch: Partial<MedicationDraft>) {
    setDrafts((prev) => prev.map((draft) => (draft.id === id ? { ...draft, ...patch } : draft)));
  }

  function addDraft() {
    setDrafts((prev) => [...prev, emptyDraft(Math.max(...prev.map((draft) => draft.id)) + 1)]);
  }

  function removeDraft(id: number) {
    setDrafts((prev) => prev.filter((draft) => draft.id !== id));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const medications = drafts.map(toMedication).filter((med) => med !== null);
    if (medications.length !== drafts.length) return;
    onSubmit({ medications, ...times });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-title-md">복용하는 약</h2>
        <ul className="flex flex-col gap-3">
          {drafts.map((draft, index) => (
            <li key={draft.id} className="border-border flex flex-col gap-5 rounded-lg border p-5">
              <div className="flex min-h-11 items-center justify-between">
                <h3 className="text-title-sm">약 {index + 1}</h3>
                {drafts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDraft(draft.id)}
                    aria-label={`약 ${index + 1} 삭제`}
                    className="bg-surface-muted flex size-11 items-center justify-center rounded-md"
                  >
                    <Trash2 className="size-5" strokeWidth={2} aria-hidden />
                  </button>
                )}
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-label text-ink-secondary">약 이름</span>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  placeholder="예: 아스피린"
                  value={draft.name}
                  onChange={(e) => updateDraft(draft.id, { name: e.target.value })}
                  className="bg-surface-muted text-body-lg placeholder:text-ink-secondary h-14 rounded-md px-4"
                />
              </label>

              <fieldset className="min-w-0">
                <legend className="text-label text-ink-secondary mb-2">하루 복용 횟수</legend>
                <div className="grid grid-cols-4 gap-2">
                  {TIMES_PER_DAY_OPTIONS.map((count) => (
                    <ChoiceChip
                      key={count}
                      selected={draft.timesPerDay === count}
                      onClick={() => updateDraft(draft.id, { timesPerDay: count })}
                    >
                      {count}회
                    </ChoiceChip>
                  ))}
                </div>
              </fieldset>

              <fieldset className="min-w-0">
                <legend className="text-label text-ink-secondary mb-2">식사와의 관계</legend>
                <div className="grid grid-cols-3 gap-2">
                  {MEAL_OPTIONS.map(({ value, label }) => (
                    <ChoiceChip
                      key={value}
                      selected={draft.meal === value}
                      onClick={() => updateDraft(draft.id, { meal: value })}
                    >
                      {label}
                    </ChoiceChip>
                  ))}
                </div>
              </fieldset>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={addDraft}
          className="text-primary text-button flex h-12 w-full items-center justify-center gap-2"
        >
          <Plus className="size-5" strokeWidth={2} aria-hidden />약 추가
        </button>
      </section>

      <LifeTimeFields
        times={times}
        onChange={(key, value) => setTimes((prev) => ({ ...prev, [key]: value }))}
      />

      <button
        type="submit"
        disabled={!canSubmit}
        className="bg-primary text-on-primary text-button enabled:active:bg-primary-pressed disabled:bg-surface-muted disabled:text-ink-secondary h-14 w-full rounded-md"
      >
        시간표 만들기
      </button>
    </form>
  );
}
