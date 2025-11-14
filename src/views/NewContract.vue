<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 从 URL 参数获取外部传入的数据
const externalParams = reactive({
  userId: '',
  token: '',
  // 可以添加更多外部参数
})

const formData = reactive({
  tenantPhone: '',
  landlordPhone: '',
  landlordName: '',
  landlordIdCard: '',
  propertyAddress: '',
  buildingNumber: '',
  monthlyRent: '',
  deposit: '',
  leaseTerm: '',
  paymentMethod: '',
  utilities: '',
  startDate: '',
  endDate: '',
  otherMatters: ''
})

// 页面加载时获取 URL 参数
onMounted(() => {
  // 从 URL 获取参数
  externalParams.userId = route.query.userId || ''
  externalParams.token = route.query.token || ''

  console.log('接收到的外部参数:', externalParams)

  // 监听来自原生的 postMessage (可选)
  window.addEventListener('message', handleNativeMessage)
})

// 处理原生发送的消息 (可选)
const handleNativeMessage = (event) => {
  console.log('收到原生消息:', event.data)
  // 可以在这里处理原生传来的数据
  if (event.data.userId) {
    externalParams.userId = event.data.userId
  }
  if (event.data.token) {
    externalParams.token = event.data.token
  }
}

const errors = reactive({
  tenantPhone: '',
  landlordPhone: '',
  landlordName: '',
  landlordIdCard: '',
  propertyAddress: '',
  buildingNumber: '',
  monthlyRent: '',
  deposit: '',
  leaseTerm: '',
  paymentMethod: '',
  utilities: '',
  startDate: '',
  endDate: '',
  otherMatters: ''
})

// 验证手机号格式
const validatePhone = (phone) => {
  const phoneRegex = /^1\d{10}$/
  return phoneRegex.test(phone)
}

// 验证租客手机号
const validateTenantPhone = () => {
  errors.tenantPhone = ''

  if (!formData.tenantPhone) {
    errors.tenantPhone = '请输入租客手机号'
    return
  }

  if (!validatePhone(formData.tenantPhone)) {
    errors.tenantPhone = '请输入正确的11位手机号'
    return
  }
}

// 验证房东手机号
const validateLandlordPhone = () => {
  errors.landlordPhone = ''

  if (!formData.landlordPhone) {
    errors.landlordPhone = '请输入房东手机号'
    return
  }

  if (!validatePhone(formData.landlordPhone)) {
    errors.landlordPhone = '请输入正确的11位手机号'
    return
  }
}

// 验证房东姓名
const validateLandlordName = () => {
  errors.landlordName = ''

  if (!formData.landlordName) {
    errors.landlordName = '请输入房东姓名'
    return
  }

  if (formData.landlordName.length > 20) {
    errors.landlordName = '房东姓名最多20个字'
    formData.landlordName = formData.landlordName.slice(0, 20)
  }
}

// 验证身份证号
const validateIdCard = (idCard) => {
  // 身份证号可以是15位或18位
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$|^[1-9]\d{7}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/
  return idCardRegex.test(idCard)
}

// 验证房东身份证号
const validateLandlordIdCard = () => {
  errors.landlordIdCard = ''

  if (!formData.landlordIdCard) {
    errors.landlordIdCard = '请输入房东身份证号'
    return
  }

  if (formData.landlordIdCard.length > 18) {
    errors.landlordIdCard = '身份证号最多18个字符'
    formData.landlordIdCard = formData.landlordIdCard.slice(0, 18)
    return
  }

  if (!validateIdCard(formData.landlordIdCard)) {
    errors.landlordIdCard = '请输入正确的身份证号'
    return
  }
}

// 验证房源地址
const validatePropertyAddress = () => {
  errors.propertyAddress = ''

  if (!formData.propertyAddress) {
    errors.propertyAddress = '请输入房源地址'
    return
  }

  if (formData.propertyAddress.length > 20) {
    errors.propertyAddress = '房源地址最多20个字'
    formData.propertyAddress = formData.propertyAddress.slice(0, 20)
  }
}

// 验证楼栋门牌号
const validateBuildingNumber = () => {
  errors.buildingNumber = ''

  if (!formData.buildingNumber) {
    errors.buildingNumber = '请输入楼栋门牌号'
    return
  }

  if (formData.buildingNumber.length > 10) {
    errors.buildingNumber = '楼栋门牌号最多10个字'
    formData.buildingNumber = formData.buildingNumber.slice(0, 10)
  }
}

