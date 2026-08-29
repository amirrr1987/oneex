import gsap from 'gsap'
import { onScopeDispose, ref, watch, type Ref } from 'vue'

export function useGsapCountUp(source: Ref<number>, options?: { duration?: number; decimals?: number }) {
  const display = ref(0)
  const duration = options?.duration ?? 1.2
  const decimals = options?.decimals ?? 0
  let tween: gsap.core.Tween | null = null

  function animateTo(target: number) {
    tween?.kill()
    const proxy = { value: display.value }
    tween = gsap.to(proxy, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        display.value = Number(proxy.value.toFixed(decimals))
      },
    })
  }

  watch(source, (value) => animateTo(value), { immediate: true })

  onScopeDispose(() => tween?.kill())

  return display
}
