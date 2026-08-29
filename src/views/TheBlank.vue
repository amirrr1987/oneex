<script setup lang="ts">
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
</script>

<template>
  <div class="container py-5 text-center">
    <PanelPageTitle title="Get TIC Token" icon="bi-coin" />
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card shadow-sm">
          <div class="card-body p-5">
            <i class="bi bi-coin display-1 text-primary mb-4" />
            <p class="text-muted mb-4">
              Trade on ONEEX to earn TIC tokens, unlock fee discounts, and join the loyalty program.
            </p>
            <RouterLink class="btn btn-primary btn-lg" to="/exchange">
              <i class="bi bi-graph-up me-2" />Start Trading
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
