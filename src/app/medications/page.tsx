"use client";

import { useState } from "react";
import { InfoNotice } from "@/components/InfoNotice";
import { MedicationForm } from "@/components/MedicationForm";
import { MedicationScheduleView } from "@/components/MedicationScheduleView";
import type { MedicationScheduleInput } from "@/types";

export default function MedicationsPage() {
  const [input, setInput] = useState<MedicationScheduleInput | null>(null);

  return (
    <>
      {input && <MedicationScheduleView input={input} onBack={() => setInput(null)} />}

      {/* 시간표를 보는 동안에도 폼을 남겨 두어, 돌아오면 입력한 약이 그대로 있다 */}
      <main className="flex flex-1 flex-col gap-8 px-5 py-6" hidden={input !== null}>
        <InfoNotice>교육용 시뮬레이터입니다. 실제 처방이 아닙니다</InfoNotice>

        <div className="flex flex-col gap-2">
          <h1 className="text-display">평소 복용하는 약</h1>
          <p className="text-body-md text-ink-secondary">약 정보와 생활 시간을 알려 주세요</p>
        </div>

        <MedicationForm onSubmit={setInput} />
      </main>
    </>
  );
}
