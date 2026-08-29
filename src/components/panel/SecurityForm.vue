<script setup lang="ts">
import { ref } from 'vue'

import PasswordField from '@/components/shared/PasswordField.vue'
import { useZodForm } from '@/composables/useZodForm'
import { securitySchema } from '@/schemas/forms'

const successMessage = ref('')

const { values, fieldError, submit, isSubmitting } = useZodForm(securitySchema, {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

async function onSubmit() {
  successMessage.value = ''
  await submit(async () => {
    successMessage.value = 'Password updated successfully (demo).'
    values.currentPassword = ''
    values.newPassword = ''
    values.confirmPassword = ''
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label class="form-label">Current password</label>
      <PasswordField
        v-model="values.currentPassword"
        placeholder="Current password"
        :invalid="Boolean(fieldError('currentPassword'))"
      />
      <div v-if="fieldError('currentPassword')" class="invalid-feedback d-block">
        {{ fieldError('currentPassword') }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">New password</label>
      <PasswordField
        v-model="values.newPassword"
        placeholder="New password"
        :invalid="Boolean(fieldError('newPassword'))"
      />
      <div v-if="fieldError('newPassword')" class="invalid-feedback d-block">{{ fieldError('newPassword') }}</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Repeat new password</label>
      <PasswordField
        v-model="values.confirmPassword"
        placeholder="Repeat new password"
        :invalid="Boolean(fieldError('confirmPassword'))"
      />
      <div v-if="fieldError('confirmPassword')" class="invalid-feedback d-block">
        {{ fieldError('confirmPassword') }}
      </div>
    </div>
    <div class="d-grid col-9 mx-auto">
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" />
        <i v-else class="bi bi-shield-check me-2" />
        Save Changes
      </button>
    </div>
    <div v-if="successMessage" class="alert alert-success mt-3 mb-0 py-2 small">{{ successMessage }}</div>
  </form>
</template>
