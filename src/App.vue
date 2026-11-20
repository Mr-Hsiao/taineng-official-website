<template>
  <div class="app">
    <Header />
    <main>
      <p v-if="configError" class="config-error" role="alert">{{ configError }}</p>
      <RouterView />
    </main>
    <Footer />
    <a v-if="!isTrial" href="tel:400-688-3040" class="floating-phone">
      <div class="phone-icon-wrapper">
        <IconPhone />
      </div>
      <span class="phone-text">400-688-3040</span>
    </a>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import IconPhone from './components/IconPhone.vue'

const configError = inject('siteConfigError', '')
const route = useRoute()
const isTrial = computed(() => route.name === 'trial')
</script>

<style scoped>
.config-error {
  padding: 16px;
  margin: 0;
  text-align: center;
  color: #9c2f14;
  background: #fff3ed;
}

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
