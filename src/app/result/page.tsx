import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ResultView } from "@/components/ResultView";
import { findGeneEntry } from "@/lib/genes";
import { parseQuery, toQuery } from "@/lib/query";

export const metadata: Metadata = { title: "결과" };

/** 화면 2: 유전형에 맞는 추천 약 결과 카드. 입력값은 URL 쿼리로 받는다 */
export default function ResultPage(props: PageProps<"/result">) {
  return (
    <Suspense>
      <Result searchParams={props.searchParams} />
    </Suspense>
  );
}

async function Result({ searchParams }: Pick<PageProps<"/result">, "searchParams">) {
  const input = parseQuery(await searchParams);
  if (!input) redirect("/");

  const query = toQuery(input);
  return (
    <ResultView
      input={input}
      entry={findGeneEntry(input.gene, input.genotype)}
      backHref={`/?${query}`}
      nextHref={`/schedule?${query}`}
    />
  );
}
