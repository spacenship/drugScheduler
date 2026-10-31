import { buildSchedule } from "@/lib/schedule";
import { toMinutes } from "@/lib/time";

/** 평소 복약 시간표의 한 번 복용 */

/** 하루를 나누는 복용 시점 한 칸. time은 그 칸의 기준 생활 시각 */

/** 고른 약들의 복용 시각을 계산해, 가장 가까운 생활 시각 칸에 나누어 담는다 */
export function buildUsualSchedule(drugs, times) {
  const wake = toMinutes(times.wakeTime);
  let sleep = toMinutes(times.sleepTime);
  if (sleep <= wake) sleep += 1440; // 자정을 넘겨 자는 경우

  const anchors = [
    { key: "wake", label: "기상 후", time: times.wakeTime, at: wake },
    { key: "breakfast", label: "아침 식사", time: times.breakfast, at: toMinutes(times.breakfast) },
    { key: "lunch", label: "점심 식사", time: times.lunch, at: toMinutes(times.lunch) },
    { key: "dinner", label: "저녁 식사", time: times.dinner, at: toMinutes(times.dinner) },
    { key: "sleep", label: "취침 전", time: times.sleepTime, at: sleep },
  ];
  const slots = anchors.map(({ key, label, time }) => ({
    key,
    label,
    time,
    doses: [],
  }));
  const unschedulable = [];

  for (const drug of drugs) {
    const result = buildSchedule(drug, times);
    if (result.status === "unschedulable") {
      unschedulable.push({ drug, reason: result.reason });
      continue;
    }
    for (const dose of result.doses) {
      // 거리가 같으면 앞선 칸에 넣는다
      let nearest = 0;
      anchors.forEach(({ at }, i) => {
        if (Math.abs(at - dose.minutes) < Math.abs(anchors[nearest].at - dose.minutes)) nearest = i;
      });
      slots[nearest].doses.push({ drug, dose });
    }
  }

  for (const slot of slots) slot.doses.sort((a, b) => a.dose.minutes - b.dose.minutes);

  return { slots, unschedulable };
}
