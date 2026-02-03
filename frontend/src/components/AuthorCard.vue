<template>
  <div class="author-card bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
    <!-- Author Info -->
    <div class="flex items-center gap-4 mb-6">
      <!-- Avatar with Background -->
      <div class="relative avatar-wrapper">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-400 to-cyan-400 rounded-full blur-md opacity-50 animate-pulse-glow"></div>
        <img
          :src="avatar"
          :alt="name"
          class="relative w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ name }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ description }}</p>
      </div>
    </div>

    <!-- Action Button -->
    <button
      @click="toggleDonationPopover"
      class="btn-primary w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
    >
      <span class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      <svg class="w-5 h-5 relative z-10 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="relative z-10">打赏作者</span>
    </button>

    <!-- Donation Popover -->
    <Transition name="popover-fade">
      <div v-if="showDonationPopover" class="donation-overlay" @click="closeDonationPopover">
        <div class="donation-popover" @click.stop>
          <div class="popover-bg-decoration"></div>

          <button @click="closeDonationPopover" class="popover-close" aria-label="关闭">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="popover-header">
            <div class="header-decoration"></div>
            <h3 class="popover-title">感谢我前进路上的每一个人</h3>
            <div class="header-underline"></div>
          </div>

          <div class="qr-section">
            <div class="qr-card">
              <div class="qr-card-glow"></div>
              <div class="qr-image-wrapper">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeChat" alt="微信打赏" class="qr-image" />
              </div>
              <div class="qr-label">
                <svg class="qr-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.5 3A5.5 5.5 0 003 8.5v7A5.5 5.5 0 008.5 21h7a5.5 5.5 0 005.5-5.5v-7A5.5 5.5 0 0015.5 3h-7z"/>
                </svg>
                <span>微信打赏</span>
              </div>
            </div>

            <div class="qr-card">
              <div class="qr-card-glow"></div>
              <div class="qr-image-wrapper">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Alipay" alt="支付宝打赏" class="qr-image" />
              </div>
              <div class="qr-label">
                <svg class="qr-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
                <span>支付宝打赏</span>
              </div>
            </div>
          </div>

          <button class="donor-list-button">
            <span class="button-shimmer"></span>
            <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="button-text">查看打赏者名单</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  name: string
  description: string
  avatar: string
  siteName?: string
}

withDefaults(defineProps<Props>(), {
  siteName: '个人博客'
})

const showDonationPopover = ref(false)

const toggleDonationPopover = () => {
  showDonationPopover.value = !showDonationPopover.value
}

const closeDonationPopover = () => {
  showDonationPopover.value = false
}
</script>

<style scoped>
.author-card {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-pulse-glow {
  animation: pulseGlow 3s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

/* Donation Popover Overlay */
.donation-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Main Popover Card */
.donation-popover {
  position: relative;
  width: 100%;
  max-width: 520px;
  background: linear-gradient(135deg, rgba(255, 250, 245, 0.98) 0%, rgba(255, 245, 235, 0.98) 100%);
  border-radius: 32px;
  padding: 48px 40px 40px;
  box-shadow: 0 24px 64px rgba(251, 146, 60, 0.25), 0 8px 32px rgba(251, 146, 60, 0.15), 0 0 0 1px rgba(251, 146, 60, 0.1);
  overflow: hidden;
  animation: popoverSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dark .donation-popover {
  background: linear-gradient(135deg, rgba(30, 27, 24, 0.98) 0%, rgba(38, 32, 28, 0.98) 100%);
  box-shadow: 0 24px 64px rgba(251, 146, 60, 0.35), 0 8px 32px rgba(251, 146, 60, 0.25), 0 0 0 1px rgba(251, 146, 60, 0.2);
}

/* Decorative Background */
.popover-bg-decoration {
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, rgba(251, 146, 60, 0.05) 40%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: decorationFloat 8s ease-in-out infinite;
}

@keyframes decorationFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-20px, 20px) scale(1.1); }
}

