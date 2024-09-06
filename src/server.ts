import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { getUsers } from './http/get-users'
import { createUsers } from './http/create-users'
import { sendNotifications } from './http/send-notifications'
import { getNotifications } from './http/get-notifications'

const server = fastify()

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

server.register(jwt, {
  secret: `${process.env.JWT_SECRET}`,
})

server.register(getUsers)
server.register(createUsers)
server.register(sendNotifications)
server.register(getNotifications)


server.listen({
  port: 3333,
  host: '0.0.0.0'
}).then(() => {
  console.log('Server is running')
})