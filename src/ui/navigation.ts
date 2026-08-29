import type { Component } from 'vue'

export type UiBreadcrumb = {
  label: string
  to?: string
}

export type NavItem = {
  key: string
  label: string
  to: string
  icon?: Component
}

export type NavGroup = {
  key: string
  label: string
  icon?: Component
  children: NavItem[]
}

export const tradingNav: Array<NavItem | NavGroup> = [
  { key: '/exchange', label: 'Exchange', to: '/exchange' },
  { key: '/markets', label: 'Markets', to: '/markets' },
  { key: '/balance', label: 'Balance', to: '/balance' },
  {
    key: 'wallet',
    label: 'Wallet',
    children: [
      { key: '/deposit', label: 'Deposit', to: '/deposit' },
      { key: '/withdraw', label: 'Withdraw', to: '/withdraw' },
      { key: '/withdraw-history', label: 'Withdraw History', to: '/withdraw-history' },
    ],
  },
  { key: '/trade-history', label: 'Trade History', to: '/trade-history' },
  { key: '/reports', label: 'Reports', to: '/reports' },
]

export const accountNav: NavItem[] = [
  { key: '/profile', label: 'Profile', to: '/profile' },
  { key: '/security', label: 'Security', to: '/security' },
  { key: '/last-ten-login', label: 'Last 10 Login', to: '/last-ten-login' },
  { key: '/logout', label: 'Logout', to: '/logout' },
]

export const authNav: NavItem[] = [
  { key: '/sign-in', label: 'Sign In', to: '/sign-in' },
  { key: '/sign-up', label: 'Sign Up', to: '/sign-up' },
]

export const footerLinks = {
  product: ['About', 'Security', 'Fee Structure', 'API docs', 'Support'],
  legal: [
    { label: 'Terms of use', to: '/terms' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'Cookie policy', to: '/privacy' },
  ],
}
