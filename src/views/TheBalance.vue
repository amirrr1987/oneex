<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Col from 'ant-design-vue/es/col'
import Flex from 'ant-design-vue/es/flex'
import Progress from 'ant-design-vue/es/progress'
import Row from 'ant-design-vue/es/row'
import Space from 'ant-design-vue/es/space'
import Typography from 'ant-design-vue/es/typography'
import {
  ArrowRightOutlined,
  DashboardOutlined,
  DownloadOutlined,
  UploadOutlined,
  WalletOutlined,
} from '@ant-design/icons-vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import BalanceStats from '@/components/panel/BalanceStats.vue'
import { UiPage, UiSection } from '@/ui'
import { DAILY_WITHDRAW_LIMIT_USDT } from '@/constants/exchange'
import { useWalletStore } from '@/stores/wallet'

const { Text } = Typography
const wallet = useWalletStore()

const withdrawProgress = computed(() => {
  const remaining = wallet.remainingDailyWithdrawLimit()
  return Math.round((remaining / DAILY_WITHDRAW_LIMIT_USDT) * 100)
})
</script>

<template>
  <UiPage
    title="Balance"
    :icon="WalletOutlined"
    subtitle="Overview of your assets and daily limits"
    badge="Portfolio"
  >
    <BalanceStats />

    <UiSection title="Daily withdrawal limit" subtitle="Resets every 24 hours in USDT equivalent">
      <Space direction="vertical" class="w-full" :size="12">
        <Progress :percent="withdrawProgress" stroke-color="#6366f1" />
        <Text type="secondary">
          <DashboardOutlined class="mr-2" />
          {{ wallet.remainingDailyWithdrawLimit() }} USDT remaining of
          {{ DAILY_WITHDRAW_LIMIT_USDT }}
        </Text>
      </Space>
    </UiSection>

    <Row :gutter="[16, 16]">
      <Col :xs="24" :md="12">
        <UiSection title="Deposit funds" subtitle="Unique address with live confirmations">
          <template #icon><DownloadOutlined /></template>
          <Flex vertical gap="middle">
            <RouterLink to="/deposit">
              <Button type="primary" block>
                Open deposit
                <ArrowRightOutlined />
              </Button>
            </RouterLink>
          </Flex>
        </UiSection>
      </Col>

      <Col :xs="24" :md="12">
        <UiSection title="Withdraw funds" subtitle="Network fee and daily limit checks">
          <template #icon><UploadOutlined /></template>
          <Flex vertical gap="middle">
            <RouterLink to="/withdraw">
              <Button type="primary" block>
                Open withdraw
                <ArrowRightOutlined />
              </Button>
            </RouterLink>
          </Flex>
        </UiSection>
      </Col>
    </Row>
  </UiPage>
</template>
