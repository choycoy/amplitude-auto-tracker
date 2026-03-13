# Amplitude 자동 추적

한국어 버튼/링크를 자동으로 추적하고, 빌드 타임에 생성된 이벤트 이름으로 Amplitude에 전송하는 Next.js 라이브러리입니다.

## 핵심 특징

### 버튼/링크만으로 기본 추적

```jsx
// 버튼·링크 텍스트만 있으면 이벤트 이름·위치·섹션은 자동 매핑됩니다.
<button>로그인</button>
<button>장바구니에 담기</button>
// → login_clicked, add_to_cart_clicked (event_display_name 포함)
// → location, section, button_type도 DOM에서 자동 유추
```

### 빌드 타임 이벤트 이름 생성

- OpenAI API는 **빌드 타임에 1회만 호출**됩니다
- 결과는 `lib/event-names.json`에 저장되어 git으로 관리됩니다
- 같은 텍스트는 모든 유저, 모든 세션에서 항상 동일한 이벤트 이름을 가집니다

### 중복 텍스트 자동 위치 태깅

같은 텍스트의 버튼/링크가 여러 위치에 있으면, `data-location`을 직접 붙이지 않아도 **자동으로 DOM 컨텍스트에서 위치를 유추해 삽입**합니다:

```jsx
// data-location 없이도 자동으로 구분됩니다
<nav>
  <a href="#pricing">요금</a>        // → data-location="nav"  (자동)
</nav>
<footer>
  <a href="#pricing">요금</a>        // → data-location="footer" (자동)
</footer>
<section>
  <button>무료 체험 시작</button>    // → data-location="section_2" (자동)
</section>
<section>
  <button>무료 체험 시작</button>    // → data-location="section_4" (자동)
</section>
```

위치 유추 우선순위 (조상부터 탐색, 수동 지정 시 이보다 우선):
1. 가장 가까운 `<nav>`, `<header>`, `<footer>`, `<main>`, `<aside>`
2. `id`가 있는 `<section>` (예: `"pricing"`)
3. `id`가 없는 `<section>` → 페이지 내 순서 기반 (예: `"section_2"`)

수동으로 지정하면 자동 태깅을 덮어씁니다:

```jsx
<button data-location="pricing_cards">무료 체험 시작</button>
```

## 작동 방식

```
[빌드 타임]
yarn generate:events
    ↓
app/**/*.tsx 스캔 → 한국어 텍스트 추출
    ↓
OpenAI API 호출 (1회, 신규 텍스트만)
    ↓
lib/event-names.json 업데이트 → git 커밋
    { "로그인": "login_clicked", ... }

[런타임]
사용자가 버튼 클릭
    ↓
event-names.json에서 즉시 조회 (동기)
    ↓
Amplitude로 전송
    - Event: "login_clicked"
    - event_display_name: "로그인"
    - location: "navbar" (data-location이 있는 경우)
```

## 설치

```bash
yarn install
```

필요한 패키지:

- `@amplitude/analytics-browser`
- `openai`
- `next`

## 설정

### 1. 환경 변수

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
NEXT_PUBLIC_AMPLITUDE_API_KEY=your_amplitude_api_key
NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-your_openai_api_key
```

### 2. 이벤트 이름 생성

새로운 버튼/링크 텍스트를 추가했을 때 실행합니다:

```bash
yarn generate:events
```

생성된 `lib/event-names.json`을 반드시 git에 커밋하세요. 이 파일이 이벤트 이름의 단일 소스입니다.

### 3. Amplitude 초기화

`app/page.tsx` 또는 `app/layout.tsx`에서 초기화:

```typescript
'use client';

import { useEffect } from 'react';
import { initAmplitude } from '@/lib/amplitude';

export default function Page() {
  useEffect(() => {
    initAmplitude();
  }, []);

  return <div>...</div>;
}
```

### 4. 끝!

이제 모든 버튼과 링크 클릭이 자동으로 추적됩니다.

## 이벤트 이름 수동 오버라이드

`lib/event-names.json`을 직접 편집해 이벤트 이름을 수정할 수 있습니다. `yarn generate:events`를 다시 실행해도 기존 항목은 덮어쓰지 않습니다.

```json
{
  "시작하기": "get_started_clicked",
  "로그인": "login_clicked"
}
```

## 위치 컨텍스트

클릭 시 이벤트 속성에 자동으로 포함됩니다. 모두 DOM 구조에서 자동 유추되며, 수동으로 지정하면 그 값이 우선합니다.

| 속성            | 설명           | 자동 유추 | 예시                         |
| --------------- | -------------- | --------- | ---------------------------- |
| `data-location` | 페이지 내 위치 | ✅ (nav/header/footer/section 등) | `nav`, `footer`, `section_2` |
| `data-section`  | 섹션 분류      | ✅ (조상 `<section id="...">`) | `pricing` (해당 section id)  |

```jsx
// location / section 생략 가능 — 시맨틱 태그만으로 자동 유추
<button>무료 체험 시작</button>

// 필요 시 해당 요소에만 수동 지정
<button data-location="pricing_cards" data-section="conversion">무료 체험 시작</button>
```

## API

### `initAmplitude()`

Amplitude를 초기화하고 클릭 추적을 시작합니다. 중복 호출을 자동으로 방지합니다.

```typescript
initAmplitude();
```

### `handleTrackEvent(logName, displayName, customFields?)`

이벤트를 Amplitude로 직접 전송합니다.

```typescript
handleTrackEvent("login_clicked", "로그인", {
  button_class: "primary",
});
```

## Amplitude 이벤트 구조

```javascript
// 기본
{
  event_type: "login_clicked",
  event_properties: {
    event_display_name: "로그인",
    button_text: "로그인",
    element_type: "button",
    text_length: 3
  }
}

// 중복 텍스트 (data-location 자동 삽입)
{
  event_type: "start_free_trial_clicked",
  event_properties: {
    event_display_name: "무료 체험 시작",
    location: "section_2",   // 자동 유추
    section: "index",
    ...
  }
}

// data-* 속성을 수동으로 지정한 경우
{
  event_type: "start_free_trial_clicked",
  event_properties: {
    event_display_name: "무료 체험 시작",
    button_type: "cta_primary",
    location: "cta_section",  // 수동 지정값 우선
    section: "conversion",
    ...
  }
}
```

## 기술 스택

- **Next.js**
- **Amplitude Analytics Browser**
- **OpenAI GPT-4o-mini** (빌드 타임 전용)
- **TypeScript**
