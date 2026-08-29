<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Flex from 'ant-design-vue/es/flex'
import Layout from 'ant-design-vue/es/layout'
import { DollarOutlined } from '@ant-design/icons-vue'
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/shared/BrandLogo.vue'
</script>

<template>
  <Layout.Header class="border-b px-4">
    <Flex align="center" justify="space-between">
      <BrandLogo to="/" />
      <RouterLink to="/get-tic-token">
        <Button type="primary">
          <DollarOutlined />
          Get ONEEX Token
        </Button>
      </RouterLink>
    </Flex>
  </Layout.Header>
</template>
