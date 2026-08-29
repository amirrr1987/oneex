<script setup lang="ts">
import InstrumentsPanel from '@/components/dashboard/InstrumentsPanel.vue'
import MarketStats from '@/components/dashboard/MarketStats.vue'
import MyOrders from '@/components/dashboard/MyOrders.vue'
import NewOrderForm from '@/components/dashboard/NewOrderForm.vue'
import OrderBook from '@/components/dashboard/OrderBook.vue'
import TradeHistory from '@/components/dashboard/TradeHistory.vue'
import TradingChart from '@/components/dashboard/TradingChart.vue'
import Spin from 'ant-design-vue/es/spin'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

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
  <Spin :spinning="isLoading">
    <div class="w-full px-4 py-3">
      <div class="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <TradingChart />
        </div>
        <div class="flex flex-col gap-3 lg:col-span-5">
          <MarketStats />
          <InstrumentsPanel />
        </div>
        <div class="lg:col-span-7">
          <OrderBook />
        </div>
        <div class="lg:col-span-5">
          <NewOrderForm />
        </div>
        <div class="lg:col-span-7">
          <MyOrders />
        </div>
        <div class="lg:col-span-5">
          <TradeHistory />
        </div>
      </div>
    </div>
  </Spin>
</template>
