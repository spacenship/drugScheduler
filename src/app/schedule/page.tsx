import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ScheduleView } from "@/components/ScheduleView";
import { findGeneEntry } from "@/lib/genes";
import { parseQuery, toQuery } from "@/lib/query";

export const metadata: Metadata = { title: "복약 시간표" };

/** 화면 3: 복용 시각과 식사 시간을 하루 시간표로 보여 준다. 입력값은 URL 쿼리로 받는다 */
export default function SchedulePage(props: PageProps<"/schedule">) {
  return (
    <Suspense>
      <Schedule searchParams={props.searchParams} />
    </Suspense>
  );
}

async function Schedule({ searchParams }: Pick<PageProps<"/schedule">, "searchParams">) {
  const input = parseQuery(await searchParams);
  if (!input) redirect("/");

  return (
    <ScheduleView
      input={input}
      entry={findGeneEntry(input.gene, input.genotype)}
      backHref={`/result?${toQuery(input)}`}
      restartHref="/"
    />
  );
}
