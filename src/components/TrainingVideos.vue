<template>
  <section id="training-videos" class="training-videos">
    <div class="container">
      <h2 class="section-title">产品培训视频</h2>
      <p class="section-subtitle">按业务模块提供教学视频，新员工快速掌握</p>

      <div class="videos-layout" v-if="!loading">
        <div class="topics-sidebar">
          <div class="topics-list">
            <div
              v-for="topic in topics"
              :key="topic.topicId"
              class="topic-item"
            >
              <div
                class="topic-header"
                @click="toggleTopic(topic.topicId)"
              >
                <span class="topic-title">{{ topic.description }}</span>
                <svg
                  :class="{ rotated: expandedTopics[topic.topicId] }"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div
                v-if="expandedTopics[topic.topicId] && subFlows[topic.topicId]"
                class="subflows-list"
              >
                <template v-if="subFlows[topic.topicId].length > 0">
                  <div
                    v-for="subflow in subFlows[topic.topicId]"
                    :key="subflow.subFlowId"
                    class="subflow-item"
                    :class="{ active: currentVideoUrl === subflow.videoFileUrl }"
                    @click="selectVideo(subflow.videoFileUrl, subflow.description)"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 2L13 8L3 14V2Z" fill="currentColor"/>
                    </svg>
                    <span>{{ subflow.description }}</span>
                  </div>
                </template>
                <div v-else class="no-videos">
                  <p>该主题下暂无视频</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="video-player-container">
          <div v-if="!currentVideoUrl" class="video-placeholder">
            <div class="placeholder-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 16L44 32L20 48V16Z" fill="url(#videoGradient)"/>
                <defs>
                  <linearGradient id="videoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FF8C42;stop-opacity:1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p>请从左侧选择培训视频</p>
          </div>
          <div v-else class="video-wrapper">
            <div class="video-header">
              <h3>{{ currentVideoTitle }}</h3>
            </div>
            <div class="video-player">
              <iframe
                :src="currentVideoUrl"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载培训视频中...</p>
      </div>

      <div v-if="!loading && topics.length === 0 && !errorMessage" class="empty-container">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="24" stroke="url(#emptyGradient)" stroke-width="2"/>
            <path d="M32 20V32L40 36" stroke="url(#emptyGradient)" stroke-width="2" stroke-linecap="round"/>
            <defs>
              <linearGradient id="emptyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:0.3" />
                <stop offset="100%" style="stop-color:#FF8C42;stop-opacity:0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p>暂无培训视频</p>
      </div>

      <div v-if="errorMessage" class="error-container">
        <div class="error-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="24" stroke="#ff6b6b" stroke-width="2"/>
            <path d="M32 20V36M32 40V44" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <p class="error-message">{{ errorMessage }}</p>
        <button class="retry-btn" @click="loadTopics">重试</button>
        <p class="error-hint">提示：请打开浏览器控制台（F12）查看详细错误信息</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const topics = ref([])
const subFlows = ref({})
const expandedTopics = ref({})
const currentVideoUrl = ref('')
const currentVideoTitle = ref('')
const errorMessage = ref('')

// 模拟Dart的packParam函数
// Dart代码中：packParam(json.encode(Map.from({...})))
// 传入的是JSON字符串，然后替换到param字段位置
// 最终格式：{"appKey":"xPMSCld","session":"123455","sign":"343435","timestamp":123456,"param":{"moduleId":"iPMS.Cloud","available":"true"}}
const packParam = (param) => {
  const baseObj = {
    appKey: 'xPMSCld',
    session: '123455',
    sign: '343435',
    timestamp: 123456
  }
  
  if (param && param !== '') {
    // 如果传入的是字符串（JSON字符串），解析为对象
    if (typeof param === 'string') {
      baseObj.param = JSON.parse(param)
    } else {
      // 如果已经是对象，直接使用
      baseObj.param = param
    }
  }
  
  return JSON.stringify(baseObj)
}

const loadTopics = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    
    // 按照Dart代码的格式包装参数
    // Dart: packParam(json.encode(Map.from({...})))
    const paramData = {
      moduleId: 'iPMS.Cloud',
      available: 'true'
    }
    
    const requestBody = packParam(JSON.stringify(paramData))
    
    console.log('请求主题数据:', requestBody)
    
    // 直接请求API
    const apiUrl = 'https://ihotelcloud.cn/tyman/topic/querysgtopics'
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: requestBody,
      mode: 'cors',
      credentials: 'omit'
    })
    
    console.log('响应状态:', response.status, response.statusText)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API错误响应:', errorText)
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }
    
    const data = await response.json()
    console.log('API返回数据:', data)
    
    if (data && data.data && Array.isArray(data.data)) {
      topics.value = data.data
        .filter(topic => topic && topic.topicId)
        .sort((a, b) => (a.description || '').localeCompare(b.description || ''))
      console.log('成功加载主题数量:', topics.value.length)
    } else {
      console.warn('API返回数据格式异常:', data)
      errorMessage.value = '数据格式异常，请检查API返回'
    }
  } catch (error) {
    console.error('加载主题失败:', error)
    errorMessage.value = `加载失败: ${error.message || '网络错误或CORS限制'}`
    
    // 如果是CORS错误，提供提示
    if (error.message && error.message.includes('CORS')) {
      errorMessage.value = '跨域请求被阻止，请联系管理员配置CORS'
    }
  } finally {
    loading.value = false
  }
}

