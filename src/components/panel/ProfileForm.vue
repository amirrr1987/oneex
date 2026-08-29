<script setup lang="ts">
import { ref } from 'vue'

import { useZodForm } from '@/composables/useZodForm'
import { profileSchema } from '@/schemas/forms'

const successMessage = ref('')

const { values, fieldError, submit, isSubmitting } = useZodForm(profileSchema, {
  firstName: 'John',
  lastName: 'Doe',
})

async function onSubmit() {
  successMessage.value = ''
  await submit(async () => {
    successMessage.value = 'Profile updated successfully (demo).'
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label class="form-label visually-hidden">Email</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-envelope" /></span>
        <input type="email" class="form-control" value="user@oneex.com" disabled />
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">First name</label>
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
    <div class="mb-3">
      <label class="form-label">Last name</label>
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
    <div class="d-grid col-9 mx-auto">
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" />
        <i v-else class="bi bi-check2-circle me-2" />
        Update profile
      </button>
    </div>
    <div v-if="successMessage" class="alert alert-success mt-3 mb-0 py-2 small">{{ successMessage }}</div>
  </form>
</template>
