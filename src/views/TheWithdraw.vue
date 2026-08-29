<script setup lang="ts">
import { ref } from 'vue'

import CoinTabs from '@/components/panel/CoinTabs.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import WithdrawForm from '@/components/panel/WithdrawForm.vue'

const activeCoin = ref('BTC')
</script>

<template>
  <div class="container py-4">
    <PanelPageTitle title="Withdraw" icon="bi-upload" />

    <div class="row justify-content-center mb-4">
      <div class="col-xl-10">
        <CoinTabs v-model="activeCoin" />
      </div>
    </div>

    <section class="bg-light py-4">
      <div class="container">
        <div class="row justify-content-center g-4">
          <div class="col-xl-10">
            <div class="card shadow-sm">
              <div class="card-header fw-semibold d-flex align-items-center gap-2">
                <i class="bi bi-upload" />Withdraw — {{ activeCoin }}
              </div>
              <div class="card-body">
                <WithdrawForm :coin="activeCoin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
