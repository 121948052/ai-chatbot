<!--
 * @Author: Bug Router
 * @Date: 2025-11-04 09:38:29
 * @Description: Default
-->
<template>
  <div class="input-area">
    <textarea 
      v-model="inputText"
      @keydown.enter.prevent="handleSend"
      placeholder="请输入您的问题..."
      :disabled="loading"
    />
    <button 
      @click="handleSend"
      :disabled="!inputText.trim() || loading"
    >
      {{ loading ? '发送中...' : '发送' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['loading'])
const emit = defineEmits(['send-message'])

const inputText = ref('')

const handleSend = () => {
  if (inputText.value.trim()) {
    emit('send-message', inputText.value.trim())
    inputText.value = ''
  }
}
</script>