import { CheckIn } from "@prisma/client";
import { CheckinRepositoryInterface } from "@/repositories/check-ins-repository-interfaces";
import { GymsRepositoryInterface } from "@/repositories/gyms-repositorys-interface";
import { ResourceNotFoundError } from "./errors/resourse-not-found-error";

interface CheckinUseCaseRequest {
   userId: string
   gymId: string
   userLatitude: number,
   userLongitude: number
}
interface CheckinUseCaseResponse {
   checkIn: CheckIn
}

export class CheckinUseCase {

   constructor(
      private checkinsRepository: CheckinRepositoryInterface,
      private gymsRepository: GymsRepositoryInterface
   ) { }

   async execute({ userId, gymId }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {

      const gym = await this.gymsRepository.findById(gymId)

      if (!gym) {
         throw new ResourceNotFoundError
      }

      //Calcular a distancia da academia para o usuário

      const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(userId, new Date())

      console.log(checkInOnSameDay)

      if (checkInOnSameDay) {
         throw new Error()
      }

      const checkIn = await this.checkinsRepository.create({ gym_id: gymId, user_id: userId })
      return { checkIn }
   }

}