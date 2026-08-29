import { reactive, ref } from 'vue'
import type { z } from 'zod'

type FormErrors<T> = Partial<Record<keyof T, string>>

export function useZodForm<T extends Record<string, unknown>>(schema: z.ZodType<T>, initial: T) {
  const values = reactive({ ...initial })
  const errors = ref<FormErrors<T>>({})
  const isSubmitting = ref(false)
  const submitted = ref(false)

  function fieldError(field: keyof T) {
    return submitted.value ? errors.value[field] : undefined
  }

  function validate(): boolean {
    const result = schema.safeParse(values)
    if (result.success) {
      errors.value = {}
      return true
    }

    const next: FormErrors<T> = {}
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof T
      if (key && !next[key]) {
        next[key] = issue.message
      }
    }
    errors.value = next
    return false
  }

  async function submit(handler: (data: T) => Promise<void> | void) {
    submitted.value = true
    if (!validate()) return false

    isSubmitting.value = true
    try {
      await handler(values as T)
      return true
    } finally {
      isSubmitting.value = false
    }
  }

  function reset(nextValues?: Partial<T>) {
    Object.assign(values, initial, nextValues)
    errors.value = {}
    submitted.value = false
  }

  return {
    values,
    errors,
    isSubmitting,
    submitted,
    fieldError,
    validate,
    submit,
    reset,
  }
}
