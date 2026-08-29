<script setup lang="ts">
import Spin from 'ant-design-vue/es/spin'

withDefaults(
  defineProps<{
    spinning?: boolean
    loading?: boolean
    tip?: string
  }>(),
  {
    spinning: false,
    tip: 'Loading...',
  },
)
</script>

<template>
  <Spin :spinning="spinning || loading" :tip="tip">
    <slot />
  </Spin>
</template>
