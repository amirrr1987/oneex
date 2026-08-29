import { z } from 'zod'

import { ASSET_CONFIG, type SupportedCoin, type WithdrawPriority } from '@/constants/exchange'
import { isValidAddress } from '@/utils/addresses'

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
})

export const securitySchema = z
  .object({
    currentPassword: z.string().min(8, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const withdrawSchema = z.object({
  address: z.string().min(10, 'Enter a valid destination address'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, 'Enter a valid amount'),
  priority: z.enum(['Low', 'Medium', 'High'] satisfies [WithdrawPriority, WithdrawPriority, WithdrawPriority]),
})

export function createWithdrawSchema(coin: SupportedCoin, available: number, fee: number) {
  const config = ASSET_CONFIG[coin]
  return withdrawSchema.superRefine((data, ctx) => {
    const amount = Number(data.amount)
    if (amount < config.minWithdraw) {
      ctx.addIssue({
        code: 'custom',
        message: `Minimum withdrawal is ${config.minWithdraw} ${coin}`,
        path: ['amount'],
      })
    }
    if (amount + fee > available) {
      ctx.addIssue({
        code: 'custom',
        message: 'Insufficient balance including network fee',
        path: ['amount'],
      })
    }
    if (!isValidAddress(coin, data.address)) {
      ctx.addIssue({
        code: 'custom',
        message: `Enter a valid ${coin} address`,
        path: ['address'],
      })
    }
  })
}

export const balanceWithdrawSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, 'Enter a valid amount'),
  address: z.string().min(10, 'Enter a valid destination address'),
})

export type ProfileValues = z.infer<typeof profileSchema>
export type SecurityValues = z.infer<typeof securitySchema>
export type WithdrawValues = z.infer<typeof withdrawSchema>
export type BalanceWithdrawValues = z.infer<typeof balanceWithdrawSchema>
