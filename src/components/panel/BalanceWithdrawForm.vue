<script setup lang="ts">
import { computed, ref } from 'vue'

import { useZodForm } from '@/composables/useZodForm'
import { balanceWithdrawSchema } from '@/schemas/forms'
import { useWalletStore } from '@/stores/wallet'

const wallet = useWalletStore()
const successMessage = ref('')

const receiveAmount = computed(() => {
  const amount = Number(values.amount)
  if (Number.isNaN(amount) || amount <= 0) return ''
  return (amount - amount * 0.001).toFixed(8)
})

const { values, fieldError, submit, isSubmitting } = useZodForm(balanceWithdrawSchema, {
  amount: '',
  address: '',
})

async function onSubmit() {
  successMessage.value = ''
  await submit(async () => {
    successMessage.value = 'Withdrawal submitted successfully (demo).'
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="row g-3">
      <div class="col-md-4">
        <label class="form-label">Amount</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-cash" /></span>
          <input
            v-model="values.amount"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': fieldError('amount') }"
            placeholder="Amount"
          />
        </div>
        <div v-if="fieldError('amount')" class="invalid-feedback d-block">{{ fieldError('amount') }}</div>
      </div>
      <div class="col-md-4">
        <label class="form-label">You will receive</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-arrow-down-circle" /></span>
          <input type="text" class="form-control" :value="receiveAmount" readonly placeholder="You will receive" />
        </div>
      </div>
      <div class="col-md-4">
        <label class="form-label">Address</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-geo-alt" /></span>
          <input
            v-model="values.address"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': fieldError('address') }"
            placeholder="Address"
          />
        </div>
        <div v-if="fieldError('address')" class="invalid-feedback d-block">{{ fieldError('address') }}</div>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" />
          <i v-else class="bi bi-send me-2" />
          Withdraw
        </button>
      </div>
    </div>
    <p class="small text-muted mt-3 mb-0">
      <i class="bi bi-info-circle me-1" />
      Balance: {{ wallet.getBalance('BTC') }} BTC
    </p>
    <div v-if="successMessage" class="alert alert-success mt-3 mb-0 py-2 small">{{ successMessage }}</div>
  </form>
</template>
