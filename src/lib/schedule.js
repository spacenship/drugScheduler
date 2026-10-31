import { formatTime, MEALS, toMinutes } from "@/lib/time";

/** 공복은 식사 1시간 전으로 본다 */
const EMPTY_STOMACH_MINUTES = 60;
/** 식사 시각에 맞추는 약이 하루에 먹을 수 있는 최대 횟수(세 끼) */
const MAX_MEAL_DOSES = 3;
/** 식사와 상관없는 약을 하루에 나눌 때 복용 사이 최대 간격 */
const MAX_GAP_MINUTES = 12 * 60;

function slot(minutes, note) {
  return { minutes, time: formatTime(minutes), note };
}

/** 몇 분 → "30분" / "1시간" / "1시간 30분" */
function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}분`;
  return m === 0 ? `${h}시간` : `${h}시간 ${m}분`;
}

/** 입력한 생활 시간과 약의 복용 규칙(schedule)으로 하루 시간표를 계산한다 */
export function buildSchedule(drug, input) {
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
    const doses = [];
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
  // 거른 끼니는 시각이 null이다
  const meals = MEALS.map(({ key, label }) => ({
    label,
    at: input[key] == null ? null : toMinutes(input[key]),
  }));
  const picked = n === 1 ? [meals[0]] : n === 2 ? [meals[0], meals[2]] : meals;

  const skipped = picked.filter(({ at }) => at === null);
  if (skipped.length > 0) {
    const names = skipped.map(({ label }) => label).join(", ");
    return {
      status: "unschedulable",
      reason: `${names}을 안 드셔서 식사에 맞춘 복용 시각을 정할 수 없습니다.`,
    };
  }

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
