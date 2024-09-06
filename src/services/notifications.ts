import { prisma } from '../../lib/prisma'
import { notificationSchema, Notification } from '../../lib/types'
class Notifications {

  async sendNotification(data: Notification) {
    const notification = notificationSchema.parse(data)
    try {
      await prisma.notification.create({
        data: {
          content: notification.content,
          category: notification.category,
          readAt: notification.readAt,
          userId: notification.userId
        }
      })
      return { success: 'Notificação enviada com sucesso' }
    } catch (err) {
      return { error: new Error(err as string) }
    }
  }

  async getNotifications(id?: string) {
    try {
      if (!id) {
        const notifications = await prisma.notification.findMany()
        if (!notifications) {
          return { error: 'Nenhuma notificação encontrada' }
        }
        return { notifications }
      }
      const notificationsIds = await prisma.notification.findMany({
        where: {
          userId: id
        }
      })
      return { notificationsIds }
    } catch (err) {
      return { error: new Error(err as string) }
    }
  }
}


export const notifications = new Notifications()