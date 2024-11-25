import { CheckIn } from "@prisma/client";
import { CheckinRepositoryInterface } from "@/repositories/check-ins-repository-interfaces";

interface GetUserMetricsUseCaseRequest {
   userId: string
}
interface GetUserMetricsUseCaseResponse {
   checkInsCount: number
}

export class GetUserMetricsUseCase {

   constructor(
      private checkinsRepository: CheckinRepositoryInterface,
   ) { }

   async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {

      const checkInsCount = await this.checkinsRepository.counterByUserId(userId)

      return { checkInsCount }
   }

}