<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Card from 'ant-design-vue/es/card'
import Flex from 'ant-design-vue/es/flex'
import { KeyOutlined } from '@ant-design/icons-vue'

import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue'
import { UiPage } from '@/ui'
</script>

<template>
  <UiPage title="Reset Password" :icon="KeyOutlined" subtitle="Recover access to your ONEEX account">
    <Flex justify="center">
      <Flex vertical class="w-full max-w-2xl" gap="middle">
        <Alert
          type="warning"
          show-icon
          message="For security, password reset may lock withdrawals for 24 hours. Never share your password in plain text."
        />
        <Card hoverable>
          <ResetPasswordForm />
        </Card>
      </Flex>
    </Flex>
  </UiPage>
</template>
