"use client";
import { InfoNotice } from "@/components/InfoNotice";
import { MedicationForm } from "@/components/MedicationForm";
export default function MedicationsPage() {
  return (
    <main className="flex flex-1 flex-col gap-8 px-5 py-6">
      <InfoNotice>교육용 시뮬레이터입니다. 실제 처방이 아닙니다</InfoNotice>

      <div className="flex flex-col gap-2">
        <h1 className="text-display">평소 복용하는 약</h1>
        <p className="text-body-md text-ink-secondary">약 정보와 생활 시간을 알려 주세요</p>
      </div>

      {/* TODO: 시간표 계산 화면을 만들면 입력값을 받아 넘긴다 */}
      <MedicationForm onSubmit={() => {}} />
    </main>
  );
}
