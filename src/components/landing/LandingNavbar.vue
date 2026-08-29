<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Flex from 'ant-design-vue/es/flex'
import Layout from 'ant-design-vue/es/layout'
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/shared/BrandLogo.vue'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
</script>

<template>
  <Layout.Header class="border-b px-4">
    <Flex align="center" justify="space-between">
      <BrandLogo to="/" />
      <Flex align="center" gap="small">
        <ThemeToggle />
        <RouterLink to="/sign-in">
          <Button>Sign in ONEEX</Button>
        </RouterLink>
        <RouterLink to="/sign-up">
          <Button type="primary">Create Account</Button>
        </RouterLink>
      </Flex>
    </Flex>
  </Layout.Header>
</template>
