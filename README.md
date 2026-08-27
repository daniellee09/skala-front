# skala-vue

SK AX Full-Stack Engineering 과정 Vue.js 실습 프로젝트다.

날씨 대시보드 하나를 계속 고쳐 나가는 식으로 진행했다. 처음엔 배열 하드코딩한 목업이었고, 여기에 computed/watch를 붙이고, 컴포넌트로 쪼개고, 라우터랑 Pinia를 얹고, 마지막에 OpenWeatherMap 실 API로 갈아끼웠다. 단계별 결과물은 지우지 않고 남겨둬서 과제 단계 메뉴에서 볼 수 있다.

Vue 3(Composition API), Vue Router 5, Pinia 3, Axios로 만들었고 빌드는 Vite다.

## 실행

```bash
npm install
npm run dev
```

빌드는 `npm run build`, 코드 검사는 `npm run lint`, 정렬은 `npm run format`이다.

### API 키

실 날씨 데이터를 받아오려면 키가 필요하다. 프로젝트 루트에 .env.local 파일을 만들고 OpenWeatherMap에서 발급받은 키를 넣으면 된다.

```
VITE_WEATHER_API_KEY=여기에_키
```

Vite는 VITE_ 로 시작하는 변수만 클라이언트 코드에 넘겨준다. 접두사 빼먹으면 undefined 나온다.

.env.local은 .gitignore의 `*.local` 규칙에 걸려서 저장소에 안 올라간다.

키를 새로 발급했다면 활성화까지 시간이 걸린다. 401이 뜨면 키가 틀린 게 아니라 아직 안 열린 걸 수도 있으니 좀 기다렸다 다시 해보면 된다.

## 화면

| 경로 | 내용 |
|---|---|
| `/` | 메인 대시보드. 도시 검색하고 카드 목록 보는 곳 |
| `/weather/:cityId` | 도시 상세. 현재 날씨 + 미세먼지 + 5일 예보 |
| `/about` | 서비스 소개 |
| `/steps` | 과제 1~3 단계별 결과물 |
| `/practice` | Code Challenge 실습 모음. 챕터별 탭으로 나눠둠 |

정의 안 된 주소로 들어가면 404 페이지가 뜬다.

## 폴더 구조

```
src/
├── main.js               앱 시작점. Pinia랑 Router 등록하고 #app에 붙임
├── App.vue               네비게이션 바 + RouterView
├── router/index.js       라우트 정의
├── stores/               Pinia 스토어
├── services/
│   └── weatherApi.js     axios 인스턴스랑 API 호출 함수
├── components/
│   ├── exercise/         과제용 컴포넌트
│   └── practices/        Code Challenge 실습
│       ├── basic/            디렉티브, 이벤트, 폼, 스타일
│       ├── composition/      ref, reactive, computed, watch
│       ├── component/        lifecycle, props/emits, slot
│       └── library/          Pinia, Axios
└── views/                라우터에 걸리는 페이지들
```

views와 components를 나눈 건 문법적인 차이가 있어서가 아니라, 라우터에 직접 매핑되는 것과 여기저기서 재사용되는 것을 구분하려고 그런 거다.

## 단원별로 한 것

### 과제 1 - 날씨 목업

v-for로 카드를 반복해서 그리고 :key에는 id를 넣었다. 인덱스를 key로 쓰면 중간에 항목이 지워질 때 엉뚱한 DOM이 재사용된다고 해서 그렇게 했다.

25도 기준으로 v-if/v-else로 더움/선선함 뱃지를 나눴고, 검색창은 일부러 v-model 대신 :value + @input으로 직접 구현했다. 이 둘을 합친 게 결국 v-model이라는 걸 확인하려고 그렇게 짰다.

카드를 누르면 상태바가 바뀌고 상세보기 버튼을 누르면 알림창이 뜨는데, 버튼 클릭이 카드 클릭까지 타고 올라가는 문제가 있어서 @click.stop을 붙였다.

### 과제 2 - Composition API

검색 필터를 computed로 만들었다. 처음엔 ref로 필터링된 배열을 따로 두고 검색어 바뀔 때마다 수동으로 갱신할까 했는데, computed를 쓰면 의존하는 값이 바뀔 때만 알아서 다시 계산되고 캐싱까지 된다.

watch로는 상태바 문구가 바뀔 때 로그를 남겼고, watchEffect로는 검색어를 추적했다. 둘의 차이가 헷갈렸는데 watchEffect는 감시 대상을 안 적어도 안에서 쓴 값을 알아서 추적하고 처음에 한 번 즉시 실행된다는 게 제일 큰 차이였다.

이후 실습에서 deep watch랑 multi-source watch도 따로 만들어봤다. deep을 켜면 객체 안쪽 변경까지 잡히긴 하는데 이전 값과 새 값이 똑같이 나와서 과거 추적이 안 된다. 속성 하나만 화살표 함수로 집어서 감시하면 이전 값이 살아있다.

