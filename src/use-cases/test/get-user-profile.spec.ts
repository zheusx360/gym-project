import { expect, test, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'
import { ResourceNotFoundError } from '../errors/resourse-not-found-error'


let usersRepository: InmemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get use profile use case', () => {
   beforeEach(() => {
      usersRepository = new InmemoryUsersRepository()
      sut = new GetUserProfileUseCase(usersRepository)
   })

   it('should be able to get user profile', async () => {
      const createdUser = await usersRepository.create({
         name: 'Jonas',
         email: 'jonas@email.com',
         password_hash: await hash('123456', 6)
      })

      const { user } = await sut.execute({
         userId: createdUser.id
      })

      console.log("UserCreated: ", user)

      expect(user.id).toEqual(expect.any(String))
      expect(user.name).toEqual('Jonas')
   })

   it('should not be able to get user profile with wrong id', async () => {

      await expect(sut.execute({
         userId: 'null-id'
      })).rejects.toBeInstanceOf(ResourceNotFoundError)
   })
})