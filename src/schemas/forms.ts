import { z } from 'zod'

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
  priority: z.enum(['Low', 'Medium', 'High']),
})

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
