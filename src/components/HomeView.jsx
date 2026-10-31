import Link from "next/link";
import { ChevronRight, Clock, Dna, Pill } from "lucide-react";
import { InfoNotice } from "@/components/InfoNotice";
import { listGenes } from "@/lib/genes";
import { THEME_CLASSES } from "@/lib/theme";

/**
 * 홈의 배너. 카드 전체가 하나의 링크라 안쪽에는 span만 쓴다
 * @param {object} props
 * @param {import("@/types").Theme} props.theme
 * @param {React.ReactNode} props.meta 설명 아래 한 줄. 어떤 자료가 들어 있는지 미리 보여 준다
 */
function Banner({ theme, badge, title, description, meta, action, icon, href }) {
  const color = THEME_CLASSES[theme];

  return (
    <Link
      href={href}
      className={`${color.card} flex w-full flex-col items-start gap-5 rounded-lg p-5 text-left`}
    >
      <span className="flex w-full items-start justify-between gap-3">
        <span
          className={`${color.badge} text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5`}
        >
          {badge}
        </span>
        <span
          className={`${color.tile} text-on-primary flex size-12 shrink-0 items-center justify-center rounded-md`}
        >
          {icon}
        </span>
      </span>

      <span className="flex w-full flex-col gap-2">
        <span className="text-title-md block">{title}</span>
        <span className="text-body-md text-ink-secondary block">{description}</span>
        <span className="text-label text-ink-secondary mt-1 flex items-center gap-2">{meta}</span>
      </span>

      <span className="text-button text-primary flex w-full items-center justify-between">
        {action}
        <span className="bg-surface flex size-11 items-center justify-center rounded-md">
          <ChevronRight className="size-6" strokeWidth={2} aria-hidden />
        </span>
      </span>
    </Link>
  );
}

export function HomeView() {
  const genes = listGenes();

  return (
    <main className="flex flex-1 flex-col gap-8 px-5 py-6">
      <div className="flex flex-col gap-3">
        <p className="text-eyebrow text-ink-secondary flex items-center gap-3">
          <span className="bg-surface-muted flex size-11 items-center justify-center rounded-md">
            <Pill className="text-primary size-5" strokeWidth={2} aria-hidden />
          </span>
          복약 스케줄러
        </p>
        <h1 className="text-display">어떤 시간표를 볼까요?</h1>
      </div>

      <section className="flex flex-col gap-3" aria-label="시간표 고르기">
        <Banner
          theme="green"
          badge="유전자 맞춤"
          title="유전자에 따른 복약 시간표"
          description="내 유전형에 맞는 약과 복용 시각"
          meta={
            <span>
              {genes.slice(0, 3).join(" · ")}
              {genes.length > 3 && ` 외 ${genes.length - 3}종`}
            </span>
          }
          action="시간표 만들기"
          icon={<Dna className="size-6" strokeWidth={2} aria-hidden />}
          href="/gene"
        />
        <Banner
          theme="gray"
          badge="평소 복약"
          title="평소 복약 시간표"
          description="평소 먹는 약을 하루에 모아 보기"
          meta={<span>약 이름 · 횟수 · 식사 관계를 직접 입력</span>}
          action="시간표 만들기"
          icon={<Clock className="size-6" strokeWidth={2} aria-hidden />}
          href="/usual"
        />
      </section>

      <div className="mt-auto">
        <InfoNotice>교육용 시뮬레이터입니다. 실제 처방이 아닙니다</InfoNotice>
      </div>
    </main>
  );
}