/* Close Button */
.popover-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 12px;
  color: #78716c;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}

.popover-close:hover {
  background: rgba(251, 146, 60, 0.15);
  color: #ea580c;
  transform: rotate(90deg) scale(1.1);
}

.dark .popover-close {
  background: rgba(255, 255, 255, 0.08);
  color: #a8a29e;
}

/* Header Section */
.popover-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.header-decoration {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, transparent 0%, #fb923c 50%, transparent 100%);
  margin: 0 auto 20px;
  border-radius: 2px;
  opacity: 0.6;
}

.popover-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  color: #292524;
  margin: 0;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #ea580c 0%, #fb923c 50%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleFadeIn 0.6s ease-out 0.2s both;
}

.header-underline {
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(251, 146, 60, 0.3) 50%, transparent 100%);
  margin: 16px auto 0;
  border-radius: 1px;
}

@keyframes titleFadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* QR Codes Section */
.qr-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.qr-card {
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  padding: 24px 20px 20px;
  border: 1px solid rgba(251, 146, 60, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: qrCardFadeIn 0.6s ease-out both;
}

.qr-card:nth-child(1) { animation-delay: 0.3s; }
.qr-card:nth-child(2) { animation-delay: 0.4s; }

.qr-card:hover {
  transform: translateY(-4px);
  border-color: rgba(251, 146, 60, 0.3);
  box-shadow: 0 12px 32px rgba(251, 146, 60, 0.15), 0 4px 16px rgba(251, 146, 60, 0.1);
}

.dark .qr-card {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(251, 146, 60, 0.2);
}

.qr-card-glow {
  position: absolute;
  inset: -1px;
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(245, 158, 11, 0.2));
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: -1;
}

.qr-card:hover .qr-card-glow { opacity: 1; }

@keyframes qrCardFadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* QR Image */
.qr-image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  background: white;
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(251, 146, 60, 0.1);
  transition: all 0.3s ease;
}

.qr-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.qr-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #57534e;
  letter-spacing: 0.01em;
}

.dark .qr-label { color: #d6d3d1; }

.qr-icon {
  width: 18px;
  height: 18px;
  color: #fb923c;
  opacity: 0.8;
}

/* Donor List Button */
.donor-list-button {
  position: relative;
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #fb923c 0%, #f59e0b 100%);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(251, 146, 60, 0.3), 0 4px 12px rgba(251, 146, 60, 0.2);
  animation: buttonFadeIn 0.6s ease-out 0.5s both;
}

.donor-list-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(251, 146, 60, 0.4), 0 6px 16px rgba(251, 146, 60, 0.3);
}

.button-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.button-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
  transition: transform 0.3s ease;
}

.donor-list-button:hover .button-icon {
  transform: scale(1.1) rotate(5deg);
}

.button-text {
  position: relative;
  z-index: 1;
  display: inline-block;
  vertical-align: middle;
}

@keyframes buttonFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Transitions */
.popover-fade-enter-active { transition: opacity 0.3s ease; }
.popover-fade-leave-active { transition: opacity 0.2s ease; }
.popover-fade-enter-from, .popover-fade-leave-to { opacity: 0; }

.popover-fade-enter-active .donation-popover {
  animation: popoverSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.popover-fade-leave-active .donation-popover {
  animation: popoverSlideOut 0.3s cubic-bezier(0.4, 0, 1, 1);
}

@keyframes popoverSlideIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes popoverSlideOut {
  from { opacity: 1; transform: scale(1) translateY(0); }
  to { opacity: 0; transform: scale(0.95) translateY(10px); }
}

/* Responsive */
@media (max-width: 640px) {
  .donation-popover { padding: 40px 28px 32px; border-radius: 28px; }
  .popover-title { font-size: 20px; }
  .qr-card { padding: 20px 16px 16px; }
  .donor-list-button { padding: 14px 20px; font-size: 14px; }
}

@media (max-width: 480px) {
  .qr-section { grid-template-columns: 1fr; gap: 20px; }
}
</style>
