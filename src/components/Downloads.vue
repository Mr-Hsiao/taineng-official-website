<template>
  <section id="downloads" class="downloads">
    <div class="container">
      <h2 class="section-title">产品下载</h2>
      <p class="section-subtitle">下载智云PMS相关产品及工具</p>

      <p v-if="products.length === 0" role="status">暂无可用下载</p>
      <div class="downloads-grid">
        <div 
          v-for="product in products" 
          :key="product.name"
          class="download-card"
        >
          <!-- 二维码显示区域（替换原来的图标） -->
          <div class="qrcode-container">
            <div class="qrcode-wrapper">
              <canvas :ref="el => setQRCodeRef(product.name, el)" class="qrcode-canvas"></canvas>
              <p class="qrcode-hint">扫码下载</p>
            </div>
          </div>
          
          <h3>{{ product.name }}</h3>
          <p class="download-type">{{ getFileType(product.url) }}</p>
          
          <!-- 下载按钮 -->
          <a 
            :href="product.url" 
            :download="getFileName(product.url)"
            class="download-btn"
            target="_blank"
            rel="noopener noreferrer"
            @click="handleDownload(product.name)"
          >
            <span>立即下载</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, inject } from 'vue'
import QRCode from 'qrcode'

const { downloads: products } = inject('siteConfig')

const qrcodeRefs = ref({})

const getFileType = (url) => {
  const extension = new URL(url, window.location.href).pathname.split('.').pop().toLowerCase()
  const typeMap = {
    'exe': 'Windows安装包',
    'apk': 'Android应用',
    'zip': '压缩包',
    'dmg': 'macOS安装包',
    'deb': 'Debian安装包'
  }
  return typeMap[extension] || '文件'
}

const getFileName = (url) => {
  return new URL(url, window.location.href).pathname.split('/').pop()
}

const handleDownload = (productName) => {
  // 可以在这里添加下载统计或日志记录
  console.log(`开始下载: ${productName}`)
}

const setQRCodeRef = (productName, el) => {
  if (el) {
    qrcodeRefs.value[productName] = el
    generateQRCode(productName)
  }
}

const generateQRCode = async (productName) => {
  const product = products.find(p => p.name === productName)
  if (!product) return
  
  const canvas = qrcodeRefs.value[productName]
  if (!canvas) return
  
  try {
    await QRCode.toCanvas(canvas, product.url, {
      width: 180,
      margin: 2,
      color: {
        dark: '#1f2937',
        light: '#ffffff'
      }
    })
  } catch (error) {
    console.error('生成二维码失败:', error)
  }
}

</script>

<style scoped>
.downloads {
  padding: 80px 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  position: relative;
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
  margin-bottom: 60px;
}

.downloads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.download-card {
  background: var(--white);
  padding: 32px 24px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.download-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--primary-gradient);
  transform: scaleX(0);
  transition: transform 0.3s;
}

.download-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
  border-color: rgba(255, 107, 53, 0.3);
}

.download-card:hover::before {
  transform: scaleX(1);
}

.download-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
  margin-top: 20px;
}

.download-type {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 20px;
}

.qrcode-container {
  margin: 0 auto 20px;
  animation: fadeIn 0.3s ease;
}

.qrcode-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  border-radius: 16px;
  border: 2px solid var(--border-color);
  transition: all 0.3s;
}

.download-card:hover .qrcode-wrapper {
  border-color: rgba(255, 107, 53, 0.3);
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.15);
  transform: translateY(-2px);
}

.qrcode-canvas {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  background: var(--white);
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qrcode-hint {
  font-size: 13px;
  color: var(--text-light);
  margin: 0;
  font-weight: 500;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  width: 100%;
  background: var(--primary-gradient);
  color: var(--white);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  background: var(--hover-gradient);
}

.download-btn svg {
  transition: transform 0.3s;
}

.download-btn:hover svg {
  transform: translateY(2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .downloads {
    padding: 60px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .section-subtitle {
    font-size: 14px;
    margin-bottom: 40px;
  }

  .downloads-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }

  .download-card {
    padding: 24px 20px;
  }

  .download-card h3 {
    font-size: 18px;
    margin-top: 16px;
  }

  .qrcode-wrapper {
    padding: 12px;
  }

  .qrcode-canvas {
    width: 140px;
    height: 140px;
  }
}

@media (max-width: 480px) {
  .downloads-grid {
    grid-template-columns: 1fr;
  }
}
</style>
