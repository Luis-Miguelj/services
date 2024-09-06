import type { FastifyInstance } from "fastify";
import { users } from "../services/user";
import { z } from "zod";

export async function createUsers(server: FastifyInstance) {
	server.post("/cadastro", async (request, reply) => {
		const user = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string().min(6),
		});

		const data = user.parse(request.body);

		const response = await users.create(data);

		if (response) {
			return reply.status(201).send(response);
		}
	});
}
