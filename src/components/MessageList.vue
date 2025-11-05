<!--
 * @Author: Bug Router
 * @Date: 2025-11-04 09:37:47
 * @Description: Default
-->
<!-- MessageList.vue -->
<template>
  <div class="message-list">
    <!-- 加载更多消息按钮 -->
    <div class="load-more" v-if="hasMoreMessages">
      <button @click="$emit('load-more')">加载更多历史消息</button>
    </div>

    <!-- 消息列表 -->
    <div class="messages">
      <MessageBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
  </div>
</template>

<script setup>
import MessageBubble from './MessageBubble.vue'

// 定义组件接收的属性
const props = defineProps({
  messages: {
    type: Array,
    required: true,
    default: () => [] // 默认为空数组
  },
  hasMoreMessages: {
    type: Boolean,
    default: false
  }
})

// 定义组件触发的事件
defineEmits(['load-more'])
</script>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.load-more {
  text-align: center;
  margin-bottom: 16px;
}

.load-more button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>