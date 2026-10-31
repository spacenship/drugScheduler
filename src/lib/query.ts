import { DEFAULT_LIFE_TIMES } from "@/lib/time";
import type { LifeTimes, ScheduleInput } from "@/types";

/** 페이지 사이에 넘기는 입력값. URL 쿼리 이름 = ScheduleInput 키 */
const TIME_KEYS = [
  "wakeTime",
  "sleepTime",
  "breakfast",
  "lunch",
  "dinner",
] as const satisfies readonly (keyof LifeTimes)[];

/** "HH:mm" (00:00 ~ 23:59) */
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/** 입력값 → "gene=CYP2D6&genotype=...&wakeTime=07:00..." */
export function toQuery(input: ScheduleInput): string {
  return new URLSearchParams([
    ["gene", input.gene],
    ["genotype", input.genotype],
    ...TIME_KEYS.map((key): [string, string] => [key, input[key]]),
  ]).toString();
}

/**
 * 페이지의 searchParams → 입력값. 유전자나 유전형이 비어 있으면 null.
 * 생활 시간은 빠졌거나 "HH:mm" 형식이 아니면 기본값을 쓴다.
 */
export function parseQuery(params: SearchParams): ScheduleInput | null {
  const gene = first(params.gene).trim();
  const genotype = first(params.genotype).trim();
  if (gene === "" || genotype === "") return null;

  const times: LifeTimes = { ...DEFAULT_LIFE_TIMES };
  for (const key of TIME_KEYS) {
    const value = first(params[key]);
    if (TIME_PATTERN.test(value)) times[key] = value;
  }
  return { gene, genotype, ...times };
}
