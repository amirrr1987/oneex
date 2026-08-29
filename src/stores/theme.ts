import { useDark, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = useDark({
    selector: 'html',
    attribute: 'data-bs-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'oneex-theme',
  })

  const toggle = useToggle(isDark)

  return { isDark, toggle }
})
