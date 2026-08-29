import { createRouter, createWebHistory } from 'vue-router'

const authRoute = (path: string, name: string, component: () => Promise<unknown>) => ({
  path,
  component: () => import('@/layouts/AuthLayout.vue'),
  children: [{ path: '', name, component }],
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/LandingLayout.vue'),
      children: [{ path: '', name: 'TheHome', component: () => import('@/views/TheHome.vue') }],
    },
    {
      path: '/',
      component: () => import('@/layouts/PanelLayout.vue'),
      children: [
        { path: 'exchange', name: 'TheDashboard', component: () => import('@/views/TheDashboard.vue') },
        { path: 'deposit', name: 'TheDeposit', component: () => import('@/views/TheDeposit.vue') },
        { path: 'withdraw', name: 'TheWithdraw', component: () => import('@/views/TheWithdraw.vue') },
        {
          path: 'withdraw-history',
          name: 'TheWithdrawHistory',
          component: () => import('@/views/TheWithdrawHistory.vue'),
        },
        {
          path: 'trade-history',
          name: 'TheTradeHistory',
          component: () => import('@/views/TheTradeHistory.vue'),
        },
        { path: 'profile', name: 'TheProfile', component: () => import('@/views/TheProfile.vue') },
        { path: 'security', name: 'TheSecurity', component: () => import('@/views/TheSecurity.vue') },
        { path: 'reports', name: 'TheReports', component: () => import('@/views/TheReports.vue') },
        { path: 'get-tic-token', name: 'TheBlank', component: () => import('@/views/TheBlank.vue') },
        { path: 'logout', name: 'TheLogout', component: () => import('@/views/TheLogout.vue') },
        {
          path: 'last-ten-login',
          name: 'TheLastTenLogin',
          component: () => import('@/views/TheLastTenLogin.vue'),
        },
        { path: 'markets', name: 'TheMarkets', component: () => import('@/views/TheMarkets.vue') },
        { path: 'balance', name: 'TheBalance', component: () => import('@/views/TheBalance.vue') },
      ],
    },
    authRoute('/sign-in', 'TheSignIn', () => import('@/views/auth/TheSignIn.vue')),
    authRoute('/sign-up', 'TheSignUp', () => import('@/views/auth/TheSignUp.vue')),
    authRoute('/reset-password', 'TheResetPassword', () => import('@/views/auth/TheResetPassword.vue')),
  ],
})

export default router
