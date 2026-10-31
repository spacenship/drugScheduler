import { ChevronRight, Clock, Dna } from "lucide-react";
import { InfoNotice } from "@/components/InfoNotice";

interface HomeViewProps {
  onOpenGene: () => void;
  onOpenUsual: () => void;
}

interface BannerProps {
  theme: "green" | "gray";
  badge: string;
  title: string;
  description: string;
  action: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const THEME = {
  green: { card: "bg-green-soft", badge: "bg-green-strong", tile: "bg-green-strong" },
  gray: { card: "bg-surface-muted", badge: "bg-ink-secondary", tile: "bg-ink-secondary" },
} as const;

/** 홈의 배너. 카드 전체가 하나의 버튼이라 안쪽에는 span만 쓴다 */
function Banner({ theme, badge, title, description, action, icon, onClick }: BannerProps) {
  const color = THEME[theme];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${color.card} flex w-full flex-col items-start gap-3 rounded-lg p-5 text-left`}
    >
      <span
        className={`${color.badge} text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5`}
      >
        {badge}
      </span>
      <span className="flex w-full flex-col gap-1">
        <span className="text-title-md block">{title}</span>
        <span className="text-body-md text-ink-secondary block">{description}</span>
      </span>
      <span className="flex w-full items-end justify-between gap-3">
        <span className="text-button text-primary flex items-center gap-1">
          {action}
          <ChevronRight className="size-5" strokeWidth={2} aria-hidden />
        </span>
        <span
          className={`${color.tile} text-on-primary flex size-12 shrink-0 items-center justify-center rounded-md`}
        >
          {icon}
        </span>
      </span>
    </button>
  );
}

export function HomeView({ onOpenGene, onOpenUsual }: HomeViewProps) {
  return (
    <main className="flex flex-1 flex-col gap-8 px-5 py-6">
      <InfoNotice>교육용 시뮬레이터입니다. 실제 처방이 아닙니다</InfoNotice>

      <div className="flex flex-col gap-1">
        <p className="text-eyebrow text-ink-secondary">복약 스케줄러</p>
        <h1 className="text-display">어떤 시간표를 볼까요?</h1>
      </div>

      <section className="flex flex-col gap-3" aria-label="시간표 고르기">
        <Banner
          theme="green"
          badge="유전자 맞춤"
          title="유전자에 따른 복약 시간표"
          description="유전형과 생활 시간을 알려 주면 맞는 약과 복용 시각을 보여 줘요"
          action="시간표 만들기"
          icon={<Dna className="size-6" strokeWidth={2} aria-hidden />}
          onClick={onOpenGene}
        />
        <Banner
          theme="gray"
          badge="준비 중"
          title="평소 복약 시간표"
          description="평소 먹는 약을 하루 시간표에 모아 볼 수 있어요"
          action="틀 보기"
          icon={<Clock className="size-6" strokeWidth={2} aria-hidden />}
          onClick={onOpenUsual}
        />
      </section>
    </main>
  );
}
