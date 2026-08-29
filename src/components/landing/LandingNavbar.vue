<script setup lang="ts">
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
    <nav
      class="navbar navbar-expand-sm navbar-light bg-white border-bottom"
      :class="{ 'shadow-sm': elevated }"
    >
      <div class="container">
        <BrandLogo to="/" />
        <div class="ms-auto d-flex align-items-center gap-2">
          <ThemeToggle />
          <RouterLink class="btn btn-outline-primary btn-sm" to="/sign-in">Sign in ONEEX</RouterLink>
          <RouterLink class="btn btn-primary btn-sm" to="/sign-up">Create Account</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>
