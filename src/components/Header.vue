<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="logo">
          <h1>北京泰能科技有限公司</h1>
          <span class="tagline">智云PMS - 新一代云原生酒店管理系统</span>
        </div>
        <ul class="nav-menu" :class="{ active: menuOpen }">
          <li><a href="#home" @click.prevent="handleNavClick('home')">首页</a></li>
          <li><a href="#features" @click.prevent="handleNavClick('features')">产品特点</a></li>
          <li><a href="#scenarios" @click.prevent="handleNavClick('scenarios')">适用场景</a></li>
          <li><a href="#downloads" @click.prevent="handleNavClick('downloads')">产品下载</a></li>
          <li><a href="#training-videos" @click.prevent="handleNavClick('training-videos')">培训视频</a></li>
          <li><a href="#contact" @click.prevent="handleNavClick('contact')">联系我们</a></li>
        </ul>
        <button class="menu-toggle" @click="toggleMenu" aria-label="切换菜单">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleNavClick = (id) => {
  scrollTo(id)
  menuOpen.value = false
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--white);
  box-shadow: var(--shadow);
  z-index: 1000;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo h1 {
  font-size: 20px;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 2px;
}

.logo .tagline {
  font-size: 12px;
  color: var(--text-light);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 30px;
}

.nav-menu a {
  font-size: 15px;
  color: var(--text-color);
  position: relative;
}

.nav-menu a:hover {
  color: var(--primary-color);
}

.nav-menu a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.3s;
}

.nav-menu a:hover::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background-color: var(--text-color);
  transition: all 0.3s;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .nav {
    height: 60px;
    position: relative;
  }

  .logo h1 {
    font-size: 16px;
  }

  .logo .tagline {
    font-size: 10px;
    display: block;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--white);
    flex-direction: column;
    gap: 0;
    padding: 20px;
    box-shadow: var(--shadow);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }

  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-menu li {
    width: 100%;
    border-bottom: 1px solid var(--border-color);
  }

  .nav-menu li:last-child {
    border-bottom: none;
  }

  .nav-menu a {
    display: block;
    padding: 15px 0;
    font-size: 15px;
  }
}
</style>
