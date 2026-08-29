<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import Input from 'ant-design-vue/es/input'
import { LoginOutlined, MailOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import PasswordField from '@/components/shared/PasswordField.vue'
import { useZodForm } from '@/composables/useZodForm'
import { signInSchema } from '@/schemas/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const successMessage = ref('')
const errorMessage = ref('')

const { values, fieldError, submit, isSubmitting } = useZodForm(signInSchema, {
  email: '',
  password: '',
})

async function onSubmit() {
  successMessage.value = ''
  errorMessage.value = ''
  const ok = await submit(async () => {
    await auth.signIn(values.email, values.password)
    successMessage.value = 'Signed in successfully.'
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/exchange'
    setTimeout(() => router.push(redirect), 400)
  })
  if (!ok) successMessage.value = ''
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
      :validate-status="fieldError('password') ? 'error' : undefined"
      :help="fieldError('password')"
    >
      <PasswordField
        v-model="values.password"
        placeholder="Password"
        :invalid="Boolean(fieldError('password'))"
      />
    </FormItem>

    <p class="text-sm">
      Forgot password?
      <RouterLink to="/reset-password">Reset password</RouterLink>
    </p>

    <p class="hidden text-sm sm:block">
      Not registered yet?
      <RouterLink to="/sign-up">Create account</RouterLink>
    </p>

    <div class="mx-auto mt-4 w-3/4">
      <Button type="primary" html-type="submit" block :loading="isSubmitting">
        <template v-if="!isSubmitting" #icon>
          <LoginOutlined />
        </template>
        Sign in ONEEX
      </Button>
    </div>

    <Alert v-if="successMessage" type="success" :message="successMessage" show-icon class="mt-3" />
    <Alert v-if="errorMessage" type="error" :message="errorMessage" show-icon class="mt-3" />

    <div class="mt-3 text-center sm:hidden">
      <p class="text-sm">Not registered yet?</p>
      <RouterLink to="/sign-up" class="mt-2 block">
        <Button block>Create Account</Button>
      </RouterLink>
    </div>

    <p class="mt-4 text-center text-sm">
      Shall you encounter any problems logging in, please contact us at support.oneex.com
    </p>
  </Form>
</template>
