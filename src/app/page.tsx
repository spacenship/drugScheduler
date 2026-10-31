"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { ScheduleForm } from "@/components/ScheduleForm";
import { findGeneEntry } from "@/lib/genes";
import type { ScheduleInput } from "@/types";

export default function Home() {
  const [input, setInput] = useState<ScheduleInput | null>(null);
  const entry = input && findGeneEntry(input.gene, input.genotype);

  return (
    <main className="flex flex-1 flex-col gap-8 px-5 py-6">
      <div className="bg-surface-muted text-body-md flex items-center gap-3 rounded-md p-4">
        <Info className="text-primary size-6 shrink-0" strokeWidth={2} aria-hidden />
        <p>교육용 시뮬레이터입니다. 실제 처방이 아닙니다</p>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-display">복약 시간표 만들기</h1>
        <p className="text-body-md text-ink-secondary">유전형과 생활 시간을 알려 주세요</p>
      </div>

      <ScheduleForm onSubmit={setInput} />

      {input && (
        <div className="bg-surface-muted text-body-lg rounded-md p-4" role="status">
          {entry ? (
            <p>
              {input.gene} {input.genotype} → {entry.drugName} ({entry.mealRelation},{" "}
              {entry.dosingInterval})
            </p>
          ) : (
            <p>판단 자료 없음</p>
          )}
        </div>
      )}
    </main>
  );
}
