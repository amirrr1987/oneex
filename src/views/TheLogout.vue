<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Card from 'ant-design-vue/es/card'
import Typography from 'ant-design-vue/es/typography'
import { LogoutOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import { useAuthStore } from '@/stores/auth'

const { Paragraph } = Typography
const auth = useAuthStore()
const router = useRouter()

function onLogout() {
  auth.signOut()
  router.push('/sign-in')
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-5">
    <PanelPageTitle title="Logout" :icon="LogoutOutlined" />
    <div class="flex justify-center">
      <div class="w-full max-w-md">
        <Card class="text-center">
          <LogoutOutlined class="mb-3 text-5xl" />
          <Paragraph class="mb-4">Are you sure you want to log out of your ONEEX account?</Paragraph>
          <div class="flex justify-center gap-2">
            <Button @click="router.push('/exchange')">Cancel</Button>
            <Button danger type="primary" @click="onLogout">Logout</Button>
          </div>
          <Alert
            type="info"
            message="Session cleared locally. Protected pages require sign-in again."
            show-icon
            class="mt-4 text-left"
          />
        </Card>
      </div>
    </div>
  </div>
</template>
