<template>
  <section id="home" class="hero">
    <div class="container hero-container">
      <div class="hero-content">
        <div class="badge">全新发布 2.0</div>
        <h1 class="hero-title">智云 PMS <span class="gradient-text">智慧酒店管理</span></h1>
        <h2 class="hero-subtitle">新一代云原生酒店管理系统</h2>
        <p class="hero-description">
          基于云服务架构的酒店一体化管理平台，通过多端应用、深度业务整合与极致操作体验，帮助酒店实现高效运营、降本增效、服务升级。
        </p>
        <div class="hero-buttons">
          <button class="btn btn-primary btn-lg" @click="scrollTo('contact')">立即体验</button>
          <button class="btn btn-outline btn-lg" @click="scrollTo('features')">了解更多</button>
        </div>
        
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num">1000+</span>
            <span class="stat-label">合作酒店</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">99.9%</span>
            <span class="stat-label">系统稳定性</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">24/7</span>
            <span class="stat-label">专业服务</span>
          </div>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="dashboard-mockup">
          <div class="dashboard-sidebar">
            <div class="sidebar-item active"></div>
            <div class="sidebar-item"></div>
            <div class="sidebar-item"></div>
            <div class="sidebar-item"></div>
            <div class="sidebar-item bottom"></div>
          </div>
          <div class="dashboard-main">
            <div class="dashboard-header">
              <div class="header-search"></div>
              <div class="header-profile"></div>
            </div>
            <div class="dashboard-content">
              <div class="content-row">
                <div class="stat-card">
                  <div class="card-line"></div>
                  <div class="card-line short"></div>
                </div>
                <div class="stat-card">
                  <div class="card-line"></div>
                  <div class="card-line short"></div>
                </div>
                <div class="stat-card">
                  <div class="card-line"></div>
                  <div class="card-line short"></div>
                </div>
              </div>
              <div class="content-row main-chart">
                <div class="chart-area">
                  <div class="chart-bar" style="height: 40%"></div>
                  <div class="chart-bar" style="height: 70%"></div>
                  <div class="chart-bar" style="height: 50%"></div>
                  <div class="chart-bar" style="height: 85%"></div>
                  <div class="chart-bar" style="height: 60%"></div>
                  <div class="chart-bar" style="height: 90%"></div>
                  <div class="chart-bar" style="height: 75%"></div>
                </div>
              </div>
              <div class="content-row">
                <div class="list-card">
                  <div class="list-item"></div>
                  <div class="list-item"></div>
                  <div class="list-item"></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
    <!-- Background Decor -->
    <div class="hero-bg-shape shape-1"></div>
    <div class="hero-bg-shape shape-2"></div>
  </section>
</template>

<script setup>
const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  padding: 140px 0 80px;
  background-color: #f8fafc;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-bg-shape {
  position: absolute;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.6;
}

.shape-1 {
  top: -10%;
  right: -5%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.4) 0%, rgba(255, 140, 66, 0.1) 70%);
  border-radius: 50%;
}

.shape-2 {
  bottom: -10%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.3) 0%, rgba(255, 107, 53, 0.1) 70%);
  border-radius: 50%;
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  position: relative;
  z-index: 1;
  align-items: center;
}

.hero-content {
  max-width: 600px;
}

.badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255, 107, 53, 0.1);
  color: var(--primary-color);
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 107, 53, 0.2);
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  color: #111827;
}

.gradient-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.hero-subtitle {
  font-size: 24px;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 24px;
}

.hero-description {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 40px;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 48px;
}

.btn-lg {
  padding: 14px 32px;
  font-size: 16px;
  border-radius: 8px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: #e5e7eb;
}

/* Dashboard Mockup */
.hero-visual {
  position: relative;
  perspective: 1000px;
}

.dashboard-mockup {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 12px;
  display: flex;
  gap: 12px;
  transform: rotateY(-5deg) rotateX(2deg);
  transition: transform 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  height: 400px;
}

.dashboard-mockup:hover {
  transform: rotateY(0) rotateX(0);
}

.dashboard-sidebar {
  width: 60px;
  background: #f3f4f6;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  gap: 12px;
}

.sidebar-item {
  width: 32px;
  height: 32px;
  background: #e5e7eb;
  border-radius: 8px;
}

.sidebar-item.active {
  background: var(--primary-color);
}

.sidebar-item.bottom {
  margin-top: auto;
}

.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dashboard-header {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-search {
  width: 200px;
  height: 32px;
  background: #f3f4f6;
  border-radius: 8px;
}

.header-profile {
  width: 32px;
  height: 32px;
  background: #e5e7eb;
  border-radius: 50%;
}

.dashboard-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
}

.content-row {
  display: flex;
  gap: 12px;
}

.stat-card {
  flex: 1;
  height: 80px;
  background: #f9fafb;
  border-radius: 12px;
  padding: 12px;
}

.card-line {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  margin-bottom: 8px;
  width: 60%;
}

.card-line.short {
  width: 40%;
}

.main-chart {
  flex: 2;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #f3f4f6;
  padding: 16px;
}

.chart-area {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
}

.chart-bar {
  flex: 1;
  background: var(--primary-color);
  opacity: 0.2;
  border-radius: 4px 4px 0 0;
  transition: height 1s ease;
}

.chart-bar:hover {
  opacity: 0.8;
}

.list-card {
  flex: 1;
  background: #f9fafb;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-item {
  height: 24px;
  background: #e5e7eb;
  border-radius: 6px;
}

@media (max-width: 968px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 60px;
  }
  
  .hero-content {
    margin: 0 auto;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .dashboard-mockup {
    max-width: 500px;
    margin: 0 auto;
    height: 300px;
  }
  
  .hero-title {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding-top: 100px;
  }
  
  .hero-stats {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .stat-divider {
    display: none;
  }
  
  .stat-item {
    min-width: 100px;
  }
}
</style>
