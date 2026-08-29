import { apiGet, apiPatch, apiPost } from '@api/http'
import type { AuthUser, LoginEvent } from '@api/types'

export type SignInPayload = {
  email: string
  password: string
}

export type SignUpPayload = {
  email: string
  firstName: string
  lastName: string
  password: string
}

export type AuthSession = {
  user: AuthUser
  loginHistory: LoginEvent[]
}

export const fetchSession = () =>
  apiGet<{ user: AuthUser | null; loginHistory: LoginEvent[] }>('/auth/session')

export const signIn = (payload: SignInPayload) =>
  apiPost<AuthSession>('/auth/sign-in', payload)

export const signUp = (payload: SignUpPayload) =>
  apiPost<AuthSession>('/auth/sign-up', payload)

export const signOut = () => apiPost<{ user: null }>('/auth/sign-out')

export const updateProfile = (firstName: string, lastName: string) =>
  apiPatch<{ user: AuthUser }>('/auth/profile', { firstName, lastName })

export const fetchLoginHistory = () =>
  apiGet<{ loginHistory: LoginEvent[] }>('/auth/login-history')

export { validateCaptcha, demoCaptcha } from '@api/mock/handlers/auth'
