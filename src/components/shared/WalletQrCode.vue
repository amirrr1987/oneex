<script setup lang="ts">
import { toRef } from 'vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'

const props = defineProps<{
  address: string
  coin?: string
  size?: number
}>()

const qrcode = useQRCode(toRef(props, 'address'), {
  width: props.size ?? 180,
  margin: 1,
  color: {
    dark: '#154576',
    light: '#ffffff',
  },
})
</script>

<template>
  <div class="wallet-qr text-center">
    <img
      v-if="qrcode"
      :src="qrcode"
      :alt="`${coin ?? 'Wallet'} QR code`"
      class="max-w-full rounded border p-2"
    />
    <p v-if="coin" class="mt-2 mb-0 text-sm">{{ coin }} deposit QR</p>
  </div>
</template>

<style scoped>
.wallet-qr img {
  max-width: 180px;
}
</style>
