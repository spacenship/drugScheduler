"use client";

import { useState } from "react";
import { Moon, Sun, Utensils } from "lucide-react";
import { listGenes, listGenotypes } from "@/lib/genes";
import type { ScheduleInput } from "@/types";

interface ScheduleFormProps {
  /** 뒤로 돌아왔을 때 앞서 입력한 값을 채운다 */
  initial: ScheduleInput | null;
  onSubmit: (input: ScheduleInput) => void;
}

const TIME_FIELDS = [
  { key: "wakeTime", label: "기상", icon: Sun },
  { key: "sleepTime", label: "취침", icon: Moon },
  { key: "breakfast", label: "아침 식사", icon: Utensils },
  { key: "lunch", label: "점심 식사", icon: Utensils },
  { key: "dinner", label: "저녁 식사", icon: Utensils },
] as const;

type TimeKey = (typeof TIME_FIELDS)[number]["key"];

const DEFAULT_TIMES: Record<TimeKey, string> = {
  wakeTime: "07:00",
  sleepTime: "23:00",
  breakfast: "08:00",
  lunch: "13:00",
  dinner: "19:00",
};

const TEXT_INPUT_CLASS =
  "bg-surface-muted text-title-sm placeholder:text-ink-secondary h-14 w-full min-w-0 rounded-md px-4";

export function ScheduleForm({ initial, onSubmit }: ScheduleFormProps) {
  const [gene, setGene] = useState(initial?.gene ?? "");
  const [genotype, setGenotype] = useState(initial?.genotype ?? "");
  const [times, setTimes] = useState<Record<TimeKey, string>>(
    initial
      ? {
          wakeTime: initial.wakeTime,
          sleepTime: initial.sleepTime,
          breakfast: initial.breakfast,
          lunch: initial.lunch,
          dinner: initial.dinner,
        }
      : DEFAULT_TIMES,
  );

  const canSubmit =
    gene.trim() !== "" && genotype.trim() !== "" && Object.values(times).every(Boolean);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({ gene: gene.trim(), genotype: genotype.trim(), ...times });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-title-md">유전자</h2>
        <label className="flex flex-col gap-2">
          <span className="text-label text-ink-secondary">유전자명</span>
          <input
            type="text"
            list="gene-options"
            value={gene}
            onChange={(e) => setGene(e.target.value)}
            placeholder="예: CYP2D6"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            className={TEXT_INPUT_CLASS}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-label text-ink-secondary">유전형</span>
          <input
            type="text"
            list="genotype-options"
            value={genotype}
            onChange={(e) => setGenotype(e.target.value)}
            placeholder="예: *1/*1x2"
            autoComplete="off"
            spellCheck={false}
            className={TEXT_INPUT_CLASS}
          />
        </label>
        {/* 직접 입력하되, 표에 있는 값을 제안으로 보여 준다 */}
        <datalist id="gene-options">
          {listGenes().map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        <datalist id="genotype-options">
          {listGenotypes(gene).map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </section>

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
                onChange={(e) => setTimes((prev) => ({ ...prev, [key]: e.target.value }))}
                className="bg-surface-muted text-number-lg tabular h-14 w-full min-w-0 rounded-md px-3 [&::-webkit-calendar-picker-indicator]:hidden"
              />
            </label>
          ))}
        </div>
      </section>

      <button
        type="submit"
        disabled={!canSubmit}
        className="bg-primary text-on-primary text-button enabled:active:bg-primary-pressed disabled:bg-surface-muted disabled:text-ink-secondary h-14 w-full rounded-md"
      >
        결과 보기
      </button>
    </form>
  );
}
