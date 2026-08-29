<script setup lang="ts">
import Tag from 'ant-design-vue/es/tag'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons-vue'
import { computed } from 'vue'

const props = defineProps<{
  status: string
}>()

const config = computed(() => {
  const value = props.status.toLowerCase()

  if (value.includes('complete') || value.includes('success')) {
    return { color: 'success', icon: CheckCircleOutlined }
  }
  if (value.includes('pending') || value.includes('processing')) {
    return { color: 'warning', icon: ClockCircleOutlined }
  }
  if (value.includes('fail') || value.includes('cancel')) {
    return { color: 'error', icon: CloseCircleOutlined }
  }

  return { color: 'default', icon: InfoCircleOutlined }
})
</script>

<template>
  <Tag :color="config.color" class="inline-flex items-center gap-1">
    <component :is="config.icon" />
    {{ status }}
  </Tag>
</template>
