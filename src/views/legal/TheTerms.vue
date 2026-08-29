<script setup lang="ts">
import Typography from 'ant-design-vue/es/typography'
import { FileTextOutlined } from '@ant-design/icons-vue'

import { UiPage, UiSection } from '@/ui'

const { Paragraph } = Typography
</script>

<template>
  <UiPage
    title="Terms of Use"
    :icon="FileTextOutlined"
    subtitle="Rules and conditions for using ONEEX"
    :breadcrumbs="[{ label: 'Home', to: '/' }, { label: 'Terms of Use' }]"
  >
    <UiSection>
      <Paragraph>
        ONEEX provides cryptocurrency exchange services subject to applicable regulations. Users must
        complete identity verification before high-value withdrawals. Trading involves market risk.
      </Paragraph>
      <Paragraph class="mb-0">
        This demo environment simulates exchange flows for product review and does not move real
        assets.
      </Paragraph>
    </UiSection>
  </UiPage>
</template>
