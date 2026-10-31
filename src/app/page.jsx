"use client";
import { useState } from "react";
import { InfoNotice } from "@/components/InfoNotice";
import { ResultView } from "@/components/ResultView";
import { ScheduleForm } from "@/components/ScheduleForm";
import { ScheduleView } from "@/components/ScheduleView";
import { lookupByGenotype } from "@/lib/genes";
export default function Home() {
  const [step, setStep] = useState("input");
  const [input, setInput] = useState(null);
  const result = input ? lookupByGenotype(input.gene, input.genotype) : null;
  const entry = result?.status === "found" ? result.gene : null;
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
          setStep("input");
        }}
      />
    );
  }
  return (
    <main className="flex flex-1 flex-col gap-8 px-5 py-6">
      <InfoNotice>교육용 시뮬레이터입니다. 실제 처방이 아닙니다</InfoNotice>

      <div className="flex flex-col gap-2">
        <h1 className="text-display">복약 시간표 만들기</h1>
        <p className="text-body-md text-ink-secondary">유전형과 생활 시간을 알려 주세요</p>
      </div>

      <ScheduleForm
        initial={input}
        onSubmit={(value) => {
          setInput(value);
          setStep("result");
        }}
      />
    </main>
  );
}
