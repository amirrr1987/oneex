<script setup lang="ts">
import AnimatedRouteView from '@/components/shared/AnimatedRouteView.vue'
import PanelFooter from '@/components/panel/PanelFooter.vue'
import PanelNavbar from '@/components/panel/PanelNavbar.vue'
import { useWindowScroll } from '@vueuse/core'
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'
import { useWalletStore } from '@/stores/wallet'

const { y } = useWindowScroll()
const auth = useAuthStore()
const wallet = useWalletStore()
const { user } = storeToRefs(auth)

onMounted(async () => {
  if (!auth.user) await auth.hydrate()
  if (auth.isAuthenticated) await wallet.fetchWallet()
})

watch(user, (next) => {
  if (next) void wallet.fetchWallet()
})
</script>

<template>
  <div class="min-h-screen" :class="{ 'layout-scrolled': y > 12 }">
    <PanelNavbar />
    <main>
      <AnimatedRouteView />
    </main>
    <PanelFooter />
  </div>
</template>

<style scoped>
.layout-scrolled :deep(.ant-layout-header) {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
}
</style>
