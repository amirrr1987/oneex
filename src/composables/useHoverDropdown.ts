import { Dropdown } from 'bootstrap'
import { onMounted, onUnmounted, type Ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'

export function useHoverDropdown(root: Ref<HTMLElement | undefined>) {
  const isDesktop = useMediaQuery('(min-width: 992px)')
  let dropdown: Dropdown | null = null
  let hideTimer: ReturnType<typeof setTimeout> | undefined

  function clearHideTimer() {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = undefined
    }
  }

  function showMenu() {
    if (!isDesktop.value) return
    clearHideTimer()
    dropdown?.show()
  }

  function scheduleHide() {
    if (!isDesktop.value) return
    clearHideTimer()
    hideTimer = setTimeout(() => dropdown?.hide(), 180)
  }

  onMounted(() => {
    const toggle = root.value?.querySelector<HTMLElement>('[data-bs-toggle="dropdown"]')
    const menu = root.value?.querySelector<HTMLElement>('.dropdown-menu')
    if (!toggle) return

    dropdown = Dropdown.getOrCreateInstance(toggle, { autoClose: true })

    toggle.addEventListener('click', (event) => {
      event.preventDefault()
      if (!isDesktop.value) {
        dropdown?.toggle()
      }
    })

    root.value?.addEventListener('mouseenter', showMenu)
    root.value?.addEventListener('mouseleave', scheduleHide)
    menu?.addEventListener('mouseenter', showMenu)
    menu?.addEventListener('mouseleave', scheduleHide)
  })

  onUnmounted(() => {
    clearHideTimer()
    dropdown?.dispose()
    dropdown = null
  })

  return {
    onPointerEnter: showMenu,
    onPointerLeave: scheduleHide,
  }
}
