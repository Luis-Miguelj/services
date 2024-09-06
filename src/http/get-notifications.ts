import { FastifyInstance } from 'fastify'
import { notifications } from '../services/notifications'
export async function getNotifications(server: FastifyInstance) {
  server.get('/notifications/:id', async (request, reply) => {
    const { id } = request.params as { id: string }

    try {
      const notification = await notifications.getNotifications(id)

      if (!notification) {
        return reply.code(404).send('Nenhuma notificação encontrada')
      }

      return reply.code(200).send(notification)

    } catch (err) {
      return reply.code(400).send(err)
    }
  })
}