# DrugScheduler

복용 약 일정을 관리하는 웹앱입니다.

## 기술 스택

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19, TypeScript
- Tailwind CSS v4
- ESLint + Prettier

## 시작하기

Node.js 22 이상이 필요합니다 (`.nvmrc` 참고).

```bash
npm install
cp .env.example .env.local
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

data : https://docs.google.com/spreadsheets/d/1YXlD9tuJ4D9_5fPkGXwUFmIQOArXgbm5vFJ2rTI16nQ/edit?gid=0#gid=0

## 스크립트

| 명령어                            | 설명                      |
| --------------------------------- | ------------------------- |
| `npm run dev`                     | 개발 서버 실행            |
| `npm run build`                   | 프로덕션 빌드             |
| `npm run start`                   | 빌드 결과 실행            |
| `npm run lint` / `lint:fix`       | ESLint 검사 / 자동 수정   |
| `npm run format` / `format:check` | Prettier 포맷 적용 / 검사 |
| `npm run typecheck`               | TypeScript 타입 검사      |

## 디자인

디자인 시스템은 [`docs/design.md`](docs/design.md)를 따릅니다. 토큰은 `src/app/globals.css`의 `@theme`에 정의되어 있습니다.

## 폴더 구조

```
src/
  app/         # 라우트 (App Router)
  components/  # 공용 UI 컴포넌트
  lib/         # 유틸리티 함수
  types/       # 공용 타입 정의
public/        # 정적 파일
```
