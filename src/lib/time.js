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
