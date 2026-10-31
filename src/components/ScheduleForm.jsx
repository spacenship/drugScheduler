"use client";

import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LifeTimeFields } from "@/components/LifeTimeFields";
import { listGenes, listGenotypes } from "@/lib/genes";
import { toQuery } from "@/lib/query";
import { DEFAULT_LIFE_TIMES } from "@/lib/time";

const TEXT_INPUT_CLASS =
  "bg-surface-muted text-title-sm placeholder:text-ink-secondary h-14 w-full min-w-0 rounded-md px-4";

export function ScheduleForm({ initial }) {
  const router = useRouter();
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

  // 새 입력(주소에 값이 없을 때)은 화면을 떠날 때 비워서, 처음부터 다시 시작하면 빈 칸으로 열리게 한다.
  // Cache Components가 떠난 페이지를 숨겨 두기만 해서 입력값이 그대로 남기 때문이다.
  // 결과에서 돌아온 입력은 주소의 값으로 채우므로 비우지 않는다.
  const isNew = initial === null;
  useLayoutEffect(() => {
    if (!isNew) return;
    return () => {
      setGene("");
      setGenotype("");
      setTimes(DEFAULT_LIFE_TIMES);
    };
  }, [isNew]);

  const canSubmit =
    gene.trim() !== "" && genotype.trim() !== "" && Object.values(times).every(Boolean);

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    router.push(`/result?${toQuery({ gene: gene.trim(), genotype: genotype.trim(), ...times })}`);
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
