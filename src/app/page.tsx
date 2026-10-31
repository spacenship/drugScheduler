"use client";

import { useState } from "react";
import { HomeView } from "@/components/HomeView";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { ResultView } from "@/components/ResultView";
import { ScheduleForm } from "@/components/ScheduleForm";
import { ScheduleView } from "@/components/ScheduleView";
import { UsualScheduleView } from "@/components/UsualScheduleView";
import { findGeneEntry } from "@/lib/genes";
import { DEFAULT_LIFE_TIMES } from "@/lib/time";
import type { LifeTimes, ScheduleInput } from "@/types";

/** home → (input → result → schedule) 유전자 맞춤 흐름 / home → usual 평소 복약 */
type Step = "home" | "usual" | "input" | "result" | "schedule";

export default function Home() {
  const [step, setStep] = useState<Step>("home");
  const [input, setInput] = useState<ScheduleInput | null>(null);
  const [usualDrugs, setUsualDrugs] = useState<string[]>([]);
  const [usualTimes, setUsualTimes] = useState<LifeTimes>(DEFAULT_LIFE_TIMES);
  const entry = input ? findGeneEntry(input.gene, input.genotype) : null;

  if (step === "home") {
    return <HomeView onOpenGene={() => setStep("input")} onOpenUsual={() => setStep("usual")} />;
  }

  if (step === "usual") {
    return (
      <UsualScheduleView
        selected={usualDrugs}
        onChange={setUsualDrugs}
        times={usualTimes}
        onTimesChange={setUsualTimes}
        onBack={() => setStep("home")}
      />
    );
  }

  if (input && step === "result") {
    return (
      <ResultView
        input={input}
        entry={entry}
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
    </>
  );
}
