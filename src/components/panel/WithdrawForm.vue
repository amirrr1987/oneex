<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import Input from 'ant-design-vue/es/input'
import Select from 'ant-design-vue/es/select'
import Typography from 'ant-design-vue/es/typography'
import {
  CalculatorOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  SendOutlined,
  WalletOutlined,
} from '@ant-design/icons-vue'
import { computed, ref } from 'vue'

import { ASSET_CONFIG, type SupportedCoin, type WithdrawPriority } from '@/constants/exchange'
import { useZodForm } from '@/composables/useZodForm'
import { withdrawSchema } from '@/schemas/forms'
import { useWalletStore } from '@/stores/wallet'

const props = defineProps<{
  coin: string
}>()

const { Title, Text } = Typography
const wallet = useWalletStore()
const successMessage = ref('')
const errorMessage = ref('')
const feeResult = ref('')
const priority = ref<WithdrawPriority>('Medium')

const coin = computed(() => props.coin as SupportedCoin)
const estimatedFee = computed(() => wallet.estimateWithdrawFee(coin.value, priority.value))

const { values, fieldError, submit, isSubmitting, validate } = useZodForm(withdrawSchema, {
  address: '',
  amount: '',
  priority: 'Medium',
})

async function onSubmit() {
  successMessage.value = ''
  errorMessage.value = ''
  values.priority = priority.value

  if (!validate()) return

  try {
    await submit(async () => {
      wallet.submitWithdraw({
        coin: coin.value,
        amount: Number(values.amount),
        address: values.address.trim(),
        priority: priority.value,
      })
      successMessage.value = `Withdrawal of ${values.amount} ${coin.value} queued for blockchain broadcast.`
      values.address = ''
      values.amount = ''
    })
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Withdrawal failed'
  }
}

function onCalculate() {
  feeResult.value = ''
  if (!validate()) return
  feeResult.value = `Network fee (${priority.value}): ${estimatedFee.value} ${coin.value}`
}
</script>

<template>
  <Form layout="vertical" @submit.prevent="onSubmit">
    <div class="grid grid-cols-1 items-end gap-3 md:grid-cols-12">
      <FormItem label="Balance" class="md:col-span-3">
        <Input :value="`${wallet.getBalance(coin)} ${coin}`" readonly>
          <template #prefix>
            <WalletOutlined />
          </template>
        </Input>
      </FormItem>

      <FormItem
        label="Amount"
        class="md:col-span-3"
        :validate-status="fieldError('amount') ? 'error' : undefined"
        :help="fieldError('amount') || `Min ${ASSET_CONFIG[coin].minWithdraw} ${coin}`"
      >
        <Input v-model:value="values.amount" placeholder="0.00">
          <template #prefix>
            <DollarOutlined />
          </template>
        </Input>
      </FormItem>

      <FormItem
        label="Address"
        class="md:col-span-4"
        :validate-status="fieldError('address') ? 'error' : undefined"
        :help="fieldError('address')"
      >
        <Input v-model:value="values.address" placeholder="Destination address">
          <template #prefix>
            <EnvironmentOutlined />
          </template>
        </Input>
      </FormItem>

      <FormItem label="Priority" class="md:col-span-2">
        <Select v-model:value="priority">
          <Select.Option value="Low">Low</Select.Option>
          <Select.Option value="Medium">Medium</Select.Option>
          <Select.Option value="High">High</Select.Option>
        </Select>
      </FormItem>

      <div class="md:col-span-3 md:col-start-10">
        <Button type="primary" html-type="submit" block :loading="isSubmitting">
          <template v-if="!isSubmitting" #icon>
            <SendOutlined />
          </template>
          Submit
        </Button>
      </div>
    </div>

    <Text class="mt-2 block text-sm">
      Estimated network fee: {{ estimatedFee }} {{ coin }} · Daily limit remaining:
      {{ wallet.remainingDailyWithdrawLimit() }} USDT
    </Text>

    <Alert v-if="successMessage" type="success" :message="successMessage" show-icon class="mt-3" />
    <Alert v-if="errorMessage" type="error" :message="errorMessage" show-icon class="mt-3" />
  </Form>

  <hr class="my-4" />

  <div class="mb-3 flex items-center gap-2">
    <CalculatorOutlined />
    <Title :level="5" class="mb-0">Withdraw Fee Calculator</Title>
  </div>
  <Button @click="onCalculate">
    <template #icon><CalculatorOutlined /></template>
    Calculate fee
  </Button>
  <Text v-if="feeResult" class="mt-2 block text-sm">{{ feeResult }}</Text>
</template>
