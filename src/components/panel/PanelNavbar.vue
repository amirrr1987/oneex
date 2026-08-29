<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Dropdown from 'ant-design-vue/es/dropdown'
import Layout from 'ant-design-vue/es/layout'
import Menu from 'ant-design-vue/es/menu'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import BrandLogo from '@/components/shared/BrandLogo.vue'

const route = useRoute()
const selectedKeys = computed(() => [route.path])
</script>

<template>
  <header class="mb-4">
    <Layout.Header class="flex flex-wrap items-center gap-2 border-b px-4">
      <BrandLogo to="/exchange" />

      <Menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        class="min-w-0 flex-1 border-none bg-transparent"
      >
        <Menu.Item key="/exchange">
          <RouterLink to="/exchange">Exchange</RouterLink>
        </Menu.Item>
        <Menu.Item key="/markets">
          <RouterLink to="/markets">Markets</RouterLink>
        </Menu.Item>
        <Menu.Item key="/balance">
          <RouterLink to="/balance">Balance</RouterLink>
        </Menu.Item>
        <Menu.SubMenu key="transaction" title="Transaction">
          <Menu.Item key="/deposit">
            <RouterLink to="/deposit">Deposit</RouterLink>
          </Menu.Item>
          <Menu.Item key="/withdraw">
            <RouterLink to="/withdraw">Withdraw</RouterLink>
          </Menu.Item>
          <Menu.Item key="/withdraw-history">
            <RouterLink to="/withdraw-history">Withdraw History</RouterLink>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="/trade-history">
          <RouterLink to="/trade-history">Trade History</RouterLink>
        </Menu.Item>
        <Menu.Item key="/reports">
          <RouterLink to="/reports">Reports</RouterLink>
        </Menu.Item>
      </Menu>

      <div class="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Dropdown :trigger="['click', 'hover']">
          <Button type="text" aria-label="Account menu" title="Account menu">
            <UserOutlined class="text-lg" />
          </Button>
          <template #overlay>
            <Menu>
              <Menu.Item key="/profile">
                <RouterLink to="/profile">Profile</RouterLink>
              </Menu.Item>
              <Menu.Item key="/security">
                <RouterLink to="/security">Security</RouterLink>
              </Menu.Item>
              <Menu.Item key="/last-ten-login">
                <RouterLink to="/last-ten-login">Last 10 Login</RouterLink>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="/logout">
                <RouterLink to="/logout" class="inline-flex items-center gap-2">
                  <LogoutOutlined />
                  Logout
                </RouterLink>
              </Menu.Item>
            </Menu>
          </template>
        </Dropdown>
        <RouterLink to="/get-tic-token">
          <Button type="primary">Get TIC Token</Button>
        </RouterLink>
      </div>
    </Layout.Header>
  </header>
</template>
