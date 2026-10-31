import { Suspense } from "react";
import type { Metadata } from "next";
import { DEFAULT_LIFE_TIMES } from "@/components/LifeTimeFields";
import { ScheduleRoute } from "@/components/ScheduleRoute";
import type { LifeTimes, ScheduleInput } from "@/types";

export const metadata: Metadata = { title: "복약 시간표" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/** 주소의 시각이 "HH:mm" 형식이 아니면 기본값을 쓴다 */
function readTime(value: string | string[] | undefined, fallback: string): string {
  const time = first(value);
  return TIME_PATTERN.test(time) ? time : fallback;
}

/**
 * /schedule?gene=CYP2D6&genotype=*1/*1x2 처럼 유전자와 유전형을 받아 하루 시간표를 보여 준다.
 * wakeTime, sleepTime, breakfast, lunch, dinner를 "HH:mm"으로 덧붙이면 생활 시간도 바꿀 수 있다.
 */
async function Schedule({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const times = Object.fromEntries(
    (Object.keys(DEFAULT_LIFE_TIMES) as (keyof LifeTimes)[]).map((key) => [
      key,
      readTime(params[key], DEFAULT_LIFE_TIMES[key]),
    ]),
  ) as unknown as LifeTimes;

  const input: ScheduleInput = {
    gene: first(params.gene),
    genotype: first(params.genotype),
    ...times,
  };

  return <ScheduleRoute input={input} />;
}

export default function SchedulePage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense
      fallback={
        <p className="text-body-md text-ink-secondary px-5 py-6">시간표를 만드는 중입니다</p>
      }
    >
      <Schedule searchParams={searchParams} />
    </Suspense>
  );
}
