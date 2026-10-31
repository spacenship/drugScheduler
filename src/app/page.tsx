import { Info } from "lucide-react";

export default function Home() {
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
    </main>
  );
}
