<script setup lang="ts">
import { useToggle } from '@vueuse/core'

defineProps<{
  modelValue: string
  placeholder?: string
  invalid?: boolean
  id?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const [visible, toggleVisible] = useToggle(false)
</script>

<template>
  <div class="input-group">
    <input
      :id="id"
      :value="modelValue"
      :type="visible ? 'text' : 'password'"
      class="form-control"
      :class="{ 'is-invalid': invalid }"
      :placeholder="placeholder"
      autocomplete="current-password"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      type="button"
      class="btn btn-outline-secondary"
      :aria-label="visible ? 'Hide password' : 'Show password'"
      @click="toggleVisible()"
    >
      <i :class="visible ? 'bi bi-eye-slash' : 'bi bi-eye'" />
    </button>
  </div>
</template>
