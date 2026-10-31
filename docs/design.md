---
version: alpha
name: 복약 스케줄러
description: 온양여고 탐구 수업용 교육 시뮬레이터. 유전형과 생활 시간을 넣으면 결과 카드와 하루 복약 시간표를 보여 준다. 실제 처방 도구가 아니다.
colors:
  primary: "#4360E6"
  primary-pressed: "#3349C7"
  on-primary: "#FFFFFF"
  ink: "#121418"
  ink-secondary: "#5F6672"
  surface: "#FFFFFF"
  surface-muted: "#F4F4F6"
  border: "#E6E7EB"
  green-soft: "#EAF4DF"
  green-strong: "#3F7A16"
  orange-soft: "#FDEBE4"
  orange-strong: "#C2410C"
  purple-soft: "#F1EAFB"
  purple-strong: "#6B3FA0"
  teal-soft: "#E0F2F1"
  teal-strong: "#0F766E"
  warning: "#C62828"
  warning-soft: "#FDECEC"
  backdrop-top: "#D4E5B9"
  backdrop-bottom: "#9FD0C6"
typography:
  display:
    fontFamily: Pretendard
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.02em
  eyebrow:
    fontFamily: Pretendard
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.4
  title-md:
    fontFamily: Pretendard
    fontSize: 1.375rem
    fontWeight: 600
    lineHeight: 1.35
  title-sm:
    fontFamily: Pretendard
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: Pretendard
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Pretendard
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Pretendard
    fontSize: 0.9375rem
    fontWeight: 500
    lineHeight: 1.4
  badge:
    fontFamily: Pretendard
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1
  button:
    fontFamily: Pretendard
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1
  number-xl:
    fontFamily: Pretendard
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.2
  number-lg:
    fontFamily: Pretendard
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.2
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  3xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: 56px
    padding: 0 20px
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
  button-primary-disabled:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink-secondary}"
  button-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    height: 48px
  icon-button:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    size: 44px
  choice-chip:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.md}"
    height: 56px
  choice-chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  input-time:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    typography: "{typography.number-lg}"
    rounded: "{rounded.md}"
    height: 56px
    padding: 0 16px
  badge-green:
    backgroundColor: "{colors.green-strong}"
    textColor: "{colors.on-primary}"
    typography: "{typography.badge}"
    rounded: "{rounded.sm}"
    height: 28px
    padding: 0 10px
  badge-orange:
    backgroundColor: "{colors.orange-strong}"
    textColor: "{colors.on-primary}"
    typography: "{typography.badge}"
    rounded: "{rounded.sm}"
    height: 28px
    padding: 0 10px
  badge-purple:
    backgroundColor: "{colors.purple-strong}"
    textColor: "{colors.on-primary}"
    typography: "{typography.badge}"
    rounded: "{rounded.sm}"
    height: 28px
    padding: 0 10px
  badge-teal:
    backgroundColor: "{colors.teal-strong}"
    textColor: "{colors.on-primary}"
    typography: "{typography.badge}"
    rounded: "{rounded.sm}"
    height: 28px
    padding: 0 10px
  badge-gray:
    backgroundColor: "{colors.ink-secondary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.badge}"
    rounded: "{rounded.sm}"
    height: 28px
    padding: 0 10px
  med-card-green:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 20px
  med-card-orange:
    backgroundColor: "{colors.orange-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 20px
  med-card-purple:
    backgroundColor: "{colors.purple-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 20px
  med-card-teal:
    backgroundColor: "{colors.teal-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 20px
  med-card-empty:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 20px
  icon-tile-green:
    backgroundColor: "{colors.green-strong}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    size: 48px
  icon-tile-orange:
    backgroundColor: "{colors.orange-strong}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    size: 48px
  icon-tile-purple:
    backgroundColor: "{colors.purple-strong}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    size: 48px
  icon-tile-teal:
    backgroundColor: "{colors.teal-strong}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    size: 48px
  icon-tile-gray:
    backgroundColor: "{colors.ink-secondary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    size: 48px
  icon-tile-neutral:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    size: 44px
  info-box:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
  list-row:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    height: 56px
    padding: 0 16px
  time-chip:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    height: 48px
    padding: 0 16px
  warning-box:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    padding: 16px
  warning-label:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning}"
    typography: "{typography.title-sm}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  page-backdrop-top:
    backgroundColor: "{colors.backdrop-top}"
    textColor: "{colors.ink}"
  page-backdrop-bottom:
    backgroundColor: "{colors.backdrop-bottom}"
    textColor: "{colors.ink}"
  nav-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    height: 56px
