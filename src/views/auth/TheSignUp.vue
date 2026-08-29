<script setup lang="ts">
import Flex from 'ant-design-vue/es/flex'
import Space from 'ant-design-vue/es/space'
import { UserAddOutlined } from '@ant-design/icons-vue'

import AuthTabs from '@/components/auth/AuthTabs.vue'
import SignUpForm from '@/components/auth/SignUpForm.vue'
import { UiPage, UiSection } from '@/ui'
</script>

<template>
  <UiPage title="Join us!" :icon="UserAddOutlined" subtitle="Create your ONEEX account in minutes">
    <Flex justify="center">
      <Space direction="vertical" class="w-full max-w-md" :size="16">
        <AuthTabs />
        <UiSection title="Create account" subtitle="Start trading with a secure ONEEX profile">
          <SignUpForm />
        </UiSection>
      </Space>
    </Flex>
  </UiPage>
</template>
