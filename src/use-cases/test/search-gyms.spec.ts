import { expect, describe, it, beforeEach } from 'vitest'
import { FetchUserCheckInHistoryUseCase } from '../fetch-user-check-ins-history'
import { InmemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'


let gymsRepository: InmemoryGymsRepository
let sut: SearchGymsUseCase


//Testes no caso de uso dos chekins
describe('CheckIn use cases', () => {
   beforeEach(async () => {
      gymsRepository = new InmemoryGymsRepository()
      sut = new SearchGymsUseCase(gymsRepository)
   })

   // Deve ser possivel obter a lista de checkins de um usuário
   it('should be able to search for gyms', async () => {

      await gymsRepository.create({
         title: 'GymJS',
         description: 'Academia do JS',
         phone: '(11) 95685-5695',
         latitude: -23.459512,
         longitude: -46.579712,
      })
      await gymsRepository.create({
         title: 'GymTS',
         description: 'Academia do JS',
         phone: '(11) 95685-5695',
         latitude: -23.459512,
         longitude: -46.579712,
      })

      const { gyms } = await sut.execute({ query: 'GymTS', page: 1 })

      expect(gyms).toHaveLength(1)
      expect(gyms).toEqual([
         expect.objectContaining({ title: 'GymTS' }),
      ])
   })

   it('should be able to fetch paginated gym serch', async () => {

      for (let i = 1; i <= 22; i++) {
         await gymsRepository.create({
            title: `GymTS ${i}`,
            description: 'Academia do JS',
            phone: '(11) 95685-5695',
            latitude: -23.459512,
            longitude: -46.579712,
         })
      }

      const { gyms } = await sut.execute({ query: 'GymTS', page: 2 })

      expect(gyms).toHaveLength(2)
      expect(gyms).toEqual([
         expect.objectContaining({ title: 'GymTS 21' }),
         expect.objectContaining({ title: 'GymTS 22' })
      ])
   })

})