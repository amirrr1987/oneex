<script setup lang="ts">
  import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { useConfigProviderStore } from './stores/config-provider.store'

const configProviderStore = useConfigProviderStore()
</script>

<template>
  <ConfigProvider :theme="configProviderStore.theme">
    <RouterView />
  </ConfigProvider>
</template>

