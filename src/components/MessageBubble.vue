<!--
 * @Author: Bug Router
 * @Date: 2025-11-04 09:38:07
 * @Description: Default
-->
<!-- MessageBubble.vue -->
<template>
  <div :class="['message-bubble', { 'user-message': message.isUser, 'ai-message': !message.isUser }]">
    <!-- 消息头像 -->
    <img :src="message.avatar" alt="avatar" class="avatar" />
    
    <!-- 消息内容 -->
    <div class="content">
      <div class="sender-name">{{ message.senderName }}</div>
      <div class="text">{{ message.text }}</div>
      <div class="timestamp">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

// 计算属性：格式化时间显示
const formattedTime = computed(() => {
  // 可以使用 day.js 或原生 Date 对象进行格式化
  return new Date(props.message.timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>

<style scoped>
.message-bubble {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.user-message {
  flex-direction: row-reverse; /* 用户消息头像在右 */
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.content {
  max-width: 70%;
}

.user-message .content {
  text-align: right;
}

.sender-name {
  font-size: 0.8em;
  color: #666;
  margin-bottom: 4px;
}

.text {
  padding: 8px 12px;
  border-radius: 12px;
  word-break: break-word;
}

.user-message .text {
  background-color: #007bff;
  color: white;
}

.ai-message .text {
  background-color: #f1f1f1;
  color: #333;
}

.timestamp {
  font-size: 0.7em;
  color: #999;
  margin-top: 4px;
}
</style>