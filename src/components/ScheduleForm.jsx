"use client";
import { useState } from "react";
import { ChoiceChip } from "@/components/ChoiceChip";
import { DEFAULT_LIFE_TIMES, LifeTimeFields } from "@/components/LifeTimeFields";
import { listGenes, listGenotypes } from "@/lib/genes";
export function ScheduleForm({ initial, onSubmit }) {
  const [gene, setGene] = useState(initial?.gene ?? "");
  const [genotype, setGenotype] = useState(initial?.genotype ?? "");
  const [times, setTimes] = useState(
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
  const genotypes = listGenotypes(gene);
  const canSubmit = gene !== "" && genotype !== "" && Object.values(times).every(Boolean);
  function selectGene(next) {
    setGene(next);
    // 유전형이 하나뿐이면 바로 고른다
    const options = listGenotypes(next);
    setGenotype(options.length === 1 ? options[0] : "");
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({ gene, genotype, ...times });
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-title-md">유전자</h2>
        <div className="grid grid-cols-2 gap-3">
          {listGenes().map((name) => (
            <ChoiceChip key={name} selected={gene === name} onClick={() => selectGene(name)}>
              {name}
            </ChoiceChip>
          ))}
        </div>
      </section>

      {gene && (
        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">유전형</h2>
          <div className="grid grid-cols-2 gap-3">
            {genotypes.map((name) => (
              <ChoiceChip key={name} selected={genotype === name} onClick={() => setGenotype(name)}>
                {name}
              </ChoiceChip>
            ))}
          </div>
        </section>
      )}

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
