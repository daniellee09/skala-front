<script setup>
// 부모한테 받을 데이터 규격 정의. props 는 읽기 전용이라 자식이 직접 못 바꿈
defineProps({
  parentData: {
    type: String,
    required: true,
  },
})

// 부모한테 쏠 이벤트 이름 등록
const emit = defineEmits(['update-request'])

// 버튼 누르면 데이터 실어서 부모한테 올려보냄
const sendNotification = () => {
  const payload = 'Child에서 가공한 새로운 데이터'
  emit('update-request', payload)
}
</script>

<template>
  <div class="child-container">
    <h2>하위 컴포넌트 (Child)</h2>
    <p>
      수신된 Props 데이터: <strong>{{ parentData }}</strong>
    </p>
    <br />
    <button @click="sendNotification">상위 컴포넌트로 갱신 요청 (Emit)</button>
  </div>
</template>

<style scoped>
.child-container {
  border: 2px dashed #3498db;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
}
</style>
