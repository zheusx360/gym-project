import { FetchNearByUseCase } from "../fetch-nearby-gyms";
import { SearchGymsUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearByGymsUseCase() {
   const gymsRepository = new PrismaGymsRepository()
   const useCase = new FetchNearByUseCase(gymsRepository)

   return useCase
}