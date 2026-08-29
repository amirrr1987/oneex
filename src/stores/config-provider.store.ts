import type { MappingAlgorithm, ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { theme as antTheme } from 'ant-design-vue/es'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useConfigProviderStore = defineStore('config-provider', () => {
  const isDark = useLocalStorage('oneex-theme-dark', false)

  const algorithm = computed<MappingAlgorithm | MappingAlgorithm[]>(() =>
    isDark.value ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
  )

  const theme = computed<ThemeConfig>(() => ({
    algorithm: algorithm.value,
  }))

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    theme,
    toggleTheme,
  }
})
