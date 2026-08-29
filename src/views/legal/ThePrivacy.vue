<script setup lang="ts">
import Typography from 'ant-design-vue/es/typography'

const { Title, Paragraph } = Typography
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <Title :level="2">Privacy Policy</Title>
    <Paragraph>
      ONEEX stores account, security, and transaction metadata required to operate a regulated
      exchange. API credentials use public-key authentication; private signing keys remain with the
      user.
    </Paragraph>
    <Paragraph class="mb-0">
      Login history and withdrawal activity are retained for fraud prevention and audit purposes.
    </Paragraph>
  </div>
</template>
