import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { ResultDetails } from "@/components/ResultDetails";
import type { LookupResult } from "@/types";

interface ResultViewProps {
  result: LookupResult;
  onBack: () => void;
  onNext: () => void;
}

export function ResultView({ result, onBack, onNext }: ResultViewProps) {
  return (
    <>
      <NavBar title="결과" onBack={onBack} />
      <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <ResultDetails result={result} />

        <div className="mt-auto flex flex-col gap-4">
          <InfoNotice>실제 복용은 의료진과 상의하세요</InfoNotice>
          <button
            type="button"
            onClick={onNext}
            className="bg-primary text-on-primary text-button active:bg-primary-pressed h-14 w-full rounded-md"
          >
            시간표 보기
          </button>
        </div>
      </div>
    </>
  );
}
