<script setup>
import { reactive } from 'vue'

// reactive 는 객체/배열 전용. .value 안 붙임
const userReactive = reactive({ name: '이순신', age: 30 })
const celebrateReactive = () => {
  userReactive.age++
}

const items = reactive(['사과', '바나나'])
const addItem = () => {
  // 통째로 재할당하면 반응성 끊김. push/splice 써야 함
  items.push(`과일 ${items.length + 1}`)
}
const removeItem = (index) => {
  items.splice(index, 1)
}
</script>

<template>
  <div class="practice-section">
    <h2>반응형 상태 reactive() 특징 및 주의점</h2>

    <h3>1) 객체(Object) reactive</h3>
    <p>이름: {{ userReactive.name }} / 나이: {{ userReactive.age }}세</p>
    <button @click="celebrateReactive">reactive 나이 한 살 추가</button>

    <h3>2) 배열(Array) reactive</h3>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <button @click="removeItem(index)" style="margin-left: 8px; padding: 2px 6px">삭제</button>
      </li>
    </ul>
    <button @click="addItem">과일 항목 추가</button>

    <div class="monitor">
      <p>
        ※ reactive는 통째로 재할당하거나 구조분해하면 반응성이 끊어집니다. 실무에서는 ref() 통일이
        권장됩니다.
      </p>
    </div>
  </div>
</template>
