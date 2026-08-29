<script setup lang="ts">
import Carousel from 'ant-design-vue/es/carousel'
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    length?: number
    modelValue?: number
  }>(),
  {
    modelValue: 0,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const carouselRef = ref<InstanceType<typeof Carousel>>()

watch(
  () => props.modelValue,
  (value) => {
    carouselRef.value?.goTo(value ?? 0, false)
  },
)

function onChange(current: number) {
  emit('update:modelValue', current)
}
</script>

<template>
  <Carousel ref="carouselRef" arrows dots :after-change="onChange">
    <slot />
  </Carousel>
</template>
