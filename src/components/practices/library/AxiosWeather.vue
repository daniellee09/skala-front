<script setup>
import { ref } from 'vue'
import axios from 'axios'

const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const handleFetchWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''

  // API 키는 .env.local 에서 읽어옴. 하드코딩 금지
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=37.5665&lon=126.978&appid=${API_KEY}&units=metric&lang=kr`

  try {
    // 응답 올 때까지 대기
    const response = await axios.get(URL)

    // axios 는 response.data 가 알아서 JSON 으로 파싱돼 있음
    console.log('Axios 통신 응답 전체 객체:', response)
    console.log('백엔드가 준 핵심 날씨 데이터(JSON):', response.data)

    weatherData.value = response.data
  } catch (error) {
    // 4xx/5xx 나 네트워크 끊기면 여기로 옴
    console.error('통신 중 에러가 발생했습니다:', error)
    errorMessage.value = '데이터를 가져오지 못했습니다. API 키 활성화 여부나 주소를 확인하세요.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="practice-section">
    <h2>⚡ Axios 통신 검증</h2>

    <button @click="handleFetchWeather" :disabled="isLoading">
      {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 데이터 당겨오기' }}
    </button>

    <p v-if="errorMessage" style="color: #c0392b">{{ errorMessage }}</p>

    <div v-if="weatherData" class="monitor">
      <p>
        📍 위치: <strong>{{ weatherData.name }}</strong>
      </p>
      <p>
        🌡️ 현재 기온: <strong>{{ weatherData.main.temp }}℃</strong> (units=metric 변환 완료)
      </p>
      <p>
        ☁️ 날씨 상태: <strong>{{ weatherData.weather[0].description }}</strong>
      </p>
      <p>
        💧 습도: <strong>{{ weatherData.main.humidity }}%</strong>
      </p>
    </div>
    <p v-else-if="!isLoading">아직 가져온 데이터가 없습니다. 버튼을 눌러 통신을 가동하세요.</p>
  </div>
</template>
