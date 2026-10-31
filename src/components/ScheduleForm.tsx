"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun, Utensils } from "lucide-react";
import { listGenes, listGenotypes } from "@/lib/genes";
import { toQuery } from "@/lib/query";
import { cn } from "@/lib/utils";
import type { ScheduleInput } from "@/types";

interface ScheduleFormProps {
  /** 뒤로 돌아왔을 때 앞서 입력한 값을 채운다 */
  initial: ScheduleInput | null;
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

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "text-title-sm h-14 rounded-md px-3",
        selected ? "bg-primary text-on-primary" : "bg-surface-muted text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function ScheduleForm({ initial }: ScheduleFormProps) {
  const router = useRouter();
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

  const genotypes = listGenotypes(gene);
  const canSubmit = gene !== "" && genotype !== "" && Object.values(times).every(Boolean);

  function selectGene(next: string) {
    setGene(next);
    // 유전형이 하나뿐이면 바로 고른다
    const options = listGenotypes(next);
    setGenotype(options.length === 1 ? options[0] : "");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    router.push(`/result?${toQuery({ gene, genotype, ...times })}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-title-md">유전자</h2>
        <div className="grid grid-cols-2 gap-3">
          {listGenes().map((name) => (
            <Chip key={name} selected={gene === name} onClick={() => selectGene(name)}>
              {name}
            </Chip>
          ))}
        </div>
      </section>

      {gene && (
        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">유전형</h2>
          <div className="grid grid-cols-2 gap-3">
            {genotypes.map((name) => (
              <Chip key={name} selected={genotype === name} onClick={() => setGenotype(name)}>
                {name}
              </Chip>
            ))}
          </div>
        </section>
      )}

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
                className="bg-surface-muted text-number-lg tabular h-14 rounded-md px-4"
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
