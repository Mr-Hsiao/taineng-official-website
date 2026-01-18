<template>
  <section id="scenarios" class="scenarios">
    <div class="container">
      <h2 class="section-title">适用场景</h2>
      <p class="section-subtitle">适配多种酒店业态，助力长期稳定发展</p>

      <div class="scenarios-grid">
        <div class="scenario-card">
          <div class="scenario-icon">
            <IconHotel />
          </div>
          <h3>单体酒店</h3>
          <p>为独立酒店提供专业的管理系统，提升运营效率，优化客户体验</p>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon">
            <IconChain />
          </div>
          <h3>连锁酒店</h3>
          <p>支持集团化管理，统一品牌标准，实现多门店协同运营</p>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon">
            <IconStar />
          </div>
          <h3>精品酒店</h3>
          <p>个性化服务与标准化管理相结合，打造独特品牌魅力</p>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon">
            <IconBeach />
          </div>
          <h3>度假酒店</h3>
          <p>满足度假酒店复杂业务需求，一站式解决餐饮、客房、娱乐管理</p>
        </div>
      </div>

      <div class="cta-section" id="contact">
        <h3>想了解更多？立即联系我们</h3>
        <p>专业团队为您提供定制化解决方案</p>
        <button class="btn btn-primary" @click="handleContact">联系我们</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import IconHotel from './IconHotel.vue'
import IconChain from './IconChain.vue'
import IconStar from './IconStar.vue'
import IconBeach from './IconBeach.vue'

const handleContact = () => {
  // 可以在这里添加联系表单或跳转到联系页面
  alert('请联系我们：\n电话：400-688-3040\n邮箱：keji@talent.com.com\n地址：北京市海淀区上地三街嘉华大厦B1108')
}
</script>

<style scoped>
.scenarios {
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

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 80px;
}

.scenario-card {
  text-align: center;
  padding: 40px 25px;
  background: var(--white);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.scenario-card::before {
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

.scenario-card:hover::before {
  transform: scaleX(1);
}

.scenario-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
}

.scenario-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-gradient);
  color: white;
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.25);
  transition: all 0.3s;
}

.scenario-card:hover .scenario-icon {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 12px 32px rgba(255, 107, 53, 0.35);
}

.scenario-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 15px;
}

.scenario-card p {
  font-size: 14px;
  color: var(--text-light);
  line-height: 1.6;
}

.cta-section {
  text-align: center;
  padding: 60px 40px;
  background: var(--primary-gradient);
  border-radius: 12px;
  color: var(--white);
  box-shadow: var(--shadow-hover);
}

.cta-section h3 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
}

.cta-section p {
  font-size: 16px;
  margin-bottom: 25px;
  opacity: 0.9;
}

.cta-section .btn {
  background-color: var(--white);
  color: var(--primary-color);
  padding: 12px 32px;
  font-size: 16px;
}

.cta-section .btn:hover {
  background-color: #f0f0f0;
  color: var(--primary-dark);
}

@media (max-width: 768px) {
  .scenarios {
    padding: 60px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .section-subtitle {
    font-size: 14px;
    margin-bottom: 40px;
  }

  .scenarios-grid {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 50px;
  }

  .scenario-card {
    padding: 30px 20px;
  }

  .scenario-icon {
    width: 64px;
    height: 64px;
    padding: 12px;
  }

  .scenario-card h3 {
    font-size: 18px;
  }

  .scenario-card p {
    font-size: 13px;
  }

  .cta-section {
    padding: 40px 20px;
  }

  .cta-section h3 {
    font-size: 22px;
  }

  .cta-section p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .scenarios-grid {
    grid-template-columns: 1fr;
  }
}
</style>
