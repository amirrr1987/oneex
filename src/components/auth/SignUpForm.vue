<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import PasswordField from '@/components/shared/PasswordField.vue'
import { useZodForm } from '@/composables/useZodForm'
import { signUpSchema } from '@/schemas/auth'

const router = useRouter()
const successMessage = ref('')

const { values, fieldError, submit, isSubmitting } = useZodForm(signUpSchema, {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
  captcha: '',
})

async function onSubmit() {
  successMessage.value = ''
  const ok = await submit(async () => {
    successMessage.value = 'Account created (demo). Redirecting…'
    setTimeout(() => router.push('/exchange'), 900)
  })
  if (!ok) successMessage.value = ''
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="row g-3">
      <div class="col-md-6">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-person" /></span>
          <input
            v-model="values.firstName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': fieldError('firstName') }"
            placeholder="First name"
          />
        </div>
        <div v-if="fieldError('firstName')" class="invalid-feedback d-block">{{ fieldError('firstName') }}</div>
      </div>
      <div class="col-md-6">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-person-badge" /></span>
          <input
            v-model="values.lastName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': fieldError('lastName') }"
            placeholder="Last name"
          />
        </div>
        <div v-if="fieldError('lastName')" class="invalid-feedback d-block">{{ fieldError('lastName') }}</div>
      </div>
    </div>
    <div class="mb-3 mt-3">
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
    <div class="mb-3">
      <PasswordField
        v-model="values.confirmPassword"
        placeholder="Repeat password"
        :invalid="Boolean(fieldError('confirmPassword'))"
      />
      <div v-if="fieldError('confirmPassword')" class="invalid-feedback d-block">
        {{ fieldError('confirmPassword') }}
      </div>
    </div>
    <div class="form-check mb-3">
      <input
        id="terms"
        v-model="values.terms"
        class="form-check-input"
        :class="{ 'is-invalid': fieldError('terms') }"
        type="checkbox"
      />
      <label class="form-check-label small" for="terms">
        <i class="bi bi-file-earmark-text me-1" />
        I agree to Terms, Cookie and Privacy policies
      </label>
      <div v-if="fieldError('terms')" class="invalid-feedback d-block">{{ fieldError('terms') }}</div>
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
        <i v-else class="bi bi-person-plus me-2" />
        Create account
      </button>
    </div>
    <div v-if="successMessage" class="alert alert-success mt-3 mb-0 py-2 small">{{ successMessage }}</div>
    <div class="d-sm-none mt-3 text-center">
      <p class="small text-muted">Already have an account?</p>
      <RouterLink class="btn btn-outline-primary w-75" to="/sign-in">Sign In</RouterLink>
    </div>
  </form>
</template>
