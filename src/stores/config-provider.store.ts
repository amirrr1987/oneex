import type { MappingAlgorithm, ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { theme as antTheme } from 'ant-design-vue/es'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

const fontStack = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

export const useConfigProviderStore = defineStore('config-provider', () => {
  const isDark = useLocalStorage('oneex-theme-dark', false)

  const algorithm = computed<MappingAlgorithm | MappingAlgorithm[]>(() =>
    isDark.value ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
  )

  const theme = computed<ThemeConfig>(() => ({
    algorithm: algorithm.value,
    token: {
      borderRadius: 12,
      colorPrimary: '#6366f1',
      colorSuccess: '#22c55e',
      colorWarning: '#f59e0b',
      colorError: '#ef4444',
      colorInfo: '#6366f1',
      fontSize: 14,
      controlHeight: 40,
      wireframe: false,
      fontFamily: fontStack,
    },
    components: {
      Card: {
        paddingLG: 28,
      },
      Menu: {
        radiusItem: 10,
        itemMarginInline: 8,
      },
      Layout: {
        colorBgHeader: 'transparent',
        colorBgBody: 'transparent',
      },
      Button: {
        borderRadius: 10,
        controlHeight: 40,
      },
      Table: {
        borderRadius: 10,
      },
    },
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
