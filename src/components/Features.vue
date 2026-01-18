<template>
  <section id="features" class="features">
    <div class="container">
      <h2 class="section-title">产品特点</h2>
      <p class="section-subtitle">全方位助力酒店数字化转型</p>

      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-header">
            <div class="feature-icon-wrapper">
              <IconCloud />
            </div>
            <h3>云服务架构，开业即上线</h3>
          </div>
          <ul class="feature-list">
            <li><span class="check">✓</span>即开即用，极速部署，大幅缩短酒店筹备与开业周期</li>
            <li><span class="check">✓</span>云端托管，零硬件投入，降低IT成本，减少一次性投入</li>
            <li><span class="check">✓</span>安全稳定，专业保障，多重数据加密与权限管理机制</li>
            <li><span class="check">✓</span>免运维，一站式托管服务，专注酒店经营本身</li>
            <li><span class="check">✓</span>持续升级，灵活配置，自动迭代更新</li>
          </ul>
        </div>

        <div class="feature-item">
          <div class="feature-header">
            <div class="feature-icon-wrapper">
              <IconMobile />
            </div>
            <h3>多端应用，跨平台协同</h3>
          </div>
          <ul class="feature-list">
            <li><span class="check">✓</span>多终端覆盖，随时随地管理</li>
            <li><span class="check">✓</span>支持电脑、平板（iPad）、手机等多种设备</li>
            <li><span class="check">✓</span>全平台兼容，支持Windows、macOS、Linux、Android、iOS等</li>
            <li><span class="check">✓</span>数据实时同步，多端操作实时联动</li>
          </ul>
        </div>

        <div class="feature-item">
          <div class="feature-header">
            <div class="feature-icon-wrapper">
              <IconIntegration />
            </div>
            <h3>一体化平台，高度集成</h3>
          </div>
          <ul class="feature-list">
            <li><span class="check">✓</span>PMS + 餐饮POS深度融合，打通前台、客房、餐饮与管理系统</li>
            <li><span class="check">✓</span>完整PMS应用体系：核心业务系统、接口平台、经理查询App、客房管理App</li>
            <li><span class="check">✓</span>餐饮POS全场景支持：前台收银、电子早餐、厨房打印、iPad点餐</li>
            <li><span class="check">✓</span>开放接口，灵活扩展，对接门锁、支付、会员、财务等第三方系统</li>
          </ul>
        </div>

        <div class="feature-item">
          <div class="feature-header">
            <div class="feature-icon-wrapper">
              <IconRocket />
            </div>
            <h3>极致体验，高效运营</h3>
          </div>
          <ul class="feature-list">
            <li><span class="check">✓</span>现代化界面设计，简洁直观，符合酒店业务操作习惯</li>
            <li><span class="check">✓</span>业务驱动流程设计，减少无效操作，提升工作效率</li>
            <li><span class="check">✓</span>快速上手，培训成本低，新员工快速掌握</li>
            <li><span class="check">✓</span>极速响应，稳定可靠，高性能架构保障高峰期操作流畅</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import IconCloud from './IconCloud.vue'
import IconMobile from './IconMobile.vue'
import IconIntegration from './IconIntegration.vue'
import IconRocket from './IconRocket.vue'
</script>

<style scoped>
.features {
  padding: 80px 0;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
}

.features::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.feature-item {
  background-color: var(--white);
  padding: 30px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
}

.feature-icon-wrapper {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-gradient);
  color: white;
  border-radius: 12px;
  padding: 12px;
  flex-shrink: 0;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

.feature-item:hover .feature-icon-wrapper {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 107, 53, 0.4);
}

.feature-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
}

.feature-list {
  list-style: none;
}

.feature-list li {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 12px;
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
}

.check {
  color: #28a745;
  margin-right: 10px;
  font-weight: bold;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .features {
    padding: 60px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .section-subtitle {
    font-size: 14px;
    margin-bottom: 40px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .feature-item {
    padding: 20px;
  }

  .feature-header {
    gap: 10px;
    margin-bottom: 15px;
    padding-bottom: 10px;
  }

  .feature-icon-wrapper {
    width: 48px;
    height: 48px;
    padding: 8px;
  }

  .feature-header h3 {
    font-size: 18px;
  }

  .feature-list li {
    font-size: 13px;
  }
}
</style>
