<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import PasswordField from '@/components/shared/PasswordField.vue'
import { useZodForm } from '@/composables/useZodForm'
import { signInSchema } from '@/schemas/auth'

const router = useRouter()
const successMessage = ref('')

const { values, fieldError, submit, isSubmitting } = useZodForm(signInSchema, {
  email: '',
  password: '',
})

async function onSubmit() {
  successMessage.value = ''
  const ok = await submit(async () => {
    successMessage.value = 'Signed in successfully (demo).'
    setTimeout(() => router.push('/exchange'), 800)
  })
  if (!ok) successMessage.value = ''
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
      <PasswordField
        v-model="values.password"
        placeholder="Password"
        :invalid="Boolean(fieldError('password'))"
      />
      <div v-if="fieldError('password')" class="invalid-feedback d-block">{{ fieldError('password') }}</div>
    </div>
    <p class="small text-muted">
      Forgot password?
      <RouterLink to="/reset-password">Reset password</RouterLink>
    </p>
    <p class="small text-muted d-none d-sm-block">
      Not registered yet?
      <RouterLink to="/sign-up">Create account</RouterLink>
    </p>
    <div class="d-grid col-9 mx-auto">
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" />
        <i v-else class="bi bi-box-arrow-in-right me-2" />
        Sign in ONEEX
      </button>
    </div>
    <div v-if="successMessage" class="alert alert-success mt-3 mb-0 py-2 small">{{ successMessage }}</div>
    <div class="d-sm-none mt-3 text-center">
      <p class="small text-muted">Not registered yet?</p>
      <RouterLink class="btn btn-outline-primary w-75" to="/sign-up">Create Account</RouterLink>
    </div>
    <p class="small text-center text-muted mt-4 mb-0">
      Shall you encounter any problems logging in, please contact us at
      <span class="text-primary">support.oneex.com</span>
    </p>
  </form>
</template>