const loadSubFlows = async (topicId) => {
  if (subFlows.value[topicId]) {
    return // 已经加载过
  }
  
  try {
    console.log('加载子流程，topicId:', topicId)
    
    // 按照Dart代码的格式包装参数
    // Dart: packParam(json.encode(Map.from({...})))
    const paramData = {
      moduleId: 'iPMS.Cloud',
      topicId: topicId
    }
    
    const requestBody = packParam(JSON.stringify(paramData))
    
    // 直接请求API
    const apiUrl = 'https://ihotelcloud.cn/tyman/topic/querysgtopicsubflows'
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: requestBody,
      mode: 'cors',
      credentials: 'omit'
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('加载子流程API错误:', errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('子流程数据:', data)
    
    if (data && data.data && Array.isArray(data.data)) {
      const filtered = data.data
        .filter(item => item && item.videoFileUrl && item.videoFileUrl.trim() !== '')
        .sort((a, b) => (a.description || '').localeCompare(b.description || ''))
      
      subFlows.value[topicId] = filtered
      console.log(`主题 ${topicId} 的视频数量:`, filtered.length)
    } else {
      console.warn('子流程数据格式异常:', data)
      subFlows.value[topicId] = []
    }
  } catch (error) {
    console.error('加载子流程失败:', error)
    subFlows.value[topicId] = []
  }
}

const toggleTopic = async (topicId) => {
  expandedTopics.value[topicId] = !expandedTopics.value[topicId]
  if (expandedTopics.value[topicId]) {
    await loadSubFlows(topicId)
  }
}

const selectVideo = (url, title) => {
  currentVideoUrl.value = url
  currentVideoTitle.value = title
}

onMounted(() => {
  loadTopics()
})
</script>

<style scoped>
.training-videos {
  padding: 80px 0;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  min-height: 600px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  color: var(--text-color);
}

.section-subtitle {
  font-size: 16px;
  text-align: center;
  color: var(--text-light);
  margin-bottom: 40px;
}

.videos-layout {
  display: flex;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background: var(--white);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.topics-sidebar {
  width: 320px;
  background: #f8f9fa;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  max-height: 700px;
}

.topics-list {
  padding: 20px 0;
}

.topic-item {
  border-bottom: 1px solid var(--border-color);
}

.topic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
}

.topic-header:hover {
  background: rgba(255, 107, 53, 0.05);
}

.topic-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color);
  flex: 1;
}

.topic-header svg {
  transition: transform 0.3s;
  color: var(--text-light);
}

.topic-header svg.rotated {
  transform: rotate(180deg);
}

.subflows-list {
  background: var(--white);
  padding: 8px 0;
}

.subflow-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px 12px 40px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  color: var(--text-light);
}

.subflow-item:hover {
  background: rgba(255, 107, 53, 0.08);
  color: var(--primary-color);
}

.subflow-item.active {
  background: linear-gradient(90deg, rgba(255, 107, 53, 0.1), transparent);
  color: var(--primary-color);
  font-weight: 500;
}

.subflow-item svg {
  flex-shrink: 0;
  color: var(--primary-color);
}

.no-videos {
  padding: 20px 40px;
  text-align: center;
  color: var(--text-light);
  font-size: 14px;
}

.video-player-container {
  flex: 1;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.video-placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  padding: 60px 20px;
}

.placeholder-icon {
  margin-bottom: 20px;
  opacity: 0.5;
}

.video-placeholder p {
  font-size: 16px;
}

.video-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
}

.video-header {
  margin-bottom: 20px;
}

.video-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
}

.video-player {
  flex: 1;
  position: relative;
  width: 100%;
  min-height: 500px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-player iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 500px;
  border: none;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: var(--text-light);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 107, 53, 0.1);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: var(--text-light);
}

.empty-icon {
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-container p {
  font-size: 16px;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: var(--text-light);
}

.error-icon {
  margin-bottom: 20px;
}

.error-message {
  font-size: 16px;
  color: #ff6b6b;
  margin-bottom: 20px;
  text-align: center;
  max-width: 600px;
}

.error-hint {
  font-size: 14px;
  color: var(--text-light);
  margin-top: 20px;
  opacity: 0.7;
}

.retry-btn {
  padding: 10px 24px;
  background: var(--primary-gradient);
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

@media (max-width: 1024px) {
  .videos-layout {
    flex-direction: column;
  }

  .topics-sidebar {
    width: 100%;
    max-height: 300px;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }

  .video-player-container {
    min-height: 400px;
  }
}

@media (max-width: 768px) {
  .training-videos {
    padding: 60px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .section-subtitle {
    font-size: 14px;
    margin-bottom: 30px;
  }

  .videos-layout {
    border-radius: 12px;
  }

  .topics-sidebar {
    max-height: 250px;
  }

  .topic-header {
    padding: 14px 16px;
  }

  .topic-title {
    font-size: 14px;
  }

  .subflow-item {
    padding: 10px 16px 10px 32px;
    font-size: 13px;
  }

  .video-wrapper {
    padding: 16px;
  }

  .video-header h3 {
    font-size: 18px;
  }

  .video-wrapper {
    padding: 12px;
  }

  .video-player {
    min-height: 300px;
  }

  .video-player iframe {
    min-height: 300px;
  }
}
</style>
