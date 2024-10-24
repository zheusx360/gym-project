import { expect, test, describe, it } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '../authenticate'
import { rejects } from 'assert'
import { InvalidCredentialError } from '../errors/invalid-credential-error'

describe('Authenticate use cases', () => {

   it('should be able authenticate', async () => {
      const usersRepository = new InmemoryUsersRepository()

      const sut = new AuthenticateUseCase(usersRepository)

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
      const usersRepository = new InmemoryUsersRepository()

      const sut = new AuthenticateUseCase(usersRepository)

      await expect(sut.execute({
         email: 'jonas_error@email.com',
         password: '321321'
      })).rejects.toBeInstanceOf(InvalidCredentialError)
   })

   it('should not be able authenticate with wrong password', async () => {
      const usersRepository = new InmemoryUsersRepository()

      const sut = new AuthenticateUseCase(usersRepository)

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