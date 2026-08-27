<script setup>
import { reactive, ref, watch } from 'vue'

// 즐겨찾기 도시 목록 모형
const cityList = reactive(['서울', '수원'])

const logAuto = ref('대기 중...')
const logCopy = ref('대기 중...')

// 1) 변수명 그대로 감시 — 추가/삭제는 잡히는데 oldArr 가 newArr 와 같은 걸 가리킴
watch(cityList, (newArr, oldArr) => {
  logAuto.value = `[자동 감시] 이전 길이인 척하는: ${oldArr.length} / 현재 길이: ${newArr.length}`
})

// 2) 화살표 함수로 복사본을 만들어 감시 — 과거 배열이 그대로 보존됨
watch(
  () => [...cityList],
  (newArr, oldArr) => {
    logCopy.value = `[스냅샷 감시] 진짜 과거 길이: ${oldArr.length} (${oldArr}) ➡️ 현재 길이: ${newArr.length}`
  },
)
</script>

<template>
  <div class="practice-section">
    <h2>reactive() 배열 감시와 스냅샷</h2>

    <h3>즐겨찾기 도시 목록 (reactive 배열)</h3>
    <p>
      현재 등록된 도시: <strong>{{ cityList }}</strong>
    </p>
    <button @click="cityList.push('부산')">부산 추가 (push)</button>&nbsp;
    <button @click="cityList.pop()">최근 도시 삭제 (pop)</button>

    <div class="monitor auto">
      <h3>👁️ 1) cityList 변수명 그대로 감시</h3>
      <p>{{ logAuto }}</p>
      <small>※ 이전 배열과 현재 배열이 같은 객체라 길이/내용물이 똑같이 찍힙니다.</small>
    </div>

    <div class="monitor target">
      <h3>🎯 2) () =&gt; [...cityList] 복사본 감시</h3>
      <p>{{ logCopy }}</p>
      <small>※ 매번 새 배열을 만들어 넘기므로 과거 값이 보존됩니다.</small>
    </div>
  </div>
</template>
