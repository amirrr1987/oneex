<script setup lang="ts">
import Layout from 'ant-design-vue/es/layout'

import AnimatedRouteView from '@/components/shared/AnimatedRouteView.vue'
import UiFooter from '@/ui/shell/UiFooter.vue'
import UiPublicHeader from '@/ui/shell/UiPublicHeader.vue'
</script>

<template>
  <Layout class="min-h-screen">
    <UiPublicHeader />
    <Layout.Content>
      <AnimatedRouteView />
    </Layout.Content>
    <UiFooter />
  </Layout>
</template>
