<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import BalanceStats from '@/components/panel/BalanceStats.vue'
import CoinTabs from '@/components/panel/CoinTabs.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import CopyButton from '@/components/shared/CopyButton.vue'
import WalletQrCode from '@/components/shared/WalletQrCode.vue'
import { useWalletStore } from '@/stores/wallet'

const wallet = useWalletStore()
const { isRefreshing } = storeToRefs(wallet)

const activeCoin = ref('BTC')
const walletAddress = computed(() => wallet.getAddress(activeCoin.value))
</script>

<template>
  <div class="container py-4">
    <PanelPageTitle title="Balance" icon="bi-wallet2" />

    <div class="row justify-content-center mb-4">
      <div class="col-xl-9">
        <div class="card shadow-sm">
          <div class="card-body">
            <BalanceStats />
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mb-4">
      <div class="col-xl-7">
        <button
          type="button"
          class="alert alert-success text-center mb-0 w-100 border-0"
          :disabled="isRefreshing"
          @click="wallet.refreshBalances()"
        >
          <span v-if="isRefreshing" class="spinner-border spinner-border-sm me-2" />
          <i v-else class="bi bi-arrow-repeat me-2" />
          Update My Balance
        </button>
      </div>
    </div>

    <PanelPageTitle title="Deposit" icon="bi-download" />

    <div class="row justify-content-center mb-3">
      <div class="col-xl-10">
        <CoinTabs v-model="activeCoin" />
      </div>
    </div>

    <section class="bg-light py-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10">
            <div class="card shadow-sm">
              <div class="card-body">
                <div class="row align-items-center g-4">
                  <div class="col-md-4">
                    <WalletQrCode :address="walletAddress" :coin="activeCoin" />
                  </div>
                  <div class="col-md-8">
                    <h5><i class="bi bi-info-circle me-2 text-primary" />Min deposit: 0.002 {{ activeCoin }}</h5>
                    <p class="mb-2">Wallet address:</p>
                    <div class="input-group">
                      <span class="input-group-text"><i class="bi bi-wallet2" /></span>
                      <input type="text" class="form-control font-monospace" :value="walletAddress" readonly />
                      <CopyButton :text="walletAddress" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
