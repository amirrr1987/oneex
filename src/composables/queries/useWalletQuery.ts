import { useQuery } from '@tanstack/vue-query'
import { computed, type MaybeRefOrGetter, toValue } from 'vue'

import * as walletApi from '@api/wallet'
import { queryKeys } from '@api/query-keys'

export function useWalletQuery(userId: MaybeRefOrGetter<string>, enabled?: MaybeRefOrGetter<boolean>) {
  return useQuery({
    queryKey: computed(() => queryKeys.wallet(toValue(userId))),
    queryFn: async () => {
      const response = await walletApi.fetchWallet(toValue(userId))
      return response.data.wallet
    },
    enabled: computed(() => {
      const id = toValue(userId)
      const isEnabled = toValue(enabled)
      if (isEnabled === false) return false
      return Boolean(id) && id !== 'guest'
    }),
  })
}
