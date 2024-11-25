import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'


let checkInRepository: InMemoryCheckinsRepository
let sut: GetUserMetricsUseCase


//Testes no caso de uso dos chekins
describe('CheckIn use cases', () => {
   beforeEach(async () => {
      checkInRepository = new InMemoryCheckinsRepository()
      sut = new GetUserMetricsUseCase(checkInRepository)
   })

   // Deve ser possivel obter a lista de checkins de um usuário
   it('should be able get checkin counts from metrics', async () => {

      await checkInRepository.create({
         gym_id: 'gym-01',
         user_id: 'user-01'
      })
      await checkInRepository.create({
         gym_id: 'gym-02',
         user_id: 'user-01'
      })

      const { checkInsCount } = await sut.execute({ userId: 'user-01' })

      expect(checkInsCount).toEqual(2)
   })

})