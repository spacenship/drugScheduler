import { Suspense } from "react";
import { redirect } from "next/navigation";
import { ResultView } from "@/components/ResultView";
import { lookupByGenotype } from "@/lib/genes";
import { parseQuery, toQuery } from "@/lib/query";

export const metadata = { title: "결과" };

/**
 * 화면 2: 유전형에 맞는 추천 약 결과 카드. 입력값은 URL 쿼리로 받는다.
 * /result?gene=CYP2D6&genotype=*1/*1x2 처럼 유전자와 유전형만 있어도 열린다.
 * 표에 없는 유전자·유전형이면 결과 카드 대신 시간표 화면(/schedule)으로 보내 시간표를 만들 수 없다고 알린다.
 * 그 화면에서 평소 복약 시간표(/usual)로 넘어갈 수 있다.
 */
export default function ResultPage(props) {
  return (
    <Suspense
      fallback={<p className="text-body-md text-ink-secondary px-5 py-6">결과를 찾는 중입니다</p>}
    >
      <Result searchParams={props.searchParams} />
    </Suspense>
  );
}

async function Result({ searchParams }) {
  const input = parseQuery(await searchParams);
  if (!input) redirect("/gene");

  const result = lookupByGenotype(input.gene, input.genotype);
  if (result.status === "no_data") {
    // 표에 없는 유전자·유전형이면 시간표를 만들 수 없다는 화면으로 보낸다. 입력했던 유전자와 생활 시간을 함께 넘긴다
    redirect(`/schedule?${toQuery(input)}`);
  }

  // 표에 적힌 원래 글자로 바꿔 넘긴다(예: cyp2d6 → CYP2D6)
  const query = toQuery({ ...input, gene: result.gene.gene, genotype: result.gene.genotype });
  return <ResultView result={result} backHref={`/gene?${query}`} nextHref={`/schedule?${query}`} />;
}
