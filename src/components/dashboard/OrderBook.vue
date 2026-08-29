<script setup lang="ts">
import SortableTable from '@/components/dashboard/SortableTable.vue'

type OrderBookRow = {
  count: number
  amountEth: string
  totalBid: string
  askPrice: string
  totalBtc: string
  amountEthAsk: string
}

const columns = [
  { key: 'count' as const, label: 'Count' },
  { key: 'amountEth' as const, label: 'Amount (ETH)' },
  { key: 'totalBid' as const, label: 'Total (BTC) Bid' },
  { key: 'askPrice' as const, label: 'Ask Price' },
  { key: 'totalBtc' as const, label: 'Total (BTC)' },
  { key: 'amountEthAsk' as const, label: 'Amount (ETH)' },
]

const rows: OrderBookRow[] = [
  { count: 1, amountEth: 'Mark', totalBid: 'Otto', askPrice: '@mdo', totalBtc: '@mdo', amountEthAsk: 'Thornton' },
  { count: 2, amountEth: 'Jacob', totalBid: 'Thornton', askPrice: '@fat', totalBtc: 'Otto', amountEthAsk: '@fat' },
  { count: 2, amountEth: 'Jacob', totalBid: 'Thornton', askPrice: '@fat', totalBtc: 'Otto', amountEthAsk: '@fat' },
  { count: 3, amountEth: 'Larry', totalBid: 'the Bird', askPrice: 'Thornton', totalBtc: 'the Bird', amountEthAsk: '@twitter' },
]
</script>

<template>
  <div class="card shadow-sm h-100">
    <div class="card-header bg-white d-flex align-items-center gap-2">
      <i class="bi bi-journal-text text-primary" />
      <h6 class="mb-0">Order Book</h6>
      <span class="badge text-bg-secondary">ETH / BTC</span>
    </div>
    <div class="card-body p-0">
      <div class="table-responsive">
        <SortableTable :columns="columns" :rows="rows" row-key="count" />
      </div>
    </div>
    <div class="card-footer">
      <div class="row g-2">
        <div v-for="index in 2" :key="index" class="col-md-6">
          <div class="alert alert-primary text-center mb-0 py-2">
            <strong class="text-uppercase">0.0158153169 BTC</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
