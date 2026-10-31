import { findGeneEntry } from "@/lib/genes";
import { formatTime, toMinutes } from "@/lib/time";
import type {
  DoseSlot,
  LifeTimes,
  Medication,
  Schedule,
  ScheduledDrug,
  ScheduleResult,
} from "@/types";

/** 공복은 식사 1시간 전으로 본다 */
const EMPTY_STOMACH_MINUTES = 60;
/** 평소 복용약의 '식후'는 식사 30분 뒤로 본다(표의 '식후 30분'과 같은 기준) */
const USUAL_MINUTES_AFTER_MEAL = 30;
/** 식사 시각에 맞추는 약이 하루에 먹을 수 있는 최대 횟수(세 끼) */
const MAX_MEAL_DOSES = 3;
/** 식사와 상관없는 약을 하루에 나눌 때 복용 사이 최대 간격 */
const MAX_GAP_MINUTES = 12 * 60;

function slot(minutes: number, note: string): DoseSlot {
  return { minutes, time: formatTime(minutes), note };
}

/** 몇 분 → "30분" / "1시간" / "1시간 30분" */
function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}분`;
  return m === 0 ? `${h}시간` : `${h}시간 ${m}분`;
}

/** 입력한 생활 시간과 약의 복용 규칙(schedule)으로 하루 시간표를 계산한다 */
export function buildSchedule(drug: { schedule: Schedule }, input: LifeTimes): ScheduleResult {
  const { schedule } = drug;

  if (schedule.type === "every_n_days") {
    return {
      status: "unschedulable",
      reason: `${schedule.everyDays}일마다 한 번 맞는 약이라 하루 시간표에 시각을 넣을 수 없습니다.`,
    };
  }

  const wake = toMinutes(input.wakeTime);
  let sleep = toMinutes(input.sleepTime);
  if (sleep <= wake) sleep += 1440; // 자정을 넘겨 자는 경우

  if (schedule.type === "interval") {
    const step = schedule.everyHours * 60;
    const doses: DoseSlot[] = [];
    for (let t = wake; t <= sleep; t += step) {
      doses.push(
        slot(t, doses.length === 0 ? "기상 후 첫 복용" : `${schedule.everyHours}시간 간격`),
      );
    }
    return { status: "ok", doses };
  }

  const n = schedule.timesPerDay;

  if (schedule.meal === "any") {
    // 첫 복용은 기상 시각, 이후는 깨어 있는 시간 안에서 고르게 나눈다
    const gap = n > 1 ? Math.min(MAX_GAP_MINUTES, (sleep - wake) / (n - 1)) : 0;
    const doses = Array.from({ length: n }, (_, i) =>
      slot(Math.round(wake + gap * i), i === 0 ? "기상 후 첫 복용" : "식사와 상관없음"),
    );
    return { status: "ok", doses };
  }

  if (n > MAX_MEAL_DOSES) {
    return {
      status: "unschedulable",
      reason: `하루 ${n}번은 세 끼 식사에 맞출 수 없어 시각을 정할 수 없습니다.`,
    };
  }

  // 1회 → 아침, 2회 → 아침·저녁, 3회 → 아침·점심·저녁
  const meals = [
    { label: "아침", at: toMinutes(input.breakfast) },
    { label: "점심", at: toMinutes(input.lunch) },
    { label: "저녁", at: toMinutes(input.dinner) },
  ];
  const picked = n === 1 ? [meals[0]] : n === 2 ? [meals[0], meals[2]] : meals;

  const doses = picked.map(({ label, at }) => {
    if (schedule.meal === "after") {
      const after = schedule.minutesAfterMeal ?? 0;
      return slot(
        at + after,
        after === 0 ? `${label} 식사 직후` : `${label} 식사 ${formatDuration(after)} 뒤`,
      );
    }
    const t = at - EMPTY_STOMACH_MINUTES;
    // 기상 전이면 기상 시각으로 당긴다
    return t < wake
      ? slot(wake, `기상 직후 (${label} 식사 전)`)
      : slot(t, `${label} 식사 ${formatDuration(EMPTY_STOMACH_MINUTES)} 전`);
  });

  return { status: "ok", doses };
}

/*
 * 시간표 계산 함수(buildSchedule)는 하나이고, 넣는 값(schedule)만 다르다.
 * - 유전자형별: gene_data.json에서 유전형으로 찾은 약의 schedule
 * - 평소 복용약: 직접 입력한 하루 횟수·식사 관계로 만든 schedule
 */

/** 유전자형별 시간표: 표에서 유전자·유전형으로 약을 찾아 그 복용 규칙을 넣는다. 못 찾으면 null */
export function scheduleByGenotype(
  gene: string,
  genotype: string,
  times: LifeTimes,
): ScheduleResult | null {
  const entry = findGeneEntry(gene, genotype);
  return entry ? buildSchedule(entry, times) : null;
}

/** 평소 복용약 한 가지 → 시간표에 넣을 약. 입력한 하루 횟수·식사 관계로 복용 규칙을 만든다 */
export function medicationToDrug({ name, timesPerDay, meal }: Medication): ScheduledDrug {
  const schedule: Schedule =
    meal === "after"
      ? { type: "daily", timesPerDay, meal, minutesAfterMeal: USUAL_MINUTES_AFTER_MEAL }
      : { type: "daily", timesPerDay, meal };
  return { drugName: name, schedule };
}
