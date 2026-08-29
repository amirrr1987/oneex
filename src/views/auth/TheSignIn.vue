<script setup lang="ts">
import AuthTabs from '@/components/auth/AuthTabs.vue'
import SignInForm from '@/components/auth/SignInForm.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
</script>

<template>
  <section class="pt-5">
    <div class="container">
      <PanelPageTitle title="Join us!" icon="bi-person-plus" />
      <div class="row justify-content-center">
        <div class="col-lg-8 col-xl-6">
          <AuthTabs />
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
              <SignInForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