// 验证月租金
const validateMonthlyRent = () => {
  errors.monthlyRent = ''

  if (!formData.monthlyRent) {
    errors.monthlyRent = '请输入月租金'
    return
  }

  // 只允许数字
  formData.monthlyRent = formData.monthlyRent.replace(/\D/g, '')

  if (formData.monthlyRent.length > 5) {
    errors.monthlyRent = '月租金最多5位数'
    formData.monthlyRent = formData.monthlyRent.slice(0, 5)
  }
}

// 验证押金
const validateDeposit = () => {
  errors.deposit = ''

  if (!formData.deposit) {
    errors.deposit = '请输入押金'
    return
  }

  // 只允许数字
  formData.deposit = formData.deposit.replace(/\D/g, '')

  if (formData.deposit.length > 5) {
    errors.deposit = '押金最多5位数'
    formData.deposit = formData.deposit.slice(0, 5)
  }
}

// 验证租期
const validateLeaseTerm = () => {
  errors.leaseTerm = ''

  if (!formData.leaseTerm) {
    errors.leaseTerm = '请输入租期'
    return
  }

  if (formData.leaseTerm.length > 10) {
    errors.leaseTerm = '租期最多10个字'
    formData.leaseTerm = formData.leaseTerm.slice(0, 10)
  }
}

// 验证收租方式
const validatePaymentMethod = () => {
  errors.paymentMethod = ''

  if (!formData.paymentMethod) {
    errors.paymentMethod = '请输入收租方式'
    return
  }

  if (formData.paymentMethod.length > 10) {
    errors.paymentMethod = '收租方式最多10个字'
    formData.paymentMethod = formData.paymentMethod.slice(0, 10)
  }
}

// 验证水电费
const validateUtilities = () => {
  errors.utilities = ''

  if (!formData.utilities) {
    errors.utilities = '请输入水电费说明'
    return
  }

  if (formData.utilities.length > 10) {
    errors.utilities = '水电费说明最多10个字'
    formData.utilities = formData.utilities.slice(0, 10)
  }
}

// 验证日期
const validateDates = () => {
  errors.startDate = ''
  errors.endDate = ''

  if (!formData.startDate) {
    errors.startDate = '请选择租约开始日期'
    return
  }

  if (!formData.endDate) {
    errors.endDate = '请选择租约结束日期'
    return
  }

  if (new Date(formData.endDate) <= new Date(formData.startDate)) {
    errors.endDate = '结束日期必须晚于开始日期'
  }
}

// 验证其他事项
const validateOtherMatters = () => {
  errors.otherMatters = ''

  if (formData.otherMatters.length > 100) {
    errors.otherMatters = '其他事项最多100个字'
    formData.otherMatters = formData.otherMatters.slice(0, 100)
  }
}

// 提交表单
const handleSubmit = () => {
  // 验证所有字段
  validateTenantPhone()
  validateLandlordPhone()
  validateLandlordName()
  validateLandlordIdCard()
  validatePropertyAddress()
  validateBuildingNumber()
  validateMonthlyRent()
  validateDeposit()
  validateLeaseTerm()
  validatePaymentMethod()
  validateUtilities()
  validateDates()
  validateOtherMatters()

  // 检查是否有错误
  const hasErrors = Object.values(errors).some(error => error !== '')

  if (hasErrors) {
    alert('请检查表单错误')
    return
  }

  // TODO: 提交表单数据到后端
  const submitData = {
    ...formData,
    ...externalParams, // 合并外部参数
  }

  console.log('提交表单:', submitData)

  // 可以通过 postMessage 通知原生页面
  if (window.ReactNativeWebView) {
    // React Native WebView
    window.ReactNativeWebView.postMessage(JSON.stringify(submitData))
  } else if (window.webkit?.messageHandlers?.submitContract) {
    // iOS WKWebView
    window.webkit.messageHandlers.submitContract.postMessage(submitData)
  } else if (window.android?.submitContract) {
    // Android WebView
    window.android.submitContract(JSON.stringify(submitData))
  } else {
    // 普通浏览器环境
    alert('合同创建成功!')
  }
}
</script>

