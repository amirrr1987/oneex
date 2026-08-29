<script setup lang="ts">
import { createPopper, type Instance as PopperInstance } from '@popperjs/core'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    text: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  { placement: 'top' },
)

const triggerRef = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()
const visible = ref(false)
let popper: PopperInstance | null = null

function show() {
  visible.value = true
  if (triggerRef.value && tooltipRef.value) {
    popper?.destroy()
    popper = createPopper(triggerRef.value, tooltipRef.value, {
      placement: props.placement,
      modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
    })
  }
}

function hide() {
  visible.value = false
  popper?.destroy()
  popper = null
}

onMounted(() => {
  triggerRef.value?.addEventListener('mouseenter', show)
  triggerRef.value?.addEventListener('focus', show)
  triggerRef.value?.addEventListener('mouseleave', hide)
  triggerRef.value?.addEventListener('blur', hide)
})

onBeforeUnmount(() => {
  hide()
})
</script>

<template>
  <span class="d-inline-flex">
    <span ref="triggerRef" tabindex="0">
      <slot />
    </span>
    <span
      ref="tooltipRef"
      class="app-tooltip"
      :class="{ 'app-tooltip--visible': visible }"
      role="tooltip"
    >
      {{ text }}
    </span>
  </span>
</template>

<style scoped>
.app-tooltip {
  position: absolute;
  z-index: 1080;
  padding: 0.35rem 0.65rem;
  font-size: 0.75rem;
  color: #fff;
  background: var(--bs-dark);
  border-radius: var(--bs-border-radius-sm);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  white-space: nowrap;
}

.app-tooltip--visible {
  opacity: 1;
}
</style>
