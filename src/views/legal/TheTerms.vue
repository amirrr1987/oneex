<script setup lang="ts">
import Typography from 'ant-design-vue/es/typography'

const { Title, Paragraph } = Typography
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <Title :level="2">Terms of Use</Title>
    <Paragraph>
      ONEEX provides cryptocurrency exchange services subject to applicable regulations. Users must
      complete identity verification before high-value withdrawals. Trading involves market risk.
    </Paragraph>
    <Paragraph class="mb-0">
      This demo environment simulates exchange flows for product review and does not move real
      assets.
    </Paragraph>
  </div>
</template>
