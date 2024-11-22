import { User } from "@prisma/client";
import { IUsersRepository } from "@/repositories/users-repository-interface";
import { ResourceNotFoundError } from "./errors/resourse-not-found-error";

interface GetUserProfileUseCaseRequest {
   userId: string
}
interface GetUserProfileUseCaseResponse {
   user: User
}

export class GetUserProfileUseCase {
   constructor(private userRepository: IUsersRepository) { }

   async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
      const user = await this.userRepository.findById(userId)

      console.log("MetodoID: ", userId)
      console.log("Metodo: ", user)

      if (!user) {
         throw new ResourceNotFoundError()
      }

      return { user }
   }

}