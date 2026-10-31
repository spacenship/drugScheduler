import { Suspense } from "react";
import { InfoNotice } from "@/components/InfoNotice";
import { ScheduleForm } from "@/components/ScheduleForm";
import { parseQuery } from "@/lib/query";

/** 화면 1: 유전자 정보와 생활 시간 입력 */
export default function Home(props: PageProps<"/">) {
  return (
    <main className="flex flex-1 flex-col gap-8 px-5 py-6">
      <InfoNotice>교육용 시뮬레이터입니다. 실제 처방이 아닙니다</InfoNotice>

      <div className="flex flex-col gap-2">
        <h1 className="text-display">복약 시간표 만들기</h1>
        <p className="text-body-md text-ink-secondary">유전형과 생활 시간을 알려 주세요</p>
      </div>

      <Suspense fallback={<ScheduleForm initial={null} />}>
        <FormWithQuery searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}

/** 결과 화면에서 돌아오면 쿼리로 앞서 입력한 값을 채운다 */
async function FormWithQuery({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  return <ScheduleForm initial={parseQuery(await searchParams)} />;
}
