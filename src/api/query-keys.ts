export const queryKeys = {
  session: ['session'] as const,
  loginHistory: ['login-history'] as const,
  wallet: (userId: string) => ['wallet', userId] as const,
  markets: (quote = 'all') => ['markets', quote] as const,
  platformStats: ['platform-stats'] as const,
  pairStats: ['pair-stats'] as const,
  orderBook: ['order-book'] as const,
  orders: (userId: string) => ['orders', userId] as const,
  recentTrades: ['recent-trades'] as const,
  tradingSnapshot: (userId: string) => ['trading-snapshot', userId] as const,
}
