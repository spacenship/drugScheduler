import { Suspense } from "react";
import { redirect } from "next/navigation";
import { ScheduleView } from "@/components/ScheduleView";
import { lookupByGenotype } from "@/lib/genes";
import { parseQuery, toQuery } from "@/lib/query";

export const metadata = { title: "복약 시간표" };

/**
 * 화면 3: 복용 시각과 식사 시간을 하루 시간표로 보여 준다. 입력값은 URL 쿼리로 받는다.
 * wakeTime, sleepTime, breakfast, lunch, dinner를 "HH:mm"으로 덧붙이면 생활 시간을 바꿀 수 있고,
 * 빠졌거나 형식이 틀리면 기본값을 쓴다.
 * 표에 없는 유전자·유전형이면 시간표를 만들 수 없다고 알린다.
 */
export default function SchedulePage(props) {
  return (
    <Suspense
      fallback={
        <p className="text-body-md text-ink-secondary px-5 py-6">시간표를 만드는 중입니다</p>
      }
    >
      <Schedule searchParams={props.searchParams} />
    </Suspense>
  );
}

async function Schedule({ searchParams }) {
  const input = parseQuery(await searchParams);
  if (!input) redirect("/gene");

  const lookup = lookupByGenotype(input.gene, input.genotype);
  const query = toQuery(input);
  return (
    <ScheduleView
      input={input}
      lookup={lookup}
      backHref={lookup.status === "found" ? `/result?${query}` : `/gene?${query}`}
      restartHref="/"
      retryHref={`/gene?${query}`}
      usualHref={`/usual?${query}`}
    />
  );
}
