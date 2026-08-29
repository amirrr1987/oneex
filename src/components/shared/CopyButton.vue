<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import { CheckOutlined, CopyOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    text: string
    label?: string
    type?: 'default' | 'primary' | 'dashed' | 'link' | 'text'
    size?: 'small' | 'middle' | 'large'
  }>(),
  {
    label: 'Copy',
    type: 'default',
    size: 'middle',
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
  <Button
    :type="type"
    :size="size"
    class="inline-flex items-center gap-1"
    :title="copied ? 'Copied!' : label"
    @click="onCopy"
  >
    <CheckOutlined v-if="copied" />
    <CopyOutlined v-else />
    <span v-if="size !== 'small'" class="hidden sm:inline">{{ copied ? 'Copied' : label }}</span>
  </Button>
</template>
