import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

// 공통 설정을 담음
const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 5000,
  params: {
    appid: API_KEY,
    units: 'metric', // 켈빈 → 섭씨
    lang: 'kr', // 날씨 설명 한글로
  },
})

// 우리가 다룰 도시 목록 (좌표를 미리 박아둠)
export const CITIES = [
  { id: 'seoul', name: '서울', lat: 37.5665, lon: 126.978 },
  { id: 'suwon', name: '수원', lat: 37.2636, lon: 127.0286 },
  { id: 'busan', name: '부산', lat: 35.1796, lon: 129.0756 },
]

// API 응답(raw)을 우리 앱이 쓰는 모양으로 번역
const normalize = (raw, city) => ({
  id: city.id,
  name: city.name,
  lat: city.lat,
  lon: city.lon,
  temp: Math.round(raw.main.temp), // 섭씨 원본
  status: raw.weather[0].description, // '맑음', '실 비' 등
  icon: raw.weather[0].icon, // '01d'
  humidity: `${raw.main.humidity}%`,
  wind: `${raw.wind.speed}m/s`,
  feelsLike: Math.round(raw.main.feels_like),
})

// 도시 1개 조회
export const fetchWeatherByCity = async (cityId) => {
  const city = CITIES.find((c) => c.id === cityId)
  if (!city) throw new Error('알 수 없는 도시입니다.')

  const res = await weatherApi.get('/weather', {
    params: { lat: city.lat, lon: city.lon }, // 좌표로 요청
  })
  return normalize(res.data, city)
}

// 도시 전체 조회 (병렬)
export const fetchAllWeather = async () => {
  return Promise.all(CITIES.map((c) => fetchWeatherByCity(c.id)))
}

// AQI 지수(1~5)를 한글 라벨로
const AQI_LABEL = ['', '좋음 😊', '보통 🙂', '나쁨 😐', '매우 나쁨 😷', '최악 🤢']

// 대기오염 조회 (같은 baseURL이므로 weatherApi 인스턴스 재사용)
export const fetchAirPollution = async (lat, lon) => {
  const res = await weatherApi.get('/air_pollution', { params: { lat, lon } })
  const item = res.data.list[0]
  return {
    aqi: item.main.aqi, // 1 ~ 5
    aqiLabel: AQI_LABEL[item.main.aqi],
    pm2_5: Math.round(item.components.pm2_5), // 초미세먼지
    pm10: Math.round(item.components.pm10), // 미세먼지
  }
}

// 외부 API 2번 - Open-Meteo (키 필요 없음)
const meteoApi = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 5000,
})

// Open-Meteo 는 날씨를 WMO 코드(숫자)로 준다. 범위별로 묶어서 해석
// https://open-meteo.com/en/docs 의 Weather interpretation codes
const WMO = [
  { codes: [0], label: '맑음', icon: '☀️' },
  { codes: [1], label: '대체로 맑음', icon: '🌤️' },
  { codes: [2], label: '구름 조금', icon: '⛅' },
  { codes: [3], label: '흐림', icon: '☁️' },
  { codes: [45, 48], label: '안개', icon: '🌫️' },
  { codes: [51, 53, 55, 56, 57], label: '이슬비', icon: '🌦️' },
  { codes: [61, 63, 65, 66, 67], label: '비', icon: '🌧️' },
  { codes: [71, 73, 75, 77], label: '눈', icon: '🌨️' },
  { codes: [80, 81, 82], label: '소나기', icon: '🌦️' },
  { codes: [85, 86], label: '소낙눈', icon: '🌨️' },
  { codes: [95, 96, 99], label: '뇌우', icon: '⛈️' },
]

const describeCode = (code) =>
  WMO.find((w) => w.codes.includes(code)) ?? { label: '정보 없음', icon: '❔' }

export const fetchForecast = async (lat, lon) => {
  const res = await meteoApi.get('/forecast', {
    params: {
      latitude: lat,
      longitude: lon,
      daily: 'temperature_2m_max,temperature_2m_min,weather_code',
      timezone: 'Asia/Seoul',
      forecast_days: 5,
    },
  })

  // 응답이 "열(column) 단위"로 와서 "행(row) 단위"로 전치해야 함
  const d = res.data.daily
  return d.time.map((date, i) => {
    const { label, icon } = describeCode(d.weather_code[i])
    return {
      date,
      max: Math.round(d.temperature_2m_max[i]),
      min: Math.round(d.temperature_2m_min[i]),
      status: label,
      icon,
    }
  })
}
