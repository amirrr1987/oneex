<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Typography from 'ant-design-vue/es/typography'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { useDrag } from '@vueuse/gesture'
import { computed, ref, watch } from 'vue'

const { Text } = Typography

const props = withDefaults(
  defineProps<{
    length: number
    modelValue?: number
  }>(),
  {
    modelValue: 0,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const index = ref(props.modelValue)
const containerRef = ref<HTMLElement>()
const dragOffset = ref(0)

watch(
  () => props.modelValue,
  (value) => {
    index.value = value
  },
)

watch(index, (value) => emit('update:modelValue', value))

const trackStyle = computed(() => ({
  transform: `translateX(calc(${-index.value * 100}% + ${dragOffset.value}px))`,
}))

useDrag(
  ({ movement: [mx], dragging, last }) => {
    if (dragging) {
      dragOffset.value = mx
      return
    }

    dragOffset.value = 0
    if (!last) return

    if (mx < -50) {
      index.value = Math.min(index.value + 1, props.length - 1)
    } else if (mx > 50) {
      index.value = Math.max(index.value - 1, 0)
    }
  },
  {
    domTarget: containerRef,
    filterTaps: true,
    axis: 'x',
  },
)

function goTo(next: number) {
  index.value = Math.min(Math.max(next, 0), props.length - 1)
}
</script>

<template>
  <div class="swipe-carousel">
    <div ref="containerRef" class="swipe-carousel__viewport touch-pan-y">
      <div class="swipe-carousel__track" :style="trackStyle">
        <slot />
      </div>
    </div>
    <div v-if="length > 1" class="mt-3 flex items-center justify-center gap-2">
      <Button
        size="small"
        :disabled="index === 0"
        aria-label="Previous slide"
        @click="goTo(index - 1)"
      >
        <template #icon><LeftOutlined /></template>
      </Button>
      <Text class="text-sm">{{ index + 1 }} / {{ length }}</Text>
      <Button
        size="small"
        :disabled="index === length - 1"
        aria-label="Next slide"
        @click="goTo(index + 1)"
      >
        <template #icon><RightOutlined /></template>
      </Button>
    </div>
  </div>
</template>

<style scoped>
.swipe-carousel__viewport {
  overflow: hidden;
  cursor: grab;
  user-select: none;
}

.swipe-carousel__viewport:active {
  cursor: grabbing;
}

.swipe-carousel__track {
  display: flex;
  transition: transform 0.35s ease;
  will-change: transform;
}

.swipe-carousel__track :deep(> *) {
  flex: 0 0 100%;
  min-width: 100%;
}
</style>
