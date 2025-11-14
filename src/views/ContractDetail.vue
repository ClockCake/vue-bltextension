<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 身份类型：agent(中介), tenant(租客), landlord(房东)
const userRole = ref('agent')
const contractId = ref('')

// 合同数据
const contractData = ref({
  id: '312312',
  tenantPhone: '185 1000 2388',
  tenantName: '张三',
  tenantIdCard: '110101199001011234',
  tenantSigned: false, // 租客是否已签约
  landlordPhone: '185 1000 2388',
  landlordName: '李四',
  landlordIdCard: '110101198001011234',
  landlordSigned: true, // 房东是否已签约
  propertyAddress: '海淀区中关村大街1号',
  buildingNumber: '3栋2单元501',
  monthlyRent: '5000',
  deposit: '5000',
  startDate: '2025-01-01',
  endDate: '2025-12-31',
  leaseTerm: '12个月',
  paymentMethod: '付三压一',
  utilities: '租客承担',
  otherMatters: '租期内不得转租，爱护房屋设施。',
  contractPdfUrl: 'https://example.com/contract.pdf' // 电子合同PDF地址
})

// 页面加载时获取参数
onMounted(() => {
  // 从 URL 获取身份类型和合同ID
  userRole.value = route.query.role || 'agent'
  contractId.value = route.query.id || route.params.id || '312312'

  // TODO: 根据 contractId 从后端获取合同数据
  // fetchContractData(contractId.value)
})

