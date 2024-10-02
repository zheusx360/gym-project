import { IUsersRepository } from "@/repositories/users-repository-interface"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterUseCaseRequest {
   name: string,
   email: string,
   password: string
}

export class RegisterUseCase {

   constructor(private usersRepository: IUsersRepository) { }

   async execute({ name, email, password }: RegisterUseCaseRequest) {

      const password_hash = await hash(password, 6)

      const emailExists = await this.usersRepository.findByEmail(email)

      if (emailExists) {
         throw new UserAlreadyExistsError()
      }

      this.usersRepository.create({
         name, email, password_hash
      })
   }

}

