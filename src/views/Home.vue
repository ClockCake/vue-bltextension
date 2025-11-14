<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const menuItems = [
  {
    id: 1,
    title: '新建合同',
    icon: '📝',
    path: '/contract/new'
  },
  {
    id: 2,
    title: '合同列表',
    icon: '📋',
    path: '/contract/list'
  },
  {
    id: 3,
    title: '合同详情(中介)',
    icon: '👔',
    path: '/contract/detail/312312?role=agent'
  },
  {
    id: 4,
    title: '合同详情(租客)',
    icon: '👤',
    path: '/contract/detail/312312?role=tenant'
  },
  {
    id: 5,
    title: '合同详情(房东)',
    icon: '🏠',
    path: '/contract/detail/312312?role=landlord'
  }
  // 后续可以添加更多菜单项
]

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="container">
    <main class="main-content">
      <div class="menu-grid">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="menu-item"
          @click="navigateTo(item.path)"
        >
          <div class="menu-icon">{{ item.icon }}</div>
          <div class="menu-title">{{ item.title }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: env(safe-area-inset-bottom);
}

.main-content {
  padding: 1rem;
  padding-top: calc(1rem + env(safe-area-inset-top));
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  max-width: 100%;
}

@media (max-width: 768px) {
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}

.menu-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  min-height: 120px;
  -webkit-tap-highlight-color: transparent;
}

.menu-item:active {
  transform: scale(0.95);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}

.menu-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.menu-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.menu-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  text-align: center;
  word-break: keep-all;
}
</style>
