import { Tooltip } from 'bootstrap'
import { onMounted, onUnmounted, type Ref } from 'vue'

export function useBootstrapTooltips(root?: Ref<HTMLElement | null | undefined>) {
  let instances: Tooltip[] = []

  onMounted(() => {
    const container = root?.value ?? document.body
    container.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]').forEach((element) => {
      instances.push(new Tooltip(element))
    })
  })

  onUnmounted(() => {
    instances.forEach((instance) => instance.dispose())
    instances = []
  })
}
