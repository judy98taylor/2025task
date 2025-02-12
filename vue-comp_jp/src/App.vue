<script setup>
import Comp0211 from './components/Comp0211.vue'
import Comp0212 from './components/Comp0212.vue'
import { ref } from 'vue'

// 组件列表
const components = [
  { name: 'Comp0211', path: '/pages/Comp0211.html' },
  { name: 'Comp0212', path: '/pages/Comp0212.html' }
]
</script>

<template>
  <div class="app-container">
    <!-- 导航菜单 -->
    <div class="nav-menu">
      <h2>组件导航</h2>
      <ul>
        <li v-for="comp in components" :key="comp.name">
          <a :href="comp.path">{{ comp.name }}</a>
        </li>
      </ul>
    </div>

    <!-- 组件预览区域 -->
    <div class="preview-area">
      <h3>组件预览</h3>
      <Comp0211 />
      <br />
      <Comp0212 />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding: 20px;
  display: flex;
  gap: 20px;
}

.nav-menu {
  min-width: 200px;
  padding: 20px;
  border-right: 1px solid #eee;
}

.nav-menu ul {
  list-style: none;
  padding: 0;
}

.nav-menu li {
  margin: 10px 0;
}

.nav-menu a {
  color: #0172ad;
  text-decoration: none;
}

.nav-menu a:hover {
  text-decoration: underline;
}

.preview-area {
  flex: 1;
  padding: 20px;
}
</style>