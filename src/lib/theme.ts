/** 카드·배지·아이콘 타일에 쓰는 색 테마. docs/design.md의 Colors 참고 */
export type Theme = "green" | "pink" | "purple" | "orange" | "sky" | "gray";

interface ThemeClasses {
  /** 카드 바탕(연한 색) */
  card: string;
  /** 배지 바탕(진한 색) */
  badge: string;
  /** 아이콘 타일 바탕(진한 색) */
  tile: string;
  /** 흰 칩에서 고른 상태를 알리는 테두리 */
  border: string;
  /** 흰 바탕 위 아이콘 색 */
  text: string;
}

/** Tailwind가 클래스를 찾을 수 있게 이름을 통째로 적어 둔다 */
export const THEME_CLASSES: Record<Theme, ThemeClasses> = {
  green: {
    card: "bg-green-soft",
    badge: "bg-green-strong",
    tile: "bg-green-strong",
    border: "border-green-strong",
    text: "text-green-strong",
  },
  pink: {
    card: "bg-pink-soft",
    badge: "bg-pink-strong",
    tile: "bg-pink-strong",
    border: "border-pink-strong",
    text: "text-pink-strong",
  },
  purple: {
    card: "bg-purple-soft",
    badge: "bg-purple-strong",
    tile: "bg-purple-strong",
    border: "border-purple-strong",
    text: "text-purple-strong",
  },
  orange: {
    card: "bg-orange-soft",
    badge: "bg-orange-strong",
    tile: "bg-orange-strong",
    border: "border-orange-strong",
    text: "text-orange-strong",
  },
  sky: {
    card: "bg-sky-soft",
    badge: "bg-sky-strong",
    tile: "bg-sky-strong",
    border: "border-sky-strong",
    text: "text-sky-strong",
  },
  gray: {
    card: "bg-surface-muted",
    badge: "bg-ink-secondary",
    tile: "bg-ink-secondary",
    border: "border-ink-secondary",
    text: "text-ink-secondary",
  },
};
