<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useScriptTag } from '@vueuse/core'

import { useThemeStore } from '@/stores/theme'

declare global {
  interface Window {
    TradingView?: {
      widget: (options: Record<string, unknown>) => void
    }
  }
}

const chartStyles = [
  { id: 'candles', icon: 'bi-bar-chart-line', label: 'Candles', style: '1' },
  { id: 'line', icon: 'bi-graph-up', label: 'Line', style: '2' },
  { id: 'area', icon: 'bi-graph-up-arrow', label: 'Area', style: '3' },
  { id: 'bars', icon: 'bi-bar-chart', label: 'Bars', style: '0' },
  { id: 'baseline', icon: 'bi-border-middle', label: 'Baseline', style: '10' },
  { id: 'heikin', icon: 'bi-diagram-3', label: 'Heikin Ashi', style: '8' },
] as const

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const activeStyle = ref<(typeof chartStyles)[number]['id']>('candles')
const chartContainerId = 'tradingview_906a9'

const chartTheme = computed(() => (isDark.value ? 'Dark' : 'Light'))

const { load } = useScriptTag('https://s3.tradingview.com/tv.js', () => {
  mountChart()
})

function mountChart() {
  const style = chartStyles.find((item) => item.id === activeStyle.value)?.style ?? '1'
  document.getElementById(chartContainerId)?.replaceChildren()

  window.TradingView?.widget({
    autosize: true,
    symbol: 'BINANCE:ETHBTC',
    interval: '5',
    timezone: 'Etc/UTC',
    theme: chartTheme.value,
    style,
    locale: 'en',
    toolbar_bg: isDark.value ? '#1a3558' : '#f1f3f6',
    enable_publishing: false,
    hide_top_toolbar: true,
    hide_legend: true,
    save_image: false,
    container_id: chartContainerId,
  })
}

function selectStyle(id: (typeof chartStyles)[number]['id']) {
  activeStyle.value = id
  mountChart()
}

onMounted(() => {
  void load()
})

watch(isDark, () => {
  if (window.TradingView) {
    mountChart()
  }
})
</script>

<template>
  <div
    v-motion
    class="card shadow-sm h-100"
    :initial="{ opacity: 0, y: 12 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
  >
    <div class="card-header bg-white">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div class="d-flex flex-wrap align-items-center gap-1">
          <button type="button" class="btn btn-outline-secondary btn-sm" title="Fullscreen">
            <i class="bi bi-arrows-fullscreen" />
          </button>
          <button
            v-for="style in chartStyles"
            :key="style.id"
            type="button"
            class="btn btn-sm"
            :class="activeStyle === style.id ? 'btn-primary' : 'btn-outline-secondary'"
            :title="style.label"
            @click="selectStyle(style.id)"
          >
            <i :class="['bi', style.icon]" />
          </button>
          <span class="fw-semibold text-uppercase ms-2">ETH / BTC, 5</span>
        </div>
        <div class="d-flex align-items-center gap-1">
          <button type="button" class="btn btn-outline-secondary btn-sm" title="Previous">
            <i class="bi bi-chevron-left" />
          </button>
          <button type="button" class="btn btn-outline-secondary btn-sm" title="Next">
            <i class="bi bi-chevron-right" />
          </button>
          <button type="button" class="btn btn-outline-secondary btn-sm" title="Favorite">
            <i class="bi bi-star" />
          </button>
          <button type="button" class="btn btn-outline-secondary btn-sm" title="Settings">
            <i class="bi bi-gear" />
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#chartModal"
            title="Expand chart"
          >
            <i class="bi bi-box-arrow-up-right" />
          </button>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="d-flex flex-wrap gap-3 small text-muted mb-3">
        <span v-for="item in ['O', 'H', 'L', 'C']" :key="item">
          {{ item }}: <span class="text-danger fw-semibold">0.26865</span>
        </span>
        <span>
          <i class="bi bi-clock me-1" />
          Volume: <span class="text-danger fw-semibold">0.9642</span>
        </span>
      </div>
      <div :id="chartContainerId" class="ratio ratio-16x9 bg-light rounded" />
    </div>
  </div>

  <div id="chartModal" class="modal fade" tabindex="-1" aria-labelledby="chartModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="chartModalLabel" class="modal-title d-flex align-items-center gap-2">
            <i class="bi bi-bar-chart-line text-primary" />
            ETH / BTC Chart
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <p class="mb-2">
            <i class="bi bi-moon-stars me-2" />
            Chart theme follows your {{ isDark ? 'night' : 'day' }} mode setting.
          </p>
          <p class="mb-0 text-muted small">Active style: {{ activeStyle }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
