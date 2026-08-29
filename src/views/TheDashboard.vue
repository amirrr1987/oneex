<script setup lang="ts">
import InstrumentsPanel from '@/components/dashboard/InstrumentsPanel.vue'
import MarketStats from '@/components/dashboard/MarketStats.vue'
import MyOrders from '@/components/dashboard/MyOrders.vue'
import NewOrderForm from '@/components/dashboard/NewOrderForm.vue'
import OrderBook from '@/components/dashboard/OrderBook.vue'
import TradeHistory from '@/components/dashboard/TradeHistory.vue'
import TradingChart from '@/components/dashboard/TradingChart.vue'
</script>

<template>
  <div class="container-fluid py-3">
    <div class="row g-3">
      <div class="col-lg-7">
        <TradingChart />
      </div>
      <div class="col-lg-5 d-flex flex-column gap-3">
        <MarketStats />
        <InstrumentsPanel />
      </div>
      <div class="col-lg-7">
        <OrderBook />
      </div>
      <div class="col-lg-5">
        <NewOrderForm />
      </div>
      <div class="col-lg-7">
        <MyOrders />
      </div>
      <div class="col-lg-5">
        <TradeHistory />
      </div>
    </div>
  </div>
</template>
