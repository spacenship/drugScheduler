import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { lookupByGenotype } from "@/lib/pharmacogenomics";

export const metadata: Metadata = { title: "결과" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/** /result?gene=CYP2D6&genotype=*1/*1x2 처럼 유전자와 유전형을 받아 결과를 보여 준다. */
async function Result({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const result = lookupByGenotype(first(params.gene), first(params.genotype));
  return <ResultCard result={result} />;
}

export default function ResultPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <header className="flex h-14 items-center px-2">
        <Link
          href="/"
          aria-label="뒤로 가기"
          className="flex size-11 items-center justify-center rounded-md"
        >
          <ChevronLeft className="size-6" strokeWidth={2} aria-hidden />
        </Link>
        <span className="text-title-sm flex-1 pr-11 text-center">결과</span>
      </header>
      <main className="flex flex-1 flex-col px-5 pt-4 pb-8">
        <Suspense
          fallback={<p className="text-body-md text-ink-secondary">결과를 찾는 중입니다</p>}
        >
          <Result searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
