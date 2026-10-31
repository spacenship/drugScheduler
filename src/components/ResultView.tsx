import { Pill, TriangleAlert } from "lucide-react";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import type { GeneEntry, ScheduleInput } from "@/types";

interface ResultViewProps {
  input: ScheduleInput;
  entry: GeneEntry | null;
  onBack: () => void;
  onNext: () => void;
}

function InfoRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-label text-ink-secondary shrink-0">{name}</span>
      <span className="text-title-sm text-right">{value}</span>
    </div>
  );
}

export function ResultView({ input, entry, onBack, onNext }: ResultViewProps) {
  return (
    <>
      <NavBar title="결과" onBack={onBack} />
      <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
        {entry ? (
          <>
            <div className="flex flex-col items-start gap-2">
              <span className="bg-green-strong text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5">
                {input.gene} {input.genotype}
              </span>
              <h2 className="text-display">{entry.drugName}</h2>
              <p className="text-body-md text-ink-secondary">{entry.ingredient}</p>
              <p className="text-body-lg">{entry.details}</p>
            </div>

            <section className="flex flex-col gap-3">
              <h2 className="text-title-md">복용 정보</h2>
              <div className="bg-surface-muted flex flex-col gap-4 rounded-md p-4">
                <div className="flex items-center gap-3">
                  <span className="bg-green-strong text-on-primary flex size-12 items-center justify-center rounded-md">
                    <Pill className="size-6" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="text-title-sm">추천 약</span>
                </div>
                <InfoRow name="복용 간격" value={entry.dosingInterval} />
                <div className="bg-border h-px" />
                <InfoRow name="복용 시점" value={entry.mealRelation} />
              </div>
            </section>

            <div className="bg-warning-soft text-body-lg flex items-start gap-3 rounded-md p-4">
              <TriangleAlert
                className="text-warning mt-1 size-6 shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              <p>
                <span className="text-title-sm text-warning mr-2">주의</span>
                {entry.sideEffects}
              </p>
            </div>

            <div className="bg-surface-muted flex flex-col gap-1 rounded-md p-4">
              <span className="text-label text-ink-secondary">근거</span>
              <span className="text-body-md">{entry.source}</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-start gap-3">
            <span className="bg-ink-secondary text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5">
              판단 자료 없음
            </span>
            <h2 className="text-display">추천할 약을 판단할 자료가 없습니다</h2>
            <div className="bg-surface-muted text-body-lg w-full rounded-lg p-5">
              입력한 유전자명과 유전형에 맞는 약 정보가 표에 없습니다.
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-col gap-4">
          <InfoNotice>실제 복용은 의료진과 상의하세요</InfoNotice>
          <button
            type="button"
            onClick={onNext}
            className="bg-primary text-on-primary text-button active:bg-primary-pressed h-14 w-full rounded-md"
          >
            시간표 보기
          </button>
        </div>
      </div>
    </>
  );
}
