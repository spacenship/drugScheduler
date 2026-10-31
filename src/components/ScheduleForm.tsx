"use client";

import { useState } from "react";
import { LifeTimeFields } from "@/components/LifeTimeFields";
import { listGenes, listGenotypes } from "@/lib/genes";
import { DEFAULT_LIFE_TIMES } from "@/lib/time";
import type { LifeTimes, ScheduleInput } from "@/types";

interface ScheduleFormProps {
  /** 뒤로 돌아왔을 때 앞서 입력한 값을 채운다 */
  initial: ScheduleInput | null;
  onSubmit: (input: ScheduleInput) => void;
}

const TEXT_INPUT_CLASS =
  "bg-surface-muted text-title-sm placeholder:text-ink-secondary h-14 w-full min-w-0 rounded-md px-4";

export function ScheduleForm({ initial, onSubmit }: ScheduleFormProps) {
  const [gene, setGene] = useState(initial?.gene ?? "");
  const [genotype, setGenotype] = useState(initial?.genotype ?? "");
  const [times, setTimes] = useState<LifeTimes>(
    initial
      ? {
          wakeTime: initial.wakeTime,
          sleepTime: initial.sleepTime,
          breakfast: initial.breakfast,
          lunch: initial.lunch,
          dinner: initial.dinner,
        }
      : DEFAULT_LIFE_TIMES,
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

      <LifeTimeFields
        times={times}
        onChange={(key, value) => setTimes((prev) => ({ ...prev, [key]: value }))}
      />

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
