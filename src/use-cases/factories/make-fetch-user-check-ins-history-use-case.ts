import { FetchUserCheckInHistoryUseCase } from "../fetch-user-check-ins-history";
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFetchCheckinsHistoryUseCase() {
   const checkinsRepository = new PrismaCheckinsRepository()
   const useCase = new FetchUserCheckInHistoryUseCase(checkinsRepository)

   return useCase
}