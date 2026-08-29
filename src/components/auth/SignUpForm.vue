<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Checkbox from 'ant-design-vue/es/checkbox'
import Col from 'ant-design-vue/es/col'
import Divider from 'ant-design-vue/es/divider'
import Flex from 'ant-design-vue/es/flex'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import Input from 'ant-design-vue/es/input'
import Row from 'ant-design-vue/es/row'
import Space from 'ant-design-vue/es/space'
import Typography from 'ant-design-vue/es/typography'
import {
  FileTextOutlined,
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import PasswordField from '@/components/shared/PasswordField.vue'
import { useZodForm } from '@/composables/useZodForm'
import { signUpSchema } from '@/schemas/auth'
import { useAuthStore } from '@/stores/auth'

const { Text, Link } = Typography
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
    successMessage.value = 'Account created. Redirecting to exchange…'
    setTimeout(() => router.push('/exchange'), 500)
  })
  if (!ok) successMessage.value = ''
}
</script>

<template>
  <Form layout="vertical" @submit.prevent="onSubmit">
    <Alert
      type="info"
      show-icon
      class="mb-4"
      message="Create your ONEEX account to trade, deposit, and earn TIC rewards."
    >
      <template #icon><SafetyCertificateOutlined /></template>
    </Alert>

    <Row :gutter="16">
      <Col :xs="24" :md="12">
        <FormItem
          label="First name"
          :validate-status="fieldError('firstName') ? 'error' : undefined"
          :help="fieldError('firstName')"
        >
          <Input v-model:value="values.firstName" placeholder="First name" size="large">
            <template #prefix><UserOutlined /></template>
          </Input>
        </FormItem>
      </Col>
      <Col :xs="24" :md="12">
        <FormItem
          label="Last name"
          :validate-status="fieldError('lastName') ? 'error' : undefined"
          :help="fieldError('lastName')"
        >
          <Input v-model:value="values.lastName" placeholder="Last name" size="large">
            <template #prefix><IdcardOutlined /></template>
          </Input>
        </FormItem>
      </Col>
    </Row>

    <FormItem
      label="Email"
      :validate-status="fieldError('email') ? 'error' : undefined"
      :help="fieldError('email')"
    >
      <Input v-model:value="values.email" type="email" placeholder="you@example.com" size="large">
        <template #prefix><MailOutlined /></template>
      </Input>
    </FormItem>

    <FormItem
      label="Password"
      :validate-status="fieldError('password') ? 'error' : undefined"
      :help="fieldError('password')"
    >
      <PasswordField
        v-model="values.password"
        placeholder="Create a strong password"
        :invalid="Boolean(fieldError('password'))"
      />
    </FormItem>

    <FormItem
      label="Confirm password"
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
        <Space wrap>
          <FileTextOutlined />
          <Text>I agree to</Text>
          <Link><RouterLink to="/terms">Terms</RouterLink></Link>
          <Text>and</Text>
          <Link><RouterLink to="/privacy">Privacy</RouterLink></Link>
        </Space>
      </Checkbox>
    </FormItem>

    <FormItem
      label="Captcha"
      :validate-status="fieldError('captcha') ? 'error' : undefined"
      :help="fieldError('captcha') || `Demo code: ${auth.demoCaptcha}`"
    >
      <Input v-model:value="values.captcha" placeholder="Enter captcha" size="large">
        <template #prefix><LockOutlined /></template>
      </Input>
    </FormItem>

    <Divider />

    <Button type="primary" html-type="submit" block size="large" :loading="isSubmitting">
      <template v-if="!isSubmitting" #icon><UserAddOutlined /></template>
      Create ONEEX Account
    </Button>

    <Alert v-if="successMessage" type="success" :message="successMessage" show-icon class="mt-4" />
    <Alert v-if="errorMessage" type="error" :message="errorMessage" show-icon class="mt-4" />

    <Flex vertical align="center" gap="small" class="mt-4 sm:hidden">
      <Text type="secondary">Already have an account?</Text>
      <RouterLink to="/sign-in" class="w-full">
        <Button block size="large">Sign In</Button>
      </RouterLink>
    </Flex>

    <Text type="secondary" class="mt-4 block text-center">
      Need help? Contact support@oneex.com
    </Text>
  </Form>
</template>
