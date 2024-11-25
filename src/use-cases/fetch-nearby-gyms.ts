import { Gym } from "@prisma/client"
import { GymsRepositoryInterface } from "@/repositories/gyms-repositorys-interface"

interface FetchNearByUseCaseRequest {
   userLatitude: number,
   userLongitude: number
}

interface FetchNearByUseCaseResponse {
   gyms: Gym[]
}

export class FetchNearByUseCase {

   constructor(private gymRepository: GymsRepositoryInterface) { }

   async execute({ userLatitude, userLongitude }: FetchNearByUseCaseRequest): Promise<FetchNearByUseCaseResponse> {

      const gyms = await this.gymRepository.findManyNearBy({
         latitude: userLatitude,
         longitude: userLongitude
      })

      return { gyms }
   }

}

