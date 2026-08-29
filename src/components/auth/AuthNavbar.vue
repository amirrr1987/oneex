<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Layout from 'ant-design-vue/es/layout'
import { DollarOutlined } from '@ant-design/icons-vue'
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/shared/BrandLogo.vue'
</script>

<template>
  <header class="mb-4">
    <Layout.Header class="flex items-center border-b px-4 shadow-sm">
      <BrandLogo to="/" />
      <RouterLink to="/get-tic-token" class="ml-auto">
        <Button type="primary" class="inline-flex items-center gap-2">
          <DollarOutlined />
          Get ONEEX Token Free
        </Button>
      </RouterLink>
    </Layout.Header>
  </header>
</template>
