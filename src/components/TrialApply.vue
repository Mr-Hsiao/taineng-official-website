<template>
  <section class="trial">
    <div class="container trial-layout" :class="{ 'has-qq': hasQqGroup, 'is-done': joinedGuide }">
      <div class="trial-intro">
        <RouterLink class="back-home" to="/">← 返回首页</RouterLink>

        <template v-if="joinedGuide">
          <p class="trial-eyebrow">申请已收到</p>
          <h1 class="section-title">请加入交流群开通试用</h1>
          <p class="section-subtitle">
            已记下「{{ submittedHotel }} · {{ submittedName }}」。进群后把这句话发给顾问，就能对上您的申请。
          </p>
          <ol class="trial-steps">
            <li>用手机 QQ 扫描本页二维码，或复制群号搜索加入</li>
            <li>进群后发送：{{ submittedHotel }} · {{ submittedName }}</li>
            <li>顾问在群里开通试用，并协助完成初始化</li>
          </ol>
        </template>
        <template v-else>
          <p class="trial-eyebrow">免费试用</p>
          <h1 class="section-title">申请试用智云 PMS</h1>
          <p v-if="hasQqGroup" class="section-subtitle">
            扫码加入产品交流群，顾问在群里开通试用并协助初始化。比电话回访更快，也不容易漏接。
          </p>
          <p v-else class="section-subtitle">
            留下联系方式，我们会尽快为您开通体验环境，并由顾问协助完成初始化。
          </p>
          <ul class="trial-benefits">
            <li v-if="hasQqGroup">加群后备注酒店名称，顾问按业态协助开通</li>
            <li v-else>专属演示账号，覆盖前台、客房、餐饮等核心流程</li>
            <li>前台、客房、餐饮等问题可以直接问顾问</li>
            <li v-if="hasQqGroup">也可留下资料，我们按 QQ 号在群里联系您</li>
            <li v-else>提交后自动通知销售团队，通常 1 个工作日内回复</li>
          </ul>
        </template>

        <div v-if="joinedGuide" class="after-actions">
          <button class="btn btn-primary btn-again" type="button" @click="joinedGuide = false">
            再申请一家
          </button>
          <RouterLink class="after-home" to="/">返回首页</RouterLink>
        </div>
      </div>

      <div v-if="hasQqGroup" class="qq-card">
        <p class="qq-card-badge">推荐 · 沟通更快</p>
        <h2 class="qq-card-title">{{ qqGroup.name || '产品交流群' }}</h2>
        <img
          v-if="qqGroup.image"
          class="qq-qr"
          :src="qqGroup.image"
          :alt="`${qqGroup.name || '产品交流群'}二维码，群号 ${qqGroup.number}`"
        />
        <div class="qq-meta">
          <p class="qq-number">群号 <strong>{{ qqGroup.number }}</strong></p>
          <button class="qq-copy" type="button" @click="copyGroupNumber">
            {{ copied ? '已复制' : '复制群号' }}
          </button>
        </div>
        <p class="qq-note">手机打开 QQ 扫一扫。电脑上可复制群号，在 QQ 里搜索加入。</p>
        <p class="copy-status" role="status">{{ copyMessage }}</p>
      </div>

      <form v-if="!joinedGuide" class="trial-form" @submit.prevent="handleSubmit" novalidate>
        <h2 class="form-title">留下资料</h2>
        <p class="form-lead">
          {{ hasQqGroup ? '请尽量填写 QQ 号，顾问会在交流群里联系您。' : '请留下联系方式，顾问会尽快与您联系。' }}
        </p>

        <div class="form-row">
          <label for="trial-name">联系人 <span>*</span></label>
          <input
            id="trial-name"
            v-model.trim="form.name"
            type="text"
            name="name"
            autocomplete="name"
            placeholder="您的姓名"
            :disabled="submitting"
            required
          />
        </div>

        <div class="form-row">
          <label for="trial-hotel">酒店 / 公司 <span>*</span></label>
          <input
            id="trial-hotel"
            v-model.trim="form.hotel"
            type="text"
            name="hotel"
            autocomplete="organization"
            placeholder="酒店或公司名称"
            :disabled="submitting"
            required
          />
        </div>

        <div class="form-grid">
          <div class="form-row">
            <label for="trial-qq">
              QQ 号
              <em v-if="hasQqGroup" class="field-recommend">推荐</em>
            </label>
            <input
              id="trial-qq"
              v-model.trim="form.qq"
              type="text"
              name="qq"
              inputmode="numeric"
              autocomplete="off"
              spellcheck="false"
              placeholder="便于在群里联系"
              :disabled="submitting"
            />
          </div>
          <div class="form-row">
            <label for="trial-phone">手机号</label>
            <input
              id="trial-phone"
              v-model.trim="form.phone"
              type="tel"
              name="phone"
              autocomplete="tel"
              placeholder="选填"
              :disabled="submitting"
            />
          </div>
        </div>

        <div class="form-grid">
          <div class="form-row">
            <label for="trial-scale">酒店规模</label>
            <select id="trial-scale" v-model="form.scale" name="scale" :disabled="submitting">
              <option value="">请选择（选填）</option>
              <option value="50间以下">50 间以下</option>
              <option value="50-100间">50–100 间</option>
              <option value="100-300间">100–300 间</option>
              <option value="300间以上">300 间以上</option>
              <option value="连锁/集团">连锁 / 集团</option>
            </select>
          </div>
          <div class="form-row">
            <label for="trial-email">邮箱</label>
            <input
              id="trial-email"
              v-model.trim="form.email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="选填"
              :disabled="submitting"
            />
          </div>
        </div>

        <div class="form-row">
          <label for="trial-referrer">推荐人</label>
          <input
            id="trial-referrer"
            v-model.trim="form.referrer"
            type="text"
            name="referrer"
            autocomplete="off"
            placeholder="选填，有推荐人请填写"
            :disabled="submitting"
          />
        </div>

        <div class="form-row">
          <label for="trial-message">需求说明</label>
          <textarea
            id="trial-message"
            v-model.trim="form.message"
            name="message"
            rows="4"
            placeholder="例如：希望替换现有 PMS、了解餐饮对接、申请演示等"
            :disabled="submitting"
          />
        </div>

        <!-- 蜜罐字段：对用户隐藏，用于拦截简单机器人 -->
        <input
          v-model="form.website"
          class="honeypot"
          type="text"
          name="_honey"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
        />

        <p v-if="errorMessage" class="form-status form-error" role="alert">{{ errorMessage }}</p>
        <p v-if="successMessage" class="form-status form-success" role="status">{{ successMessage }}</p>

        <button class="btn btn-primary btn-submit" type="submit" :disabled="submitting || !canSubmit">
          {{ submitting ? '提交中…' : '提交申请' }}
        </button>
        <p class="form-hint">
          {{ hasQqGroup ? '提交后请扫码加群，并在群里备注酒店名称。' : '提交后，我们会尽快与您联系。' }}
        </p>
      </form>

      <div v-else-if="!hasQqGroup" class="trial-form trial-after">
        <h2 class="form-title">申请已收到</h2>
        <p class="form-lead">资料已经发到顾问邮箱，我们会尽快与您联系。</p>
        <button class="btn btn-primary btn-submit" type="button" @click="joinedGuide = false">
          再申请一家
        </button>
        <RouterLink class="after-home" to="/">返回首页</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, inject, nextTick, reactive, ref } from 'vue'

