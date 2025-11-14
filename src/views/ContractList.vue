<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟合同数据
const contracts = ref([
  {
    id: 312312,
    tenantPhone: '185 1000 2388',
    landlordPhone: '185 1000 2388',
    createTime: '2025 年 11 月 07 日 11:10',
    tenantSigned: true,
    landlordSigned: true
  },
  {
    id: 312313,
    tenantPhone: '138 1234 5678',
    landlordPhone: '139 8765 4321',
    createTime: '2025 年 11 月 06 日 09:30',
    tenantSigned: true,
    landlordSigned: false
  },
  {
    id: 312314,
    tenantPhone: '156 9876 5432',
    landlordPhone: '135 1111 2222',
    createTime: '2025 年 11 月 05 日 14:22',
    tenantSigned: true,
    landlordSigned: true
  }
])

// 获取签署状态文本
const getSignStatus = (contract) => {
  if (contract.tenantSigned && contract.landlordSigned) {
    return '双方已签署'
  } else if (contract.tenantSigned && !contract.landlordSigned) {
    return '租客已签署，房东待签署'
  } else if (!contract.tenantSigned && contract.landlordSigned) {
    return '房东已签署，租客待签署'
  } else {
    return '待双方签署'
  }
}

// 查看合同详情
const viewContract = (id, role = 'agent') => {
  router.push({
    name: 'ContractDetail',
    params: { id },
    query: { role }
  })
}

// 删除合同
const deleteContract = (event, id) => {
  // 阻止事件冒泡，避免触发卡片点击
  event.stopPropagation()

  if (confirm('确认要删除这份合同吗？')) {
    const index = contracts.value.findIndex(c => c.id === id)
    if (index > -1) {
      contracts.value.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="container">
    <main class="main-content">
      <div class="contracts-list">
        <div
          v-for="contract in contracts"
          :key="contract.id"
          class="contract-card"
          @click="viewContract(contract.id)"
        >
          <div class="card-header">
            <div class="contract-number">
              合同编号：{{ contract.id }}
            </div>
            <div class="sign-status">
              {{ getSignStatus(contract) }}
            </div>
          </div>

          <div class="card-body">
            <div class="info-row">
              <div class="info-item">
                <div class="info-label">租客手机</div>
                <div class="info-value">{{ contract.tenantPhone }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">房东手机</div>
                <div class="info-value">{{ contract.landlordPhone }}</div>
              </div>
            </div>

            <div class="create-time">
              创建时间：{{ contract.createTime }}
            </div>

            <button class="delete-btn" @click="deleteContract($event, contract.id)">
              删除合同
            </button>
          </div>
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

.contracts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 700px;
  margin: 0 auto;
}

.contract-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}

.contract-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.contract-card:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

.contract-number {
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
}

.sign-status {
  font-size: 0.875rem;
  color: #5b8ff9;
  font-weight: 500;
}

.card-body {
  padding: 1.25rem;
}

.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  font-size: 0.875rem;
  color: #666;
  font-weight: 400;
}

.info-value {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.create-time {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
  padding-top: 0.5rem;
}

.delete-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.delete-btn:hover {
  background-color: #f5f5f5;
  border-color: #d0d0d0;
}

.delete-btn:active {
  transform: scale(0.98);
  background-color: #eeeeee;
}

@media (max-width: 768px) {
  .info-row {
    gap: 1rem;
  }
}
</style>
