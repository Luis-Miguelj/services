import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})

export const notificationSchema = z.object({
  content: z.string().min(4, { message: 'Necessário informar o conteúdo da notificação' }),
  category: z.string().min(1, { message: 'Necessarion informar a categoria' }),
  readAt: z.date().optional(),
  userId: z.string().optional()
})

export type Notification = z.infer<typeof notificationSchema>
export type User = z.infer<typeof userSchema>