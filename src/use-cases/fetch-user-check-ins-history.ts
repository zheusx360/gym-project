import { CheckIn } from "@prisma/client";
import { CheckinRepositoryInterface } from "@/repositories/check-ins-repository-interfaces";

interface FetchUserCheckInHistoryUseCaseRequest {
   userId: string
   page: number
}
interface FetchUserCheckInHistoryUseCaseResponse {
   checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {

   constructor(
      private checkinsRepository: CheckinRepositoryInterface,
   ) { }

   async execute({ userId, page }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {

      const checkIns = await this.checkinsRepository.findManyByUserId(userId, page)

      return { checkIns }
   }

}