<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Space from 'ant-design-vue/es/space'
import { LockOutlined } from '@ant-design/icons-vue'

import ProfileTabs from '@/components/panel/ProfileTabs.vue'
import SecurityForm from '@/components/panel/SecurityForm.vue'
import { UiPage } from '@/ui'
</script>

<template>
  <UiPage title="Security" :icon="LockOutlined" subtitle="Update password and account protection">
    <Space direction="vertical" class="mx-auto w-full max-w-lg" :size="16">
      <ProfileTabs />
      <Card hoverable bordered>
        <SecurityForm />
      </Card>
    </Space>
  </UiPage>
</template>
