<script setup lang="ts">
import Menu from 'ant-design-vue/es/menu'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const tabs = [
  { label: 'Profile', to: '/profile', icon: UserOutlined },
  { label: 'Security', to: '/security', icon: LockOutlined },
] as const

const route = useRoute()
const selectedKeys = computed(() => [route.path])
</script>

<template>
  <Menu mode="horizontal" :selected-keys="selectedKeys" class="w-full shadow-sm">
    <Menu.Item v-for="tab in tabs" :key="tab.to">
      <RouterLink :to="tab.to" class="inline-flex items-center justify-center gap-2 uppercase">
        <component :is="tab.icon" />
        {{ tab.label }}
      </RouterLink>
    </Menu.Item>
  </Menu>
</template>
