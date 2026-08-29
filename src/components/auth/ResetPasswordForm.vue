<script setup lang="ts">
import { ref } from 'vue'

import { useZodForm } from '@/composables/useZodForm'
import { resetPasswordSchema } from '@/schemas/auth'

const successMessage = ref('')

const { values, fieldError, submit, isSubmitting } = useZodForm(resetPasswordSchema, {
  email: '',
  captcha: '',
})

async function onSubmit() {
  successMessage.value = ''
  await submit(async () => {
    successMessage.value = 'Reset link sent to your email (demo).'
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-envelope" /></span>
        <input
          v-model="values.email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': fieldError('email') }"
          placeholder="Enter email"
        />
      </div>
      <div v-if="fieldError('email')" class="invalid-feedback d-block">{{ fieldError('email') }}</div>
    </div>
    <div class="mb-3">
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-shield-lock" /></span>
        <input
          v-model="values.captcha"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': fieldError('captcha') }"
          placeholder="Captcha"
        />
      </div>
      <div v-if="fieldError('captcha')" class="invalid-feedback d-block">{{ fieldError('captcha') }}</div>
    </div>
    <div class="d-grid col-9 mx-auto">
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" />
        <i v-else class="bi bi-send me-2" />
        Send Your Email
      </button>
    </div>
    <div v-if="successMessage" class="alert alert-success mt-3 mb-0 py-2 small">{{ successMessage }}</div>
  </form>
</template>
