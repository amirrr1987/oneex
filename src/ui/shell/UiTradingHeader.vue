<script setup lang="ts">
import Affix from 'ant-design-vue/es/affix'
import Avatar from 'ant-design-vue/es/avatar'
import Badge from 'ant-design-vue/es/badge'
import Button from 'ant-design-vue/es/button'
import Drawer from 'ant-design-vue/es/drawer'
import Dropdown from 'ant-design-vue/es/dropdown'
import Flex from 'ant-design-vue/es/flex'
import Layout from 'ant-design-vue/es/layout'
import Menu from 'ant-design-vue/es/menu'
import Space from 'ant-design-vue/es/space'
import Tag from 'ant-design-vue/es/tag'
import Typography from 'ant-design-vue/es/typography'
import {
  BarChartOutlined,
  DollarOutlined,
  HistoryOutlined,
  LineChartOutlined,
  LogoutOutlined,
  MenuOutlined,
  SwapOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons-vue'
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import BrandLogo from '@/components/shared/BrandLogo.vue'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import { accountNav, tradingNav } from '@/ui/navigation'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const { user } = storeToRefs(auth)
const drawerOpen = ref(false)

const { Text } = Typography

const iconMap: Record<string, object> = {
  '/exchange': SwapOutlined,
  '/markets': LineChartOutlined,
  '/balance': WalletOutlined,
  '/trade-history': HistoryOutlined,
  '/reports': BarChartOutlined,
}

const selectedKeys = computed(() => [route.path])

const userInitials = computed(() => {
  if (!user.value) return '?'
  return `${user.value.firstName?.[0] ?? ''}${user.value.lastName?.[0] ?? ''}`.toUpperCase()
})

function closeDrawer() {
  drawerOpen.value = false
}
</script>

<template>
  <Affix :offset-top="0">
    <Layout.Header class="border-b px-4 backdrop-blur-md">
      <Flex align="center" justify="space-between" gap="middle" class="h-16">
        <Flex align="center" gap="middle">
          <Button class="lg:hidden" type="text" aria-label="Open menu" @click="drawerOpen = true">
            <MenuOutlined />
          </Button>
          <BrandLogo to="/exchange" />
          <Tag v-if="user" color="blue" class="hidden md:inline-flex">
            {{ user.firstName }} {{ user.lastName }}
          </Tag>
        </Flex>

        <Menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          class="hidden min-w-0 flex-1 border-none bg-transparent lg:flex"
        >
          <template v-for="item in tradingNav" :key="item.key">
            <Menu.SubMenu v-if="'children' in item" :key="`${item.key}-sub`">
              <template #title>
                <Space>
                  <WalletOutlined />
                  {{ item.label }}
                </Space>
              </template>
              <Menu.Item v-for="child in item.children" :key="child.key">
                <RouterLink :to="child.to">{{ child.label }}</RouterLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item v-else :key="item.key">
              <RouterLink :to="item.to">
                <Space>
                  <component :is="iconMap[item.key]" v-if="iconMap[item.key]" />
                  {{ item.label }}
                </Space>
              </RouterLink>
            </Menu.Item>
          </template>
        </Menu>

        <Space>
          <ThemeToggle />
          <Dropdown :trigger="['click']">
            <Badge dot>
              <Button type="text" aria-label="Account menu" class="px-2">
                <Avatar size="small">{{ userInitials }}</Avatar>
              </Button>
            </Badge>
            <template #overlay>
              <Menu>
                <Menu.Item v-for="item in accountNav" :key="item.key">
                  <RouterLink :to="item.to">
                    <LogoutOutlined v-if="item.key === '/logout'" class="mr-2" />
                    <UserOutlined v-else-if="item.key === '/profile'" class="mr-2" />
                    {{ item.label }}
                  </RouterLink>
                </Menu.Item>
              </Menu>
            </template>
          </Dropdown>
          <RouterLink to="/get-tic-token">
            <Button type="primary">
              <DollarOutlined />
              TIC
            </Button>
          </RouterLink>
        </Space>
      </Flex>
    </Layout.Header>
  </Affix>

  <Drawer v-model:open="drawerOpen" placement="left" title="ONEEX Menu" @close="closeDrawer">
    <Menu mode="inline" :selected-keys="selectedKeys" @click="closeDrawer">
      <template v-for="item in tradingNav" :key="item.key">
        <Menu.SubMenu v-if="'children' in item" :key="`${item.key}-drawer`" :title="item.label">
          <Menu.Item v-for="child in item.children" :key="child.key">
            <RouterLink :to="child.to">{{ child.label }}</RouterLink>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item v-else :key="item.key">
          <RouterLink :to="item.to">{{ item.label }}</RouterLink>
        </Menu.Item>
      </template>
      <Menu.Divider />
      <Menu.Item v-for="item in accountNav" :key="item.key">
        <RouterLink :to="item.to">{{ item.label }}</RouterLink>
      </Menu.Item>
    </Menu>
    <Text v-if="user" type="secondary" class="mt-4 block">
      Signed in as {{ user.email }}
    </Text>
  </Drawer>
</template>
