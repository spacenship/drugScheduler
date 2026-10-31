import Link from "next/link";
import { DayTimeline } from "@/components/DayTimeline";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { UnschedulableList } from "@/components/UnschedulableList";
import { listGenes, listGenotypes } from "@/lib/genes";
import { buildTimeline, collectDoses } from "@/lib/timeline";

const PRIMARY_LINK =
  "bg-primary text-on-primary text-button active:bg-primary-pressed flex h-14 w-full items-center justify-center rounded-md";
const TEXT_LINK = "text-primary text-button flex h-12 w-full items-center justify-center";

/**
 * 화면 3 복약 시간표. 표에서 찾은 약이 있으면 기상·식사·복용·취침을 한 줄로 보여 주고,
 * 표에 없는 유전자·유전형이면 시간표를 만들 수 없다고 알린다.
 * @param {object} props
 * @param {import("@/types").ScheduleInput} props.input
 * @param {import("@/types").LookupResult} props.lookup
 * @param {string} props.backHref
 * @param {string} props.restartHref
 * @param {string} props.retryHref 유전자를 다시 입력하는 화면
 * @param {string} props.usualHref 평소 먹는 약으로 시간표를 만드는 화면
 */
export function ScheduleView({ input, lookup, backHref, restartHref, retryHref, usualHref }) {
  if (lookup.status !== "found") {
    return (
      <>
        <NavBar title="복약 시간표" backHref={backHref} />
        <NoSchedule lookup={lookup} retryHref={retryHref} usualHref={usualHref} />
      </>
    );
  }

  const entry = lookup.gene;
  const { doses, unschedulable } = collectDoses([entry], input);

  return (
    <>
      <NavBar title="복약 시간표" backHref={backHref} />
      <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <div className="flex flex-col gap-1">
          <p className="text-eyebrow text-ink-secondary">
            {entry.gene} {entry.genotype} · {entry.drugName}
          </p>
          <h2 className="text-display">하루 복약 시간표</h2>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">하루 시간표</h2>
          <DayTimeline items={buildTimeline(input, doses)} />
        </section>

        <UnschedulableList items={unschedulable} />

        <div className="mt-auto flex flex-col gap-4">
          <InfoNotice>실제 복용 시간은 의료진 지시를 따릅니다</InfoNotice>
          <Link href={restartHref} className={PRIMARY_LINK}>
            처음으로
          </Link>
        </div>
      </div>
    </>
  );
}

/** 표에 없는 유전자·유전형이라 시간표를 아예 만들 수 없을 때 */
function NoSchedule({ lookup, retryHref, usualHref }) {
  const { reason, query } = lookup;
  // 유전형만 없으면 그 유전자의 유전형을, 아니면 표에 있는 유전자를 알려 준다
  const suggestions = reason === "unknown_genotype" ? listGenotypes(query.gene) : listGenes();
  const message =
    reason === "unknown_gene"
      ? `${query.gene || "입력한"} 유전자는 관리표에 없어 추천할 약을 알 수 없습니다. 그래서 복약 시간표를 만들 수 없습니다.`
      : reason === "unknown_genotype"
        ? `${query.gene}의 ${query.genotype} 유전형은 관리표에 없어 추천할 약을 알 수 없습니다. 그래서 복약 시간표를 만들 수 없습니다.`
        : "추천할 약의 복용 정보가 없어 복약 시간표를 만들 수 없습니다.";
  const listTitle =
    reason === "unknown_genotype" ? `관리표에 있는 ${query.gene} 유전형` : "관리표에 있는 유전자";

  return (
    <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
      <div className="flex flex-col items-start gap-3">
        <span className="bg-ink-secondary text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5">
          시간표를 만들 수 없음
        </span>
        <h2 className="text-display">시간표를 만들 수 없습니다</h2>
        <div className="bg-surface-muted text-body-lg w-full rounded-lg p-5">{message}</div>
      </div>

      {suggestions.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">{listTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((name) => (
              <span
                key={name}
                className="bg-surface-muted text-body-lg flex h-12 items-center rounded-md px-4"
              >
                {name}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="mt-auto flex flex-col gap-4">
        <InfoNotice>실제 복용은 의료진과 상의하세요</InfoNotice>
        <Link href={retryHref} className={PRIMARY_LINK}>
          유전자 다시 입력하기
        </Link>
        <Link href={usualHref} className={TEXT_LINK}>
          평소 먹는 약으로 시간표 만들기
        </Link>
      </div>
    </div>
  );
}