<template>
  <div class="container">
    <main class="main-content">
      <form class="contract-form" @submit.prevent="handleSubmit">
        <h2 class="form-title">新建租赁合同</h2>

        <!-- 租客手机号 -->
        <div class="form-group">
          <label class="form-label">
            租客手机号 <span class="required">*</span>
          </label>
          <input
            v-model="formData.tenantPhone"
            type="tel"
            maxlength="11"
            class="form-input"
            :class="{ error: errors.tenantPhone }"
            placeholder="请输入11位手机号"
            @blur="validateTenantPhone"
          />
          <span v-if="errors.tenantPhone" class="error-message">{{ errors.tenantPhone }}</span>
        </div>

        <!-- 房东手机号 -->
        <div class="form-group">
          <label class="form-label">
            房东手机号 <span class="required">*</span>
          </label>
          <input
            v-model="formData.landlordPhone"
            type="tel"
            maxlength="11"
            class="form-input"
            :class="{ error: errors.landlordPhone }"
            placeholder="请输入11位手机号"
            @blur="validateLandlordPhone"
          />
          <span v-if="errors.landlordPhone" class="error-message">{{ errors.landlordPhone }}</span>
        </div>

        <!-- 房东姓名 -->
        <div class="form-group">
          <label class="form-label">
            房东姓名 <span class="required">*</span>
          </label>
          <input
            v-model="formData.landlordName"
            type="text"
            maxlength="20"
            class="form-input"
            :class="{ error: errors.landlordName }"
            placeholder="请输入房东姓名（最多20个字）"
            @blur="validateLandlordName"
          />
          <span v-if="errors.landlordName" class="error-message">{{ errors.landlordName }}</span>
          <span class="char-count">{{ formData.landlordName.length }}/20</span>
        </div>

        <!-- 房东身份证号 -->
        <div class="form-group">
          <label class="form-label">
            房东身份证号 <span class="required">*</span>
          </label>
          <input
            v-model="formData.landlordIdCard"
            type="text"
            maxlength="18"
            class="form-input"
            :class="{ error: errors.landlordIdCard }"
            placeholder="请输入房东身份证号（最多18个字符）"
            @blur="validateLandlordIdCard"
          />
          <span v-if="errors.landlordIdCard" class="error-message">{{ errors.landlordIdCard }}</span>
        </div>

        <!-- 房源地址 -->
        <div class="form-group">
          <label class="form-label">
            房源地址 <span class="required">*</span>
          </label>
          <input
            v-model="formData.propertyAddress"
            type="text"
            maxlength="20"
            class="form-input"
            :class="{ error: errors.propertyAddress }"
            placeholder="请输入房源地址（最多20个字）"
            @blur="validatePropertyAddress"
          />
          <span v-if="errors.propertyAddress" class="error-message">{{ errors.propertyAddress }}</span>
          <span class="char-count">{{ formData.propertyAddress.length }}/20</span>
        </div>

        <!-- 楼栋门牌号 -->
        <div class="form-group">
          <label class="form-label">
            楼栋门牌号 <span class="required">*</span>
          </label>
          <input
            v-model="formData.buildingNumber"
            type="text"
            maxlength="10"
            class="form-input"
            :class="{ error: errors.buildingNumber }"
            placeholder="请输入楼栋门牌号（最多10个字）"
            @blur="validateBuildingNumber"
          />
          <span v-if="errors.buildingNumber" class="error-message">{{ errors.buildingNumber }}</span>
          <span class="char-count">{{ formData.buildingNumber.length }}/10</span>
        </div>

        <!-- 月租金 -->
        <div class="form-group">
          <label class="form-label">
            租金（元/月） <span class="required">*</span>
          </label>
          <input
            v-model="formData.monthlyRent"
            type="text"
            inputmode="numeric"
            maxlength="5"
            class="form-input"
            :class="{ error: errors.monthlyRent }"
            placeholder="请输入月租金（纯数字，最多5位）"
            @input="validateMonthlyRent"
            @blur="validateMonthlyRent"
          />
          <span v-if="errors.monthlyRent" class="error-message">{{ errors.monthlyRent }}</span>
        </div>

        <!-- 押金 -->
        <div class="form-group">
          <label class="form-label">
            押金 <span class="required">*</span>
          </label>
          <input
            v-model="formData.deposit"
            type="text"
            inputmode="numeric"
            maxlength="5"
            class="form-input"
            :class="{ error: errors.deposit }"
            placeholder="请输入押金（纯数字，最多5位）"
            @input="validateDeposit"
            @blur="validateDeposit"
          />
          <span v-if="errors.deposit" class="error-message">{{ errors.deposit }}</span>
        </div>

        <!-- 租约开始日期 -->
        <div class="form-group">
          <label class="form-label">
            租约开始日期 <span class="required">*</span>
          </label>
          <input
            v-model="formData.startDate"
            type="date"
            class="form-input"
            :class="{ error: errors.startDate }"
            @change="validateDates"
          />
          <span v-if="errors.startDate" class="error-message">{{ errors.startDate }}</span>
        </div>

        <!-- 租约结束日期 -->
        <div class="form-group">
          <label class="form-label">
            租约结束日期 <span class="required">*</span>
          </label>
          <input
            v-model="formData.endDate"
            type="date"
            class="form-input"
            :class="{ error: errors.endDate }"
            @change="validateDates"
          />
          <span v-if="errors.endDate" class="error-message">{{ errors.endDate }}</span>
        </div>

        <!-- 租期 -->
        <div class="form-group">
          <label class="form-label">
            租期（几个月） <span class="required">*</span>
          </label>
          <input
            v-model="formData.leaseTerm"
            type="text"
            maxlength="10"
            class="form-input"
            :class="{ error: errors.leaseTerm }"
            placeholder="请输入租期（最多10个字）"
            @blur="validateLeaseTerm"
          />
          <span v-if="errors.leaseTerm" class="error-message">{{ errors.leaseTerm }}</span>
          <span class="char-count">{{ formData.leaseTerm.length }}/10</span>
        </div>

        <!-- 收租方式 -->
        <div class="form-group">
          <label class="form-label">
            收租方式（付几压几） <span class="required">*</span>
          </label>
          <input
            v-model="formData.paymentMethod"
            type="text"
            maxlength="10"
            class="form-input"
            :class="{ error: errors.paymentMethod }"
            placeholder="请输入收租方式（最多10个字）"
            @blur="validatePaymentMethod"
          />
          <span v-if="errors.paymentMethod" class="error-message">{{ errors.paymentMethod }}</span>
          <span class="char-count">{{ formData.paymentMethod.length }}/10</span>
        </div>

        <!-- 水电费 -->
        <div class="form-group">
          <label class="form-label">
            水电费 <span class="required">*</span>
          </label>
          <input
            v-model="formData.utilities"
            type="text"
            maxlength="10"
            class="form-input"
            :class="{ error: errors.utilities }"
            placeholder="请输入水电费说明（最多10个字）"
            @blur="validateUtilities"
          />
          <span v-if="errors.utilities" class="error-message">{{ errors.utilities }}</span>
          <span class="char-count">{{ formData.utilities.length }}/10</span>
        </div>

        <!-- 其他事项 -->
        <div class="form-group">
          <label class="form-label">
            其他事项
          </label>
          <textarea
            v-model="formData.otherMatters"
            maxlength="100"
            class="form-textarea"
            :class="{ error: errors.otherMatters }"
            placeholder="请输入其他事项（选填，最多100个字）"
            rows="4"
            @input="validateOtherMatters"
          ></textarea>
          <span v-if="errors.otherMatters" class="error-message">{{ errors.otherMatters }}</span>
          <span class="char-count">{{ formData.otherMatters.length }}/100</span>
        </div>

        <!-- 提交按钮 -->
        <button type="submit" class="submit-button">
          创建合同
        </button>
      </form>
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
  max-width: 600px;
  margin: 0 auto;
}

.contract-form {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.form-group {
  margin-bottom: 1.25rem;
  position: relative;
}

.form-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.required {
  color: #f56c6c;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.3s ease;
  -webkit-appearance: none;
  appearance: none;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.error,
.form-textarea.error {
  border-color: #f56c6c;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  line-height: 1.5;
}

.error-message {
  display: block;
  font-size: 0.8rem;
  color: #f56c6c;
  margin-top: 0.25rem;
}

.char-count {
  display: block;
  font-size: 0.75rem;
  color: #909399;
  text-align: right;
  margin-top: 0.25rem;
}

.submit-button {
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
  margin-top: 1rem;
  -webkit-tap-highlight-color: transparent;
}

.submit-button:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.submit-button:hover {
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* 移动端优化 */
@media (max-width: 768px) {
  .contract-form {
    padding: 1.25rem;
  }

  .form-title {
    font-size: 1.1rem;
  }

  .form-input,
  .form-textarea {
    font-size: 16px; /* 防止 iOS 自动放大 */
  }
}
</style>
