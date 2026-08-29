<script setup lang="ts">
import Typography from 'ant-design-vue/es/typography'

defineProps<{
  title: string
  icon?: object
}>()

const { Title } = Typography
</script>

<template>
  <div class="my-4 text-center">
    <Title :level="4" class="mb-0 inline-flex items-center justify-center gap-2 uppercase">
      <component :is="icon" v-if="icon" aria-hidden="true" />
      {{ title }}
    </Title>
  </div>
</template>
