<script setup lang="ts">
import Flex from 'ant-design-vue/es/flex'

import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'

defineProps<{
  title: string
  icon?: object
  subtitle?: string
}>()
</script>

<template>
  <Flex vertical align="center" class="w-full py-6">
    <Flex vertical class="w-full max-w-7xl px-4" gap="large">
      <PanelPageTitle :title="title" :icon="icon" :subtitle="subtitle" />
      <slot name="toolbar" />
      <slot />
    </Flex>
  </Flex>
</template>
