<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Card from 'ant-design-vue/es/card'
import Typography from 'ant-design-vue/es/typography'
import { DollarOutlined, LineChartOutlined } from '@ant-design/icons-vue'
import { RouterLink } from 'vue-router'

import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'

const { Paragraph } = Typography
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-5 text-center">
    <PanelPageTitle title="Get TIC Token" :icon="DollarOutlined" />
    <div class="flex justify-center">
      <div class="w-full max-w-2xl">
        <Card class="p-8">
          <DollarOutlined class="mb-4 text-6xl" />
          <Paragraph class="mb-4">
            Trade on ONEEX to earn TIC tokens, unlock fee discounts, and join the loyalty program.
          </Paragraph>
          <RouterLink to="/exchange">
            <Button type="primary" size="large">
              <template #icon><LineChartOutlined /></template>
              Start Trading
            </Button>
          </RouterLink>
        </Card>
      </div>
    </div>
  </div>
</template>
