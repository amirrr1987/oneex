<script setup lang="ts">
import { AppstoreFilled } from '@ant-design/icons-vue'
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    to?: string
    showText?: boolean
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    to: '/',
    showText: true,
    size: 'md',
  },
)

const textSize = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
} as const
</script>

<template>
  <RouterLink
    :to="to"
    class="inline-flex items-center gap-2 font-bold no-underline"
  >
    <span
      class="inline-flex h-8 w-8 items-center justify-center rounded-full"
      :class="textSize[size]"
    >
      <AppstoreFilled />
    </span>
    <span v-if="showText">ONEEX</span>
  </RouterLink>
</template>
