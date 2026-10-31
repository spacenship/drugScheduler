import Link from "next/link";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { ResultDetails } from "@/components/ResultDetails";
import type { LookupResult } from "@/types";

interface ResultViewProps {
  result: LookupResult;
  backHref: string;
  nextHref: string;
}

export function ResultView({ result, backHref, nextHref }: ResultViewProps) {
  return (
    <>
      <NavBar title="결과" backHref={backHref} />
      <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <ResultDetails result={result} />

        <div className="mt-auto flex flex-col gap-4">
          <InfoNotice>실제 복용은 의료진과 상의하세요</InfoNotice>
          <Link
            href={nextHref}
            className="bg-primary text-on-primary text-button active:bg-primary-pressed flex h-14 w-full items-center justify-center rounded-md"
          >
            시간표 보기
          </Link>
          <Link
            href="/"
            className="text-primary text-button flex h-12 w-full items-center justify-center"
          >
            처음으로
          </Link>
        </div>
      </div>
    </>
  );
}
