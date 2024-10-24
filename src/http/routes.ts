import { FastifyInstance } from "fastify";
import { register } from "@/http/controller/register";
import { authenticate } from "./controller/authenticate";

export async function appRoutes(app: FastifyInstance) {
   app.get('/', () => { return { message: '🌎 Gym - Api Online' } })
   app.post('/users', register)
   app.post('/authenticate', authenticate)
}