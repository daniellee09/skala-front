<script setup>
import { ref } from 'vue'

const lazyText = ref('')
const age = ref('')
const userEmail = ref('')
const price = ref('')
</script>

<template>
  <div class="practice-section">
    <h2>v-model 수식어 (Modifiers) 활용</h2>

    <h3>1) .lazy (change 이벤트 시점에 반영)</h3>
    <input type="text" v-model.lazy="lazyText" placeholder="입력 후 Enter 또는 외부 클릭" />
    <p>
      실시간이 아닌 확정된 값: <strong>{{ lazyText }}</strong>
    </p>

    <h3>2) .number (Number 타입 자동 형변환)</h3>
    <input type="text" v-model.number="age" placeholder="나이를 입력하세요" />
    <p>
      입력된 값: <strong>{{ age }}</strong> / 데이터 타입: <strong>{{ typeof age }}</strong>
    </p>

    <h3>3) .trim (양끝 공백 자동 제거)</h3>
    <input type="text" v-model.trim="userEmail" placeholder="앞뒤 공백을 포함해 입력해 보세요" />
    <p>
      공백 제거된 값: <strong>"{{ userEmail }}"</strong> / 문자열 길이:
      <strong>{{ userEmail.length }}</strong>
    </p>

    <h3>4) Chaining (.trim.number)</h3>
    <input type="text" v-model.trim.number="price" placeholder="공백과 숫자를 섞어 입력해 보세요" />
    <p>
      처리된 값: <strong>"{{ price }}"</strong> / 데이터 타입: <strong>{{ typeof price }}</strong>
    </p>
  </div>
</template>
