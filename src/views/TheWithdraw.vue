<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Typography from 'ant-design-vue/es/typography'
import { UploadOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

import CoinTabs from '@/components/panel/CoinTabs.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import WithdrawForm from '@/components/panel/WithdrawForm.vue'

const { Text } = Typography

const activeCoin = ref('BTC')
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-4">
    <PanelPageTitle title="Withdraw" :icon="UploadOutlined" />

    <div class="mb-4 flex justify-center">
      <div class="w-full max-w-5xl">
        <CoinTabs v-model="activeCoin" />
      </div>
    </div>

    <section class="py-4">
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex justify-center">
          <div class="w-full max-w-5xl">
            <Card>
              <template #title>
                <span class="inline-flex items-center gap-2">
                  <UploadOutlined />
                  <Text strong>Withdraw — {{ activeCoin }}</Text>
                </span>
              </template>
              <WithdrawForm :coin="activeCoin" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
