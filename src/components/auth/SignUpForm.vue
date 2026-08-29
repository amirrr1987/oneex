<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Checkbox from 'ant-design-vue/es/checkbox'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import Input from 'ant-design-vue/es/input'
import {
  FileTextOutlined,
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import PasswordField from '@/components/shared/PasswordField.vue'
import { useZodForm } from '@/composables/useZodForm'
import { signUpSchema } from '@/schemas/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const successMessage = ref('')
const errorMessage = ref('')

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
  errorMessage.value = ''

  if (!auth.validateCaptcha(values.captcha)) {
    errorMessage.value = `Enter captcha code: ${auth.demoCaptcha}`
    return
  }

  const ok = await submit(async () => {
    await auth.signUp({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    })
    successMessage.value = 'Account created. Redirecting…'
    setTimeout(() => router.push('/exchange'), 500)
  })
  if (!ok) successMessage.value = ''
}
</script>

<template>
  <Form layout="vertical" @submit.prevent="onSubmit">
    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <FormItem
        :validate-status="fieldError('firstName') ? 'error' : undefined"
        :help="fieldError('firstName')"
      >
        <Input v-model:value="values.firstName" placeholder="First name">
          <template #prefix>
            <UserOutlined />
          </template>
        </Input>
      </FormItem>

      <FormItem
        :validate-status="fieldError('lastName') ? 'error' : undefined"
        :help="fieldError('lastName')"
      >
        <Input v-model:value="values.lastName" placeholder="Last name">
          <template #prefix>
            <IdcardOutlined />
          </template>
        </Input>
      </FormItem>
    </div>

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

    <FormItem
      :validate-status="fieldError('confirmPassword') ? 'error' : undefined"
      :help="fieldError('confirmPassword')"
    >
      <PasswordField
        v-model="values.confirmPassword"
        placeholder="Repeat password"
        :invalid="Boolean(fieldError('confirmPassword'))"
      />
    </FormItem>

    <FormItem
      :validate-status="fieldError('terms') ? 'error' : undefined"
      :help="fieldError('terms')"
    >
      <Checkbox v-model:checked="values.terms">
        <span class="inline-flex items-center gap-1 text-sm">
          <FileTextOutlined />
          I agree to
          <RouterLink to="/terms">Terms</RouterLink>,
          Cookie and
          <RouterLink to="/privacy">Privacy</RouterLink>
          policies
        </span>
      </Checkbox>
    </FormItem>

    <FormItem
      :validate-status="fieldError('captcha') ? 'error' : undefined"
      :help="fieldError('captcha') || `Captcha code: ${auth.demoCaptcha}`"
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
          <UserAddOutlined />
        </template>
        Create account
      </Button>
    </div>

    <Alert v-if="successMessage" type="success" :message="successMessage" show-icon class="mt-3" />
    <Alert v-if="errorMessage" type="error" :message="errorMessage" show-icon class="mt-3" />

    <div class="mt-3 text-center sm:hidden">
      <p class="text-sm">Already have an account?</p>
      <RouterLink to="/sign-in" class="mt-2 block">
        <Button block>Sign In</Button>
      </RouterLink>
    </div>
  </Form>
</template>
