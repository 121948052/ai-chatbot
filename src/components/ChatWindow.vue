<!--
 * @Author: Bug Router
 * @Date: 2025-11-04 09:37:37
 * @Description: Default
-->
<template>
  <div class="chat-container">
    <MessageList :messages="messages" />
    <InputArea 
      @send-message="handleSendMessage"
      :loading="isLoading"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MessageList from './MessageList.vue'
import InputArea from './InputArea.vue'
import { sendMessage } from '@/api/chat'

const messages = ref([
  {
    id: 1,
    text: '亲爱的用户您好，小智同学为您服务。',
    isUser: false,
    senderName: 'AI客服',
    avatar: 'src/assets/rob.png',
    timestamp: new Date()
  },
  {
    id: 2,
    text: '你好',
    isUser: true,
    senderName: '我',
    avatar: 'src/assets/custom.png',
    timestamp: new Date()
  }
])

const isLoading = ref(false)
const fetchAIResponse = async (userInput) => {
  return await sendMessage(userInput)
}

const handleSendMessage = async (userInput) => {
  // 添加用户消息
  messages.value.push({
    id: Date.now(),
    text: userInput,
    isUser: true,
    timestamp: new Date()
  })
  
  // 调用AI接口
  isLoading.value = true
  try {
    const aiResponse = await fetchAIResponse(userInput)
    console.log(aiResponse)
    messages.value.push({
      id: Date.now() + 1,
      text: aiResponse,
      isUser: false,
      timestamp: new Date()
    })
  } catch (error) {
    console.error('API调用失败:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* 基础样式示例 */
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.user-message {
  background: #007bff;
  color: white;
  align-self: flex-end;
}

.ai-message {
  background: #f1f1f1;
  color: #333;
  align-self: flex-start;
}

.input-area {
  display: flex;
  padding: 16px;
  border-top: 1px solid #ddd;
}
</style>
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