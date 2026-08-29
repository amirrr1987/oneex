<script setup lang="ts">
import Typography from 'ant-design-vue/es/typography'
import { LockOutlined } from '@ant-design/icons-vue'

import { UiPage, UiSection } from '@/ui'

const { Paragraph } = Typography
</script>

<template>
  <UiPage
    title="Privacy Policy"
    :icon="LockOutlined"
    subtitle="How ONEEX handles your personal data"
    :breadcrumbs="[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]"
  >
    <UiSection>
      <Paragraph>
        ONEEX collects account information required for compliance, security monitoring, and customer
        support. We do not sell personal data to third parties.
      </Paragraph>
      <Paragraph class="mb-0">
        This demo application stores session data locally in your browser and does not transmit
        information to a production backend.
      </Paragraph>
    </UiSection>
  </UiPage>
</template>
