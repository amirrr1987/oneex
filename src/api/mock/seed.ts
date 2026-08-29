import { TRADING_PAIR } from '@/constants/exchange'
import type {
  MarketRow,
  OrderBookRow,
  OrderRecord,
  PlatformStat,
  TradeRecord,
  WalletSnapshot,
} from '@api/types'

export const DEFAULT_BALANCES: WalletSnapshot['balances'] = {
  BTC: 0.5421,
  ETH: 2.15,
  TIC: 1250,
  GVC: 500,
  USDT: 2000,
}

export function createDefaultWallet(): WalletSnapshot {
  return {
    balances: { ...DEFAULT_BALANCES },
    pendingDeposits: [],
    withdrawHistory: [],
    withdrawnTodayUsdt: 0,
    lastWithdrawDay: new Date().toISOString().slice(0, 10),
  }
}

export const SEED_MARKETS: MarketRow[] = [
  { market: 'AE/BTC', lastPrice: '0.0001099', change24: '+2.4%', max24: '0.00012', min24: '0.00010', volume24: '120 BTC' },
  { market: 'REP/BTC', lastPrice: '0.0001099', change24: '-1.1%', max24: '0.00012', min24: '0.00010', volume24: '80 BTC' },
  { market: 'XTZ/BTC', lastPrice: '0.0000451', change24: '+0.8%', max24: '0.00005', min24: '0.00004', volume24: '200 BTC' },
  { market: 'TIC/BTC', lastPrice: '0.0000125', change24: '+5.2%', max24: '0.000014', min24: '0.000011', volume24: '340 BTC' },
  { market: 'GVC/BTC', lastPrice: '0.0000088', change24: '-0.5%', max24: '0.0000095', min24: '0.0000080', volume24: '45 BTC' },
  { market: 'ETH/BTC', lastPrice: '0.0482', change24: '+1.3%', max24: '0.0490', min24: '0.0475', volume24: '890 BTC' },
]

export const SEED_PLATFORM_STATS: PlatformStat[] = [
  { id: 'btc', icon: 'line-chart', label: 'BTC Price', numericValue: 3429, suffix: ' USD', prefix: '$' },
  { id: 'users', icon: 'team', label: 'Active Users', numericValue: 2992, suffix: '' },
  { id: 'volume', icon: 'bar-chart', label: '24 Volume', numericValue: 151, suffix: ' BTC' },
]

export const SEED_ORDER_BOOK: OrderBookRow[] = [
  { count: 1, amountEth: '0.8420', totalBid: '0.0405', askPrice: '0.0482', totalBtc: '0.0482', amountEthAsk: '1.1200' },
  { count: 2, amountEth: '1.2500', totalBid: '0.0601', askPrice: '0.0483', totalBtc: '0.0965', amountEthAsk: '0.9800' },
  { count: 3, amountEth: '0.5100', totalBid: '0.0245', askPrice: '0.0484', totalBtc: '0.1210', amountEthAsk: '0.7600' },
  { count: 4, amountEth: '2.0000', totalBid: '0.0960', askPrice: '0.0485', totalBtc: '0.1695', amountEthAsk: '1.5000' },
]

export const SEED_ORDERS: OrderRecord[] = [
  {
    id: '1',
    pair: TRADING_PAIR.label,
    type: 'Limit',
    side: 'buy',
    price: 0.0481,
    amount: 0.5,
    fee: 0.000012,
    status: 'Open',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
]

export const SEED_TRADES: TradeRecord[] = [
  {
    id: 't1',
    pair: TRADING_PAIR.label,
    side: 'buy',
    amount: 0.25,
    price: 0.0481,
    total: 0.012025,
    createdAt: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: 't2',
    pair: TRADING_PAIR.label,
    side: 'sell',
    amount: 0.1,
    price: 0.0482,
    total: 0.00482,
    createdAt: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 't3',
    pair: TRADING_PAIR.label,
    side: 'buy',
    amount: 0.5,
    price: 0.0480,
    total: 0.024,
    createdAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: 't4',
    pair: TRADING_PAIR.label,
    side: 'sell',
    amount: 0.32,
    price: 0.0483,
    total: 0.015456,
    createdAt: new Date(Date.now() - 900000).toISOString(),
  },
  {
    id: 't5',
    pair: TRADING_PAIR.label,
    side: 'buy',
    amount: 0.08,
    price: 0.0479,
    total: 0.003832,
    createdAt: new Date(Date.now() - 1200000).toISOString(),
  },
]

export const SEED_PAIR_STATS = {
  pair: TRADING_PAIR.label,
  volume24h: 124.58,
  high24h: 0.049,
  low24h: 0.0475,
  lastPrice: 0.0482,
  change24h: 1.3,
}
