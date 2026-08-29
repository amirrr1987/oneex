<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Space from 'ant-design-vue/es/space'
import { UserOutlined } from '@ant-design/icons-vue'

import ProfileForm from '@/components/panel/ProfileForm.vue'
import ProfileTabs from '@/components/panel/ProfileTabs.vue'
import { UiPage } from '@/ui'
</script>

<template>
  <UiPage title="Your Profile" :icon="UserOutlined" subtitle="Manage your account details">
    <Space direction="vertical" class="w-full max-w-lg mx-auto" :size="16">
      <ProfileTabs />
      <Card hoverable bordered>
        <ProfileForm />
      </Card>
    </Space>
  </UiPage>
</template>
