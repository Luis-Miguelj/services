import type { FastifyInstance } from "fastify";
import { users } from "../services/user";

export async function getUsers(server: FastifyInstance) {
	server.get("/users", async (request, reply) => {
		const response = await users.getUsers();

		if (response) {
			return reply.status(200).send(response);
		}
	});
}
