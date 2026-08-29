<script setup lang="ts">
import { App as AntApp, ConfigProvider, FloatButton } from 'ant-design-vue'
import { RouterView } from 'vue-router'

import { useConfigProviderStore } from './stores/config-provider.store'

const configProviderStore = useConfigProviderStore()
</script>

<template>
  <ConfigProvider :theme="configProviderStore.theme">
    <AntApp>
      <RouterView />
      <FloatButton.BackTop />
    </AntApp>
  </ConfigProvider>
</template>
