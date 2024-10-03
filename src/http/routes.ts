import { FastifyInstance } from "fastify";
import { register } from "@/http/controller/register";

export async function appRoutes(app: FastifyInstance) {
   app.get('/', () => { return { message: '🌎 Gym - Api Online' } })
   app.post('/users', register)
}