@AGENTS.md

## 디자인 규칙

화면·컴포넌트를 만들거나 고칠 때는 반드시 `docs/design.md`를 먼저 읽고 그대로 따른다.

- 색·글자·모서리 토큰은 `src/app/globals.css`의 `@theme`에 있다. 임의의 hex 값이나 Tailwind 기본 팔레트(zinc, blue 등) 대신 토큰 클래스(`bg-primary`, `text-ink-secondary`, `text-display`, `rounded-md` …)를 쓴다.
- 그림자, 앱 안 그라데이션, 굵기 700 이상, #5F6672보다 연한 회색 글자는 쓰지 않는다.
- 아이콘은 `lucide-react`의 선 아이콘(strokeWidth 2)을 쓴다.
- design.md를 바꾸면 `globals.css` 토큰도 함께 맞춘다.