---

## Overview

깨끗하고 밝은 의료 앱. 흰 바탕에 파란 주 버튼 하나, 약 계열마다 연한 색 카드(초록·주황·보라·청록)로 구분하고, 그림자 없이 배경색 차이로 층을 나눈다. 글자 굵기는 400~600만 쓰고, 위계는 굵기보다 크기와 회색 보조 글자로 만든다.

목표 사용자는 72세 김하늘 씨다. 휴대폰을 열고 3초 안에 다음 약과 복용 시간을 알 수 있어야 한다. 앱은 홈에서 시작해 두 갈래로 나뉜다. 유전자에 따른 복약 시간표는 화면 세 장이 순서대로 넘어간다: 입력 → 결과 카드 → 복약 시간표. 평소 복약 시간표는 한 장이다.

참고한 디자인: Dribbble "Medication Reminder Mobile App"(https://dribbble.com/shots/23235852-Medication-Reminder-Mobile-App). 모양만 참고하고, 접근성과 수업 범위에 맞게 아래처럼 바꿨다.

| 참고 이미지                                         | 우리 앱                                            |
| --------------------------------------------------- | -------------------------------------------------- |
| 파란 주 버튼 + 그 아래 글자 버튼 하나               | 그대로 쓴다                                        |
| 약 종류마다 색 카드(주황 = 물약, 초록 = 캡슐)       | 약 계열마다 색(아래 Colors), 판단 자료 없음 = 회색 |
| 연한 초록·주황 배지·아이콘 타일 위 흰 글자와 아이콘 | 대비가 낮아 진한 초록·주황·보라·청록으로 바꿨다    |
| 연한 회색 보조 글자                                 | 더 진한 회색(#5F6672)으로 바꿨다                   |
| 본문 약 16px                                        | 18px로 키웠다                                      |
| SF Pro 계열 영문 글꼴                               | 한글이 비슷한 느낌인 Pretendard                    |
| 하단 파란 탭 바, 지도, 약국 목록, 온라인 구매       | 쓰지 않는다                                        |

## Colors

- **Primary 파랑(#4360E6)**: 누를 수 있는 것에만 쓴다. 주 버튼, 선택된 칩, 글자 버튼, 링크. 눌렀을 때는 #3349C7.
- **Ink(#121418)**: 제목과 본문 글자.
- **Ink-secondary(#5F6672)**: 부제목, 라벨, 단위, 안내 글. 이보다 연한 회색 글자는 쓰지 않는다.
- **Surface(#FFFFFF)**: 화면 바탕.
- **Surface-muted(#F4F4F6)**: 입력 칸, 칩, 정보 상자, 목록 줄의 바탕. 흰 바탕 위에서 묶음을 나누는 회색이다.
- **Border(#E6E7EB)**: 1px 구분선(divider)과, 흰 바탕 위에 흰 카드를 둘 때의 1px 테두리에만 쓴다.
- **약 계열 테마**: 비슷한 약끼리 한 계열로 묶고, 계열마다 색 하나를 쓴다. 계열은 약학적 분류(치료 목적)를 따르며 시트에는 없는 정보라 `src/lib/drugGroups.ts`에서 정한다.
  - **초록 테마(진통제: 코데인)**: 카드 바탕 #EAF4DF, 아이콘 타일과 배지 #3F7A16.
  - **주황 테마(항암제: 카페시타빈, 이리노테칸 주사제)**: 카드 바탕 #FDEBE4, 아이콘 타일과 배지 #C2410C.
  - **보라 테마(면역억제제: 아자티오프린, 타크로리무스 캡슐)**: 카드 바탕 #F1EAFB, 아이콘 타일과 배지 #6B3FA0.
  - **청록 테마(항감염제: 에파비렌즈, 이소니아지드)**: 카드 바탕 #E0F2F1, 아이콘 타일과 배지 #0F766E.
  - 계열이 정해지지 않은 약은 회색 '기타'로 보인다. 새 계열을 만들 때는 흰 글자가 진한 색 위에서 4.5:1 이상 읽히는지 확인한다(위 네 색은 5.2~7.4:1).
- **회색 테마(판단 자료 없음, 시간을 정할 수 없음, 약이 없는 칸, 약 하나에 묶이지 않는 평소 복약 배너)**: 카드 바탕 #F4F4F6, 배지와 아이콘 타일 #5F6672.
- **Warning 빨강(#C62828)**: 주의 문구의 아이콘과 '주의' 글자(warning-label)에만 쓴다. 상자 바탕은 #FDECEC.
- **Backdrop(#D4E5B9 → #9FD0C6)**: 화면이 430px보다 넓을 때 앱 바깥 배경에 쓰는 연두→청록 그라데이션 `linear-gradient(160deg, #D4E5B9, #9FD0C6)`. page-backdrop-top이 시작 색, page-backdrop-bottom이 끝 색이다. 앱 안에는 그라데이션을 쓰지 않는다.

같은 약은 모든 화면에서 같은 색이다. 결과 카드에서 주황이었던 약은 시간표에서도 주황이다. 색만으로 계열을 알리지 않는다. 복용 카드의 보조 글에는 "항암제 · 아침 식사 30분 뒤"처럼 계열 이름을 함께 적고, 약을 고르는 화면에서는 계열 이름표(badge)를 붙인다.

## Typography

글꼴은 Pretendard. HTML `<head>`에 아래 한 줄을 넣고, 안 될 때를 위해 대체 글꼴을 함께 적는다.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
/>
```

`font-family: Pretendard, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;`

| 이름      | 크기 / 굵기               | 쓰는 곳                                 |
| --------- | ------------------------- | --------------------------------------- |
| display   | 28px / 600                | 화면 큰 제목, 약 이름                   |
| eyebrow   | 20px / 500, ink-secondary | 큰 제목 바로 위의 작은 머리말           |
| title-md  | 22px / 600                | 구역 제목(유전형, 복용 정보, 복용 시각) |
| title-sm  | 20px / 600                | 카드 제목, 칩 글자, 상단 바 제목        |
| body-lg   | 18px / 400                | 본문, 권고 문장, 주의 문구              |
| body-md   | 16px / 400                | 부제목, 안내 상자 글                    |
| label     | 15px / 500, ink-secondary | 입력 칸 라벨, 정보 이름                 |
| badge     | 14px / 600                | 배지 글자(가장 작은 글자)               |
| number-xl | 28px / 600                | 시간표의 복용 시각                      |
| number-lg | 24px / 600                | 입력한 시각, 복용 정보 값               |

- 본문은 18px 아래로 내리지 않는다. 14px은 배지에만 쓴다.
- 한글 줄바꿈은 `word-break: keep-all;`로 단어 중간에서 끊기지 않게 한다.
- 시각과 숫자는 `font-variant-numeric: tabular-nums;`로 자리 폭을 맞춘다.
- 이름과 값을 나란히 둘 때는 이름은 label(회색), 값은 title-sm(검정)으로 크기 차이를 준다.

## Layout

공통 규칙:

- 휴대폰 세로 화면 기준 한 열. 기준 폭 390px, 최대 430px로 가운데 정렬한다.
- 좌우 여백 20px. 구역 사이 32px, 카드 사이 12px, 카드 안 여백 20px.
- 한 번에 한 화면만 보인다. 화면마다 주 버튼은 하나이고, 내용 맨 아래에 화면 폭 가득 둔다.
- 홈을 뺀 모든 화면의 맨 위에는 상단 바(뒤로 가기 + 가운데 제목)를 둔다. 홈에는 상단 바가 없다. 입력 화면의 뒤로 가기는 홈으로, 시간표 화면의 '처음으로'와 평소 복약 시간표의 '홈으로'도 홈으로 간다.
- 휴대폰 상태 표시줄(9:41, 배터리)이나 휴대폰 테두리는 그리지 않는다.

### 홈 (참고: Prescriptions 목록 화면의 카드 목록)

```
(알약) 복약 스케줄러                                    icon-tile-neutral + eyebrow
어떤 시간표를 볼까요?                                  display

┌ [유전자 맞춤]                  (DNA) ┐              banner, 초록 테마, 배지와 icon-tile-green
│ 유전자에 따른 복약 시간표                │              title-md
│ 내 유전형에 맞는 약과 복용 시각           │              body-md, ink-secondary
│ CYP2D6 · DPYD · UGT1A1 외 4종          │              label, ink-secondary (들어 있는 자료)
│ 시간표 만들기                      [>]  │              파란 글자 + 흰 꺾쇠 칸(44px)
└─────────────────────────────┘
┌ [평소 복약]                    (시계) ┐              banner, 회색 테마, 배지와 icon-tile-gray
│ 평소 복약 시간표                        │
│ 평소 먹는 약을 하루에 모아 보기          │
│ ■■■■ 약 7종 · 4개 계열                 │              계열 색 네모 4개(12px)
│ 시간표 보기                        [>]  │
└─────────────────────────────┘

[ (i) 교육용 시뮬레이터입니다. 실제 처방이 아닙니다 ]   info-box, 맨 아래에 붙여 항상 보인다
```

주 버튼은 두지 않는다. 배너 두 장이 곧 시작 버튼이다. 배너는 카드 전체가 하나의 버튼이고, 파란 글자 + 꺾쇠로 누를 수 있음을 알린다. 휴대폰 한 화면(높이 844px)에 안내 상자까지 들어가야 하므로, 배너 설명은 한 줄로 쓴다. 배너 안 '약 7종'·'외 4종'은 자료(`data/`)에서 세어 보여 준다.

### 화면 1 입력 (참고: Prescriptions 목록 화면)

```
<  유전자 복약 시간표                                   nav-bar, 뒤로 가기는 홈으로
[ (i) 교육용 시뮬레이터입니다. 실제 처방이 아닙니다 ]   info-box, 항상 보인다
복약 시간표 만들기                                    display
유전형과 생활 시간을 알려 주세요                        body-md, ink-secondary

유전형                                               title-md
[  *1/*1  ] [  *1/*2  ]                               choice-chip 2열 2줄
[  *2/*2  ] [ 잘 모름·기타 ]

생활 시간                                            title-md
(해) 기상          (달) 취침                           icon-tile-neutral + label
[  07:00  ]        [  23:00  ]                        input-time 2열

[            결과 보기            ]                     button-primary
```

유전형을 고르기 전에는 '결과 보기'를 button-primary-disabled로 보여 준다. '잘 모름·기타'는 수업에서 정한 이름으로 바꾼다.

### 화면 2 결과 카드 (참고: Tetracycline 상세 화면)

```
<  결과                                               nav-bar
[중간 대사형]                                         약 테마 배지
프라수그렐 또는 티카그렐러                              display (두 줄이 되어도 된다)
대체약 후보 · 금기 여부는 의료진 판단                    body-md, ink-secondary
권고 문장 한두 줄                                      body-lg

복용 정보                                            title-md
┌ (알약) 추천 약 · 항암제 ─────────────┐              info-box, 맨 위에 계열 색 icon-tile + title-sm
│ 복용 횟수                    1일 1회   │              label(왼쪽) / title-sm(오른쪽)
│ 용량                     처방에 따름   │
│ 복용 시점                       식후   │
└──────────────────────────────┘

[ (!) 주의  주의 문구 한 줄 ]                          warning-box
[ 근거                     CPIC 2022  > ]             list-row
[ (i) 실제 복용은 의료진과 상의하세요 ]                 info-box

[            시간표 보기            ]                   button-primary
```

판단 자료가 없는 유전형이면 배지는 badge-gray "판단 자료 없음", 제목은 "추천할 약을 판단할 자료가 없습니다", 복용 정보 상자 대신 med-card-empty에 이유를 한 줄로 쓴다. 버튼은 그대로 '시간표 보기'.

### 화면 3 복약 시간표 (참고: Roaccutane Active course 화면)

```
<  복약 시간표                                        nav-bar
기상 07:00 · 취침 23:00                               eyebrow
하루 복약 시간표                                       display

생활 시간                                            title-md
[기상 07:00] [식사 08:00] [식사 13:00]                 time-chip, 줄바꿈 허용
[식사 19:00] [취침 23:00]

복용 시각                                            title-md
┌ 08:30   클로피도그렐              (알약) ┐           med-card-green
│         아침 식사 30분 뒤                │
└────────────────────────────┘
┌ 08:30   나음정                   (알약) ┐           med-card-orange
│         아침 식사 30분 뒤                │
└────────────────────────────┘
┌ 19:30   나음정                   (알약) ┐           med-card-orange
└────────────────────────────┘

[ (i) 실제 복용 시간은 의료진 지시를 따릅니다 ]          info-box
[            처음으로            ]                     button-primary
```

복용 카드는 시각 순서로 놓는다. 시간을 정할 수 없는 약은 med-card-empty에 badge-gray "시간을 정할 수 없음"으로 보여 준다. 위 시각과 초록·주황은 모양을 보여 주는 예시이고, 실제 값은 시간표 규칙으로 계산하며 카드 색은 약 계열 테마를 따른다.

### 평소 복약 시간표

```
<  평소 복약 시간표                                    nav-bar, 뒤로 가기는 홈으로
평소 먹는 약                                          eyebrow
하루 복약 시간표                                       display

복용하는 약                                 3개 선택      title-md + label(선택한 개수)
먹는 약을 모두 눌러 주세요                              body-md, ink-secondary
[항암제] 2종                                          계열 이름표(badge) + label, 계열 테마 색
[ 카페시타빈 ] [ 이리노테칸 주사제 ]                     choice-chip 2열, 여러 개 고를 수 있다
[면역억제제] 2종                                       글자가 길면 두 줄로 늘어난다
[ 아자티오프린 ] [ 타크로리무스 캡슐 ]

생활 시간                                            title-md
(해) 기상   (달) 취침                                  icon-tile-neutral + label, input-time 2열
(식사) 아침  (식사) 점심  (식사) 저녁

복용 시각                                            title-md
(해) 기상 후  07:00                                   icon-tile-neutral + title-sm + label
 │   ┌ 07:00   코데인                (알약) ┐          med-card, 약 계열 테마 색, 복용 카드는 시각 순서
 │   │         진통제 · 기상 후 첫 복용      │         보조 글에 계열 이름을 함께 적는다
 │   └───────────────────────────┘
(식사) 아침 식사  08:00                                칸마다 icon-tile-neutral을 세로선(divider)으로 잇는다
 │   [ 복용하는 약이 없습니다 ]                         약이 없는 칸은 한 줄짜리 회색 상자(body-md, ink-secondary)
  … 점심 식사 · 저녁 식사 · 취침 전도 같은 모양(마지막 칸에는 세로선이 없다)

시간을 정할 수 없는 약                                 title-md, 해당하는 약이 있을 때만
[시간을 정할 수 없음] 이리노테칸 주사제 + 이유            med-card-empty + badge-gray

[ (i) 실제 복용 시간은 의료진 지시를 따릅니다 ]           info-box
[            홈으로            ]                       button-primary
```

- 약 칩은 계열별로 묶어 계열 이름표 아래에 둔다. 칩은 계열 색이 아니라 선택 상태(파란 바탕)로 고른 것을 알린다.
- 생활 시간은 입력하기 전에 기본값(기상 07:00, 아침 08:00, 점심 13:00, 저녁 19:00, 취침 23:00)이고, 입력 화면(화면 1)과 같은 input-time 칸으로 바꾼다. 바꾸면 복용 시각이 바로 다시 계산된다. 칸을 비우면 시간표 대신 info-box "생활 시간을 모두 입력하면 복용 시각이 나옵니다"를 보여 준다.
- 고른 약의 복용 시각은 화면 3과 같은 시간표 규칙으로 계산하고, 각 복용은 시각이 가장 가까운 생활 시각 칸(기상 후·아침 식사·점심 식사·저녁 식사·취침 전)에 넣는다. 거리가 같으면 앞선 칸에 넣는다.
- 복용 시각은 세로 타임라인이다. 왼쪽에 icon-tile-neutral(44px)을 세로로 늘어놓고 1px 선(border 색)으로 이어, 아침부터 밤까지 하루가 이어지는 것을 보여 준다. 칸마다 오른쪽에 칸 이름 + 기준 시각을 두고 그 아래에 약 카드를 쌓는다. 약이 하나도 없는 칸은 한 줄짜리 회색 상자로 남긴다. 약을 하나도 고르지 않았을 때는 다섯 칸 모두 "등록한 약이 없습니다"로 보이는 빈 타임라인이 된다.- 약 이름은 `data/data.json`의 `drugs`에서 가져온다. 고른 약과 바꾼 생활 시간은 홈으로 갔다 와도 남는다(새로고침하면 사라진다).

## Elevation & Depth

그림자는 쓰지 않는다. 층은 배경색 차이로만 나눈다: 흰 바탕(#FFFFFF) → 회색 묶음(#F4F4F6) → 약 테마 카드(연한 초록·주황·보라·청록). 흰 바탕 위 흰 카드가 필요할 때만 1px #E6E7EB 테두리를 쓴다. 입력 칸과 칩에 초점이 가면 2px 파란 테두리(outline)를 2px 떨어뜨려 보여 준다.

## Shapes

- 배지: 8px
- 버튼, 입력 칸, 칩, 정보 상자, 목록 줄, 아이콘 타일: 12px
- 약 카드: 16px
- 넓은 화면에서 앱 영역 전체: 24px
- 모서리가 각진 상자나 완전히 동그란 버튼은 쓰지 않는다.

## Components

- **button-primary**: 파란 바탕, 흰 글자 18px/600, 높이 56px, 화면 폭 가득. 화면마다 하나.
- **button-text**: 파란 글자만 있는 보조 버튼. 필요하면 주 버튼 바로 아래에 하나만 둔다.
- **choice-chip**: 회색 바탕 칩. 고르면 파란 바탕 + 흰 글자로 바뀐다(참고 이미지의 'Online stores' 선택 상태). 유전형·유전자는 한 번에 하나만 고르고, 평소 복약 화면의 약 칩은 여러 개를 고를 수 있다. 높이는 56px 이상이며 글자가 길면 두 줄로 늘어난다.
- **input-time**: 회색 바탕, 테두리 없음, 높이 56px, 글자 24px. 위에 label을 둔다. `<input type="time">`을 쓴다.
- **badge**: 카드나 제목 위에 붙는 작은 이름표. 약 테마의 진한 색 바탕 + 흰 글자.
- **med-card**: 약 테마 연한 바탕, 모서리 16px, 안 여백 20px. 왼쪽에 시각이나 배지·제목·부제목, 오른쪽 아래에 아이콘 타일.
- **banner**: 홈에서 화면으로 들어가는 카드. med-card와 같은 모양(연한 테마 바탕, 모서리 16px, 안 여백 20px)이고 위에서부터 한 줄(왼쪽에 배지, 오른쪽에 48px 아이콘 타일) → title-md 제목 → body-md 회색 설명 → label 회색 보조 줄(들어 있는 자료) → 맨 아래 한 줄(왼쪽에 button 글자 크기의 파란 안내 글, 오른쪽에 흰 바탕 44px 칸 안의 파란 꺾쇠)로 쌓는다. 카드 전체가 하나의 button이다. 유전자 맞춤은 초록, 평소 복약은 약 하나에 묶이지 않는 화면이라 회색 테마.
- **icon-tile**: 48px 정사각형, 모서리 12px, 약 테마의 진한 색 바탕에 흰 선 아이콘. 뜻은 옆 글자로도 함께 전한다. 회색 타일(icon-tile-neutral, 44px)은 파란 선 아이콘을 넣어 라벨 앞에 둔다(참고 이미지의 Code·Issue date 칸).
- **info-box**: 회색 바탕 안내 상자. 왼쪽에 정보 아이콘. 안내 문구와 '복용 정보' 묶음에 쓴다.
- **list-row**: 회색 바탕 한 줄. 왼쪽 회색 이름, 오른쪽 검정 값 + 오른쪽 꺾쇠(참고 이미지의 'Where to buy · View map').
- **time-chip**: 회색 바탕 시각 칩. 생활 시간을 한눈에 보여 준다.
- **warning-box**: 연한 빨강 바탕, 빨간 경고 아이콘 + warning-label '주의' + 검정 본문.
- **divider**: 1px 회색 선. 정보 상자 안에서 줄을 나눌 때 쓴다.
- **nav-bar**: 높이 56px. 왼쪽 뒤로 가기(44px 누름 영역), 가운데 제목. 오른쪽 '더보기(⋯)'는 두지 않는다.

아이콘은 선 굵기 2px 안팎의 선 아이콘으로 통일한다. Lucide를 쓰면 편하다.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="pill"></i>
<!-- 화면을 그린 뒤 lucide.createIcons(); 호출 -->
```

쓸 아이콘: pill(알약), sun(기상), moon(취침), utensils(식사), info(안내), triangle-alert(주의), chevron-left(뒤로), chevron-right(목록 줄·배너), dna(유전자 배너), clock(평소 복약 배너).

## Do's and Don'ts

- Do: 화면마다 파란 주 버튼은 하나만 둔다.
- Do: 비슷한 약은 한 계열로 묶어 색 테마 하나를 정하고 모든 화면에서 같은 색을 쓴다(진통제 초록, 항암제 주황, 면역억제제 보라, 항감염제 청록). 색과 함께 계열 이름도 글자로 적는다.
- Do: 주의 문구는 빨간 아이콘 + '주의' 글자 + 문장을 함께 쓴다. 색만으로 주의를 알리지 않는다.
- Do: 판단 자료가 없거나 시간을 정할 수 없을 때는 회색 카드와 회색 배지로 보여 준다.
- Do: 누를 수 있는 것은 높이 44px 이상으로 만든다.
- Don't: 참고 이미지의 연한 초록·주황 배지·타일 위 흰 글자를 그대로 쓰지 않는다(거의 안 보인다). 진한 초록·주황·보라·청록을 쓴다.
- Don't: #9A9A9F처럼 연한 회색 글자를 쓰지 않는다. 보조 글자는 #5F6672.
- Don't: 하단 탭 바, 지도, 약국 목록, 구매 버튼, 프로필 사진, 의사 사진은 만들지 않는다. 참고 이미지에만 있는 기능이다.
- Don't: 휴대폰 상태 표시줄과 휴대폰 테두리를 그리지 않는다.
- Don't: 그림자, 앱 안의 그라데이션, 굵기 700 이상 글자를 쓰지 않는다.
- Don't: 실제 약 상자 사진이나 제약회사·약국 로고를 넣지 않는다.
