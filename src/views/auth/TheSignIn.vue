<script setup lang="ts">
import { LoginOutlined } from '@ant-design/icons-vue'

import AuthTabs from '@/components/auth/AuthTabs.vue'
import SignInForm from '@/components/auth/SignInForm.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import Card from 'ant-design-vue/es/card'
</script>

<template>
  <section class="pt-5">
    <div class="mx-auto max-w-7xl px-4">
      <PanelPageTitle title="Sign In" :icon="LoginOutlined" />
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
            <SignInForm />
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>
