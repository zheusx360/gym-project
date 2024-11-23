import { CheckIn } from "@prisma/client";
import { CheckinRepositoryInterface } from "@/repositories/check-ins-repository-interfaces";
import { GymsRepositoryInterface } from "@/repositories/gyms-repositorys-interface";
import { ResourceNotFoundError } from "./errors/resourse-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckinsError } from "./errors/max-number-of-checkins-error";

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

   async execute({ userId, gymId, userLatitude, userLongitude }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {

      const gym = await this.gymsRepository.findById(gymId)

      if (!gym) {
         throw new ResourceNotFoundError
      }

      //Calcular a distancia da academia para o usuário
      const distance = getDistanceBetweenCoordinates(
         { latitude: userLatitude, longitude: userLongitude },
         { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
      )

      const MAX_DISTANCE_KILOMETERS = 0.1


      if (distance > MAX_DISTANCE_KILOMETERS) {
         throw new MaxDistanceError()
      }

      const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(userId, new Date())

      console.log(checkInOnSameDay)

      if (checkInOnSameDay) {
         throw new MaxNumberOfCheckinsError()
      }

      const checkIn = await this.checkinsRepository.create({ gym_id: gymId, user_id: userId })
      return { checkIn }
   }

}