<script setup lang="ts">
import Radio from 'ant-design-vue/es/radio'
import { ref, watch } from 'vue'

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

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      active.value = value
    }
  },
)

watch(active, (value) => emit('update:modelValue', value))
</script>

<template>
  <Radio.Group v-model:value="active" button-style="solid" class="mb-0 flex w-full">
    <Radio.Button
      v-for="coin in coins"
      :key="coin"
      :value="coin"
      class="flex-1 text-center uppercase"
    >
      {{ coin }}
    </Radio.Button>
  </Radio.Group>
</template>
