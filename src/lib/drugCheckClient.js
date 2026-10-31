import { getDrug } from "@/lib/genes";

/** 이름 → 확인 결과를 기다리는 약속. 같은 이름은 다시 묻지 않는다 */
const cache = new Map();

async function request(name) {
  try {
    const res = await fetch(`/api/drug-check?name=${encodeURIComponent(name)}`);
    if (!res.ok) return "unchecked";
    const { status } = await res.json();
    return status === "found" || status === "not_found" ? status : "unchecked";
  } catch {
    return "unchecked";
  }
}

/**
 * 약 이름이 실제로 있는 약인지 서버에 묻는다. 약 정보 표에 있으면 묻지 않는다.
 * 확인하지 못하면(unchecked) 다음에 다시 묻는다.
 * @param {string} name
 * @returns {Promise<import("@/types").DrugCheck>}
 */
export function fetchDrugStatus(name) {
  const key = name.trim();
  if (getDrug(key) !== null) return Promise.resolve("found");

  if (!cache.has(key)) {
    cache.set(
      key,
      request(key).then((status) => {
        if (status === "unchecked") cache.delete(key);
        return status;
      }),
    );
  }
  return cache.get(key);
}
