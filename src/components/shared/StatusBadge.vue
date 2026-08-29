<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: string
}>()

const config = computed(() => {
  const value = props.status.toLowerCase()

  if (value.includes('complete') || value.includes('success')) {
    return { class: 'text-bg-success', icon: 'bi-check-circle' }
  }
  if (value.includes('pending') || value.includes('processing')) {
    return { class: 'text-bg-warning', icon: 'bi-hourglass-split' }
  }
  if (value.includes('fail') || value.includes('cancel')) {
    return { class: 'text-bg-danger', icon: 'bi-x-circle' }
  }

  return { class: 'text-bg-secondary', icon: 'bi-info-circle' }
})
</script>

<template>
  <span class="badge d-inline-flex align-items-center gap-1" :class="config.class">
    <i :class="['bi', config.icon]" />
    {{ status }}
  </span>
</template>
