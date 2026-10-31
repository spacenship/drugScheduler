import { Pill } from "lucide-react";

interface DoseCardProps {
  time: string;
  drugName: string;
  note: string;
}

/** 복용 시각 한 번을 보여 주는 약 카드(초록 테마) */
export function DoseCard({ time, drugName, note }: DoseCardProps) {
  return (
    <div className="bg-green-soft flex items-end justify-between gap-3 rounded-lg p-5">
      <div className="flex flex-col gap-1">
        <span className="text-number-xl tabular">{time}</span>
        <span className="text-title-sm">{drugName}</span>
        <span className="text-body-md text-ink-secondary">{note}</span>
      </div>
      <span className="bg-green-strong text-on-primary flex size-12 shrink-0 items-center justify-center rounded-md">
        <Pill className="size-6" strokeWidth={2} aria-hidden />
      </span>
    </div>
  );
}
