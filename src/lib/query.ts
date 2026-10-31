import type { ScheduleInput } from "@/types";

/** 페이지 사이에 넘기는 입력값. URL 쿼리 이름 = ScheduleInput 키 */
const KEYS = [
  "gene",
  "genotype",
  "wakeTime",
  "sleepTime",
  "breakfast",
  "lunch",
  "dinner",
] as const satisfies readonly (keyof ScheduleInput)[];

const TIME_KEYS = ["wakeTime", "sleepTime", "breakfast", "lunch", "dinner"] as const;

/** "HH:mm" (00:00 ~ 23:59) */
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

type SearchParams = Record<string, string | string[] | undefined>;

/** 입력값 → "gene=CYP2D6&genotype=..." */
export function toQuery(input: ScheduleInput): string {
  return new URLSearchParams(KEYS.map((key) => [key, input[key]])).toString();
}

/** 페이지의 searchParams → 입력값. 빠졌거나 시각 형식이 틀리면 null */
export function parseQuery(params: SearchParams): ScheduleInput | null {
  const values: Partial<ScheduleInput> = {};
  for (const key of KEYS) {
    const value = params[key];
    if (typeof value !== "string" || value === "") return null;
    values[key] = value;
  }
  const input = values as ScheduleInput;
  return TIME_KEYS.every((key) => TIME_PATTERN.test(input[key])) ? input : null;
}
