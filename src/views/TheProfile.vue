<script setup lang="ts">
import ProfileForm from '@/components/panel/ProfileForm.vue'
import ProfileTabs from '@/components/panel/ProfileTabs.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
</script>

<template>
  <section class="pt-5">
    <div class="container">
      <PanelPageTitle title="Your Profile!" icon="bi-person-circle" />
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <ProfileTabs />
        </div>
      </div>
    </div>
  </section>

  <section class="pb-5 bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="card shadow-sm">
            <div class="card-body p-4 p-md-5">
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
