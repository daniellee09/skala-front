<script setup>
import { ref } from 'vue'

const result1 = ref('')
const result2 = ref('')
const result3 = ref('')

// 과제 1 — includes / 중첩 구조분해 / 템플릿 리터럴
const runTask1 = () => {
  const members = ['김수원', '이서울', '박부산', '최대전']
  const rawData = { id: 101, grade: 'VIP', details: { score: 95 } }

  const memberContainsPark = members.includes('박부산')

  // details 안쪽까지 한 번에 꺼냄
  const {
    grade,
    details: { score },
  } = rawData

  result1.value = `부산 포함 여부: ${memberContainsPark} / 등급: ${grade} / 점수: ${score}점`
}

// 과제 2 — 스프레드 / 옵셔널 체이닝 / null 병합
const runTask2 = () => {
  const currentCart = ['Apple', 'Banana']
  const newProduct = { name: 'Orange', stock: 0, preview: null }

  // 원본을 건드리지 않고 새 배열을 만듦
  const updatedCart = [...currentCart, newProduct.name]

  const imgStatus = newProduct?.preview ?? '이미지 준비중'

  // 여기서 || 를 쓰면 stock 0 이 falsy 라 10 으로 덮여버림. ?? 여야 0 이 살아남음
  const finalStock = newProduct.stock ?? 10

  result2.value = `카트: ${updatedCart} / 이미지: ${imgStatus} / 수량: ${finalStock}개`
}

// 과제 3 — async/await 연쇄 호출 + try-catch
// 백엔드 대신 setTimeout 으로 지연을 흉내낸 가짜 API
const fetchUserId = () => new Promise((res) => setTimeout(() => res({ uid: 777 }), 400))
const fetchUserProfile = (uid) =>
  new Promise((res) => setTimeout(() => res({ uid, nick: 'Graves' }), 400))

const runTask3 = async () => {
  result3.value = '⏳ 데이터 동기화 중...'
  try {
    // 뒤 요청이 앞 결과를 필요로 하니 Promise.all 이 아니라 순차 실행
    const { uid } = await fetchUserId()
    const { nick } = await fetchUserProfile(uid)
    result3.value = `동기화 성공: ${nick}님 환영합니다. (uid: ${uid})`
  } catch (error) {
    result3.value = `통신 실패: ${error.message}`
  }
}
</script>

<template>
  <div class="practice-section">
    <h2>🎯 Modern JavaScript (ES6+) 문법 점검</h2>

    <h3>과제 1. 데이터 추출 및 포맷팅</h3>
    <button @click="runTask1">과제 1 가동</button>
    <div class="console">결과창 1: {{ result1 }}</div>

    <h3>과제 2. 불변성 복사 및 데이터 방어</h3>
    <button @click="runTask2">과제 2 가동</button>
    <div class="console">결과창 2: {{ result2 }}</div>

    <h3>과제 3. 비동기 연쇄 호출 (Async/Await)</h3>
    <button @click="runTask3">과제 3 가동</button>
    <div class="console">결과창 3: {{ result3 }}</div>
  </div>
</template>

<style scoped>
.console {
  background: #2d2d2d;
  color: #67c23a;
  padding: 12px;
  border-radius: 6px;
  margin-top: 10px;
  margin-bottom: 6px;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 13px;
}
</style>
