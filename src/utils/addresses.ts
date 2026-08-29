import type { SupportedCoin } from '@/constants/exchange'

export function hashSeed(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash).toString(16).padStart(8, '0')
}

export function deriveDepositAddress(userId: string, coin: SupportedCoin): string {
  const seed = hashSeed(`${userId}:${coin}`)

  switch (coin) {
    case 'BTC':
      return `bc1qoneex${seed}${userId.slice(0, 6)}`.slice(0, 42)
    case 'ETH':
    case 'USDT':
      return `0x${seed}${userId.replace(/-/g, '').slice(0, 32)}`.slice(0, 42)
    case 'TIC':
      return `tic1q${seed}${userId.slice(0, 8)}`.slice(0, 46)
    case 'GVC':
      return `gvc1q${seed}${userId.slice(0, 8)}`.slice(0, 46)
    default:
      return seed
  }
}

export function isValidAddress(coin: SupportedCoin, address: string): boolean {
  const value = address.trim()
  if (value.length < 10) return false

  switch (coin) {
    case 'BTC':
      return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(value)
    case 'ETH':
    case 'USDT':
      return /^0x[a-fA-F0-9]{40}$/.test(value)
    case 'TIC':
      return /^tic1[a-z0-9]{20,}$/.test(value)
    case 'GVC':
      return /^gvc1[a-z0-9]{20,}$/.test(value)
    default:
      return false
  }
}
