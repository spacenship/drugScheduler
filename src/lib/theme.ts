/** 카드·배지·아이콘 타일에 쓰는 색 테마. docs/design.md의 Colors 참고 */
export type Theme = "green" | "orange" | "purple" | "teal" | "gray";

/** Tailwind가 클래스를 찾을 수 있게 이름을 통째로 적어 둔다 */
export const THEME_CLASSES: Record<Theme, { card: string; badge: string; tile: string }> = {
  green: { card: "bg-green-soft", badge: "bg-green-strong", tile: "bg-green-strong" },
  orange: { card: "bg-orange-soft", badge: "bg-orange-strong", tile: "bg-orange-strong" },
  purple: { card: "bg-purple-soft", badge: "bg-purple-strong", tile: "bg-purple-strong" },
  teal: { card: "bg-teal-soft", badge: "bg-teal-strong", tile: "bg-teal-strong" },
  gray: { card: "bg-surface-muted", badge: "bg-ink-secondary", tile: "bg-ink-secondary" },
};
