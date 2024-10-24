import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialError } from "@/use-cases/errors/invalid-credential-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function authenticate(req: FastifyRequest, resp: FastifyReply) {

   const registerBodySchema = z.object({
      email: z.string(),
      password: z.string().min(6),
   });
   const { email, password } = registerBodySchema.parse(req.body);

   console.log(email, ' - ', password)

   try {

      const prismaRespository = new PrismaUsersRepository()

      const authenticateUseCase = new AuthenticateUseCase(prismaRespository)

      const user = await authenticateUseCase.execute({ email, password })

   } catch (err) {

      if (err.name === 'InvalidCredentialError') {
         return resp.status(400).send({ message: err.message });
      }
      throw err;
   }


   return resp.status(200).send({ message: 'authenticado com sucesso!' })

}