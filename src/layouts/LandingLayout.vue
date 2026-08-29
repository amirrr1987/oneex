<script setup lang="ts">
import AnimatedRouteView from '@/components/shared/AnimatedRouteView.vue'
import LandingNavbar from '@/components/landing/LandingNavbar.vue'
import PanelFooter from '@/components/panel/PanelFooter.vue'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
</script>

<template>
  <div :class="{ 'layout-scrolled': y > 12 }">
    <LandingNavbar />
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
