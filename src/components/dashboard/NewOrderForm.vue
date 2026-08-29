<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Descriptions from 'ant-design-vue/es/descriptions'
import Divider from 'ant-design-vue/es/divider'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import InputNumber from 'ant-design-vue/es/input-number'
import Segmented from 'ant-design-vue/es/segmented'
import Space from 'ant-design-vue/es/space'
import Tabs from 'ant-design-vue/es/tabs'
import Tag from 'ant-design-vue/es/tag'
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
import { UiSection } from '@/ui'

const trading = useTradingStore()
const wallet = useWalletStore()

const orderTypes = [
  { id: 'Market', icon: ThunderboltOutlined },
  { id: 'Limit', icon: SlidersOutlined },
  { id: 'Stop', icon: StopOutlined },
  { id: 'Stop Limit', icon: PauseCircleOutlined },
] as const

const activeType = ref<OrderType>('Market')
const activeSide = ref<OrderSide>('buy')
const price = ref<number>()
const amount = ref<number>()
const successMessage = ref('')
const errorMessage = ref('')

const orderTypeOptions = orderTypes.map((type) => ({ label: type.id, value: type.id }))

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

function submitCurrentSide() {
  void place(activeSide.value)
}
</script>

<template>
  <UiSection title="New Order" :subtitle="TRADING_PAIR.label">
    <template #icon><PlusCircleOutlined /></template>
    <template #extra>
      <Tag color="blue">
        <PercentageOutlined class="mr-1" />
        Fee {{ trading.feeRateLabel }}
      </Tag>
    </template>

    <Segmented v-model:value="activeType" block :options="orderTypeOptions" class="mb-4" />

    <Descriptions bordered size="small" :column="2" class="mb-4">
      <template #title>
        <Space>
          <WalletOutlined />
          Available balances
        </Space>
      </template>
      <Descriptions.Item label="ETH">{{ ethBalance }}</Descriptions.Item>
      <Descriptions.Item label="BTC">{{ btcBalance }}</Descriptions.Item>
    </Descriptions>

    <Tabs v-model:active-key="activeSide" class="mb-2">
      <Tabs.TabPane key="buy" tab="Buy ETH">
        <Form layout="vertical" @submit.prevent="submitCurrentSide">
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
      </Tabs.TabPane>

      <Tabs.TabPane key="sell" tab="Sell ETH">
        <Form layout="vertical" @submit.prevent="submitCurrentSide">
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
      </Tabs.TabPane>
    </Tabs>

    <Divider class="my-3" />

    <Alert v-if="successMessage" type="success" :message="successMessage" show-icon />
    <Alert v-if="errorMessage" type="error" :message="errorMessage" show-icon class="mt-2" />
  </UiSection>
</template>
