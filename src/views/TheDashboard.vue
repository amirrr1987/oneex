<script setup lang="ts">
import Col from 'ant-design-vue/es/col'
import Row from 'ant-design-vue/es/row'
import Space from 'ant-design-vue/es/space'
import Tag from 'ant-design-vue/es/tag'
import { SwapOutlined } from '@ant-design/icons-vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import InstrumentsPanel from '@/components/dashboard/InstrumentsPanel.vue'
import MarketStats from '@/components/dashboard/MarketStats.vue'
import MyOrders from '@/components/dashboard/MyOrders.vue'
import NewOrderForm from '@/components/dashboard/NewOrderForm.vue'
import OrderBook from '@/components/dashboard/OrderBook.vue'
import TradeHistory from '@/components/dashboard/TradeHistory.vue'
import TradingChart from '@/components/dashboard/TradingChart.vue'
import { UiLoading, UiPage } from '@/ui'
import { useMarketStore } from '@/stores/market'
import { useTradingStore } from '@/stores/trading'

const trading = useTradingStore()
const market = useMarketStore()
const { isLoading } = storeToRefs(trading)

onMounted(() => {
  void Promise.all([
    trading.fetchTradingData(),
    market.fetchMarkets(),
    market.fetchPairStats(),
  ])
})
</script>

<template>
  <UiPage
    title="Exchange"
    :icon="SwapOutlined"
    subtitle="ETH/BTC spot trading"
    badge="Live"
    badge-color="green"
    compact
  >
    <template #actions>
      <Tag color="processing">Instant fill · 0.05% fee</Tag>
    </template>

    <UiLoading :spinning="isLoading">
      <Row :gutter="[16, 16]">
        <Col :xs="24" :lg="14">
          <TradingChart />
        </Col>
        <Col :xs="24" :lg="10">
          <Space direction="vertical" class="w-full" :size="16">
            <MarketStats />
            <InstrumentsPanel />
          </Space>
        </Col>
        <Col :xs="24" :lg="14">
          <OrderBook />
        </Col>
        <Col :xs="24" :lg="10">
          <NewOrderForm />
        </Col>
        <Col :xs="24" :lg="14">
          <MyOrders />
        </Col>
        <Col :xs="24" :lg="10">
          <TradeHistory />
        </Col>
      </Row>
    </UiLoading>
  </UiPage>
</template>
