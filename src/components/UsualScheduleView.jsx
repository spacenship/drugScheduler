import Link from "next/link";
import { DayTimeline } from "@/components/DayTimeline";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { UnschedulableList } from "@/components/UnschedulableList";
import { buildTimeline, collectDoses } from "@/lib/timeline";

/**
 * @param {object} props
 * @param {import("@/types").DrugInfo[]} props.drugs 입력한 약
 * @param {import("@/types").MedicationLifeTimes} props.times
 * @param {string} props.backHref 입력 화면으로 돌아가 약이나 시간을 고친다
 */
export function UsualScheduleView({ drugs, times, backHref }) {
  const { doses, unschedulable } = collectDoses(drugs, times);

  return (
    <>
      <NavBar title="평소 복약 시간표" backHref={backHref} />
      <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <div className="flex flex-col gap-1">
          <p className="text-eyebrow text-ink-secondary tabular">
            기상 {times.wakeTime} · 취침 {times.sleepTime}
          </p>
          <h2 className="text-display">하루 복약 시간표</h2>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">하루 시간표</h2>
          <DayTimeline items={buildTimeline(times, doses)} />
        </section>

        <UnschedulableList items={unschedulable} />

        <div className="mt-auto flex flex-col gap-4">
          <InfoNotice>실제 복용 시간은 의료진 지시를 따릅니다</InfoNotice>
          <Link
            href="/"
            className="bg-primary text-on-primary text-button active:bg-primary-pressed flex h-14 w-full items-center justify-center rounded-md"
          >
            홈으로
          </Link>
          <Link
            href={backHref}
            className="text-primary text-button flex h-12 w-full items-center justify-center"
          >
            약 다시 입력하기
          </Link>
        </div>
      </div>
    </>
  );
}
