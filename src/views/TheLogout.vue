<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Flex from 'ant-design-vue/es/flex'
import Result from 'ant-design-vue/es/result'
import Space from 'ant-design-vue/es/space'
import { LogoutOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

import { UiPage } from '@/ui'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function onLogout() {
  auth.signOut()
  router.push('/sign-in')
}
</script>

<template>
  <UiPage title="Logout" :icon="LogoutOutlined" subtitle="End your current session">
    <Flex justify="center">
      <Result
        status="warning"
        title="Log out of ONEEX?"
        sub-title="Session cleared locally. Protected pages require sign-in again."
      >
        <template #extra>
          <Space>
            <Button @click="router.push('/exchange')">Stay signed in</Button>
            <Button danger type="primary" @click="onLogout">Log out</Button>
          </Space>
        </template>
      </Result>
    </Flex>
  </UiPage>
</template>
