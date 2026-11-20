<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <RouterLink class="logo" to="/" @click="closeMenu">
          <h1>北京泰能科技有限公司</h1>
          <span class="tagline">智云PMS - 新一代云原生酒店管理系统</span>
        </RouterLink>
        <ul class="nav-menu" :class="{ active: menuOpen }">
          <li><a href="/#home" @click.prevent="goHomeSection('home')">首页</a></li>
          <li><a href="/#features" @click.prevent="goHomeSection('features')">产品特点</a></li>
          <li><a href="/#scenarios" @click.prevent="goHomeSection('scenarios')">适用场景</a></li>
          <li>
            <RouterLink to="/trial" :class="{ active: isTrial }" @click="closeMenu">申请试用</RouterLink>
          </li>
          <li><a href="/#downloads" @click.prevent="goHomeSection('downloads')">产品下载</a></li>
          <li><a href="/#training-videos" @click.prevent="goHomeSection('training-videos')">培训视频</a></li>
          <li><a href="/#contact" @click.prevent="goHomeSection('contact')">联系我们</a></li>
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
import { computed, nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const menuOpen = ref(false)
const isTrial = computed(() => route.name === 'trial')

const closeMenu = () => {
  menuOpen.value = false
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const scrollToId = async (id) => {
  await nextTick()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const goHomeSection = async (id) => {
  closeMenu()
  if (route.path !== '/') {
    await router.push({ path: '/', hash: `#${id}` })
    return
  }
  await scrollToId(id)
  if (route.hash !== `#${id}`) {
    await router.replace({ hash: `#${id}` })
  }
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

.logo {
  display: block;
  text-decoration: none;
  color: inherit;
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
  text-decoration: none;
}

.nav-menu a:hover,
.nav-menu a.active {
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

.nav-menu a:hover::after,
.nav-menu a.active::after {
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
