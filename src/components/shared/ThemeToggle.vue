<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Tooltip from 'ant-design-vue/es/tooltip'
import { BulbFilled, BulbOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'

import { useConfigProviderStore } from '@/stores/config-provider.store'

const config = useConfigProviderStore()
const { isDark } = storeToRefs(config)
</script>

<template>
  <Tooltip :title="isDark ? 'Switch to light mode' : 'Switch to night mode'">
    <Button
      size="small"
      class="inline-flex items-center gap-1"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to night mode'"
      @click="config.toggleTheme()"
    >
      <BulbFilled v-if="isDark" />
      <BulbOutlined v-else />
      <span class="hidden lg:inline">{{ isDark ? 'Light' : 'Night' }}</span>
    </Button>
  </Tooltip>
</template>
