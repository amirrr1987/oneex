<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Flex from 'ant-design-vue/es/flex'
import Result from 'ant-design-vue/es/result'
import { DollarOutlined, LineChartOutlined } from '@ant-design/icons-vue'
import { RouterLink } from 'vue-router'

import { UiPage } from '@/ui'
</script>

<template>
  <UiPage
    title="Get TIC Token"
    :icon="DollarOutlined"
    subtitle="Earn rewards by trading on ONEEX"
  >
    <Flex justify="center">
      <Result
        title="Trade to earn TIC"
        sub-title="Unlock fee discounts, loyalty bounties, and platform rewards."
      >
        <template #icon>
          <DollarOutlined />
        </template>
        <template #extra>
          <RouterLink to="/exchange">
            <Button type="primary" size="large">
              <LineChartOutlined />
              Start Trading
            </Button>
          </RouterLink>
        </template>
      </Result>
    </Flex>
  </UiPage>
</template>
