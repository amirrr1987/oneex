<script setup lang="ts">
import { ref } from 'vue'

import { useZodForm } from '@/composables/useZodForm'
import { withdrawSchema } from '@/schemas/forms'
import { useWalletStore } from '@/stores/wallet'

const props = defineProps<{
  coin: string
}>()

const wallet = useWalletStore()
const successMessage = ref('')
const feeResult = ref('')

const priorities = ['Low', 'Medium', 'High'] as const

const { values, fieldError, submit, isSubmitting, validate } = useZodForm(withdrawSchema, {
  address: '',
  amount: '',
  priority: 'Medium',
})

async function onSubmit() {
  successMessage.value = ''
  await submit(async () => {
    successMessage.value = `Withdrawal of ${values.amount} ${props.coin} submitted (demo).`
  })
}

async function onCalculate() {
  feeResult.value = ''
  if (!validate()) return
  const fee = (Number(values.amount) * 0.001).toFixed(6)
  feeResult.value = `Estimated fee: ${fee} ${props.coin}`
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="row g-3 align-items-end">
      <div class="col-md-3">
        <label class="form-label">Balance</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-wallet2" /></span>
          <input type="text" class="form-control" :value="`${wallet.getBalance(coin)} ${coin}`" readonly />
        </div>
      </div>
      <div class="col-md-3">
        <label class="form-label">Amount</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-cash" /></span>
          <input
            v-model="values.amount"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': fieldError('amount') }"
            placeholder="0.00"
          />
        </div>
        <div v-if="fieldError('amount')" class="invalid-feedback d-block">{{ fieldError('amount') }}</div>
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
            placeholder="Destination address"
          />
        </div>
        <div v-if="fieldError('address')" class="invalid-feedback d-block">{{ fieldError('address') }}</div>
      </div>
      <div class="col-md-2">
        <label class="form-label">Priority</label>
        <select v-model="values.priority" class="form-select">
          <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
        </select>
      </div>
      <div class="col-12 col-md-3 ms-md-auto">
        <button type="submit" class="btn btn-primary w-100" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" />
          <i v-else class="bi bi-send me-2" />
          Submit
        </button>
      </div>
    </div>
    <div v-if="successMessage" class="alert alert-success mt-3 mb-0 py-2 small">{{ successMessage }}</div>
  </form>

  <hr class="my-4" />

  <div class="d-flex align-items-center gap-2 mb-3">
    <i class="bi bi-calculator text-primary" />
    <h6 class="mb-0">Withdraw Fee Calculator</h6>
  </div>
  <button type="button" class="btn btn-outline-primary" @click="onCalculate">
    <i class="bi bi-calculator me-2" />Calculate fee
  </button>
  <p v-if="feeResult" class="small text-muted mt-2 mb-0">{{ feeResult }}</p>
</template>
