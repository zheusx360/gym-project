import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckinUseCase } from "../check-in";

export function makeCheckinUseCase() {
   const checkinsRepository = new PrismaCheckinsRepository()
   const gymsRepository = new PrismaGymsRepository()
   const useCase = new CheckinUseCase(checkinsRepository, gymsRepository)

   return useCase
}