<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Card from 'ant-design-vue/es/card'
import Input from 'ant-design-vue/es/input'
import List from 'ant-design-vue/es/list'
import Spin from 'ant-design-vue/es/spin'
import Tag from 'ant-design-vue/es/tag'
import Typography from 'ant-design-vue/es/typography'
import { DownloadOutlined, InfoCircleOutlined, ReloadOutlined, WalletOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { ASSET_CONFIG, type SupportedCoin } from '@/constants/exchange'
import CoinTabs from '@/components/panel/CoinTabs.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
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
  <div class="mx-auto max-w-7xl px-4 py-4">
    <PanelPageTitle title="Deposit" :icon="DownloadOutlined" />

    <div class="mb-3 flex justify-center">
      <div class="w-full max-w-5xl">
        <CoinTabs v-model="activeCoin" />
      </div>
    </div>

    <section class="py-4">
      <div class="flex justify-center">
        <div class="w-full max-w-5xl">
          <Card>
            <Title :level="5">
              <InfoCircleOutlined class="mr-2" />
              Min deposit: {{ config.minDeposit }} {{ activeCoin }} · Required confirmations:
              {{ config.confirmations }}
            </Title>
            <Paragraph class="text-sm">
              This address is unique to your ONEEX account. Funds are credited only after the required
              block confirmations.
            </Paragraph>

            <div class="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
              <div class="md:col-span-4">
                <WalletQrCode :address="walletAddress" :coin="activeCoin" />
              </div>
              <div class="md:col-span-8">
                <Text class="mb-2 block">Your deposit address</Text>
                <Input :value="walletAddress" readonly class="font-mono">
                  <template #prefix>
                    <WalletOutlined />
                  </template>
                  <template #addonAfter>
                    <CopyButton :text="walletAddress" size="small" />
                  </template>
                </Input>
              </div>
            </div>

            <div class="mt-4 flex flex-wrap items-end gap-2">
              <Input
                v-model:value="depositAmount"
                class="max-w-xs"
                :placeholder="`Simulate incoming ${activeCoin}`"
              />
              <Button @click="queueDemoDeposit">Simulate on-chain deposit</Button>
              <Button :disabled="isRefreshing" @click="wallet.refreshDeposits()">
                <Spin v-if="isRefreshing" size="small" class="mr-2" />
                <ReloadOutlined v-else class="mr-2" />
                Refresh confirmations
              </Button>
            </div>

            <Alert v-if="infoMessage" type="info" :message="infoMessage" show-icon class="mt-3" />
            <Alert v-if="errorMessage" type="error" :message="errorMessage" show-icon class="mt-3" />

            <List
              v-if="pendingDeposits.length"
              class="mt-4"
              header="Pending deposits"
              :data-source="pendingDeposits"
              bordered
            >
              <template #renderItem="{ item }">
                <List.Item>
                  <span>{{ item.amount }} {{ item.coin }}</span>
                  <Tag>{{ item.confirmations }}/{{ item.requiredConfirmations }} confirmations</Tag>
                  <Tag :color="item.status === 'Confirmed' ? 'success' : 'processing'">{{ item.status }}</Tag>
                </List.Item>
              </template>
            </List>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>
