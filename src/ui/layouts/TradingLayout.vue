<script setup lang="ts">
import Layout from 'ant-design-vue/es/layout'
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

import AnimatedRouteView from '@/components/shared/AnimatedRouteView.vue'
import UiFooter from '@/ui/shell/UiFooter.vue'
import UiTradingHeader from '@/ui/shell/UiTradingHeader.vue'
import { useAuthStore } from '@/stores/auth'
import { useWalletStore } from '@/stores/wallet'

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
  <Layout class="min-h-screen">
    <UiTradingHeader />
    <Layout.Content>
      <AnimatedRouteView />
    </Layout.Content>
    <UiFooter />
  </Layout>
</template>
