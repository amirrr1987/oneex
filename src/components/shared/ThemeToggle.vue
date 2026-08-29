<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
</script>

<template>
  <button
    type="button"
    class="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
    data-bs-toggle="tooltip"
    data-bs-placement="bottom"
    :title="isDark ? 'Switch to light mode' : 'Switch to night mode'"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to night mode'"
    @click="theme.toggle()"
  >
    <i :class="isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill'" />
    <span class="d-none d-lg-inline">{{ isDark ? 'Light' : 'Night' }}</span>
  </button>
</template>
