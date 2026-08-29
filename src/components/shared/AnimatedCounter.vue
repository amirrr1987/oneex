<script setup lang="ts">
import { computed, ref, toRef } from 'vue'

import { useGsapCountUp } from '@/composables/useGsapCountUp'

const props = defineProps<{
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}>()

const source = toRef(props, 'value')
const display = useGsapCountUp(source, { decimals: props.decimals ?? 0 })

const formatted = computed(() => `${props.prefix ?? ''}${display.value}${props.suffix ?? ''}`)
</script>

<template>
  <span>{{ formatted }}</span>
</template>
