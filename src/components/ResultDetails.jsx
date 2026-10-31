import { Pill, TriangleAlert } from "lucide-react";

function InfoRow({ name, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-label text-ink-secondary shrink-0">{name}</span>
      <span className="text-title-sm text-right">{value}</span>
    </div>
  );
}

/** 못 찾은 이유에 맞는 제목. 입력이 비어 있으면 이유를 말하지 않고 일반 문구를 쓴다 */
function noDataTitle({ reason, query }) {
  if (reason === "unknown_gene" && query.gene !== "") {
    return `${query.gene} 유전자에 대한 정보가 부족합니다`;
  }
  if (reason === "unknown_genotype") {
    return `${query.gene} ${query.genotype} 유전형에 대한 정보가 부족합니다`;
  }
  return "추천할 약을 판단할 자료가 없습니다";
}

function NoData({ result }) {
  const hasSuggestions = result.suggestions.length > 0;
  return (
    <>
      <div className="flex flex-col items-start gap-3">
        <span className="bg-ink-secondary text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5">
          {result.message}
        </span>
        <h2 className="text-display">{noDataTitle(result)}</h2>
        <div className="bg-surface-muted text-body-lg w-full rounded-lg p-5">{result.detail}</div>
      </div>

      {hasSuggestions && (
        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">
            {result.reason === "unknown_gene" ? "정보가 있는 유전자" : "정보가 있는 유전형"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {result.suggestions.map((name) => (
              <span
                key={name}
                className="bg-surface-muted text-body-lg flex h-12 items-center rounded-md px-4"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="text-body-md text-ink-secondary">
            글자를 다시 확인해 보세요. 대소문자와 띄어쓰기는 달라도 괜찮습니다.
          </p>
        </section>
      )}
    </>
  );
}

/** 유전자·유전형 조회 결과: 추천 약, 복용 정보, 주의, 근거. 자료가 없으면 회색 카드 */
export function ResultDetails({ result }) {
  if (result.status === "no_data") {
    return <NoData result={result} />;
  }

  const { gene, drug } = result;

  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <span className="bg-green-strong text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5">
          {gene.gene} {gene.genotype}
        </span>
        <h2 className="text-display">{drug.drugName}</h2>
        <p className="text-body-md text-ink-secondary">성분: {drug.ingredient}</p>
        <p className="text-body-lg">{gene.details}</p>
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
          <InfoRow name="복용 간격" value={drug.dosingInterval} />
          <div className="bg-border h-px" />
          <InfoRow name="복용 시점" value={drug.mealRelation} />
        </div>
      </section>

      <div className="bg-warning-soft text-body-lg flex items-start gap-3 rounded-md p-4">
        <TriangleAlert className="text-warning mt-1 size-6 shrink-0" strokeWidth={2} aria-hidden />
        <p>
          <span className="text-title-sm text-warning mr-2">주의</span>
          {drug.sideEffects}
        </p>
      </div>

      <div className="bg-surface-muted flex flex-col gap-1 rounded-md p-4">
        <span className="text-label text-ink-secondary">근거</span>
        <span className="text-body-md">{gene.source}</span>
      </div>
    </>
  );
}
