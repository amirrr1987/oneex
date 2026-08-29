<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Menu from 'ant-design-vue/es/menu'
import Typography from 'ant-design-vue/es/typography'
import { KeyOutlined } from '@ant-design/icons-vue'

import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'

const { Paragraph } = Typography
</script>

<template>
  <section class="pt-5">
    <div class="mx-auto max-w-7xl px-4">
      <PanelPageTitle title="Forget Password!" :icon="KeyOutlined" />
      <Paragraph class="mx-auto mb-4 max-w-3xl text-center">
        For security, password reset may lock withdrawals for 24 hours. Never share your password in plain text.
      </Paragraph>
      <div class="flex justify-center">
        <div class="w-full max-w-2xl">
          <Menu mode="horizontal" :selected-keys="['/reset-password']" class="w-full">
            <Menu.Item key="/reset-password">
              <span class="inline-flex items-center justify-center gap-2 uppercase">
                <KeyOutlined />Reset Password
              </span>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </div>
  </section>

  <section class="pb-5">
    <div class="mx-auto max-w-7xl px-4">
      <div class="flex justify-center">
        <div class="w-full max-w-2xl">
          <Card class="p-4 md:p-8">
            <ResetPasswordForm />
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>
