# DrugScheduler

복용 약 일정을 관리하는 웹앱입니다.

## 기술 스택

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19, JavaScript
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

## 스크립트

| 명령어                            | 설명                      |
| --------------------------------- | ------------------------- |
| `npm run dev`                     | 개발 서버 실행            |
| `npm run build`                   | 프로덕션 빌드             |
| `npm run start`                   | 빌드 결과 실행            |
| `npm run lint` / `lint:fix`       | ESLint 검사 / 자동 수정   |
| `npm run format` / `format:check` | Prettier 포맷 적용 / 검사 |

## 데이터

- `data/gene_data.json`: 유전자·유전형별 추천 약 정보 (화면에서 사용)
- `data/data.json`: 약 이름별 기본 정보
- 원본 스프레드시트: https://docs.google.com/spreadsheets/d/1YXlD9tuJ4D9_5fPkGXwUFmIQOArXgbm5vFJ2rTI16nQ/edit?gid=0#gid=0

## 디자인

디자인 시스템은 [`docs/design.md`](docs/design.md)를 따릅니다. 토큰은 `src/app/globals.css`의 `@theme`에 정의되어 있습니다.

## 폴더 구조

```
src/
  app/         # 라우트 (App Router)
  components/  # 공용 UI 컴포넌트
  lib/         # 유틸리티 함수
  types/       # 공용 타입 정의
data/          # 약·유전형 데이터 (JSON)
public/        # 정적 파일
```

## 약 이름 확인 (선택)

평소 복약 입력(`/usual`)은 약 이름이 실제로 있는 약인지 식약처 의약품 정보 API로 확인할 수 있습니다. 설정하지 않아도 동작하며, 그때는 확인하지 않고 입력한 횟수·식사 관계대로 시간표를 만듭니다.

1. [공공데이터포털](https://www.data.go.kr)에서 "식품의약품안전처_의약품개요정보(e약은요)"를 검색해 활용신청합니다. 승인까지 보통 몇 분~몇 시간 걸립니다.
2. 마이페이지 → 인증키에서 **일반 인증키(Decoding)** 를 복사해 `.env.local`의 `DATA_GO_KR_SERVICE_KEY`에 넣습니다.
3. 개발 서버를 다시 시작합니다.

- 인증키는 서버에서만 쓰며 브라우저에는 나가지 않습니다. 같은 이름은 하루 동안 다시 묻지 않습니다.
- 못 찾은 약은 시간표를 만들 수 없습니다. 의약품 정보에 없는 영양제 등을 허용하려면 `DRUG_CHECK_MODE=warn`으로 둡니다.
- API가 응답하지 못하거나 인증키 오류가 나면 "확인하지 못함"으로 안내하고 막지 않습니다.
- 마약류 등 막아 둔 약(`src/lib/blockedDrugs.js`)은 이 설정과 상관없이 항상 막습니다.
- 요청 주소는 상세 페이지([e약은요](https://www.data.go.kr/data/15075057/openapi.do))와 같은지 확인하세요. 다르면 `DRUG_API_URL`로 바꿉니다.
