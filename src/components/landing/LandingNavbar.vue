<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Layout from 'ant-design-vue/es/layout'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'

import BrandLogo from '@/components/shared/BrandLogo.vue'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'

const { y } = useWindowScroll()
const elevated = computed(() => y.value > 8)
</script>

<template>
  <header class="mb-4">
    <Layout.Header
      class="flex items-center border-b px-4"
      :class="{ 'shadow-sm': elevated }"
    >
      <BrandLogo to="/" />
      <div class="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <RouterLink to="/sign-in">
          <Button size="small">Sign in ONEEX</Button>
        </RouterLink>
        <RouterLink to="/sign-up">
          <Button type="primary" size="small">Create Account</Button>
        </RouterLink>
      </div>
    </Layout.Header>
  </header>
</template>
