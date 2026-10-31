/**
 * 카드·배지·아이콘 타일에 쓰는 색 테마. docs/design.md의 Colors 참고
 * Tailwind가 클래스를 찾을 수 있게 이름을 통째로 적어 둔다
 * @type {Record<import("@/types").Theme, { card: string, badge: string, tile: string }>}
 */
export const THEME_CLASSES = {
  green: { card: "bg-green-soft", badge: "bg-green-strong", tile: "bg-green-strong" },
  orange: { card: "bg-orange-soft", badge: "bg-orange-strong", tile: "bg-orange-strong" },
  purple: { card: "bg-purple-soft", badge: "bg-purple-strong", tile: "bg-purple-strong" },
  teal: { card: "bg-teal-soft", badge: "bg-teal-strong", tile: "bg-teal-strong" },
  gray: { card: "bg-surface-muted", badge: "bg-ink-secondary", tile: "bg-ink-secondary" },
};

/** 계열을 알 수 없는 약(직접 입력한 약)이 쓰는 기본 테마 */
export const DEFAULT_THEME = "green";
