import { expect, test, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '../authenticate'
import { InvalidCredentialError } from '../errors/invalid-credential-error'


let usersRepository: InmemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use cases', () => {
   beforeEach(() => {
      usersRepository = new InmemoryUsersRepository()
      sut = new AuthenticateUseCase(usersRepository)
   })

   it('should be able authenticate', async () => {


      await usersRepository.create({
         name: 'Jonas',
         email: 'jonas@email.com',
         password_hash: await hash('123456', 6)
      })

      const { user } = await sut.execute({
         email: 'jonas@email.com',
         password: '123456'
      })

      expect(user.id).toEqual(expect.any(String))
   })

   it('should not be able authenticate with wrong email', async () => {

      await expect(sut.execute({
         email: 'jonas_error@email.com',
         password: '321321'
      })).rejects.toBeInstanceOf(InvalidCredentialError)
   })

   it('should not be able authenticate with wrong password', async () => {

      await usersRepository.create({
         name: 'Jonas',
         email: 'jonas@email.com',
         password_hash: await hash('123456', 6)
      })

      await expect(sut.execute({
         email: 'jonas@email.com',
         password: '321321'
      })).rejects.toBeInstanceOf(InvalidCredentialError)
   })
})