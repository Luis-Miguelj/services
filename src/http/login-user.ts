import type { FastifyInstance } from "fastify";
import jwt from "@fastify/jwt";

import { loginSchema } from "../../lib/types";
import { users } from "../services/user";

export async function LoginUser(server: FastifyInstance) {
	server.register(jwt, {
		secret: `${process.env.JWT_SECRET}`,
	});
	server.post("/login", async (request, reply) => {
		const data = loginSchema.parse(request.body);

		const user = await users.userLogin(data);

		if (!user) {
			return reply.status(400).send({ error: "Usuário não encontrado" });
		}

		const token = server.jwt.sign({ sub: user });

		if (token) {
			return reply
				.status(200)
				.send({ token, success: "Usuario logado com sucesso" });
		}
	});
}
