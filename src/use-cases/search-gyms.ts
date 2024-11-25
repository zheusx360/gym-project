import { Gym } from "@prisma/client"
import { GymsRepositoryInterface } from "@/repositories/gyms-repositorys-interface"

interface SearchFGymsUseCaseRequest {
   query: string,
   page: number
}

interface SearchFGymsUseCaseResponse {
   gyms: Gym[]
}

export class SearchGymsUseCase {

   constructor(private gymRepository: GymsRepositoryInterface) { }

   async execute({ query, page }: SearchFGymsUseCaseRequest): Promise<SearchFGymsUseCaseResponse> {

      const gyms = await this.gymRepository.searchMany(
         query,
         page
      )

      return { gyms }
   }

}

