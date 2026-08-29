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
      class="img-fluid rounded border bg-white p-2"
    />
    <p v-if="coin" class="small text-muted mb-0 mt-2">{{ coin }} deposit QR</p>
  </div>
</template>

<style scoped>
.wallet-qr img {
  max-width: 180px;
}
</style>
