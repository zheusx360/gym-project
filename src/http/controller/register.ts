import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function register(req: FastifyRequest, resp: FastifyReply) {
   const registerBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(6)
   })

   const { name, email, password } = registerBodySchema.parse(req.body)

   try {
      /*Nota para entendimento do código*/
      /*Inversão de dependência*/
      /*
        No meu caso de uso (ou service) eu recebo como parametro o repository (local onde tenho as queries com o banco) desse modo se precisar trocar o banco de dados
        eu apenas passo o parametro do banco que for ser usado exemplo MongoUsersRepository
      */

      //Repository === conexão com o banco métodos insert-delete-update-create.
      //Use-cases ou services === são as regras em si de como a função deve agir antes de enviar os dados para o banco.


      //Instancio a parte do repository para pegar a parte de querys do banco de dados
      const prismaRepository = new PrismaUsersRepository()

      //Instancio a parte do use-cases (ou services) para passar via ingestão de dependencia o meu repository
      const registerUseCase = new RegisterUseCase(prismaRepository)

      /*Dessa maneira posso chamar o metodo execute que está dentro do registerUseCasese e passar 
        e passar os parametros que são necessários */
      await registerUseCase.execute({ name, email, password })

   } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
         resp.status(409).send('Email já existe!')
      }
      return resp.status(500).send()
   }


   return resp.status(201).send()
}