import { TIMES_PER_DAY_OPTIONS } from "@/lib/medications";
import { DEFAULT_LIFE_TIMES } from "@/lib/time";

/** 페이지 사이에 넘기는 입력값. URL 쿼리 이름 = ScheduleInput 키 */
const TIME_KEYS = ["wakeTime", "sleepTime", "breakfast", "lunch", "dinner"];

/** "HH:mm" (00:00 ~ 23:59) */
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function first(value) {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/** 같은 이름으로 여러 번 온 값을 모두 모은다 */
function all(value) {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

/** 생활 시간 → [이름, 값] 쌍 */
function timeEntries(times) {
  return TIME_KEYS.map((key) => [key, times[key]]);
}

/** 생활 시간은 빠졌거나 "HH:mm" 형식이 아니면 기본값을 쓴다 */
export function parseLifeTimes(params) {
  const times = { ...DEFAULT_LIFE_TIMES };
  for (const key of TIME_KEYS) {
    const value = first(params[key]);
    if (TIME_PATTERN.test(value)) times[key] = value;
  }
  return times;
}

/** 입력값 → "gene=CYP2D6&genotype=...&wakeTime=07:00..." */
export function toQuery(input) {
  return new URLSearchParams([
    ["gene", input.gene],
    ["genotype", input.genotype],
    ...timeEntries(input),
  ]).toString();
}

/**
 * 페이지의 searchParams → 입력값. 유전자나 유전형이 비어 있으면 null.
 * 생활 시간은 빠졌거나 "HH:mm" 형식이 아니면 기본값을 쓴다.
 */
export function parseQuery(params) {
  const gene = first(params.gene).trim();
  const genotype = first(params.genotype).trim();
  if (gene === "" || genotype === "") return null;

  return { gene, genotype, ...parseLifeTimes(params) };
}

const MEALS = ["after", "empty", "any"];

/** 평소 복약 입력값 → "name=아스피린&times=2&meal=after&name=…&wakeTime=07:00…". 약마다 name·times·meal이 한 벌 */
export function toMedicationQuery(input) {
  const params = new URLSearchParams();
  for (const { name, timesPerDay, meal } of input.medications) {
    params.append("name", name);
    params.append("times", String(timesPerDay));
    params.append("meal", meal);
  }
  for (const [key, value] of timeEntries(input)) params.append(key, value);
  return params.toString();
}

/** 주소 → 평소 복약 입력값. 약이 없거나 한 벌이 어긋나거나 값이 틀리면 null */
export function parseMedicationQuery(params) {
  const names = all(params.name);
  const counts = all(params.times);
  const meals = all(params.meal);
  if (names.length === 0 || counts.length !== names.length || meals.length !== names.length) {
    return null;
  }

  const medications = [];
  for (const [i, rawName] of names.entries()) {
    const name = rawName.trim();
    const timesPerDay = Number(counts[i]);
    const meal = meals[i];
    if (name === "" || !TIMES_PER_DAY_OPTIONS.includes(timesPerDay) || !MEALS.includes(meal)) {
      return null;
    }
    medications.push({ name, timesPerDay, meal });
  }
  return { medications, ...parseLifeTimes(params) };
}
