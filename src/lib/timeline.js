import { buildSchedule } from "@/lib/schedule";
import { formatTime, toMinutes } from "@/lib/time";

/** 같은 시각이면 기상 → 식사 → 복용 → 취침 순서로 놓는다 */
const KIND_ORDER = { wake: 0, meal: 1, dose: 2, sleep: 3 };

/**
 * 약마다 복용 시각을 계산한다. 하루 시간표에 넣을 수 없는 약은 이유와 함께 따로 모은다
 * @param {import("@/types").DrugInfo[]} drugs
 * @param {import("@/types").LifeTimes} times
 * @returns {{ doses: import("@/types").TimelineDose[], unschedulable: { drug: import("@/types").DrugInfo, reason: string }[] }}
 */
export function collectDoses(drugs, times) {
  const doses = [];
  const unschedulable = [];
  for (const drug of drugs) {
    const result = buildSchedule(drug, times);
    if (result.status === "unschedulable") unschedulable.push({ drug, reason: result.reason });
    else for (const dose of result.doses) doses.push({ drug, dose });
  }
  return { doses, unschedulable };
}

/**
 * 기상·식사·복용·취침을 한 줄의 시간표로 합쳐 시각 순서로 늘어놓는다
 * @param {import("@/types").LifeTimes} times
 * @param {import("@/types").TimelineDose[]} doses
 * @returns {import("@/types").TimelineItem[]}
 */
export function buildTimeline(times, doses) {
  const wake = toMinutes(times.wakeTime);
  let sleep = toMinutes(times.sleepTime);
  if (sleep <= wake) sleep += 1440; // 자정을 넘겨 자는 경우. 복용 시각도 같은 기준으로 계산된다

  const life = [
    { kind: "wake", key: "wake", minutes: wake, title: "기상" },
    { kind: "meal", key: "breakfast", minutes: toMinutes(times.breakfast), title: "아침 식사" },
    { kind: "meal", key: "lunch", minutes: toMinutes(times.lunch), title: "점심 식사" },
    { kind: "meal", key: "dinner", minutes: toMinutes(times.dinner), title: "저녁 식사" },
    { kind: "sleep", key: "sleep", minutes: sleep, title: "취침" },
  ];
  const items = [
    ...life,
    ...doses.map(({ drug, dose }) => ({
      kind: "dose",
      key: `${drug.drugName}-${dose.minutes}`,
      minutes: dose.minutes,
      title: drug.drugName,
      note: dose.note,
    })),
  ];

  return items
    .sort((a, b) => a.minutes - b.minutes || KIND_ORDER[a.kind] - KIND_ORDER[b.kind])
    .map((item) => ({ ...item, time: formatTime(item.minutes) }));
}
