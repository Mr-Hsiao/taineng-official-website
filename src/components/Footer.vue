<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>北京泰能科技有限公司</h3>
          <p class="description">专业的酒店管理系统解决方案提供商<br/>智云PMS - 新一代云原生酒店管理系统</p>
        </div>
        <div class="footer-section">
          <h4>产品中心</h4>
          <ul>
            <li><a href="#home" @click.prevent="scrollTo('home')">智云PMS</a></li>
            <li><a href="#downloads" @click.prevent="scrollTo('downloads')">产品下载</a></li>
            <li><a href="#training-videos" @click.prevent="scrollTo('training-videos')">培训视频</a></li>
            <li><a href="#features" @click.prevent="scrollTo('features')">产品特点</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>关于我们</h4>
          <ul>
            <li><a href="#home" @click.prevent="scrollTo('home')">公司简介</a></li>
            <li><a href="#contact" @click.prevent="scrollTo('contact')">联系我们</a></li>
            <li><a href="#scenarios" @click.prevent="scrollTo('scenarios')">适用场景</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>联系方式</h4>
          <ul>
            <li>📞 电话：400-688-3040</li>
            <li>📧 keji@talent.com.cn</li>
            <li class="address-item">📍 地址：北京市海淀区上地三街嘉华大厦B1108</li>
            <li>🕒 工作时间：周一至周五 9:00-18:00</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 北京泰能科技有限公司 版权所有</p>
        <div class="footer-icp">
          <div class="icp-row">
            <img :src="nationalIcon" alt="国徽" class="national-icon" />
            <a 
              href="https://beian.mps.gov.cn/#/query/webSearch?code=11010802044044" 
              target="_blank" 
              rel="noopener noreferrer"
              class="icp-link"
            >
              京公网安备11010802044044
            </a>
            <span class="icp-separator"></span>
            <a 
              href="https://beian.miit.gov.cn/#/Integrated/index" 
              target="_blank" 
              rel="noopener noreferrer"
              class="icp-link"
            >
              京ICP备2022029105号-2
            </a>
          </div>
          <div class="report-row">
            <span>违法不良信息举报电话：010-62983218</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import nationalIcon from '../assets/national.png'

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
  color: var(--white);
  padding: 60px 0 20px;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: var(--white);
}

.footer-section h4 {
  font-size: 16px;
  margin-bottom: 15px;
  color: var(--white);
}

.footer-section .description {
  color: #999;
  font-size: 14px;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 10px;
  line-height: 1.8;
}

.footer-section ul li.address-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer-section ul li a {
  color: #999;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: var(--white);
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #333;
}

.footer-bottom p {
  color: #666;
  font-size: 13px;
  margin-bottom: 16px;
}

.footer-icp {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.icp-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.national-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  object-fit: contain;
  display: block;
}

.icp-link {
  color: #999;
  font-size: 13px;
  text-decoration: none;
  transition: color 0.3s;
  white-space: nowrap;
}

.icp-link:hover {
  color: var(--primary-color);
}

.icp-separator {
  width: 1px;
  height: 14px;
  background: #555;
  margin: 0 4px;
}

.report-row {
  color: #999;
  font-size: 13px;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0 20px;
  }

  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .footer-section {
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
  }

  .icp-row {
    flex-direction: column;
    gap: 8px;
  }

  .icp-separator {
    display: none;
  }

  .icp-link {
    font-size: 12px;
  }

  .report-row {
    font-size: 12px;
  }
}
</style>
