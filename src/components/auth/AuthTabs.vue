<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const tabs = [
  { label: 'Sign In', to: '/sign-in', icon: 'bi-box-arrow-in-right' },
  { label: 'Sign Up', to: '/sign-up', icon: 'bi-person-plus' },
] as const

const route = useRoute()
</script>

<template>
  <ul class="nav nav-tabs nav-fill shadow-sm">
    <li v-for="tab in tabs" :key="tab.to" class="nav-item">
      <RouterLink
        class="nav-link text-uppercase d-inline-flex align-items-center justify-content-center gap-2"
        :class="{ active: route.path === tab.to }"
        :to="tab.to"
      >
        <i :class="['bi', tab.icon]" />
        {{ tab.label }}
      </RouterLink>
    </li>
  </ul>
</template>
