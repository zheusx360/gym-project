import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckinUseCase } from "../validate-check-in";

export function makeValidateCheckinUseCase() {
   const checkinsRepository = new PrismaCheckinsRepository()
   const useCase = new ValidateCheckinUseCase(checkinsRepository)

   return useCase
}