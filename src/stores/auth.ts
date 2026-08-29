import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import * as authApi from '@api/auth'
import { queryClient } from '@api/query-client'
import { queryKeys } from '@api/query-keys'
import type { AuthUser, LoginEvent } from '@api/types'

export type { AuthUser, LoginEvent }

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const loginHistory = ref<LoginEvent[]>([])
  const isLoading = ref(false)

  const isAuthenticated = computed(() => Boolean(user.value))

  async function hydrate() {
    isLoading.value = true
    try {
      const { data } = await queryClient.fetchQuery({
        queryKey: queryKeys.session,
        queryFn: () => authApi.fetchSession(),
      })
      user.value = data.user
      loginHistory.value = data.loginHistory
    } finally {
      isLoading.value = false
    }
  }

  async function signIn(email: string, password: string) {
    const { data } = await authApi.signIn({ email, password })
    user.value = data.user
    loginHistory.value = data.loginHistory
    queryClient.setQueryData(queryKeys.session, { data, timestamp: new Date().toISOString() })
    await queryClient.invalidateQueries({ queryKey: queryKeys.wallet(data.user.id) })
  }

  async function signUp(input: {
    email: string
    firstName: string
    lastName: string
    password?: string
  }) {
    const { data } = await authApi.signUp({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      password: input.password ?? '',
    })
    user.value = data.user
    loginHistory.value = data.loginHistory
    queryClient.setQueryData(queryKeys.session, { data, timestamp: new Date().toISOString() })
    await queryClient.invalidateQueries({ queryKey: queryKeys.wallet(data.user.id) })
  }

  async function updateProfile(firstName: string, lastName: string) {
    const { data } = await authApi.updateProfile(firstName, lastName)
    user.value = data.user
    await queryClient.invalidateQueries({ queryKey: queryKeys.session })
  }

  async function signOut() {
    await authApi.signOut()
    user.value = null
    queryClient.setQueryData(queryKeys.session, {
      data: { user: null, loginHistory: loginHistory.value },
      timestamp: new Date().toISOString(),
    })
  }

  async function refreshLoginHistory() {
    const { data } = await queryClient.fetchQuery({
      queryKey: queryKeys.loginHistory,
      queryFn: () => authApi.fetchLoginHistory(),
    })
    loginHistory.value = data.loginHistory
  }

  function validateCaptcha(value: string) {
    return authApi.validateCaptcha(value)
  }

  return {
    user,
    loginHistory,
    isLoading,
    isAuthenticated,
    hydrate,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshLoginHistory,
    validateCaptcha,
    demoCaptcha: authApi.demoCaptcha,
  }
})
