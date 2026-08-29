<script setup lang="ts">
import Input from 'ant-design-vue/es/input'

defineProps<{
  modelValue: string
  placeholder?: string
  invalid?: boolean
  id?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <Input.Password
    :id="id"
    :value="modelValue"
    :placeholder="placeholder"
    :status="invalid ? 'error' : undefined"
    autocomplete="current-password"
    @update:value="emit('update:modelValue', $event)"
  />
</template>
