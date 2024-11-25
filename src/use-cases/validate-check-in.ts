import { CheckIn } from "@prisma/client";
import { CheckinRepositoryInterface } from "@/repositories/check-ins-repository-interfaces";
import { GymsRepositoryInterface } from "@/repositories/gyms-repositorys-interface";
import { ResourceNotFoundError } from "./errors/resourse-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckinsError } from "./errors/max-number-of-checkins-error";
import dayjs = require("dayjs");
import { LateCheckInValidationError } from "./errors/late-checkin-validation-error";

interface ValidateCheckinUseCaseRequest {
   checkinId: string
}
interface ValidateCheckinUseCaseResponse {
   checkIn: CheckIn
}

export class ValidateCheckinUseCase {

   constructor(
      private checkinsRepository: CheckinRepositoryInterface,
   ) { }

   async execute({ checkinId }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {

      const checkIn = await this.checkinsRepository.findById(checkinId)

      if (!checkIn) {
         throw new ResourceNotFoundError
      }

      const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes')

      if (distanceInMinutesFromCheckinCreation > 20) {
         throw new LateCheckInValidationError()
      }

      checkIn.validate_at = new Date()

      await this.checkinsRepository.save(checkIn)

      return {
         checkIn
      }

   }

}