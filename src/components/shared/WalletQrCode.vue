<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Flex from 'ant-design-vue/es/flex'
import Image from 'ant-design-vue/es/image'
import Typography from 'ant-design-vue/es/typography'
import { QrcodeOutlined } from '@ant-design/icons-vue'
import { toRef } from 'vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'

const props = defineProps<{
  address: string
  coin?: string
  size?: number
}>()

const { Text } = Typography

const qrcode = useQRCode(toRef(props, 'address'), {
  width: props.size ?? 180,
  margin: 1,
})
</script>

<template>
  <Card size="small" class="h-full">
    <Flex vertical align="center" gap="small">
      <Image
        v-if="qrcode"
        :src="qrcode"
        :alt="`${coin ?? 'Wallet'} QR code`"
        :width="size ?? 180"
        :preview="false"
      />
      <Text v-if="coin" type="secondary">
        <QrcodeOutlined class="mr-1" />
        {{ coin }} deposit QR
      </Text>
    </Flex>
  </Card>
</template>
