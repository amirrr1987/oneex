export const TRADING_PAIR = {
  base: 'ETH',
  quote: 'BTC',
  label: 'ETH / BTC',
} as const

export const MAKER_TAKER_FEE_RATE = 0.0005
export const TIC_MINING_RATE = 0.1
export const DAILY_WITHDRAW_LIMIT_USDT = 2000

export type WithdrawPriority = 'Low' | 'Medium' | 'High'

export const WITHDRAW_PRIORITY_MULTIPLIER: Record<WithdrawPriority, number> = {
  Low: 0.85,
  Medium: 1,
  High: 1.25,
}

export type SupportedCoin = 'BTC' | 'ETH' | 'TIC' | 'GVC' | 'USDT'

export type AssetConfig = {
  minDeposit: number
  minWithdraw: number
  networkFee: number
  confirmations: number
  decimals: number
}

export const ASSET_CONFIG: Record<SupportedCoin, AssetConfig> = {
  BTC: { minDeposit: 0.002, minWithdraw: 0.01, networkFee: 0.0005, confirmations: 3, decimals: 8 },
  ETH: { minDeposit: 0.01, minWithdraw: 0.05, networkFee: 0.002, confirmations: 12, decimals: 8 },
  TIC: { minDeposit: 10, minWithdraw: 50, networkFee: 1, confirmations: 6, decimals: 8 },
  GVC: { minDeposit: 10, minWithdraw: 50, networkFee: 1, confirmations: 6, decimals: 8 },
  USDT: { minDeposit: 10, minWithdraw: 20, networkFee: 1, confirmations: 12, decimals: 2 },
}

export const SUPPORTED_COINS = Object.keys(ASSET_CONFIG) as SupportedCoin[]
