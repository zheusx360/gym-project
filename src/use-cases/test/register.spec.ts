import { expect, test, describe, it } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

describe('Register use cases', () => {

   it('should be able to register', async () => {
      const usersRepository = new InmemoryUsersRepository()

      const registerUseCase = new RegisterUseCase(usersRepository)

      const { user } = await registerUseCase.execute({
         name: 'Jonas',
         email: 'jonas@email.com',
         password: '123456'
      })

      expect(user.id).toEqual(expect.any(String))
   })

   it('should hash user pessword upon refistration', async () => {
      const usersRepository = new InmemoryUsersRepository()

      const registerUseCase = new RegisterUseCase(usersRepository)

      const { user } = await registerUseCase.execute({
         name: 'Jonas',
         email: 'jonas@email.com',
         password: '123456'
      })

      const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

      expect(isPasswordCorrectlyHashed).toBe(true)
   })

   it('should not be able to register with same email twice', async () => {
      const usersRepository = new InmemoryUsersRepository()

      const registerUseCase = new RegisterUseCase(usersRepository)

      const email = "joao@email.com"

      await registerUseCase.execute({
         name: 'Jonas',
         email: email,
         password: '123456'
      })

      await expect(registerUseCase.execute({
         name: 'Jonas',
         email: email,
         password: '123456',
      })).rejects.toBeInstanceOf(UserAlreadyExistsError);
   })
})