import { Info, Pill, TriangleAlert } from "lucide-react";
import type { LookupResult } from "@/types";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 py-3">
      <span className="text-label text-ink-secondary">{label}</span>
      <span className="text-title-sm">{value}</span>
    </div>
  );
}

/** 유전자·유전형 조회 결과: 유전자 정보, 추천 약, 약 정보를 보여 준다. */
export function ResultCard({ result }: { result: LookupResult }) {
  if (result.status === "no_data") {
    return (
      <section className="bg-surface-muted flex flex-col gap-3 rounded-lg p-5">
        <span className="bg-ink-secondary text-badge text-on-primary w-fit rounded-sm px-2.5 py-2">
          {result.message}
        </span>
        <h1 className="text-display">추천할 약을 판단할 자료가 없습니다</h1>
        <p className="text-body-lg">{result.detail}</p>
      </section>
    );
  }

  const { gene, drug } = result;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <span className="bg-green-strong text-badge text-on-primary w-fit rounded-sm px-2.5 py-2">
          {gene.gene} {gene.genotype}
        </span>
        <p className="text-eyebrow text-ink-secondary">추천 약</p>
        <h1 className="text-display">{drug.drugName}</h1>
        <p className="text-body-md text-ink-secondary">성분: {drug.ingredient}</p>
        <p className="text-body-lg">{gene.details}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-title-md">복용 정보</h2>
        <div className="bg-green-soft flex flex-col rounded-lg p-5">
          <div className="flex items-center gap-3 pb-2">
            <div className="bg-green-strong text-on-primary flex size-12 shrink-0 items-center justify-center rounded-md">
              <Pill strokeWidth={2} aria-hidden />
            </div>
            <span className="text-title-sm">{drug.drugName}</span>
          </div>
          <div className="divide-border divide-y">
            <InfoRow label="복용 간격" value={drug.dosingInterval} />
            <InfoRow label="식사 관계" value={drug.mealRelation} />
          </div>
        </div>
      </section>

      <div className="bg-warning-soft flex gap-3 rounded-md p-4">
        <TriangleAlert className="text-warning size-6 shrink-0" strokeWidth={2} aria-hidden />
        <p className="text-body-lg">
          <span className="text-title-sm text-warning">주의</span> {drug.sideEffects}
        </p>
      </div>

      <div className="bg-surface-muted rounded-md p-4">
        <p className="text-label text-ink-secondary">근거</p>
        <p className="text-body-md">{gene.source}</p>
      </div>

      <div className="bg-surface-muted text-body-md flex items-center gap-3 rounded-md p-4">
        <Info className="text-primary size-6 shrink-0" strokeWidth={2} aria-hidden />
        <p>실제 복용은 의료진과 상의하세요</p>
      </div>
    </div>
  );
}
