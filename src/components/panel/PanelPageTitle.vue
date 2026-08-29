<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
}>()
</script>

<template>
  <div class="text-center my-4">
    <h4 class="text-uppercase fw-bold d-inline-flex align-items-center justify-content-center gap-2">
      <i v-if="icon" :class="['bi', icon, 'text-primary']" aria-hidden="true" />
      {{ title }}
    </h4>
  </div>
</template>
