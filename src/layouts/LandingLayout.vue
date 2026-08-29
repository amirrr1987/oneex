<script setup lang="ts">
import { ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'

import AnimatedRouteView from '@/components/shared/AnimatedRouteView.vue'
import { useBootstrapTooltips } from '@/composables/useBootstrapTooltips'
import LandingNavbar from '@/components/landing/LandingNavbar.vue'
import PanelFooter from '@/components/panel/PanelFooter.vue'

const root = ref<HTMLElement>()
const { y } = useWindowScroll()

useBootstrapTooltips(root)
</script>

<template>
  <div ref="root" :class="{ 'layout-scrolled': y > 12 }">
    <LandingNavbar />
    <main>
      <AnimatedRouteView />
    </main>
    <PanelFooter />
  </div>
</template>

<style scoped>
.layout-scrolled :deep(.navbar) {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
}
</style>
