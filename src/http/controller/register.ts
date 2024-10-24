import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

// Notas sobre os padrões:
// Http -> Controller: onde está o meu endpoint que é exposto para o acesso via url -> http://meudominio/register (nesse caso as rotas estão expostas em routes para melhor divisão do código)
// Use-Cases ou Services: são onde será executado as regras da rota (regras de negócio também)
// Repositories: É onde temos a model que faz a conexão com o banco de dados, nesse meu caso a interface também está em repositories
// Inrterface: Implementa a regra dos dados a serem passados se são obrigatórios ou não, reflete os dados que são esperados pelo banco.
// Na pasta prisma esta o esquema o banco, nele temos as regras de relacionamento entre as tabelas. n para n -- n para 1 etc..

/*Nota para entendimento do código
     Inversão de dependência
      No meu caso de uso (ou service) eu recebo como parametro o repository (local onde tenho as queries com o banco) desse modo se precisar trocar o banco de dados
      eu apenas passo o parametro do banco que for ser usado exemplo MongoUsersRepository
     */

/* Repository === conexão com o banco métodos insert-delete-update-create.
   Use-cases ou services === são as regras em si de como a função deve agir antes de enviar os dados para o banco.*/

export async function register(req: FastifyRequest, resp: FastifyReply) {
   const registerBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(6),
   });
   const { name, email, password } = registerBodySchema.parse(req.body);
   try {
      //Instancio a parte do repository para pegar a parte de querys do banco de dados
      const prismaRepository = new PrismaUsersRepository();

      // Instancio a parte do use-cases (ou services) para passar via ingestão de dependencia o meu repository
      const registerUseCase = new RegisterUseCase(prismaRepository);

      // Dessa maneira posso chamar o metodo execute que está dentro do registerUseCasese e passar os parametros que são necessários
      await registerUseCase.execute({ name, email, password });
   } catch (err) {
      if (err?.name === "UserAlreadyExistsError") {
         return resp.status(409).send({ message: err.message });
      }
      throw err;
   }

   return resp.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
}
