/** 입력하기 전에 쓰는 기본 생활 시간 */
export const DEFAULT_LIFE_TIMES = {
  wakeTime: "07:00",
  sleepTime: "23:00",
  breakfast: "08:00",
  lunch: "13:00",
  dinner: "19:00",
};

/** 식사 시각의 키와 우리말 이름. 평소 복약 입력에서는 끼니를 거를 수 있다 */
export const MEALS = [
  { key: "breakfast", label: "아침" },
  { key: "lunch", label: "점심" },
  { key: "dinner", label: "저녁" },
];

/** "HH:mm" → 하루 0시부터의 분 */
export function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** 분 → "HH:mm". 1440 이상이면 다음 날 시각으로 돌린다 */
export function formatTime(minutes) {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}
