<script setup lang="ts">
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
</script>

<template>
  <section class="pt-5">
    <div class="container">
      <PanelPageTitle title="Forget Password!" icon="bi-key" />
      <p class="text-center text-muted col-lg-8 mx-auto mb-4">
        For security, password reset may lock withdrawals for 24 hours. Never share your password in plain text.
      </p>
      <div class="row justify-content-center">
        <div class="col-lg-8 col-xl-6">
          <div class="nav nav-tabs nav-fill mb-0">
            <span class="nav-link active text-uppercase d-inline-flex align-items-center justify-content-center gap-2">
              <i class="bi bi-key" />Reset Password
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="pb-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-xl-6">
          <div class="card shadow-sm">
            <div class="card-body p-4 p-md-5">
              <ResetPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
