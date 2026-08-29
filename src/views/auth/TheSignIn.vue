<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Flex from 'ant-design-vue/es/flex'
import Space from 'ant-design-vue/es/space'
import { LoginOutlined } from '@ant-design/icons-vue'

import AuthTabs from '@/components/auth/AuthTabs.vue'
import SignInForm from '@/components/auth/SignInForm.vue'
import { UiPage, UiSection } from '@/ui'
</script>

<template>
  <UiPage title="Sign In" :icon="LoginOutlined" subtitle="Access your ONEEX trading account">
    <Flex justify="center">
      <Space direction="vertical" class="w-full max-w-md" :size="16">
        <AuthTabs />
        <UiSection title="Welcome back" subtitle="Enter your credentials to continue">
          <SignInForm />
        </UiSection>
      </Space>
    </Flex>
  </UiPage>
</template>
