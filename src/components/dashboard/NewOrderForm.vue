<script setup lang="ts">
import { ref } from 'vue'

const orderTypes = [
  { id: 'Market', icon: 'bi-lightning' },
  { id: 'Limit', icon: 'bi-sliders' },
  { id: 'Stop', icon: 'bi-stop-circle' },
  { id: 'Stop Limit', icon: 'bi-sign-stop' },
] as const

const activeType = ref<(typeof orderTypes)[number]['id']>('Market')
</script>

<template>
  <div class="card shadow-sm h-100">
    <div class="card-header bg-white d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-plus-circle text-primary" />
        <h6 class="mb-0">New Order</h6>
        <span class="badge text-bg-secondary">ETH / BTC</span>
      </div>
      <span class="badge text-bg-primary"><i class="bi bi-percent me-1" />Fee 0.1%</span>
    </div>

    <div class="card-body">
      <ul class="nav nav-tabs nav-fill mb-3" role="tablist">
        <li v-for="type in orderTypes" :key="type.id" class="nav-item">
          <button
            type="button"
            class="nav-link d-inline-flex align-items-center justify-content-center gap-1"
            :class="{ active: activeType === type.id }"
            @click="activeType = type.id"
          >
            <i :class="['bi', type.icon]" />
            {{ type.id }}
          </button>
        </li>
      </ul>

      <fieldset class="mb-3">
        <legend class="fs-6 text-muted"><i class="bi bi-wallet2 me-1" />Balances</legend>
        <div class="row g-3">
          <div v-for="side in ['buy', 'sell']" :key="side" class="col-md-6">
            <form @submit.prevent>
              <div v-for="index in 4" :key="index" class="mb-3">
                <div class="input-group">
                  <span class="input-group-text"><i class="bi bi-input-cursor-text" /></span>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <button
                type="submit"
                class="btn w-100 text-uppercase d-inline-flex align-items-center justify-content-center gap-2"
                :class="side === 'buy' ? 'btn-success' : 'btn-danger'"
              >
                <i :class="side === 'buy' ? 'bi bi-cart-plus' : 'bi bi-cart-dash'" />
                {{ side === 'buy' ? 'Buy LTC' : 'Sell LTC' }}
              </button>
            </form>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>
