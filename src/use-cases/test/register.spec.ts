import { expect, test, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let usersRepository: InmemoryUsersRepository
let sut: RegisterUseCase

describe('Register use cases', () => {

   beforeEach(() => {
      usersRepository = new InmemoryUsersRepository()
      sut = new RegisterUseCase(usersRepository)
   })

   it('should be able to register', async () => {

      const { user } = await sut.execute({
         name: 'Jonas',
         email: 'jonas@email.com',
         password: '123456'
      })

      expect(user.id).toEqual(expect.any(String))
   })

   it('should hash user pessword upon registration', async () => {

      const { user } = await sut.execute({
         name: 'Jonas',
         email: 'jonas@email.com',
         password: '123456'
      })

      const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

      expect(isPasswordCorrectlyHashed).toBe(true)
   })

   it('should not be able to register with same email twice', async () => {

      const email = "joao@email.com"

      await sut.execute({
         name: 'Jonas',
         email: email,
         password: '123456'
      })

      await expect(sut.execute({
         name: 'Jonas',
         email: email,
         password: '123456',
      })).rejects.toBeInstanceOf(UserAlreadyExistsError);
   })
})