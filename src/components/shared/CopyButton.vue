<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    text: string
    label?: string
    variant?: 'outline-secondary' | 'outline-primary' | 'primary'
    size?: 'sm' | 'md'
  }>(),
  {
    label: 'Copy',
    variant: 'outline-secondary',
    size: 'md',
  },
)

const source = computed(() => props.text)
const { copy, copied, isSupported } = useClipboard({ source })

async function onCopy() {
  if (!isSupported.value) return
  await copy()
}
</script>

<template>
  <button
    type="button"
    class="btn d-inline-flex align-items-center gap-1"
    :class="[size === 'sm' ? 'btn-sm' : '', `btn-${variant}`]"
    :title="copied ? 'Copied!' : label"
    @click="onCopy"
  >
    <i :class="copied ? 'bi bi-check2' : 'bi bi-clipboard'" />
    <span v-if="size !== 'sm'" class="d-none d-sm-inline">{{ copied ? 'Copied' : label }}</span>
  </button>
</template>
