// 서버에서만 쓴다. 인증키(DATA_GO_KR_SERVICE_KEY)가 브라우저로 나가면 안 된다.
import { getDrug } from "@/lib/genes";

/** 식약처 의약품개요정보(e약은요) 제품명 검색. DRUG_API_URL로 바꿀 수 있다 */
const DEFAULT_API_URL = "https://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
const TIMEOUT_MS = 5000;
/** 같은 이름을 하루 동안 다시 묻지 않는다(공공데이터포털의 하루 호출 한도를 아끼려고) */
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_MAX = 500;

/** 이름 → { status, at }. 서버 프로세스 메모리에만 둔다 */
const cache = new Map();

/**
 * 응답 본문을 읽어 약이 있는지 판단한다. 확신할 수 없으면 "unchecked"(막지 않는다).
 * - 결과 코드 00 + 건수가 있으면 found, 건수가 0이면 not_found
 * - 결과 코드 03(데이터 없음)이면 not_found
 * - 그 밖의 코드(인증키 오류·한도 초과 등)나 예상 밖의 모양이면 unchecked
 * @param {any} json
 * @returns {import("@/types").DrugCheck}
 */
export function parseDrugResponse(json) {
  const header = json?.response?.header ?? json?.header;
  const body = json?.response?.body ?? json?.body;
  const code = String(header?.resultCode ?? "");

  if (code === "03") return "not_found";
  if (code !== "00") return "unchecked";

  const total = Number(body?.totalCount);
  if (Number.isFinite(total)) return total > 0 ? "found" : "not_found";
  if (Array.isArray(body?.items)) return body.items.length > 0 ? "found" : "not_found";
  return "unchecked";
}

/**
 * 약 이름이 실제로 있는 약인지 확인한다.
 * - 약 정보 표(data.json)에 있으면 바로 found
 * - 인증키가 없거나 API가 응답하지 못하면 unchecked: 확인하지 못했다는 뜻이고 막지 않는다
 * - DRUG_CHECK_MODE=warn이면 못 찾아도(not_found) 막지 않고 unchecked로 돌려준다.
 *   의약품 정보에 없는 영양제(유산균 등)까지 막고 싶지 않을 때 쓴다
 * @param {string} name
 * @returns {Promise<import("@/types").DrugCheck>}
 */
export async function checkDrugExists(name) {
  const trimmed = name.trim();
  if (trimmed === "") return "not_found";
  if (getDrug(trimmed) !== null) return "found";

  const key = process.env.DATA_GO_KR_SERVICE_KEY;
  if (!key) return "unchecked";

  const soften = (status) =>
    status === "not_found" && process.env.DRUG_CHECK_MODE === "warn" ? "unchecked" : status;

  const hit = cache.get(trimmed);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return soften(hit.status);

  let status = "unchecked";
  try {
    const url = new URL(process.env.DRUG_API_URL || DEFAULT_API_URL);
    url.search = new URLSearchParams({
      serviceKey: key,
      itemName: trimmed,
      type: "json",
      pageNo: "1",
      numOfRows: "1",
    }).toString();
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), cache: "no-store" });
    if (res.ok) status = parseDrugResponse(await res.json());
  } catch {
    // 시간 초과·접속 실패·JSON이 아닌 응답: 확인하지 못한 것으로 둔다(주소에 인증키가 있어 내용은 기록하지 않는다)
  }

  if (status !== "unchecked") {
    if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value);
    cache.set(trimmed, { status, at: Date.now() });
  }
  return soften(status);
}
