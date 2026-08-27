# skala-vue · Weather Dashboard

SK AX **Full-Stack Engineering — Frontend framework: Vue.js** 과정 종합 실습 프로젝트입니다.
하나의 "날씨 대시보드"를 목업 → Composition API → 컴포넌트 분리 → 라우터 → 스토어 → 실 API 연동 순으로 발전시켰습니다.

- **Vue 3** (Composition API / `<script setup>`)
- **Vue Router 5** · **Pinia 3** · **Axios 1.x**
- **Vite 8** 빌드, ESLint + Oxlint + Prettier 품질 관리

---

## 🚀 실행 방법

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 배포 산출물(dist/) 생성
npm run lint     # Oxlint + ESLint 정적 검사
npm run format   # Prettier 코드 정렬
```

### API 키 설정 (필수)

프로젝트 루트에 `.env.local` 파일을 만들고 [OpenWeatherMap](https://openweathermap.org/) 키를 넣습니다.

```
VITE_WEATHER_API_KEY=발급받은_API_키
```

> `.env.local`은 `.gitignore`의 `*.local` 규칙으로 저장소에 올라가지 않습니다.
> Vite는 `VITE_` 접두사가 붙은 변수만 클라이언트 코드에 노출합니다.
> 키를 새로 발급했다면 활성화까지 최대 2시간이 걸릴 수 있습니다(401 응답).

---

## 🗺️ 화면 구성

| 경로 | 화면 | 설명 |
|---|---|---|
| `/` | WeatherHomeView | 실시간 날씨 대시보드 (검색 + 카드 목록) |
| `/weather/:cityId` | WeatherDetailView | 도시 상세 — 현재 날씨 · 대기질 · 5일 예보 |
| `/about` | WeatherAboutView | 서비스 소개 |
| `/steps` | StepsView | 과제 1~3 단계별 스냅샷 |
| `/practice` | PracticeView | Code Challenge 실습 모음 (챕터 탭) |
| `*` | NotFoundView | Catch-all 404 |

---

## 📁 폴더 구조

```
src/
├── main.js                     # 앱 진입점 (Pinia · Router 등록 후 #app에 마운트)
├── App.vue                     # 루트 컴포넌트 — 네비게이션 바 + <RouterView />
├── router/index.js             # 라우트 정의 (지연 로딩, 동적 경로, Catch-all)
├── stores/
│   ├── counter.js              # Pinia 기본 실습 스토어
│   └── configStore.js          # 온도 단위(섭씨/화씨) 전역 상태
├── services/
│   └── weatherApi.js           # Axios 인스턴스 + API 호출 계층
├── components/
│   ├── exercise/               # 과제용 부품 컴포넌트
│   │   ├── WeatherMockup.vue       # 과제1 스냅샷
│   │   ├── WeatherComposition.vue  # 과제2 스냅샷
│   │   ├── WeatherParent.vue       # 과제3 스냅샷
│   │   ├── BaseDashboardCard.vue   # slot 기반 공통 카드
│   │   ├── SearchBar.vue           # props ↓ / emits ↑
│   │   ├── WeatherCard.vue         # props ↓ / emits ↑
│   │   └── UnitToggler.vue         # Pinia 단위 토글
│   └── practices/              # Code Challenge 실습
│       ├── basic/                  # 디렉티브 · 이벤트 · 폼 · 스타일
│       ├── composition/            # ref/reactive/computed/watch
│       ├── component/              # lifecycle · props&emits · slot
│       └── library/                # Pinia · Axios
└── views/                      # 라우터에 매핑되는 페이지 단위 컴포넌트
```

---

## 📌 단원별 Customization 내역

### 3장 · Vue Syntax — 과제 1 (Weather Mockup)

- `v-for` + `:key="item.id"`로 날씨 카드 반복 렌더링
- `v-if` / `v-else`로 25℃ 기준 **🔥 더움 / ❄️ 선선함** 뱃지 분기
- `v-model` 대신 `:value` + `@input`으로 한글 입력 동기화 원리를 직접 구현
- 카드 클릭 → 상태바 갱신, `@click.stop`으로 **상세보기 버튼의 버블링 차단**
- **[추가]** 디렉티브 실습 컴포넌트를 `basic/`에 개별 파일로 분리하고 `/practice` 탭에서 한눈에 비교

### 4장 · Composition API — 과제 2 (Weather Composition)

- `computed`로 `filteredWeatherList` 실시간 검색 필터 구현 (캐싱 활용)
- `watch`로 `selectedCityInfo` 변화를 감시해 콘솔 로그 기록
- `watchEffect`로 `searchQuery`를 자동 추적하는 API 시뮬레이션
- 검색 결과가 없을 때 안내 문구 노출
- **[추가]** Deep Watch / Multi-Source Watch / reactive Watch를 별도 실습 컴포넌트로 작성해 **이전 값(oldValue) 추적 가능 여부 차이**를 눈으로 검증

### 5장 · Vue Components — 과제 3 (Weather Component)

- 기능 변경 없이 4개 컴포넌트로 분리: `WeatherParent` / `BaseDashboardCard` / `SearchBar` / `WeatherCard`
- `BaseDashboardCard`는 `<slot>`만 두어 검색 박스·리스트 박스 디자인을 공통화
- `SearchBar` → `update-query`, `WeatherCard` → `select-card` / `click-detail` 커스텀 이벤트로 상향 전달
- 컴포넌트별 디자인을 `<style scoped>`로 격리
- **[추가]** 상태는 부모가 소유하고 자식은 표시만 담당하도록 **단방향 데이터 흐름**을 일관되게 유지

### 6장 · Vue Router — 과제 4 (Weather Router)

- `createWebHistory` 기반 라우터, `/about` · `/weather/:cityId` 등에 **지연 로딩** 적용
- `/:pathMatch(.*)*` Catch-all Route를 목록 마지막에 배치해 404 처리
- 상세보기에서 `window.alert()` 제거 → `router.push('/weather/' + id)` **Programmatic Navigation**으로 전환
- **[추가]** `watch(searchQuery)` + `router.push({ query })`로 **검색어를 URL 쿼리스트링과 동기화**하고, `onMounted`에서 `route.query.search`를 읽어 새로고침 후에도 검색 상태를 복원
- **[추가]** `/steps`(과제 단계 스냅샷), `/practice`(실습 모음) 라우트를 직접 설계해 추가

### 7장 · Pinia — 과제 5 (Weather Store)

- `configStore.js` 작성 — state `unit`, getter `unitSymbol`, action `toggleUnit`
- `UnitToggler.vue`를 네비게이션 바에 배치해 전역 단위 전환
- 메인·상세 양쪽에 `displayTemp` computed로 섭씨/화씨 변환 적용
- **[설계 포인트]** 원본 데이터는 **항상 섭씨로 고정**하고 표시 시점에만 변환 → 화씨 모드에서도 `temp >= 25` 뱃지 판정이 깨지지 않음
- 스토어를 구조분해하지 않고 `configStore.xxx` 형태로 접근해 반응성 유실 방지

### 8장 · Axios — 과제 6 (Weather Axios)

- `services/weatherApi.js`에 `axios.create()` 인스턴스를 만들어 `appid` · `units=metric` · `lang=kr` 공통 파라미터 일원화
- **응답 정규화 계층(`normalize`)** 도입 — OpenWeatherMap 원본 JSON을 앱 전용 모양으로 변환해, API가 바뀌어도 컴포넌트를 수정하지 않도록 격리
- `isLoading` / `errorMessage` 비동기 3종 상태와 `try-catch-finally` 처리
- 401(키 미활성) · `ECONNABORTED`(타임아웃) 등 **에러 원인별 안내 메시지** 분기
- **[요구사항 2]** OpenWeatherMap **Air Pollution API**를 추가해 상세 페이지에 미세먼지(PM10/PM2.5)·통합지수 표시
- **[요구사항 3]** 외부 API **Open-Meteo**를 연동해 5일 예보 표시 — 서버가 다르므로 **두 번째 axios 인스턴스**를 분리 생성
- **[성능]** 독립 요청은 `Promise.all` 병렬, 좌표 의존 요청은 순차 실행으로 구분

---

## ✅ 품질 관리

```bash
npm run lint     # Oxlint 0 errors / ESLint 0 errors
npm run build    # 빌드 성공 확인
```

- API 키는 환경 변수로 분리하여 저장소에 노출되지 않습니다.
- Prettier 설정: 세미콜론 없음, 홑따옴표, 들여쓰기 2칸 (`.prettierrc.json`)
