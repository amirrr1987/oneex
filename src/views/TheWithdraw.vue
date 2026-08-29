<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Space from 'ant-design-vue/es/space'
import Typography from 'ant-design-vue/es/typography'
import { UploadOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

import CoinTabs from '@/components/panel/CoinTabs.vue'
import { UiPage } from '@/ui'
import WithdrawForm from '@/components/panel/WithdrawForm.vue'

const { Text } = Typography
const activeCoin = ref('BTC')
</script>

<template>
  <UiPage
    title="Withdraw"
    :icon="UploadOutlined"
    subtitle="Send assets to an external wallet address"
  >
    <template #toolbar>
      <CoinTabs v-model="activeCoin" />
    </template>

    <Card hoverable>
      <template #title>
        <Space>
          <UploadOutlined />
          <Text strong>Withdraw — {{ activeCoin }}</Text>
        </Space>
      </template>
      <WithdrawForm :coin="activeCoin" />
    </Card>
  </UiPage>
</template>
