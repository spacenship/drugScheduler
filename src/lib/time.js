/** 입력하기 전에 쓰는 기본 생활 시간 */
export const DEFAULT_LIFE_TIMES = {
  wakeTime: "07:00",
  sleepTime: "23:00",
  breakfast: "08:00",
  lunch: "13:00",
  dinner: "19:00",
};

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

/** 몇 분 → "30분" / "1시간" / "1시간 30분" */
export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}분`;
  return m === 0 ? `${h}시간` : `${h}시간 ${m}분`;
}
