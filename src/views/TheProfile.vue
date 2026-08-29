<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import { UserOutlined } from '@ant-design/icons-vue'

import ProfileForm from '@/components/panel/ProfileForm.vue'
import ProfileTabs from '@/components/panel/ProfileTabs.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
</script>

<template>
  <section class="pt-5">
    <div class="mx-auto max-w-7xl px-4">
      <PanelPageTitle title="Your Profile!" :icon="UserOutlined" />
      <div class="flex justify-center">
        <div class="w-full max-w-lg">
          <ProfileTabs />
        </div>
      </div>
    </div>
  </section>

  <section class="pb-5">
    <div class="mx-auto max-w-7xl px-4">
      <div class="flex justify-center">
        <div class="w-full max-w-lg">
          <Card class="p-4 md:p-8">
            <ProfileForm />
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>
