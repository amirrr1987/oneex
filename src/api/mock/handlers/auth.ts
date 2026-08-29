import { ApiError } from '@api/client'
import {
  getDb,
  saveLoginHistory,
  saveSessionUser,
  saveUsers,
  userIdFromEmail,
} from '@api/mock/db'
import type { AuthUser, LoginEvent } from '@api/types'

const DEMO_CAPTCHA = 'ONEEX'

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

function recordLogin(): LoginEvent[] {
  const db = getDb()
  const entry: LoginEvent = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    at: new Date().toISOString(),
    device: navigator.userAgent.includes('Mobile') ? 'Mobile Web' : 'Desktop Web',
    ip: `185.${Math.floor(Math.random() * 200) + 10}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}`,
  }
  const loginHistory = [entry, ...db.loginHistory].slice(0, 10)
  saveLoginHistory(loginHistory)
  return loginHistory
}

export function getSession() {
  const db = getDb()
  return {
    user: db.sessionUser,
    loginHistory: db.loginHistory,
  }
}

export function signIn(payload: SignInPayload) {
  const normalized = payload.email.trim().toLowerCase()
  const db = getDb()
  const user =
    db.users[normalized] ??
    ({
      id: userIdFromEmail(normalized),
      email: normalized,
      firstName: 'ONEEX',
      lastName: 'Trader',
    } satisfies AuthUser)

  saveSessionUser(user)
  const loginHistory = recordLogin()
  return { user, loginHistory }
}

export function signUp(payload: SignUpPayload) {
  const normalized = payload.email.trim().toLowerCase()
  const db = getDb()

  if (db.users[normalized]) {
    throw new ApiError('An account with this email already exists', 409)
  }

  const user: AuthUser = {
    id: userIdFromEmail(normalized),
    email: normalized,
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
  }

  saveUsers({ ...db.users, [normalized]: user })
  saveSessionUser(user)
  const loginHistory = recordLogin()
  return { user, loginHistory }
}

export function signOut() {
  saveSessionUser(null)
  return { user: null }
}

export function updateProfile(firstName: string, lastName: string) {
  const db = getDb()
  if (!db.sessionUser) throw new ApiError('Not authenticated', 401)

  const user: AuthUser = {
    ...db.sessionUser,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
  }

  saveSessionUser(user)
  saveUsers({ ...db.users, [user.email]: user })
  return { user }
}

export function getLoginHistory() {
  return { loginHistory: getDb().loginHistory }
}

export function validateCaptcha(value: string) {
  return value.trim().toUpperCase() === DEMO_CAPTCHA
}

export const demoCaptcha = DEMO_CAPTCHA
