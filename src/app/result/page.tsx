import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { ResultDetails } from "@/components/ResultDetails";
import { lookupByGenotype } from "@/lib/genes";

export const metadata: Metadata = { title: "결과" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/** /result?gene=CYP2D6&genotype=*1/*1x2 처럼 유전자와 유전형을 받아 결과를 보여 준다 */
async function Result({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const gene = first(params.gene);
  const genotype = first(params.genotype);
  // 시간표 화면은 다른 곳에서 만든다. 유전자·유전형을 주소로 넘겨 준다
  const scheduleHref = `/schedule?${new URLSearchParams({ gene, genotype })}`;

  return (
    <>
      <ResultDetails result={lookupByGenotype(gene, genotype)} />

      <div className="mt-auto flex flex-col gap-4">
        <InfoNotice>실제 복용은 의료진과 상의하세요</InfoNotice>
        <Link
          href={scheduleHref}
          className="bg-primary text-on-primary text-button active:bg-primary-pressed flex h-14 w-full items-center justify-center rounded-md"
        >
          시간표 보기
        </Link>
      </div>
    </>
  );
}

export default function ResultPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <NavBar title="결과" backHref="/" />
      <main className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <Suspense
          fallback={<p className="text-body-md text-ink-secondary">결과를 찾는 중입니다</p>}
        >
          <Result searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
