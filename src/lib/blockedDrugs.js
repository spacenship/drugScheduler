/**
 * 마약류·오남용 위험이 있어 입력 자체를 막는 약 이름(띄어쓰기·대소문자 무시, 이름의 일부만 겹쳐도 막는다).
 * 약 정보 표(data.json)에 있는 약은 이 검사를 하지 않는다.
 */
const BLOCKED_NAMES = [
  "필로폰",
  "히로뽕",
  "메스암페타민",
  "헤로인",
  "코카인",
  "대마",
  "마리화나",
  "해시시",
  "아편",
  "엑스터시",
  "mdma",
  "lsd",
  "ghb",
  "케타민",
  "펜타닐",
  "모르핀",
  "옥시코돈",
  "메타돈",
  "프로포폴",
];

/** 입력한 약 이름이 막아 두는 약이면 true */
export function isBlockedDrugName(name) {
  const normalized = name.replace(/\s+/g, "").toLowerCase();
  return normalized !== "" && BLOCKED_NAMES.some((blocked) => normalized.includes(blocked));
}
