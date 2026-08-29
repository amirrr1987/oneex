<script setup lang="ts">
import Tooltip from 'ant-design-vue/es/tooltip'

withDefaults(
  defineProps<{
    text: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  { placement: 'top' },
)
</script>

<template>
  <Tooltip :title="text" :placement="placement">
    <span class="inline-flex">
      <slot />
    </span>
  </Tooltip>
</template>
