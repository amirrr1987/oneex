<script setup lang="ts">
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

function select(coin: string) {
  active.value = coin
  emit('update:modelValue', coin)
}
</script>

<template>
  <ul class="nav nav-tabs nav-fill mb-0">
    <li v-for="coin in coins" :key="coin" class="nav-item">
      <button
        type="button"
        class="nav-link text-uppercase"
        :class="{ active: active === coin }"
        v-motion
        :hover="{ scale: active === coin ? 1 : 1.03 }"
        :tap="{ scale: 0.97 }"
        @click="select(coin)"
      >
        {{ coin }}
      </button>
    </li>
  </ul>
</template>
