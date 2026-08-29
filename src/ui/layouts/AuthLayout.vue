<script setup lang="ts">
import Layout from 'ant-design-vue/es/layout'

import AnimatedRouteView from '@/components/shared/AnimatedRouteView.vue'
import UiAuthHeader from '@/ui/shell/UiAuthHeader.vue'
import UiFooter from '@/ui/shell/UiFooter.vue'
</script>

<template>
  <Layout class="min-h-screen">
    <UiAuthHeader />
    <Layout.Content>
      <AnimatedRouteView />
    </Layout.Content>
    <UiFooter />
  </Layout>
</template>
