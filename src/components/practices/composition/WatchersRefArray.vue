<script setup>
import { ref, watch } from 'vue'

// 케이스 1: 문자열 배열
const teamMembers = ref(['홍길동', '이순신', '강감찬'])
const logMember = ref('대기 중...')

// 케이스 2: 객체 배열
const cityWeather = ref([
  { name: '서울', temp: 25 },
  { name: '수원', temp: 22 },
  { name: '부산', temp: 26 },
])
const logWeather = ref('대기 중...')

// 1) 기본형 배열의 0번 요소 감시
watch(
  () => teamMembers.value[0],
  (newName, oldName) => {
    logMember.value = `[교체] 0번 멤버: ${oldName} ➡️ ${newName}`
  },
)

// 2) 객체형 배열의 0번 요소 감시
// 가리키는 대상이 객체라 deep 없으면 내부 temp 가 바뀌어도 안 잡힘
watch(
  () => cityWeather.value[0],
  (newSeoul) => {
    logWeather.value = `[날씨 변동] ${newSeoul.name} 기온이 ${newSeoul.temp}℃ 로 변경됨`
  },
  { deep: true },
)
</script>

<template>
  <div class="practice-section">
    <h2>ref 배열의 특정 인덱스 감시</h2>

    <h3>🏃 1) 문자열 배열 — 현재 0번 멤버 [ {{ teamMembers[0] }} ]</h3>
    <button @click="teamMembers[0] = '손흥민'">0번 멤버를 손흥민으로 교체</button>
    <div class="monitor target">
      <p>{{ logMember }}</p>
    </div>

    <h3>⛅ 2) 객체형 배열 — {{ cityWeather[0].name }} 기온 [ {{ cityWeather[0].temp }}℃ ]</h3>
    <button @click="cityWeather[0].temp++">기온 1도 올리기 (temp++)</button>
    <button @click="cityWeather.shift()">첫 번째 요소 제거 (shift)</button>
    <div class="monitor auto">
      <p>{{ logWeather }}</p>
      <small>※ deep 옵션이 있어야 배열 안 객체의 속성 변경까지 감지됩니다.</small>
    </div>
  </div>
</template>
