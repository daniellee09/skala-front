<script setup>
import { ref } from 'vue'

const log = ref('아직 이벤트가 발생하지 않았습니다.')
const onceCount = ref(0)
const keyword = ref('')

const handleLink = () => {
  log.value = '.prevent 덕분에 네이버로 이동하지 않고 함수만 실행되었습니다!'
}
const handleBox = () => {
  log.value = '부모 박스가 클릭되었습니다! (버블링 도달)'
}
const handleChild1 = () => {
  log.value = '1번 자식 클릭 → 곧이어 부모 박스 이벤트까지 전염됩니다.'
}
const handleChild2 = () => {
  log.value = '2번 자식 클릭 → .stop 이 버블링을 차단했습니다.'
}
const handleEnter = () => {
  log.value = `.enter 감지: "${keyword.value}" 전송!`
}
</script>

<template>
  <div class="practice-section">
    <h2>이벤트 수식어(Modifiers) 학습</h2>

    <h3>1) .prevent (기본 동작 막기)</h3>
    <a href="https://www.naver.com" @click.prevent="handleLink">네이버 링크</a>

    <h3>2) .stop (이벤트 버블링 막기)</h3>
    <div @click="handleBox" style="padding: 16px; background-color: #eee; border-radius: 6px">
      <p>부모 영역 (클릭 시 이벤트 발동)</p>
      <button @click="handleChild1">버블링 발생 버튼</button>
      <button @click.stop="handleChild2">버블링 차단 버튼</button>
    </div>

    <h3>3) .once (최초 1회만 실행)</h3>
    <button @click.once="onceCount++">한 번만 카운트됨</button>
    <span>실행 횟수: {{ onceCount }}</span>

    <h3>4) .enter (키보드 수식어)</h3>
    <input v-model="keyword" @keyup.enter="handleEnter" placeholder="입력 후 Enter" />

    <div class="monitor">
      <p>{{ log }}</p>
    </div>
  </div>
</template>
