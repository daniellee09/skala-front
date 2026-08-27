<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 백엔드 공용 주소 (무료 가상 REST API)
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

const items = ref([]) // 서버에서 받아온 데이터 배열
const textInput = ref('') // 입력창과 연결된 데이터
const log = ref('버튼을 눌러 CRUD를 테스트해 보세요.')

// [READ] GET : 데이터 가져오기
const handleRead = async () => {
  try {
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
    log.value = `GET 성공: ${response.data.length}건 조회`
  } catch (error) {
    log.value = `GET 실패: ${error.message}`
  }
}

// [CREATE] POST : 데이터 등록하기
const handleCreate = async () => {
  if (!textInput.value.trim()) {
    log.value = '⚠️ 저장할 텍스트를 입력하세요.'
    return
  }
  try {
    const response = await axios.post(BASE_URL, {
      title: textInput.value,
      body: '실습으로 등록한 날씨 현황',
      userId: 1,
    })
    // 가상 API라 서버에 실제 저장되지는 않으므로 화면에서만 앞에 붙인다
    items.value.unshift(response.data)
    log.value = `POST 성공: id ${response.data.id} 생성`
    textInput.value = ''
  } catch (error) {
    log.value = `POST 실패: ${error.message}`
  }
}

// [UPDATE] PUT : 데이터 수정하기
const handleUpdate = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, {
      title: `✏️ 수정된 제목 (${new Date().toLocaleTimeString()})`,
      body: '수정된 날씨 현황',
    })
    const target = items.value.find((item) => item.id === id)
    if (target) target.title = response.data.title
    log.value = `PUT 성공: id ${id} 수정`
  } catch (error) {
    log.value = `PUT 실패: ${error.message}`
  }
}

// [DELETE] DELETE : 데이터 삭제하기
const handleDelete = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
    items.value = items.value.filter((item) => item.id !== id)
    log.value = `DELETE 성공: id ${id} 삭제`
  } catch (error) {
    log.value = `DELETE 실패: ${error.message}`
  }
}

// 마운트 시점에 초기 목록 조회
onMounted(handleRead)
</script>

<template>
  <div class="practice-section">
    <h2>⚡ Axios CRUD 프로토타입 훈련</h2>

    <div style="display: flex; gap: 6px; margin-bottom: 10px">
      <input v-model="textInput" placeholder="저장할 텍스트를 입력하세요" style="flex: 1" />
      <button @click="handleCreate">POST (추가)</button>
      <button @click="handleRead">GET (새로고침)</button>
    </div>

    <div v-for="item in items" :key="item.id" class="monitor">
      <p>
        <strong>ID: {{ item.id }}</strong>
      </p>
      <p>{{ item.title }}</p>
      <button @click="handleUpdate(item.id)">PUT (수정)</button>
      <button @click="handleDelete(item.id)">DEL (삭제)</button>
    </div>

    <p style="margin-top: 10px; color: #555">📋 {{ log }}</p>
  </div>
</template>
