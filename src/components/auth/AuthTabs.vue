<script setup lang="ts">
import Menu from 'ant-design-vue/es/menu'
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const tabs = [
  { label: 'Sign In', to: '/sign-in', icon: LoginOutlined },
  { label: 'Sign Up', to: '/sign-up', icon: UserAddOutlined },
] as const

const route = useRoute()
const selectedKeys = computed(() => [route.path])
</script>

<template>
  <Menu mode="horizontal" :selected-keys="selectedKeys" class="w-full">
    <Menu.Item v-for="tab in tabs" :key="tab.to">
      <RouterLink :to="tab.to" class="inline-flex items-center justify-center gap-2 uppercase">
        <component :is="tab.icon" />
        {{ tab.label }}
      </RouterLink>
    </Menu.Item>
  </Menu>
</template>
