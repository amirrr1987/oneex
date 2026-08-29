<script setup lang="ts">
import Affix from 'ant-design-vue/es/affix'
import Button from 'ant-design-vue/es/button'
import Flex from 'ant-design-vue/es/flex'
import Layout from 'ant-design-vue/es/layout'
import Space from 'ant-design-vue/es/space'
import Tag from 'ant-design-vue/es/tag'
import { RocketOutlined } from '@ant-design/icons-vue'
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/shared/BrandLogo.vue'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
</script>

<template>
  <Affix :offset-top="0">
    <Layout.Header class="border-b px-4 backdrop-blur-md">
      <Flex align="center" justify="space-between" class="h-16">
        <BrandLogo to="/" />
        <Space wrap>
          <Tag color="green" class="hidden sm:inline-flex">Live Markets</Tag>
          <ThemeToggle />
          <RouterLink to="/sign-in">
            <Button>Sign In</Button>
          </RouterLink>
          <RouterLink to="/sign-up">
            <Button type="primary">
              <RocketOutlined />
              Create Account
            </Button>
          </RouterLink>
        </Space>
      </Flex>
    </Layout.Header>
  </Affix>
</template>
