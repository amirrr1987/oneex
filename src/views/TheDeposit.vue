<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Card from 'ant-design-vue/es/card'
import Col from 'ant-design-vue/es/col'
import Divider from 'ant-design-vue/es/divider'
import Empty from 'ant-design-vue/es/empty'
import Flex from 'ant-design-vue/es/flex'
import Input from 'ant-design-vue/es/input'
import List from 'ant-design-vue/es/list'
import Row from 'ant-design-vue/es/row'
import Space from 'ant-design-vue/es/space'
import Spin from 'ant-design-vue/es/spin'
import Tag from 'ant-design-vue/es/tag'
import Typography from 'ant-design-vue/es/typography'
import { DownloadOutlined, InfoCircleOutlined, ReloadOutlined, WalletOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { ASSET_CONFIG, type SupportedCoin } from '@/constants/exchange'
import CoinTabs from '@/components/panel/CoinTabs.vue'
import { UiPage } from '@/ui'
import CopyButton from '@/components/shared/CopyButton.vue'
import WalletQrCode from '@/components/shared/WalletQrCode.vue'
import { useWalletStore } from '@/stores/wallet'

const { Title, Text, Paragraph } = Typography

const wallet = useWalletStore()
const { isRefreshing, pendingDeposits } = storeToRefs(wallet)

onMounted(() => {
  void wallet.fetchWallet()
})

const activeCoin = ref<SupportedCoin>('BTC')
const depositAmount = ref('')
const errorMessage = ref('')
const infoMessage = ref('')

const walletAddress = computed(() => wallet.getDepositAddress(activeCoin.value))
const config = computed(() => ASSET_CONFIG[activeCoin.value])

async function queueDemoDeposit() {
  errorMessage.value = ''
  infoMessage.value = ''
  try {
    await wallet.simulateIncomingDeposit(activeCoin.value, Number(depositAmount.value))
    infoMessage.value = `Deposit detected on-chain. Waiting for ${config.value.confirmations} confirmations.`
    depositAmount.value = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to queue deposit'
  }
}
</script>

<template>
  <UiPage
    title="Deposit"
    :icon="DownloadOutlined"
    subtitle="Send crypto to your unique ONEEX address"
  >
    <template #toolbar>
      <CoinTabs v-model="activeCoin" />
    </template>

    <Card hoverable>
      <Alert
        type="info"
        show-icon
        class="mb-4"
        :message="`Min ${config.minDeposit} ${activeCoin} · ${config.confirmations} confirmations required`"
      />

      <Paragraph>
        This address is unique to your ONEEX account. Funds are credited only after the required
        block confirmations.
      </Paragraph>

      <Row :gutter="[24, 24]" align="middle">
        <Col :xs="24" :md="8">
          <WalletQrCode :address="walletAddress" :coin="activeCoin" />
        </Col>
        <Col :xs="24" :md="16">
          <Space direction="vertical" class="w-full" :size="8">
            <Text strong>Your deposit address</Text>
            <Input :value="walletAddress" readonly>
              <template #prefix>
                <WalletOutlined />
              </template>
              <template #addonAfter>
                <CopyButton :text="walletAddress" size="small" />
              </template>
            </Input>
          </Space>
        </Col>
      </Row>

      <Divider />

      <Flex wrap="wrap" gap="small" align="end">
        <Input
          v-model:value="depositAmount"
          :placeholder="`Simulate incoming ${activeCoin}`"
        />
        <Button type="primary" @click="queueDemoDeposit">Simulate deposit</Button>
        <Button :disabled="isRefreshing" @click="wallet.refreshDeposits()">
          <Spin v-if="isRefreshing" size="small" />
          <ReloadOutlined v-else />
          Refresh confirmations
        </Button>
      </Flex>

      <Alert v-if="infoMessage" type="success" :message="infoMessage" show-icon class="mt-4" />
      <Alert v-if="errorMessage" type="error" :message="errorMessage" show-icon class="mt-4" />

      <Title :level="5" class="mt-6">Pending deposits</Title>
      <List
        v-if="pendingDeposits.length"
        :data-source="pendingDeposits"
        bordered
      >
        <template #renderItem="{ item }">
          <List.Item>
            <List.Item.Meta :title="`${item.amount} ${item.coin}`" />
            <Space>
              <Tag>{{ item.confirmations }}/{{ item.requiredConfirmations }} confirmations</Tag>
              <Tag :color="item.status === 'Confirmed' ? 'success' : 'processing'">{{ item.status }}</Tag>
            </Space>
          </List.Item>
        </template>
      </List>
      <Empty v-else description="No pending deposits" />
    </Card>
  </UiPage>
</template>
