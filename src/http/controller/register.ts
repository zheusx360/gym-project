import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";


export async function register(req: FastifyRequest, resp: FastifyReply) {
   const registerBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(6),
   });
   const { name, email, password } = registerBodySchema.parse(req.body);
   try {

      //Nesse método está sendo passada a parte do use-case qual é responsavel pela parte que está fazendo a inversão de dependencia
      const registerUseCase = makeRegisterUseCase()

      await registerUseCase.execute({ name, email, password });
   } catch (err) {
      if (err?.name === "UserAlreadyExistsError") {
         return resp.status(409).send({ message: err.message });
      }
      throw err;
   }

   return resp.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
}
