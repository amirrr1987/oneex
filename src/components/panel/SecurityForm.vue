<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import { SafetyCertificateOutlined } from '@ant-design/icons-vue'
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
  <Form layout="vertical" @submit.prevent="onSubmit">
    <FormItem
      label="Current password"
      :validate-status="fieldError('currentPassword') ? 'error' : undefined"
      :help="fieldError('currentPassword')"
    >
      <PasswordField
        v-model="values.currentPassword"
        placeholder="Current password"
        :invalid="Boolean(fieldError('currentPassword'))"
      />
    </FormItem>

    <FormItem
      label="New password"
      :validate-status="fieldError('newPassword') ? 'error' : undefined"
      :help="fieldError('newPassword')"
    >
      <PasswordField
        v-model="values.newPassword"
        placeholder="New password"
        :invalid="Boolean(fieldError('newPassword'))"
      />
    </FormItem>

    <FormItem
      label="Repeat new password"
      :validate-status="fieldError('confirmPassword') ? 'error' : undefined"
      :help="fieldError('confirmPassword')"
    >
      <PasswordField
        v-model="values.confirmPassword"
        placeholder="Repeat new password"
        :invalid="Boolean(fieldError('confirmPassword'))"
      />
    </FormItem>

    <div class="mx-auto w-3/4">
      <Button type="primary" html-type="submit" block :loading="isSubmitting">
        <template v-if="!isSubmitting" #icon>
          <SafetyCertificateOutlined />
        </template>
        Save Changes
      </Button>
    </div>

    <Alert v-if="successMessage" type="success" :message="successMessage" show-icon class="mt-3" />
  </Form>
</template>
