<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Alert from 'ant-design-vue/es/alert'
import Col from 'ant-design-vue/es/col'
import Modal from 'ant-design-vue/es/modal'
import Row from 'ant-design-vue/es/row'
import Segmented from 'ant-design-vue/es/segmented'
import Space from 'ant-design-vue/es/space'
import Tag from 'ant-design-vue/es/tag'
import Typography from 'ant-design-vue/es/typography'
import {
  BarChartOutlined,
  BulbOutlined,
  ClockCircleOutlined,
  ExportOutlined,
  FullscreenOutlined,
  LineChartOutlined,
} from '@ant-design/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useScriptTag } from '@vueuse/core'

import { UiMetric, UiSection } from '@/ui'
import { useConfigProviderStore } from '@/stores/config-provider.store'
import { useMarketStore } from '@/stores/market'

declare global {
  interface Window {
    TradingView?: {
      widget: (options: Record<string, unknown>) => void
    }
  }
}

const chartStyles = [
  { label: 'Candles', value: 'candles', style: '1', icon: BarChartOutlined },
  { label: 'Line', value: 'line', style: '2', icon: LineChartOutlined },
  { label: 'Area', value: 'area', style: '3', icon: LineChartOutlined },
  { label: 'Bars', value: 'bars', style: '0', icon: BarChartOutlined },
] as const

const { Text } = Typography

const configProvider = useConfigProviderStore()
const market = useMarketStore()
const { isDark } = storeToRefs(configProvider)
const { pairStats } = storeToRefs(market)

const activeStyle = ref<(typeof chartStyles)[number]['value']>('candles')
const chartContainerId = 'tradingview_906a9'
const modalOpen = ref(false)

const chartTheme = computed(() => (isDark.value ? 'Dark' : 'Light'))

const styleOptions = chartStyles.map((item) => ({ label: item.label, value: item.value }))

const ohlcStats = computed(() => {
  const stats = pairStats.value
  if (!stats) {
    return [
      { title: 'Open', value: '—' },
      { title: 'High', value: '—' },
      { title: 'Low', value: '—' },
      { title: 'Close', value: '—' },
    ]
  }
  return [
    { title: 'High (24h)', value: stats.high24h, suffix: ' BTC', precision: 4 },
    { title: 'Low (24h)', value: stats.low24h, suffix: ' BTC', precision: 4 },
    { title: 'Last', value: stats.lastPrice, suffix: ' BTC', precision: 4 },
    {
      title: 'Change',
      value: stats.change24h,
      suffix: '%',
      precision: 2,
      trend: `${stats.change24h >= 0 ? '+' : ''}${stats.change24h.toFixed(2)}%`,
      trendColor: stats.change24h >= 0 ? ('success' as const) : ('error' as const),
    },
  ]
})

const { load } = useScriptTag('https://s3.tradingview.com/tv.js', () => {
  mountChart()
})

function mountChart() {
  const style = chartStyles.find((item) => item.value === activeStyle.value)?.style ?? '1'
  document.getElementById(chartContainerId)?.replaceChildren()

  window.TradingView?.widget({
    autosize: true,
    symbol: 'BINANCE:ETHBTC',
    interval: '5',
    timezone: 'Etc/UTC',
    theme: chartTheme.value,
    style,
    locale: 'en',
    toolbar_bg: isDark.value ? '#141414' : '#fafafa',
    enable_publishing: false,
    hide_top_toolbar: true,
    hide_legend: true,
    save_image: false,
    container_id: chartContainerId,
  })
}

onMounted(() => {
  void load()
  if (!pairStats.value) void market.fetchPairStats()
})

watch(isDark, () => {
  if (window.TradingView) mountChart()
})

watch(activeStyle, () => {
  if (window.TradingView) mountChart()
})
</script>

<template>
  <UiSection title="ETH / BTC" subtitle="5-minute chart · TradingView">
    <template #icon><BarChartOutlined /></template>
    <template #extra>
      <Space wrap>
        <Tag color="blue">{{ pairStats?.pair ?? 'ETH/BTC' }}</Tag>
        <Button size="small" aria-label="Expand chart" @click="modalOpen = true">
          <FullscreenOutlined />
        </Button>
      </Space>
    </template>

    <Segmented v-model:value="activeStyle" block :options="styleOptions" class="mb-4" />

    <Row :gutter="[12, 12]" class="mb-4">
      <Col v-for="stat in ohlcStats" :key="stat.title" :xs="12" :sm="6">
        <UiMetric
          :title="stat.title"
          :value="stat.value"
          :suffix="stat.suffix"
          :precision="stat.precision"
          :trend="stat.trend"
          :trend-color="stat.trendColor"
        />
      </Col>
    </Row>

    <Space class="mb-3">
      <ClockCircleOutlined />
      <Text type="secondary">
        24h Volume:
        <Text strong>{{ pairStats?.volume24h?.toFixed(2) ?? '—' }} BTC</Text>
      </Text>
    </Space>

    <div
      :id="chartContainerId"
      v-motion
      class="aspect-video w-full overflow-hidden rounded-xl"
      :initial="{ opacity: 0, y: 8 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 350 } }"
    />
  </UiSection>

  <Modal v-model:open="modalOpen" title="ETH / BTC Chart" :width="720" :footer="null">
    <Alert
      type="info"
      show-icon
      class="mb-4"
      :message="`Chart theme follows your ${isDark ? 'night' : 'day'} mode. Close this dialog to return to the embedded chart.`"
    >
      <template #icon><BulbOutlined /></template>
    </Alert>
    <Space>
      <ExportOutlined />
      <Text>Active style: <Text strong>{{ activeStyle }}</Text></Text>
    </Space>
  </Modal>
</template>
