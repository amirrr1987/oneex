<script setup lang="ts">
import AnimatedRouteView from '@/components/shared/AnimatedRouteView.vue'
import AuthNavbar from '@/components/auth/AuthNavbar.vue'
import PanelFooter from '@/components/panel/PanelFooter.vue'
</script>

<template>
  <div>
    <AuthNavbar />
    <main>
      <AnimatedRouteView />
    </main>
    <PanelFooter />
  </div>
</template>
