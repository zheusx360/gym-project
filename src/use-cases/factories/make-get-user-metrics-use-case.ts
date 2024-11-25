import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeUserMetricsUseCase() {
   const checkinsRepository = new PrismaCheckinsRepository()
   const useCase = new GetUserMetricsUseCase(checkinsRepository)

   return useCase
}