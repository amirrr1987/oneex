<script setup lang="ts">
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
</script>

<template>
  <div class="container py-5">
    <PanelPageTitle title="Logout" icon="bi-box-arrow-right" />
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow-sm text-center">
          <div class="card-body p-5">
            <i class="bi bi-box-arrow-right display-4 text-danger mb-3" />
            <p class="mb-4">Are you sure you want to log out of your ONEEX account?</p>
            <div class="d-flex gap-2 justify-content-center">
              <RouterLink class="btn btn-outline-secondary" to="/">Cancel</RouterLink>
              <RouterLink class="btn btn-danger" to="/sign-in">Logout</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
