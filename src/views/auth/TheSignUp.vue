<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import { UserAddOutlined } from '@ant-design/icons-vue'

import AuthTabs from '@/components/auth/AuthTabs.vue'
import SignUpForm from '@/components/auth/SignUpForm.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
</script>

<template>
  <section class="pt-5">
    <div class="mx-auto max-w-7xl px-4">
      <PanelPageTitle title="Join us!" :icon="UserAddOutlined" />
      <div class="flex justify-center">
        <div class="w-full max-w-2xl">
          <AuthTabs />
        </div>
      </div>
    </div>
  </section>

  <section class="pb-5">
    <div class="mx-auto max-w-7xl px-4">
      <div class="flex justify-center">
        <div class="w-full max-w-2xl">
          <Card class="p-4 md:p-8">
            <SignUpForm />
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>
