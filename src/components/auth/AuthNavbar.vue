<script setup lang="ts">
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/shared/BrandLogo.vue'
</script>

<template>
  <header class="mb-4">
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div class="container">
        <BrandLogo to="/" />
        <RouterLink class="btn btn-primary ms-auto d-flex align-items-center gap-2" to="/get-tic-token">
          <i class="bi bi-coin" />
          Get ONEEX Token Free
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
