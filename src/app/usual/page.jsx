import { Suspense } from "react";
import { InfoNotice } from "@/components/InfoNotice";
import { MedicationForm } from "@/components/MedicationForm";
import { NavBar } from "@/components/NavBar";
import { lookupByGenotype } from "@/lib/genes";
import {
  parseLifeTimes,
  parseMedicationQuery,
  parseQuery,
  toMedicationQuery,
  toQuery,
} from "@/lib/query";

export const metadata = { title: "평소 복약 시간표" };

const DEFAULT_NOTICE = "교육용 시뮬레이터입니다. 실제 처방이 아닙니다";

/** 유전자 정보가 없어서 넘어왔을 때, 입력 화면 맨 위에 보여 줄 이유 */
function missingNotice({ reason, query }) {
  const guide = "평소 먹는 약으로 하루 시간표를 만들어 볼까요?";
  if (reason === "unknown_gene") {
    return `${query.gene} 유전자는 정보가 부족해 추천할 약을 알 수 없어요. ${guide}`;
  }
  if (reason === "unknown_genotype") {
    return `${query.gene}의 ${query.genotype} 유전형은 정보가 부족해 추천할 약을 알 수 없어요. ${guide}`;
  }
  return `추천할 약을 판단할 자료가 없어요. ${guide}`;
}

/**
 * 평소 복약 시간표 입력: 먹는 약과 생활 시간을 직접 넣는다.
 * - 홈에서 열면 빈 입력이다.
 * - /result가 유전자 정보를 못 찾아 보내면 gene·genotype·생활 시간이 주소에 실려 온다.
 *   이유를 안내하고, 유전자 입력에서 넣었던 생활 시간을 채워 두며, 뒤로 가기는 유전자 입력으로 돌아간다.
 * - 시간표에서 돌아오면 name·times·meal(약마다 한 벌)과 생활 시간으로 앞서 입력한 값을 채운다.
 */
export default function UsualPage(props) {
  return (
    <Suspense
      fallback={<p className="text-body-md text-ink-secondary px-5 py-6">불러오는 중입니다</p>}
    >
      <Usual searchParams={props.searchParams} />
    </Suspense>
  );
}

async function Usual({ searchParams }) {
  const params = await searchParams;

  const fromGene = parseQuery(params);
  const lookup = fromGene ? lookupByGenotype(fromGene.gene, fromGene.genotype) : null;
  const missing = lookup?.status === "no_data" ? lookup : null;

  const saved = parseMedicationQuery(params);
  const initial = saved ?? (missing ? { medications: [], ...parseLifeTimes(params) } : null);

  return (
    <>
      <NavBar
        title="평소 복약 시간표"
        backHref={missing && fromGene ? `/gene?${toQuery(fromGene)}` : "/"}
      />
      <main className="flex flex-1 flex-col gap-8 px-5 pb-6">
        <InfoNotice>{missing ? missingNotice(missing) : DEFAULT_NOTICE}</InfoNotice>

        <div className="flex flex-col gap-2">
          <h2 className="text-display">평소 복용하는 약</h2>
          <p className="text-body-md text-ink-secondary">약 정보와 생활 시간을 알려 주세요</p>
        </div>

        {/* 주소의 값이 바뀌면 폼을 새로 만들어, 보관된 이전 입력 대신 주소의 값으로 채운다 */}
        <MedicationForm key={initial ? toMedicationQuery(initial) : "new"} initial={initial} />
      </main>
    </>
  );
}
