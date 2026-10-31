/** 조건부 className을 하나의 문자열로 합칩니다. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