const { trial } = inject('siteConfig')

const form = reactive({
  name: '',
  hotel: '',
  qq: '',
  phone: '',
  email: '',
  scale: '',
  referrer: '',
  message: '',
  website: ''
})

const submitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const joinedGuide = ref(false)
const submittedName = ref('')
const submittedHotel = ref('')
const copied = ref(false)
const copyMessage = ref('')

const qqGroup = computed(() => trial?.qqGroup || { name: '', number: '', image: '' })
const hasQqGroup = computed(() => Boolean(qqGroup.value.number || qqGroup.value.image))
const canSubmit = computed(() => Boolean(trial?.to))

const phonePattern = /^1\d{10}$|^0\d{2,3}-?\d{7,8}$/
const qqPattern = /^\d{5,12}$/

function resetForm() {
  form.name = ''
  form.hotel = ''
  form.qq = ''
  form.phone = ''
  form.email = ''
  form.scale = ''
  form.referrer = ''
  form.message = ''
  form.website = ''
}

function validate() {
  if (!form.name) return '请填写联系人姓名'
  if (!form.hotel) return '请填写酒店或公司名称'
  const qq = form.qq.replace(/\s/g, '')
  const phone = form.phone.replace(/\s/g, '')
  if (!qq && !phone) return '请填写 QQ 号或手机号，方便顾问联系'
  if (qq && !qqPattern.test(qq)) return 'QQ 号应为 5 到 12 位数字'
  if (phone && !phonePattern.test(phone)) return '请填写有效的手机号或座机'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return '邮箱格式不正确'
  return ''
}

