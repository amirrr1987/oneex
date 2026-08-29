<script setup lang="ts">
import Segmented from 'ant-design-vue/es/segmented'
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    options: Array<{ label: string; value: string }>
    modelValue?: string
  }>(),
  {},
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const active = ref(props.modelValue ?? props.options[0]?.value ?? '')

watch(
  () => props.modelValue,
  (value) => {
    if (value) active.value = value
  },
)

watch(active, (value) => emit('update:modelValue', value))

const segmentedOptions = computed(() => props.options)
</script>

<template>
  <Segmented v-model:value="active" block :options="segmentedOptions" />
</template>
