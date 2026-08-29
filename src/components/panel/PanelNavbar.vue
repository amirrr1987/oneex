<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Dropdown from 'ant-design-vue/es/dropdown'
import Flex from 'ant-design-vue/es/flex'
import Layout from 'ant-design-vue/es/layout'
import Menu from 'ant-design-vue/es/menu'
import {
  BarChartOutlined,
  DownloadOutlined,
  HistoryOutlined,
  LineChartOutlined,
  LogoutOutlined,
  SwapOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons-vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import BrandLogo from '@/components/shared/BrandLogo.vue'

const route = useRoute()
const selectedKeys = computed(() => [route.path])
</script>

<template>
  <Layout.Header class="border-b px-4">
    <Flex align="center" gap="middle" wrap="wrap">
      <BrandLogo to="/exchange" />

      <Menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        class="min-w-0 flex-1 border-none bg-transparent"
      >
        <Menu.Item key="/exchange">
          <RouterLink to="/exchange" class="inline-flex items-center gap-2">
            <SwapOutlined />
            Exchange
          </RouterLink>
        </Menu.Item>
        <Menu.Item key="/markets">
          <RouterLink to="/markets" class="inline-flex items-center gap-2">
            <LineChartOutlined />
            Markets
          </RouterLink>
        </Menu.Item>
        <Menu.Item key="/balance">
          <RouterLink to="/balance" class="inline-flex items-center gap-2">
            <WalletOutlined />
            Balance
          </RouterLink>
        </Menu.Item>
        <Menu.SubMenu key="transaction">
          <template #title>
            <span class="inline-flex items-center gap-2">
              <DownloadOutlined />
              Transaction
            </span>
          </template>
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
          <RouterLink to="/trade-history" class="inline-flex items-center gap-2">
            <HistoryOutlined />
            Trade History
          </RouterLink>
        </Menu.Item>
        <Menu.Item key="/reports">
          <RouterLink to="/reports" class="inline-flex items-center gap-2">
            <BarChartOutlined />
            Reports
          </RouterLink>
        </Menu.Item>
      </Menu>

      <Flex align="center" gap="small">
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
      </Flex>
    </Flex>
  </Layout.Header>
</template>
