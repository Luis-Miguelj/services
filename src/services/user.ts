import { User as typeUser, userSchema } from '../../lib/types'
import { prisma } from '../../lib/prisma'

class User {
  async create(data: typeUser) {
    const user = userSchema.parse(data)

    try {
      await prisma.user.create(
        {
          data: {
            name: user.name,
            email: user.email,
            password: user.password
          }
        }
      )

      return { success: 'Usuário criado com sucesso' }
    } catch (err) {
      return { error: new Error(err as string) }
    }

  }

  async getUsers() {
    try {
      const users = await prisma.user.findMany()

      return users
    } catch (err) {
      return { error: new Error(err as string) }
    }
  }
}

export const users = new User()