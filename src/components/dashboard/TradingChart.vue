<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Card from 'ant-design-vue/es/card'
import Modal from 'ant-design-vue/es/modal'
import Space from 'ant-design-vue/es/space'
import Typography from 'ant-design-vue/es/typography'
import {
  ApartmentOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  ExportOutlined,
  FullscreenOutlined,
  LeftOutlined,
  LineChartOutlined,
  MinusOutlined,
  BulbOutlined,
  RightOutlined,
  RiseOutlined,
  SettingOutlined,
  StarOutlined,
} from '@ant-design/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useScriptTag } from '@vueuse/core'

import { useConfigProviderStore } from '@/stores/config-provider.store'

declare global {
  interface Window {
    TradingView?: {
      widget: (options: Record<string, unknown>) => void
    }
  }
}

const chartStyles = [
  { id: 'candles', icon: BarChartOutlined, label: 'Candles', style: '1' },
  { id: 'line', icon: LineChartOutlined, label: 'Line', style: '2' },
  { id: 'area', icon: RiseOutlined, label: 'Area', style: '3' },
  { id: 'bars', icon: BarChartOutlined, label: 'Bars', style: '0' },
  { id: 'baseline', icon: MinusOutlined, label: 'Baseline', style: '10' },
  { id: 'heikin', icon: ApartmentOutlined, label: 'Heikin Ashi', style: '8' },
] as const

const { Text } = Typography

const configProvider = useConfigProviderStore()
const { isDark } = storeToRefs(configProvider)

const activeStyle = ref<(typeof chartStyles)[number]['id']>('candles')
const chartContainerId = 'tradingview_906a9'
const modalOpen = ref(false)

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
  <Card
    v-motion
    class="h-full"
    :initial="{ opacity: 0, y: 12 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
  >
    <template #title>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <Space wrap>
          <Button size="small" title="Fullscreen">
            <template #icon><FullscreenOutlined /></template>
          </Button>
          <Button
            v-for="style in chartStyles"
            :key="style.id"
            size="small"
            :type="activeStyle === style.id ? 'primary' : 'default'"
            :title="style.label"
            @click="selectStyle(style.id)"
          >
            <template #icon>
              <component :is="style.icon" />
            </template>
          </Button>
          <Text strong class="ml-2 uppercase">ETH / BTC, 5</Text>
        </Space>
        <Space>
          <Button size="small" title="Previous">
            <template #icon><LeftOutlined /></template>
          </Button>
          <Button size="small" title="Next">
            <template #icon><RightOutlined /></template>
          </Button>
          <Button size="small" title="Favorite">
            <template #icon><StarOutlined /></template>
          </Button>
          <Button size="small" title="Settings">
            <template #icon><SettingOutlined /></template>
          </Button>
          <Button size="small" title="Expand chart" @click="modalOpen = true">
            <template #icon><ExportOutlined /></template>
          </Button>
        </Space>
      </div>
    </template>

    <Space wrap class="mb-3 text-sm">
      <span v-for="item in ['O', 'H', 'L', 'C']" :key="item">
        {{ item }}: <Text strong>0.26865</Text>
      </span>
      <span>
        <ClockCircleOutlined class="mr-1" />
        Volume: <Text strong>0.9642</Text>
      </span>
    </Space>

    <div :id="chartContainerId" class="aspect-video w-full rounded" />
  </Card>

  <Modal v-model:open="modalOpen" title="ETH / BTC Chart" :width="800">
    <template #title>
      <span class="inline-flex items-center gap-2">
        <BarChartOutlined />
        ETH / BTC Chart
      </span>
    </template>
    <p class="mb-2">
      <BulbOutlined class="mr-2" />
      Chart theme follows your {{ isDark ? 'night' : 'day' }} mode setting.
    </p>
    <Text class="text-sm">Active style: {{ activeStyle }}</Text>
  </Modal>
</template>