### 과제 3 - 컴포넌트 분리

기능은 그대로 두고 파일만 4개로 쪼갰다. WeatherParent가 상태를 전부 들고 있고 나머지는 표시만 한다.

BaseDashboardCard는 안에 slot만 두고 테두리랑 여백만 담당한다. 검색 박스든 리스트 박스든 이걸로 감싸면 돼서 중복이 줄었다.

SearchBar와 WeatherCard는 props로 값을 받고 emits로 이벤트를 올려보낸다. props가 읽기 전용이라 자식이 직접 못 바꾸는 게 처음엔 불편했는데, 데이터가 어디서 바뀌는지 추적이 쉬워진다는 점에서 납득이 갔다.

여기서 쪼개둔 컴포넌트를 과제 4의 WeatherHomeView에서 그대로 재사용했다.

### 과제 4 - Router

라우트를 정의하고 자주 안 들어가는 페이지는 지연 로딩을 걸었다. 404 처리를 위한 catch-all 라우트는 위에서부터 매칭되기 때문에 반드시 목록 맨 아래에 둬야 한다.

상세보기를 누르면 원래 alert이 떴는데 router.push로 바꿔서 실제 페이지 이동이 되게 했다.

추가로 검색어를 URL 쿼리스트링에 동기화했다. watch로 검색어가 바뀔 때마다 router.push로 주소를 갱신하고, onMounted에서 route.query.search를 읽어서 상태를 복원한다. 이렇게 하면 검색한 상태로 새로고침하거나 링크를 공유해도 검색어가 유지된다.

과제 단계와 실습 모음 라우트도 직접 추가했다.

### 과제 5 - Pinia

온도 단위를 섭씨/화씨로 바꾸는 기능인데, 단위를 바꾸는 토글 버튼은 네비게이션 바에 있고 실제로 온도를 보여주는 건 카드랑 상세 페이지다. 이 둘은 부모-자식이 아니라 사촌 관계라서 props로 넘기려면 중간 컴포넌트들이 전부 배달만 하는 신세가 된다. 그래서 스토어를 썼다.

설계에서 신경 쓴 부분이 하나 있다. 원본 데이터는 항상 섭씨로 두고 화면에 그릴 때만 변환한다. 스토어에 변환된 값을 저장해버리면 25도 기준으로 더움/선선함을 판정하는 뱃지 로직이 깨진다. 화씨로 바꾸면 82라는 숫자가 25보다 크니까 전부 더움이 되어버린다.

스토어를 구조분해하면 반응성이 끊긴다는 것도 삽질하다 알았다. 그래서 configStore.unit 처럼 점 표기법으로 접근한다.

### 과제 6 - Axios

axios.create로 인스턴스를 만들어서 appid, units, lang 같은 공통 파라미터를 한 곳에 모았다. 매번 URL에 붙이지 않아도 돼서 편하다. units=metric을 안 넣으면 켈빈으로 온다는 걸 몰라서 한참 헤맸다.

응답을 그대로 컴포넌트에 넘기지 않고 normalize 함수를 거치게 했다. OpenWeatherMap 응답은 raw.main.temp, raw.weather[0].description 같은 식으로 중첩돼 있는데, 이걸 그대로 넘기면 API가 바뀔 때마다 컴포넌트를 전부 고쳐야 한다. 앱에서 쓰는 모양으로 한 번 번역해두면 컴포넌트는 건드릴 일이 없다.

로딩 상태와 에러 메시지를 따로 두고 try-catch-finally로 처리했다. finally에 로딩 종료를 넣은 건 에러가 나도 스피너가 멈추게 하려고 그런 거다. 에러는 401인지 타임아웃인지에 따라 다른 안내가 나가게 나눴다.

요구사항 2번으로 OpenWeatherMap의 대기오염 API를 붙여서 미세먼지를 표시했고, 3번으로는 Open-Meteo를 연동해서 5일 예보를 넣었다. Open-Meteo는 서버가 다르니까 axios 인스턴스를 따로 만들었다. 응답이 날짜 배열, 최고기온 배열, 최저기온 배열이 따로 오는 형태라서 인덱스로 짝지어 객체 배열로 바꿔야 했다.

호출 순서도 신경 썼다. 대기오염과 예보는 서로 상관없으니까 Promise.all로 동시에 보내고, 좌표가 필요한 요청은 날씨 응답을 받은 다음에 순차로 보낸다.

## 아쉬운 점

온도 변환 로직이 WeatherCard와 WeatherDetailView 두 군데에 거의 똑같이 들어가 있다. 예보에도 단위 변환을 적용하려면 세 번째 중복이 생긴다. composable로 빼면 깔끔해질 것 같은데 이번 범위는 아니라서 남겨뒀다.

다크 모드는 지원하지 않는다. 컴포넌트들이 전부 밝은 배경 기준으로 짜여 있어서 스캐폴딩에 딸려오던 prefers-color-scheme 설정을 꺼두고 라이트 테마로 통일했다.
