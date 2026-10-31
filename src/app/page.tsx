"use client";

import { useState } from "react";
import { HomeView } from "@/components/HomeView";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { NoDataView } from "@/components/NoDataView";
import { ResultView } from "@/components/ResultView";
import { ScheduleForm } from "@/components/ScheduleForm";
import { ScheduleView } from "@/components/ScheduleView";
import { UsualScheduleView } from "@/components/UsualScheduleView";
import { lookupByGenotype } from "@/lib/genes";
import type { ScheduleInput } from "@/types";

/**
 * home → (input → result → schedule) 유전자 맞춤 흐름 / home → usual 평소 복약
 * input에서 표에 없는 유전자·유전형을 넣으면 result 대신 nodata(정보 부족)로 간다.
 */
type Step = "home" | "usual" | "input" | "result" | "schedule" | "nodata";

export default function Home() {
  const [step, setStep] = useState<Step>("home");
  const [input, setInput] = useState<ScheduleInput | null>(null);
  const [usualDrugs, setUsualDrugs] = useState<string[]>([]);
  const result = input ? lookupByGenotype(input.gene, input.genotype) : null;
  const entry = result?.status === "found" ? result.gene : null;

  if (step === "home") {
    return <HomeView onOpenGene={() => setStep("input")} onOpenUsual={() => setStep("usual")} />;
  }

  if (step === "usual") {
    return (
      <UsualScheduleView
        selected={usualDrugs}
        onChange={setUsualDrugs}
        onBack={() => setStep("home")}
      />
    );
  }

  if (result?.status === "no_data" && step === "nodata") {
    return (
      <NoDataView
        result={result}
        onBack={() => setStep("input")}
        onRetry={() => setStep("input")}
      />
    );
  }

  if (result && step === "result") {
    return (
      <ResultView
        result={result}
        onBack={() => setStep("input")}
        onNext={() => setStep("schedule")}
      />
    );
  }

  if (input && step === "schedule") {
    return (
      <ScheduleView
        input={input}
        entry={entry}
        onBack={() => setStep("result")}
        onRestart={() => {
          setInput(null);
          setStep("home");
        }}
      />
    );
  }

  return (
    <>
      <NavBar title="유전자 복약 시간표" onBack={() => setStep("home")} />
      <main className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <InfoNotice>교육용 시뮬레이터입니다. 실제 처방이 아닙니다</InfoNotice>

        <div className="flex flex-col gap-2">
          <h2 className="text-display">복약 시간표 만들기</h2>
          <p className="text-body-md text-ink-secondary">유전자와 생활 시간을 알려 주세요</p>
        </div>

        <ScheduleForm
          initial={input}
          onSubmit={(value) => {
            const found = lookupByGenotype(value.gene, value.genotype);
            if (found.status === "found") {
              // 표에 적힌 원래 글자로 바꿔 둔다(예: cyp2d6 → CYP2D6)
              setInput({ ...value, gene: found.gene.gene, genotype: found.gene.genotype });
              setStep("result");
            } else {
              setInput(value);
              setStep("nodata");
            }
          }}
        />
      </main>
    </>
  );
}
