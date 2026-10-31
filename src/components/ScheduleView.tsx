import Link from "next/link";
import { Pill } from "lucide-react";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { buildSchedule } from "@/lib/schedule";
import type { GeneEntry, ScheduleInput } from "@/types";

interface ScheduleViewProps {
  input: ScheduleInput;
  entry: GeneEntry | null;
  backHref: string;
  restartHref: string;
}

export function ScheduleView({ input, entry, backHref, restartHref }: ScheduleViewProps) {
  const result = entry ? buildSchedule(entry, input) : null;

  const lifeTimes = [
    { label: "기상", time: input.wakeTime },
    { label: "아침", time: input.breakfast },
    { label: "점심", time: input.lunch },
    { label: "저녁", time: input.dinner },
    { label: "취침", time: input.sleepTime },
  ];

  return (
    <>
      <NavBar title="복약 시간표" backHref={backHref} />
      <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <div className="flex flex-col gap-1">
          <p className="text-eyebrow text-ink-secondary tabular">
            기상 {input.wakeTime} · 취침 {input.sleepTime}
          </p>
          <h2 className="text-display">하루 복약 시간표</h2>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">생활 시간</h2>
          <div className="flex flex-wrap gap-2">
            {lifeTimes.map(({ label, time }) => (
              <span
                key={label}
                className="bg-surface-muted text-body-lg tabular flex h-12 items-center rounded-md px-4"
              >
                {label} {time}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">복용 시각</h2>
          {entry && result?.status === "ok" ? (
            result.doses.map((dose) => (
              <div
                key={dose.minutes}
                className="bg-green-soft flex items-end justify-between gap-3 rounded-lg p-5"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-number-xl tabular">{dose.time}</span>
                  <span className="text-title-sm">{entry.drugName}</span>
                  <span className="text-body-md text-ink-secondary">{dose.note}</span>
                </div>
                <span className="bg-green-strong text-on-primary flex size-12 shrink-0 items-center justify-center rounded-md">
                  <Pill className="size-6" strokeWidth={2} aria-hidden />
                </span>
              </div>
            ))
          ) : (
            <div className="bg-surface-muted flex flex-col items-start gap-2 rounded-lg p-5">
              <span className="bg-ink-secondary text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5">
                시간을 정할 수 없음
              </span>
              {entry && <span className="text-title-sm">{entry.drugName}</span>}
              <span className="text-body-lg">
                {result?.status === "unschedulable"
                  ? result.reason
                  : "입력한 유전형에 맞는 약 정보가 없습니다."}
              </span>
            </div>
          )}
        </section>

        <div className="mt-auto flex flex-col gap-4">
          <InfoNotice>실제 복용 시간은 의료진 지시를 따릅니다</InfoNotice>
          <Link
            href={restartHref}
            className="bg-primary text-on-primary text-button active:bg-primary-pressed flex h-14 w-full items-center justify-center rounded-md"
          >
            처음으로
          </Link>
        </div>
      </div>
    </>
  );
}
