<script setup lang="ts">
import { computed } from 'vue'

import BalanceStats from '@/components/panel/BalanceStats.vue'
import BalanceWithdrawForm from '@/components/panel/BalanceWithdrawForm.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import CopyButton from '@/components/shared/CopyButton.vue'
import WalletQrCode from '@/components/shared/WalletQrCode.vue'
import { useWalletStore } from '@/stores/wallet'

const wallet = useWalletStore()
const walletAddress = computed(() => wallet.getAddress('BTC'))
</script>

<template>
  <div class="container py-4">
    <PanelPageTitle title="Balance" icon="bi-wallet2" />

    <div class="row justify-content-center mb-4">
      <div class="col-xl-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <BalanceStats />
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mb-4">
      <div class="col-xl-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="progress mb-3">
              <div class="progress-bar bg-info" style="width: 25%" />
            </div>
            <p class="text-center mb-0">
              <i class="bi bi-speedometer2 me-2 text-primary" />
              2000 remaining of 2000 USDT daily withdrawal limit
            </p>
          </div>
        </div>
      </div>
    </div>

    <section class="bg-light py-4 mb-4">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="card shadow-sm">
            <div class="card-header d-flex align-items-center gap-2">
              <i class="bi bi-download" />Deposit
            </div>
            <div class="card-body">
              <div class="row g-4 align-items-center">
                <div class="col-md-4">
                  <WalletQrCode :address="walletAddress" coin="BTC" />
                </div>
                <div class="col-md-8">
                  <h5>Min deposit: 0.002 BTC</h5>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-wallet2" /></span>
                    <input type="text" class="form-control font-monospace" :value="walletAddress" readonly />
                    <CopyButton :text="walletAddress" />
                  </div>
                </div>
              </div>
              <p class="small text-muted mt-3 mb-0">
                <i class="bi bi-receipt me-1" />Flat fee: 0.0005 BTC · Min withdraw: 0.01 BTC
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="row justify-content-center">
      <div class="col-xl-10">
        <div class="card shadow-sm">
          <div class="card-header d-flex align-items-center gap-2">
            <i class="bi bi-upload" />Withdraw
          </div>
          <div class="card-body">
            <BalanceWithdrawForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
