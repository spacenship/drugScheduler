"use client";

import { useRouter } from "next/navigation";
import { ScheduleView } from "@/components/ScheduleView";
import { findGeneEntry } from "@/lib/genes";
import type { ScheduleInput } from "@/types";

/** /schedule 주소로 들어온 입력으로 시간표 화면을 보여 준다. 뒤로 가기·처음으로는 주소로 이동한다 */
export function ScheduleRoute({ input }: { input: ScheduleInput }) {
  const router = useRouter();
  const entry = findGeneEntry(input.gene, input.genotype);
  const resultHref = `/result?${new URLSearchParams({ gene: input.gene, genotype: input.genotype })}`;

  return (
    <ScheduleView
      input={input}
      entry={entry}
      onBack={() => router.push(resultHref)}
      onRestart={() => router.push("/")}
    />
  );
}
