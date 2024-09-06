import { FastifyInstance } from "fastify";
import { notifications } from '../services/notifications'
import { notificationSchema } from '../../lib/types'

export async function sendNotifications(server: FastifyInstance) {
  server.post('/send-notifications', async (request, reply) => {
    const { content, category, readAt, userId } = notificationSchema.parse(request.body)

    try {
      const notification = await notifications.sendNotification({
        content,
        category,
        readAt,
        userId
      })

      return reply.code(201).send(notification)
    } catch (err) {
      return reply.code(400).send(err)
    }
  })
}