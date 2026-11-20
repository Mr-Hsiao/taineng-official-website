import { createApp } from 'vue'
import './assets/css/global.css'
import App from './App.vue'
import router from './router'
import { emptySiteConfig, loadSiteConfig } from './site-config'

async function bootstrap() {
  let config = emptySiteConfig
  let configError = ''
  try {
    config = await loadSiteConfig(new URL(`${import.meta.env.BASE_URL}site-config.json`, window.location.href).href)
  } catch (error) {
    console.error('网站配置加载失败:', error)
    configError = '网站配置加载失败，下载、演示和试用申请暂不可用，请稍后刷新重试。'
  }
  createApp(App)
    .use(router)
    .provide('siteConfig', config)
    .provide('siteConfigError', configError)
    .mount('#app')
}

bootstrap()
