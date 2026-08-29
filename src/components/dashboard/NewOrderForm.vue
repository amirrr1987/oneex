<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Card from 'ant-design-vue/es/card'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import InputNumber from 'ant-design-vue/es/input-number'
import Radio from 'ant-design-vue/es/radio'
import Tag from 'ant-design-vue/es/tag'
import Typography from 'ant-design-vue/es/typography'
import {
  MinusCircleOutlined,
  PauseCircleOutlined,
  PercentageOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  SlidersOutlined,
  StopOutlined,
  ThunderboltOutlined,
  WalletOutlined,
} from '@ant-design/icons-vue'
import { computed, ref } from 'vue'

import { TRADING_PAIR } from '@/constants/exchange'
import type { OrderSide, OrderType } from '@/stores/trading'
import { useTradingStore } from '@/stores/trading'
import { useWalletStore } from '@/stores/wallet'

const { Title, Text } = Typography
const trading = useTradingStore()
const wallet = useWalletStore()

const orderTypes = [
  { id: 'Market', icon: ThunderboltOutlined },
  { id: 'Limit', icon: SlidersOutlined },
  { id: 'Stop', icon: StopOutlined },
  { id: 'Stop Limit', icon: PauseCircleOutlined },
] as const

const activeType = ref<OrderType>('Market')
const price = ref<number>()
const amount = ref<number>()
const successMessage = ref('')
const errorMessage = ref('')

const ethBalance = computed(() => wallet.getBalance('ETH'))
const btcBalance = computed(() => wallet.getBalance('BTC'))

async function place(side: OrderSide) {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const order = await trading.placeOrder({
      type: activeType.value,
      side,
      amount: Number(amount.value),
      price: activeType.value === 'Market' ? undefined : Number(price.value),
    })
    successMessage.value = `${side.toUpperCase()} order filled at ${order.price} BTC · fee ${order.fee.toFixed(8)} BTC`
    amount.value = undefined
    if (activeType.value !== 'Market') price.value = undefined
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Order failed'
  }
}
</script>

<template>
  <Card class="h-full">
    <template #title>
      <div class="flex items-center justify-between">
        <span class="inline-flex items-center gap-2">
          <PlusCircleOutlined />
          <Title :level="5" class="mb-0">New Order</Title>
          <Tag>{{ TRADING_PAIR.label }}</Tag>
        </span>
        <Tag color="blue">
          <PercentageOutlined class="mr-1" />Fee {{ trading.feeRateLabel }}
        </Tag>
      </div>
    </template>

    <Radio.Group v-model:value="activeType" button-style="solid" class="mb-3 flex w-full">
      <Radio.Button
        v-for="type in orderTypes"
        :key="type.id"
        :value="type.id"
        class="flex-1 text-center"
      >
        <span class="inline-flex items-center justify-center gap-1">
          <component :is="type.icon" />
          {{ type.id }}
        </span>
      </Radio.Button>
    </Radio.Group>

    <fieldset class="mb-3">
      <legend class="mb-2 text-sm">
        <WalletOutlined class="mr-1" />Balances
      </legend>
      <Text class="mb-3 block text-sm">ETH: {{ ethBalance }} · BTC: {{ btcBalance }}</Text>

      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Form layout="vertical" @submit.prevent="place('buy')">
          <FormItem v-if="activeType !== 'Market'" label="Limit price (BTC)">
            <InputNumber v-model:value="price" class="w-full" :min="0" :step="0.0001" />
          </FormItem>
          <FormItem label="Amount (ETH)">
            <InputNumber v-model:value="amount" class="w-full" :min="0" :step="0.0001" />
          </FormItem>
          <Button type="primary" block html-type="submit">
            <template #icon><ShoppingCartOutlined /></template>
            Buy ETH
          </Button>
        </Form>

        <Form layout="vertical" @submit.prevent="place('sell')">
          <FormItem v-if="activeType !== 'Market'" label="Limit price (BTC)">
            <InputNumber v-model:value="price" class="w-full" :min="0" :step="0.0001" />
          </FormItem>
          <FormItem label="Amount (ETH)">
            <InputNumber v-model:value="amount" class="w-full" :min="0" :step="0.0001" />
          </FormItem>
          <Button block danger html-type="submit">
            <template #icon><MinusCircleOutlined /></template>
            Sell ETH
          </Button>
        </Form>
      </div>
    </fieldset>

    <Alert v-if="successMessage" type="success" :message="successMessage" show-icon />
    <Alert v-if="errorMessage" type="error" :message="errorMessage" show-icon class="mt-2" />
  </Card>
</template>