// 根据身份类型计算需要展示的字段
const displayFields = computed(() => {
  const role = userRole.value

  if (role === 'agent') {
    // 中介看到所有字段
    return [
      { label: '行程 ID', value: contractData.value.id, key: 'id' },
      { label: '租客手机号', value: contractData.value.tenantPhone, key: 'tenantPhone' },
      { label: '房东手机号', value: contractData.value.landlordPhone, key: 'landlordPhone' },
      { label: '房东姓名', value: contractData.value.landlordName, key: 'landlordName' },
      { label: '房东身份证', value: contractData.value.landlordIdCard, key: 'landlordIdCard' },
      { label: '房源地址', value: contractData.value.propertyAddress, key: 'propertyAddress' },
      { label: '楼栋门牌号', value: contractData.value.buildingNumber, key: 'buildingNumber' },
      { label: '租金（元/月）', value: contractData.value.monthlyRent, key: 'monthlyRent' },
      { label: '押金', value: contractData.value.deposit, key: 'deposit' },
      { label: '租约开始日期', value: formatDate(contractData.value.startDate), key: 'startDate' },
      { label: '租约结束日期', value: formatDate(contractData.value.endDate), key: 'endDate' },
      { label: '租期（几个月）', value: contractData.value.leaseTerm, key: 'leaseTerm' },
      { label: '收租方式（付几压几）', value: contractData.value.paymentMethod, key: 'paymentMethod' },
      { label: '水电费', value: contractData.value.utilities, key: 'utilities' },
      { label: '其他事项', value: contractData.value.otherMatters, key: 'otherMatters', fullWidth: true }
    ]
  } else if (role === 'landlord') {
    // 房东看到的字段
    return [
      { label: '房源地址', value: contractData.value.propertyAddress, key: 'propertyAddress' },
      { label: '楼栋门牌号', value: contractData.value.buildingNumber, key: 'buildingNumber' },
      { label: '租金（元/月）', value: contractData.value.monthlyRent, key: 'monthlyRent' },
      { label: '押金', value: contractData.value.deposit, key: 'deposit' },
      { label: '租约开始日期', value: formatDate(contractData.value.startDate), key: 'startDate' },
      { label: '租约结束日期', value: formatDate(contractData.value.endDate), key: 'endDate' },
      { label: '租期（几个月）', value: contractData.value.leaseTerm, key: 'leaseTerm' },
      { label: '收租方式（付几压几）', value: contractData.value.paymentMethod, key: 'paymentMethod' },
      { label: '水电费', value: contractData.value.utilities, key: 'utilities' },
      { label: '其他事项', value: contractData.value.otherMatters, key: 'otherMatters', fullWidth: true }
    ]
  } else if (role === 'tenant') {
    // 租客看到的字段
    return [
      { label: '租客姓名', value: contractData.value.tenantName, key: 'tenantName' },
      { label: '租客证件号码', value: contractData.value.tenantIdCard, key: 'tenantIdCard' },
      { label: '租客手机号', value: contractData.value.tenantPhone, key: 'tenantPhone' },
      { label: '房源地址', value: contractData.value.propertyAddress, key: 'propertyAddress' },
      { label: '楼栋门牌号', value: contractData.value.buildingNumber, key: 'buildingNumber' },
      { label: '租金（元/月）', value: contractData.value.monthlyRent, key: 'monthlyRent' },
      { label: '押金', value: contractData.value.deposit, key: 'deposit' },
      { label: '租约开始日期', value: formatDate(contractData.value.startDate), key: 'startDate' },
      { label: '租约结束日期', value: formatDate(contractData.value.endDate), key: 'endDate' },
      { label: '租期（几个月）', value: contractData.value.leaseTerm, key: 'leaseTerm' },
      { label: '收租方式（付几压几）', value: contractData.value.paymentMethod, key: 'paymentMethod' },
      { label: '水电费', value: contractData.value.utilities, key: 'utilities' },
      { label: '其他事项', value: contractData.value.otherMatters, key: 'otherMatters', fullWidth: true }
    ]
  }

  return []
})

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year} 年 ${month} 月 ${day} 日`
}

// 判断当前用户是否需要签约
const needSign = computed(() => {
  const role = userRole.value
  if (role === 'tenant') {
    return !contractData.value.tenantSigned
  } else if (role === 'agent') {
    return !contractData.value.tenantSigned || !contractData.value.landlordSigned
  }
  return false // 房东不显示签约按钮
})

// 判断是否显示电子合同查看按钮（中介和租客显示）
const showContractView = computed(() => {
  return userRole.value === 'agent' || userRole.value === 'tenant'
})

// 查看电子合同
const viewContract = () => {
  // 可以打开PDF或跳转到合同查看页面
  const contractUrl = contractData.value.contractPdfUrl

  // 通知原生打开合同
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      action: 'viewContract',
      contractId: contractData.value.id,
      url: contractUrl
    }))
  } else if (window.webkit?.messageHandlers?.viewContract) {
    window.webkit.messageHandlers.viewContract.postMessage({
      contractId: contractData.value.id,
      url: contractUrl
    })
  } else if (window.android?.viewContract) {
    window.android.viewContract(contractData.value.id, contractUrl)
  } else {
    // 浏览器环境，直接打开
    window.open(contractUrl, '_blank')
  }
}

// 立即签约
const signContract = () => {
  // 通知原生进行签约
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      action: 'signContract',
      contractId: contractData.value.id,
      role: userRole.value
    }))
  } else if (window.webkit?.messageHandlers?.signContract) {
    window.webkit.messageHandlers.signContract.postMessage({
      contractId: contractData.value.id,
      role: userRole.value
    })
  } else if (window.android?.signContract) {
    window.android.signContract(contractData.value.id, userRole.value)
  } else {
    // 浏览器环境
    alert('签约功能需要在APP中使用')
  }
}
</script>

<template>
  <div class="container">
    <main class="main-content">
      <div class="detail-card">
        <div class="card-header">
          <h2 class="contract-title">租赁合同</h2>
          <div class="contract-id">合同编号：{{ contractData.id }}</div>
        </div>

        <div class="detail-content">
          <div
            v-for="field in displayFields"
            :key="field.key"
            class="detail-item"
            :class="{ 'full-width': field.fullWidth }"
          >
            <div class="detail-label">{{ field.label }}</div>
            <div class="detail-value">{{ field.value }}</div>
          </div>
        </div>

        <!-- 电子合同缩略图（中介和租客显示） -->
        <div v-if="showContractView" class="contract-preview-section">
          <div class="contract-preview-card" @click="viewContract">
            <div class="preview-header">
              <span class="preview-title">电子合同</span>
              <span class="preview-hint">（点击查看）</span>
            </div>
            <div class="preview-thumbnail">
              <div class="thumbnail-paper">
                <div class="paper-title">租赁合同</div>
                <div class="paper-line"></div>
                <div class="paper-line short"></div>
                <div class="paper-line"></div>
                <div class="paper-line short"></div>
                <div class="paper-line"></div>
                <div class="paper-line"></div>
                <div class="paper-line short"></div>
                <div class="paper-line"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 签约按钮（根据签约状态显示） -->
        <div v-if="needSign" class="action-section">
          <button class="sign-btn" @click="signContract">
            ✍️ 立即签约
          </button>
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

.detail-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.contract-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.contract-id {
  font-size: 0.9rem;
  opacity: 0.9;
}

.detail-content {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.detail-value {
  font-size: 1rem;
  color: #333;
  font-weight: 400;
  word-break: break-word;
}

/* 其他事项的值样式 */
.detail-item.full-width .detail-value {
  padding: 0.75rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  min-height: 60px;
  line-height: 1.6;
}

/* 电子合同预览区域 */
.contract-preview-section {
  padding: 1.5rem;
  border-top: 1px solid #f0f0f0;
  margin-top: 0.5rem;
}

.contract-preview-card {
  background: #f8f9ff;
  border: 2px solid #e0e5ff;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}

.contract-preview-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.contract-preview-card:active {
  transform: translateY(0) scale(0.98);
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.preview-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
}

.preview-hint {
  font-size: 0.8rem;
  color: #999;
}

.preview-thumbnail {
  background: white;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail-paper {
  width: 100%;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.paper-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #333;
}

.paper-line {
  height: 2px;
  background: #d0d0d0;
  border-radius: 1px;
  width: 100%;
  margin: 0.25rem 0;
}

.paper-line.short {
  width: 65%;
}

/* 操作区域 */
.action-section {
  padding: 1rem 1.5rem;
  border-top: 1px solid #f0f0f0;
}

/* 签约按钮 */
.sign-btn {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.sign-btn:hover {
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  transform: translateY(-1px);
}

.sign-btn:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1.25rem;
  }

  .detail-item {
    gap: 0.4rem;
  }

  .card-header {
    padding: 1.25rem;
  }

  .contract-title {
    font-size: 1.1rem;
  }

  .contract-preview-section {
    padding: 1.25rem;
  }

  .preview-thumbnail {
    padding: 1rem;
    min-height: 140px;
  }

  .paper-title {
    font-size: 1rem;
  }

  .action-section {
    padding: 1rem 1.25rem;
  }

  .sign-btn {
    font-size: 16px; /* 防止 iOS 自动放大 */
  }
}
</style>
