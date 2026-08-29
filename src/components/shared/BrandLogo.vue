<script setup lang="ts">
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

const iconSize = {
  sm: 'fs-5',
  md: 'fs-4',
  lg: 'fs-3',
} as const
</script>

<template>
  <RouterLink :to="to" class="navbar-brand d-inline-flex align-items-center gap-2 fw-bold text-decoration-none">
    <span
      class="brand-logo-mark d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
      :class="iconSize[size]"
    >
      <i class="bi bi-hexagon-fill" />
    </span>
    <span v-if="showText">ONEEX</span>
  </RouterLink>
</template>

<style scoped>
.brand-logo-mark {
  width: 2rem;
  height: 2rem;
  line-height: 1;
}
</style>
