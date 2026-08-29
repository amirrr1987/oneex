<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import Input from 'ant-design-vue/es/input'
import Typography from 'ant-design-vue/es/typography'
import {
  ArrowDownOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  SendOutlined,
} from '@ant-design/icons-vue'
import { computed, ref } from 'vue'

import { ASSET_CONFIG } from '@/constants/exchange'
import { useZodForm } from '@/composables/useZodForm'
import { balanceWithdrawSchema } from '@/schemas/forms'
import { useWalletStore } from '@/stores/wallet'

const { Text } = Typography
const wallet = useWalletStore()
const successMessage = ref('')
const errorMessage = ref('')

const coin = 'BTC' as const
const priority = 'Medium' as const
const fee = computed(() => wallet.estimateWithdrawFee(coin, priority))

const receiveAmount = computed(() => {
  const amount = Number(values.amount)
  if (Number.isNaN(amount) || amount <= 0) return ''
  return Math.max(0, amount - fee.value).toFixed(ASSET_CONFIG[coin].decimals)
})

const { values, fieldError, submit, isSubmitting } = useZodForm(balanceWithdrawSchema, {
  amount: '',
  address: '',
})

async function onSubmit() {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await submit(async () => {
      wallet.submitWithdraw({
        coin,
        amount: Number(values.amount),
        address: values.address.trim(),
        priority,
      })
      successMessage.value = 'Withdrawal submitted and balance debited.'
      values.amount = ''
      values.address = ''
    })
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Withdrawal failed'
  }
}
</script>

<template>
  <Form layout="vertical" @submit.prevent="onSubmit">
    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <FormItem
        label="Amount"
        :validate-status="fieldError('amount') ? 'error' : undefined"
        :help="fieldError('amount')"
      >
        <Input v-model:value="values.amount" placeholder="Amount">
          <template #prefix>
            <DollarOutlined />
          </template>
        </Input>
      </FormItem>

      <FormItem label="You will receive">
        <Input :value="receiveAmount" readonly placeholder="You will receive">
          <template #prefix>
            <ArrowDownOutlined />
          </template>
        </Input>
      </FormItem>

      <FormItem
        label="Address"
        :validate-status="fieldError('address') ? 'error' : undefined"
        :help="fieldError('address')"
      >
        <Input v-model:value="values.address" placeholder="Address">
          <template #prefix>
            <EnvironmentOutlined />
          </template>
        </Input>
      </FormItem>

      <div class="md:col-span-3">
        <Button type="primary" html-type="submit" :loading="isSubmitting">
          <template v-if="!isSubmitting" #icon>
            <SendOutlined />
          </template>
          Withdraw
        </Button>
      </div>
    </div>

    <Text class="mt-3 block text-sm">
      <InfoCircleOutlined class="mr-1" />
      Balance: {{ wallet.getBalance('BTC') }} BTC · Network fee: {{ fee }} BTC
    </Text>

    <Alert v-if="successMessage" type="success" :message="successMessage" show-icon class="mt-3" />
    <Alert v-if="errorMessage" type="error" :message="errorMessage" show-icon class="mt-3" />
  </Form>
</template>
