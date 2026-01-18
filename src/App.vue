<template>
  <div class="app">
    <Header />
    <main>
      <Hero />
      <Features />
      <Scenarios />
      <Downloads />
      <TrainingVideos />
    </main>
    <Footer />
    <!-- 400电话浮动按钮 -->
    <a href="tel:400-688-3040" class="floating-phone">
      <div class="phone-icon-wrapper">
        <IconPhone />
      </div>
      <span class="phone-text">400-688-3040</span>
    </a>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Features from './components/Features.vue'
import Scenarios from './components/Scenarios.vue'
import Downloads from './components/Downloads.vue'
import TrainingVideos from './components/TrainingVideos.vue'
import Footer from './components/Footer.vue'
import IconPhone from './components/IconPhone.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

main {
  flex: 1;
  padding-top: 70px;
}

/* 400电话浮动按钮 */
.floating-phone {
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: var(--primary-gradient);
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: var(--white);
}

.floating-phone:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.5);
  padding-right: 24px;
}

.phone-icon-wrapper {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-text {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .floating-phone {
    right: 20px;
    bottom: 20px;
    padding: 10px 16px;
  }
  
  .phone-text {
    font-size: 14px;
  }
}
</style>
