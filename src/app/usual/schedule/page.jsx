import { Suspense } from "react";
import { redirect } from "next/navigation";
import { UsualScheduleView } from "@/components/UsualScheduleView";
import { checkDrugExists } from "@/lib/drugLookup";
import { medicationToDrug } from "@/lib/medications";
import { parseMedicationQuery, toMedicationQuery } from "@/lib/query";

export const metadata = { title: "평소 복약 시간표" };

/**
 * 평소 복약 시간표: 입력한 약과 생활 시간을 하루 시간표로 보여 준다. 입력값은 URL 쿼리로 받는다.
 * 약이 없거나 값이 틀리면 입력 화면(/usual)으로 돌려보낸다.
 */
export default function UsualSchedulePage(props) {
  return (
    <Suspense
      fallback={
        <p className="text-body-md text-ink-secondary px-5 py-6">시간표를 만드는 중입니다</p>
      }
    >
      <UsualSchedule searchParams={props.searchParams} />
    </Suspense>
  );
}

async function UsualSchedule({ searchParams }) {
  const input = parseMedicationQuery(await searchParams);
  if (!input) redirect("/usual");

  // 실제로 없는 약이 섞여 있으면 주소를 직접 고쳐도 시간표를 만들지 않는다(확인하지 못한 약은 막지 않는다)
  const checks = await Promise.all(input.medications.map(({ name }) => checkDrugExists(name)));
  if (checks.includes("not_found")) redirect("/usual");

  return (
    <UsualScheduleView
      drugs={input.medications.map(medicationToDrug)}
      times={input}
      backHref={`/usual?${toMedicationQuery(input)}`}
    />
  );
}
