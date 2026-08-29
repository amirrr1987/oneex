<script setup lang="ts">
import { ref } from 'vue'

import AnimatedRouteView from '@/components/shared/AnimatedRouteView.vue'
import { useBootstrapTooltips } from '@/composables/useBootstrapTooltips'
import AuthNavbar from '@/components/auth/AuthNavbar.vue'
import PanelFooter from '@/components/panel/PanelFooter.vue'

const root = ref<HTMLElement>()
useBootstrapTooltips(root)
</script>

<template>
  <div ref="root">
    <AuthNavbar />
    <main>
      <AnimatedRouteView />
    </main>
    <PanelFooter />
  </div>
</template>