function copyWithCommand(number) {
  const input = document.createElement('textarea')
  input.value = number
  input.setAttribute('readonly', '')
  input.style.position = 'fixed'
  input.style.left = '-9999px'
  document.body.appendChild(input)
  input.select()
  const ok = document.execCommand('copy')
  input.remove()
  return ok
}

async function copyGroupNumber() {
  const number = qqGroup.value.number
  if (!number) return
  try {
    let copiedOk = false
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(number)
        copiedOk = true
      } catch {
        copiedOk = false
      }
    }
    if (!copiedOk) copiedOk = copyWithCommand(number)
    if (!copiedOk) throw new Error('copy failed')
    copied.value = true
    copyMessage.value = `群号 ${number} 已复制`
    window.setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('复制群号失败:', error)
    copyMessage.value = '复制失败，请手动记录群号'
  }
}

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  if (form.website) {
    successMessage.value = '提交成功，我们会尽快与您联系。'
    resetForm()
    return
  }

  if (!trial?.to) {
    errorMessage.value = '试用申请暂不可用，请直接拨打 400-688-3040。'
    return
  }

  const validationError = validate()
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  submitting.value = true
  try {
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(trial.to)}`
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      // FormSubmit 依赖来源页信息；缺 Referer 会被当成本地 HTML 文件打开而拒绝
      referrerPolicy: 'origin',
      body: JSON.stringify({
        联系人: form.name,
        酒店公司: form.hotel,
        QQ号: form.qq.replace(/\s/g, '') || '未填写',
        手机号: form.phone.replace(/\s/g, '') || '未填写',
        邮箱: form.email || '未填写',
        酒店规模: form.scale || '未填写',
        推荐人: form.referrer || '未填写',
        需求说明: form.message || '未填写',
        _subject: trial.subject,
        _template: 'table',
        _captcha: 'false',
        _honey: form.website,
        _url: window.location.href
      })
    })

    const result = await response.json().catch(() => ({}))
    const resultMessage = typeof result.message === 'string' ? result.message : ''
    const ok = response.ok && String(result.success) === 'true'

    // 首次提交：FormSubmit 会发激活信，返回 success=false + Activation 文案
    if (!ok && /activation/i.test(resultMessage)) {
      successMessage.value = `首次使用需激活邮箱。请打开 ${trial.to}（含垃圾箱），点击 FormSubmit 发来的 Activate Form 链接，激活后再提交一次即可。`
      return
    }

    if (!ok) {
      throw new Error(resultMessage || `提交失败（HTTP ${response.status}）`)
    }

    if (hasQqGroup.value) {
      submittedName.value = form.name
      submittedHotel.value = form.hotel
      joinedGuide.value = true
      resetForm()
      await nextTick()
      document.querySelector('.trial')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    successMessage.value = '提交成功！我们已收到您的申请，会尽快与您联系。'
    resetForm()
  } catch (error) {
    console.error('试用申请提交失败:', error)
    const detail = error instanceof Error && error.message ? `（${error.message}）` : ''
    errorMessage.value = `提交失败${detail}，请稍后重试，或直接拨打 400-688-3040。`
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.trial {
  min-height: calc(100vh - 70px);
  padding: 72px 0 88px;
  scroll-margin-top: 70px;
  display: flex;
  align-items: flex-start;
  background:
    radial-gradient(circle at 12% 20%, rgba(255, 107, 53, 0.12), transparent 42%),
    radial-gradient(circle at 88% 10%, rgba(255, 140, 66, 0.14), transparent 36%),
    linear-gradient(180deg, #fff7f2 0%, #ffffff 55%, #f8fafc 100%);
}

.back-home {
  display: inline-block;
  margin-bottom: 18px;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 600;
}

.back-home:hover {
  color: var(--primary-dark);
}

.trial-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 28px 56px;
  align-items: start;
}

.trial-layout.has-qq:not(.is-done) {
  grid-template-areas:
    "intro form"
    "qq form";
}

.trial-layout.has-qq.is-done {
  grid-template-areas: "intro qq";
}

.trial-intro {
  grid-area: intro;
}

.qq-card {
  grid-area: qq;
}

.trial-form {
  grid-area: form;
}

.trial-eyebrow {
  display: inline-block;
  margin-bottom: 16px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 107, 53, 0.1);
  border: 1px solid rgba(255, 107, 53, 0.2);
  color: var(--primary-color);
  font-size: 13px;
  font-weight: 600;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-color);
}

.section-subtitle {
  font-size: 16px;
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 28px;
  max-width: 42ch;
}

.trial-benefits,
.trial-steps {
  list-style: none;
  display: grid;
  gap: 14px;
}

.trial-benefits li,
.trial-steps li {
  position: relative;
  padding-left: 28px;
  color: #4b5563;
  line-height: 1.7;
}

.trial-benefits li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary-gradient);
}

.trial-steps {
  margin-bottom: 8px;
  counter-reset: step;
}

.trial-steps li {
  counter-increment: step;
}

.trial-steps li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0.15em;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary-gradient);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
}

.qq-card {
  padding: 20px 20px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(18, 150, 219, 0.16);
  box-shadow: 0 16px 36px rgba(18, 150, 219, 0.08);
}

.qq-card-badge {
  display: inline-block;
  margin-bottom: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(18, 150, 219, 0.1);
  color: #0b79b8;
  font-size: 12px;
  font-weight: 700;
}

.qq-card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
}

.qq-qr {
  display: block;
  width: min(100%, 248px);
  height: auto;
  margin: 14px auto 4px;
  padding: 10px;
  border-radius: 16px;
  background: #fff;
}

.qq-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}

.qq-number {
  font-size: 14px;
  color: #4b5563;
}

.qq-number strong {
  color: var(--text-color);
  font-size: 16px;
  letter-spacing: 0.04em;
}

.qq-copy {
  flex: none;
  padding: 8px 12px;
  border-radius: 8px;
  background: #f3f9fd;
  color: #0b79b8;
  border: 1px solid rgba(18, 150, 219, 0.28);
  font-weight: 700;
  font-size: 13px;
}

.qq-copy:hover {
  background: #e7f4fb;
}

.qq-note,
.copy-status {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-light);
}

.copy-status:empty {
  display: none;
}

.trial-form {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 107, 53, 0.12);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 18px 40px rgba(255, 107, 53, 0.08);
  backdrop-filter: blur(10px);
}

.form-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
}

.form-lead {
  margin-bottom: 20px;
  color: var(--text-light);
  font-size: 14px;
  line-height: 1.7;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.form-row label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.form-row label span {
  color: var(--primary-color);
}

.field-recommend {
  margin-left: 6px;
  padding: 1px 7px;
  border-radius: 999px;
  background: rgba(18, 150, 219, 0.12);
  color: #0b79b8;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
}

.form-row input,
.form-row select,
.form-row textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  color: var(--text-color);
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-row textarea {
  resize: vertical;
  min-height: 110px;
}

.form-row input:focus,
.form-row select:focus,
.form-row textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.15);
}

.form-row input:disabled,
.form-row select:disabled,
.form-row textarea:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.honeypot {
  position: absolute;
  left: -9999px;
  opacity: 0;
  height: 0;
  width: 0;
  pointer-events: none;
}

.btn-submit {
  width: 100%;
  padding: 14px 24px;
  font-size: 16px;
  border-radius: 10px;
  background: var(--primary-gradient);
  margin-top: 4px;
}

.btn-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.btn-submit:not(:disabled):hover {
  background: var(--hover-gradient);
}

.form-hint {
  margin-top: 12px;
  text-align: center;
  font-size: 13px;
  color: var(--text-light);
}

.form-status {
  margin-bottom: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.6;
}

.form-error {
  color: #9c2f14;
  background: #fff3ed;
  border: 1px solid #ffd7c2;
}

.form-success {
  color: #166534;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.trial-after {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 280px;
}

.after-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 8px;
}

.btn-again {
  width: auto;
  padding: 12px 22px;
}

.after-home {
  display: inline-block;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 600;
}

.trial-after .after-home {
  display: block;
  margin-top: 14px;
  text-align: center;
}

.after-home:hover {
  color: var(--primary-dark);
}

@media (max-width: 900px) {
  .trial-layout,
  .trial-layout.has-qq:not(.is-done),
  .trial-layout.has-qq.is-done {
    grid-template-columns: 1fr;
    grid-template-areas:
      "intro"
      "qq"
      "form";
    gap: 28px;
  }

  .section-subtitle {
    max-width: none;
  }
}

@media (max-width: 640px) {
  .trial {
    padding: 64px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .trial-form {
    padding: 24px 18px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .qq-qr {
    width: min(100%, 220px);
  }
}
</style>
