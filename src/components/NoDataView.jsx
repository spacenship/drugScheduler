import Link from "next/link";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { ResultDetails } from "@/components/ResultDetails";

/** 입력한 유전자·유전형의 정보가 표에 없을 때 시간표 대신 보여 주는 화면 */
export function NoDataView({ result, retryHref }) {
  return (
    <>
      <NavBar title="결과" backHref={retryHref} />
      <div className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <ResultDetails result={result} />

        <div className="mt-auto flex flex-col gap-4">
          <InfoNotice>실제 복용은 의료진과 상의하세요</InfoNotice>
          <Link
            href={retryHref}
            className="bg-primary text-on-primary text-button active:bg-primary-pressed flex h-14 w-full items-center justify-center rounded-md"
          >
            다시 입력하기
          </Link>
        </div>
      </div>
    </>
  );
}
