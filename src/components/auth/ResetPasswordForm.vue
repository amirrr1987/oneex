<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import Input from 'ant-design-vue/es/input'
import { LockOutlined, MailOutlined, SendOutlined } from '@ant-design/icons-vue'
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
  <Form layout="vertical" @submit.prevent="onSubmit">
    <FormItem
      :validate-status="fieldError('email') ? 'error' : undefined"
      :help="fieldError('email')"
    >
      <Input v-model:value="values.email" type="email" placeholder="Enter email">
        <template #prefix>
          <MailOutlined />
        </template>
      </Input>
    </FormItem>

    <FormItem
      :validate-status="fieldError('captcha') ? 'error' : undefined"
      :help="fieldError('captcha')"
    >
      <Input v-model:value="values.captcha" placeholder="Captcha">
        <template #prefix>
          <LockOutlined />
        </template>
      </Input>
    </FormItem>

    <div class="mx-auto w-3/4">
      <Button type="primary" html-type="submit" block :loading="isSubmitting">
        <template v-if="!isSubmitting" #icon>
          <SendOutlined />
        </template>
        Send Your Email
      </Button>
    </div>

    <Alert v-if="successMessage" type="success" :message="successMessage" show-icon class="mt-3" />
  </Form>
</template>
