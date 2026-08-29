<script setup lang="ts">
import Segmented from 'ant-design-vue/es/segmented'
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    coins?: string[]
    modelValue?: string
  }>(),
  {
    coins: () => ['BTC', 'TIC', 'GVC'],
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const active = ref(props.modelValue ?? props.coins[0] ?? 'BTC')

const options = computed(() =>
  props.coins.map((coin) => ({
    label: coin.toUpperCase(),
    value: coin,
  })),
)

watch(
  () => props.modelValue,
  (value) => {
    if (value) active.value = value
  },
)

watch(active, (value) => emit('update:modelValue', value))
</script>

<template>
  <Segmented v-model:value="active" block :options="options" />
</template>
