import { buildSchedule } from "@/lib/schedule";
import { formatTime, toMinutes } from "@/lib/time";

/**
 * 같은 시각이면 놓는 순서: 기상 → 식사와 상관없는 약 → 공복 약 → 식사 → 식후 약 → 취침.
 * 공복 약은 식사 바로 앞, 식후 약은 식사 바로 뒤에 붙어 한 묶음이 된다
 */
function order(item) {
  if (item.kind === "wake") return 0;
  if (item.kind === "sleep") return 5;
  if (item.kind === "meal") return 3;
  if (!item.meal) return 1;
  return item.meal.when === "before" ? 2 : 4;
}

/** 빈 시간이 1시간 늘 때마다 줄 사이를 이만큼(px) 더 띄운다. 너무 길어지지 않게 최대값을 둔다 */
const GAP_PX_PER_HOUR = 6;
const GAP_MIN_PX = 28;
const GAP_MAX_PX = 56;

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
      ...(dose.meal ? { meal: dose.meal } : {}),
    })),
  ];

  return items
    .sort((a, b) => a.minutes - b.minutes || order(a) - order(b))
    .map((item) => ({ ...item, time: formatTime(item.minutes) }));
}

/**
 * 식사와, 그 식사에 맞춘 공복·식후 약을 한 묶음으로 모은다. 바로 붙어 있을 때만 묶는다
 * @param {import("@/types").TimelineItem[]} items
 * @returns {{ grouped: boolean, items: import("@/types").TimelineItem[] }[]}
 */
function groupByMeal(items) {
  const blocks = [];
  for (const item of items) {
    const last = blocks.at(-1);
    if (item.kind === "meal") {
      const group = { grouped: false, mealKey: item.key, items: [item] };
      // 바로 앞의 공복 약(이 식사 전에 먹는 약)을 끌어온다
      while (
        blocks.length > 0 &&
        !blocks.at(-1).grouped &&
        blocks.at(-1).items[0].meal?.key === item.key &&
        blocks.at(-1).items[0].meal.when === "before"
      ) {
        group.items.unshift(blocks.pop().items[0]);
      }
      blocks.push(group);
    } else if (item.meal?.when === "after" && last?.mealKey === item.meal.key) {
      last.items.push(item);
    } else {
      blocks.push({ grouped: false, items: [item] });
    }
  }
  for (const block of blocks) block.grouped = block.items.length > 1;
  return blocks;
}

/**
 * 화면에 그릴 줄 목록. 일정 사이에는 빈 시간을 알려 주는 gap 줄을 넣고(시간에 비례해 높이가 늘어난다),
 * 앞 줄과 시각이 같으면 시각을 다시 쓰지 않는다(약 시각은 그 시각에 한 번은 쓴다). group은 식사 묶음 안에서의 위치다
 * @param {import("@/types").TimelineItem[]} items
 * @returns {import("@/types").TimelineRow[]}
 */
export function layoutTimeline(items) {
  const rows = [];
  let prev = null;
  let doseTimeShown = false;
  for (const block of groupByMeal(items)) {
    block.items.forEach((item, i) => {
      const inGroup = block.grouped;
      if (prev !== null && item.minutes > prev) {
        const gap = item.minutes - prev;
        const height = Math.min(
          GAP_MAX_PX,
          Math.max(GAP_MIN_PX, Math.round(GAP_MIN_PX + (gap / 60) * GAP_PX_PER_HOUR)),
        );
        rows.push({
          type: "gap",
          key: `gap-${item.key}`,
          minutes: gap,
          height,
          group: inGroup && i > 0 ? "middle" : null,
        });
      }
      const last = i === block.items.length - 1;
      rows.push({
        type: "item",
        key: item.key,
        item,
        // 같은 시각이어도 약은 앞 줄이 생활 시간(회색 작은 시각)뿐이면 굵은 시각을 한 번 쓴다
        showTime: item.minutes !== prev || (item.kind === "dose" && !doseTimeShown),
        group: !inGroup ? null : i === 0 ? "first" : last ? "last" : "middle",
      });
      if (item.minutes !== prev) doseTimeShown = false;
      if (item.kind === "dose") doseTimeShown = true;
      prev = item.minutes;
    });
  }
  return rows;
}
