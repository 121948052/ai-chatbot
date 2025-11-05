/*
 * @Author: Bug Router
 * @Date: 2025-11-04 09:40:17
 * @Description: Default
 */
import axios from 'axios'

const API_BASE = 'http://localhost:3002/api'

export const sendMessage = async (message) => {
  try {
    if (!message || message.trim() === '') {
      throw new Error('消息内容不能为空')
    }

    const response = await axios.post(`${API_BASE}/chat`, {
      message: message.trim()
    })
    
    if (response.status !== 200) {
      throw new Error(`网络响应异常: ${response.status}`);
    }
    return response.data.reply
  } catch (error) {
    throw new Error('发送消息失败')
  }
}