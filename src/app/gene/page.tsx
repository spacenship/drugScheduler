import { Suspense } from "react";
import type { Metadata } from "next";
import { InfoNotice } from "@/components/InfoNotice";
import { NavBar } from "@/components/NavBar";
import { ScheduleForm } from "@/components/ScheduleForm";
import { parseQuery, toQuery } from "@/lib/query";

export const metadata: Metadata = { title: "유전자 복약 시간표" };

/** 화면 1: 유전자 정보와 생활 시간 입력. 결과에서 돌아오면 쿼리로 앞서 입력한 값을 채운다 */
export default function GenePage(props: PageProps<"/gene">) {
  return (
    <>
      <NavBar title="유전자 복약 시간표" backHref="/" />
      <main className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <InfoNotice>교육용 시뮬레이터입니다. 실제 처방이 아닙니다</InfoNotice>

        <div className="flex flex-col gap-2">
          <h2 className="text-display">복약 시간표 만들기</h2>
          <p className="text-body-md text-ink-secondary">유전자와 생활 시간을 알려 주세요</p>
        </div>

        <Suspense fallback={<ScheduleForm initial={null} />}>
          <FormWithQuery searchParams={props.searchParams} />
        </Suspense>
      </main>
    </>
  );
}

async function FormWithQuery({ searchParams }: Pick<PageProps<"/gene">, "searchParams">) {
  const initial = parseQuery(await searchParams);
  // 주소의 값이 바뀌면 폼을 새로 만들어, 보관된 이전 입력 대신 주소의 값으로 채운다
  return <ScheduleForm key={initial ? toQuery(initial) : "new"} initial={initial} />;
}
