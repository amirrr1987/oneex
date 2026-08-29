import type {
  SupportedCoin,
  WithdrawPriority,
} from '@/constants/exchange'

export type AuthUser = {
  id: string
  email: string
  firstName: string
  lastName: string
}

export type LoginEvent = {
  id: string
  at: string
  device: string
  ip: string
}

export type WithdrawRecord = {
  id: string
  coin: SupportedCoin
  amount: number
  fee: number
  address: string
  priority: WithdrawPriority
  status: 'Pending' | 'Processing' | 'Completed'
  createdAt: string
}

export type PendingDeposit = {
  id: string
  coin: SupportedCoin
  amount: number
  confirmations: number
  requiredConfirmations: number
  status: 'Pending' | 'Confirmed'
  createdAt: string
}

export type WalletSnapshot = {
  balances: Record<SupportedCoin, number>
  pendingDeposits: PendingDeposit[]
  withdrawHistory: WithdrawRecord[]
  withdrawnTodayUsdt: number
  lastWithdrawDay: string
}

export type OrderType = 'Market' | 'Limit' | 'Stop' | 'Stop Limit'
export type OrderSide = 'buy' | 'sell'

export type OrderRecord = {
  id: string
  pair: string
  type: OrderType
  side: OrderSide
  price: number
  amount: number
  fee: number
  status: 'Filled' | 'Open'
  createdAt: string
}

export type OrderBookRow = {
  count: number
  amountEth: string
  totalBid: string
  askPrice: string
  totalBtc: string
  amountEthAsk: string
}

export type TradeRecord = {
  id: string
  pair: string
  side: OrderSide
  amount: number
  price: number
  total: number
  createdAt: string
}

export type MarketRow = {
  market: string
  lastPrice: string
  change24: string
  max24: string
  min24: string
  volume24: string
}

export type PlatformStatIcon = 'line-chart' | 'team' | 'bar-chart'

export type PlatformStat = {
  id: string
  icon: PlatformStatIcon
  label: string
  numericValue: number
  suffix: string
  prefix?: string
}

export type PairStats = {
  pair: string
  volume24h: number
  high24h: number
  low24h: number
  lastPrice: number
  change24h: number
}
